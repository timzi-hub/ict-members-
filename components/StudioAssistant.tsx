
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';

// Audio Utilities as per guidelines
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const StudioAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'listening' | 'speaking'>('idle');
  const [transcription, setTranscription] = useState<{ user: string, ai: string }>({ user: '', ai: '' });
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const outAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const streamRef = useRef<MediaStream | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const sessionRef = useRef<any>(null);

  const cleanup = useCallback(() => {
    setIsActive(false);
    setStatus('idle');
    if (sessionRef.current) {
      // In a real environment we'd call session.close() if available
      sessionRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (scriptProcessorRef.current) {
      scriptProcessorRef.current.disconnect();
      scriptProcessorRef.current = null;
    }
    for (const source of sourcesRef.current) {
      try { source.stop(); } catch (e) {}
    }
    sourcesRef.current.clear();
    nextStartTimeRef.current = 0;
  }, []);

  const toggleSession = async () => {
    if (isActive) {
      cleanup();
      return;
    }

    try {
      setStatus('connecting');
      setIsActive(true);

      const ai = new GoogleGenAI({ apiKey: (process.env.API_KEY as string) });
      
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = inputCtx;
      outAudioContextRef.current = outputCtx;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setStatus('listening');
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessorRef.current = scriptProcessor;

            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              
              sessionPromise.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.inputTranscription) {
               setTranscription(prev => ({ ...prev, user: message.serverContent?.inputTranscription?.text || '' }));
            }
            if (message.serverContent?.outputTranscription) {
               setTranscription(prev => ({ ...prev, ai: prev.ai + (message.serverContent?.outputTranscription?.text || '') }));
            }
            if (message.serverContent?.turnComplete) {
               // Reset transcription for next turn if needed or keep history
            }

            const base64 = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64) {
              setStatus('speaking');
              const audioCtx = outAudioContextRef.current!;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, audioCtx.currentTime);
              const buffer = await decodeAudioData(decode(base64), audioCtx, 24000, 1);
              const source = audioCtx.createBufferSource();
              source.buffer = buffer;
              source.connect(audioCtx.destination);
              source.addEventListener('ended', () => {
                sourcesRef.current.delete(source);
                if (sourcesRef.current.size === 0) setStatus('listening');
              });
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
            }

            if (message.serverContent?.interrupted) {
              for (const s of sourcesRef.current) { s.stop(); }
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onerror: (e) => {
            console.error('Live Assistant Error:', e);
            cleanup();
          },
          onclose: () => cleanup(),
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          systemInstruction: 'You are the ArtJoy Studio Assistant. You help users explore digital art, curation, and creative prompts. Be sophisticated, encouraging, and knowledgeable about contemporary digital art. Keep responses concise and human-like.',
          inputAudioTranscription: {},
          outputAudioTranscription: {},
        },
      });

    } catch (err) {
      console.error('Failed to start Live Assistant:', err);
      cleanup();
    }
  };

  return (
    <div className="fixed bottom-8 left-8 z-[120]">
      {isOpen ? (
        <div className="w-80 bg-white dark:bg-[#141414] border border-black dark:border-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-4 duration-300">
          <div className="p-6 border-b border-black/5 dark:border-white/5 flex justify-between items-center">
             <div className="flex items-center gap-3">
               <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
               <span className="text-xs font-black uppercase tracking-widest text-black dark:text-white">Studio Assistant</span>
             </div>
             <button onClick={() => setIsOpen(false)} className="text-xl font-bold opacity-40 hover:opacity-100 transition-opacity">×</button>
          </div>
          
          <div className="flex-1 p-8 flex flex-col items-center justify-center min-h-[300px] text-center">
             {!isActive ? (
               <>
                 <div className="w-20 h-20 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner">🎨</div>
                 <h3 className="text-xl font-black text-black dark:text-white mb-2">Curate with Voice</h3>
                 <p className="text-sm font-bold text-black/40 dark:text-white/40 mb-8 leading-relaxed">Have a live conversation about your art vision or learn new techniques.</p>
                 <button 
                  onClick={toggleSession}
                  className="w-full py-4 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all"
                 >
                   Start Studio Session
                 </button>
               </>
             ) : (
               <div className="w-full space-y-8">
                  {/* Visualizer Mockup */}
                  <div className="flex items-center justify-center gap-1 h-12">
                     {[...Array(12)].map((_, i) => (
                       <div 
                        key={i} 
                        className={`w-1.5 bg-black dark:bg-white rounded-full transition-all duration-150 ${status === 'speaking' || status === 'listening' ? 'animate-bounce' : 'h-2'}`}
                        style={{ 
                          height: status === 'speaking' || status === 'listening' ? `${20 + Math.random() * 30}px` : '8px',
                          animationDelay: `${i * 0.1}s`,
                          animationDuration: '0.6s'
                        }}
                       ></div>
                     ))}
                  </div>

                  <div className="space-y-4">
                    <p className="text-xs font-black uppercase tracking-widest text-black/30 dark:text-white/30">
                      {status === 'connecting' ? 'Establishing link...' : status === 'listening' ? 'Assistant listening...' : 'Curator responding...'}
                    </p>
                    <div className="min-h-[60px] max-h-[120px] overflow-y-auto text-sm font-bold text-black dark:text-white italic leading-relaxed scrollbar-hide">
                       {transcription.ai || "Ready for your vision."}
                    </div>
                  </div>

                  <button 
                    onClick={toggleSession}
                    className="w-full py-4 border-2 border-red-500 text-red-500 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-red-500 hover:text-white transition-all"
                  >
                    End Session
                  </button>
               </div>
             )}
          </div>
          
          <div className="px-6 py-4 bg-gray-50 dark:bg-black/40 text-[9px] font-black uppercase tracking-widest text-black/40 dark:text-white/20 text-center">
             Powered by Gemini 2.5 Live
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-4 bg-white dark:bg-[#141414] border-2 border-black dark:border-white p-2 pr-6 rounded-full shadow-2xl hover:scale-105 transition-all"
        >
          <div className="w-12 h-12 rounded-full bg-black dark:bg-white flex items-center justify-center text-xl transition-transform group-hover:rotate-12">
            🎙️
          </div>
          <div className="text-left">
            <div className="text-[10px] font-black uppercase text-black dark:text-white leading-none mb-1 tracking-widest">Studio AI</div>
            <div className="text-sm font-black leading-none text-black/50 dark:text-white/50 group-hover:text-black dark:group-hover:text-white transition-colors">Talk to Curator</div>
          </div>
        </button>
      )}
    </div>
  );
};

export default StudioAssistant;
