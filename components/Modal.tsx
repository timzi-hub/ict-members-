
import React, { useState } from 'react';
import { SubscriptionStatus } from '../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'login' | 'join' | null;
  onSuccess: (name: string, email: string, sub: SubscriptionStatus) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, type, onSuccess }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', sub: 'individual' as SubscriptionStatus });

  if (!isOpen || !type) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === 'login') {
      onSuccess(formData.email.split('@')[0], formData.email, 'pro');
    } else {
      onSuccess(formData.name || 'New Member', formData.email, formData.sub);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative bg-white dark:bg-[#141414] w-full max-w-md p-10 rounded-[40px] shadow-2xl border border-gray-100 dark:border-white/10 transition-all transform animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-8 text-black dark:text-white hover:opacity-50 text-2xl font-bold"
        >
          ×
        </button>

        <form onSubmit={handleSubmit}>
          {type === 'login' ? (
            <div>
              <h2 className="text-3xl font-black text-black dark:text-white mb-2 tracking-tight">Welcome back</h2>
              <p className="text-black dark:text-white/60 font-bold mb-8">Access your collection dashboard.</p>
              
              <div className="space-y-4">
                <input 
                  type="email" 
                  required
                  placeholder="Email address"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-6 py-4 bg-gray-100 dark:bg-white/5 border-2 border-transparent focus:border-black dark:focus:border-white rounded-2xl outline-none text-black dark:text-white font-bold"
                />
                <input 
                  type="password" 
                  required
                  placeholder="Password"
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-6 py-4 bg-gray-100 dark:bg-white/5 border-2 border-transparent focus:border-black dark:focus:border-white rounded-2xl outline-none text-black dark:text-white font-bold"
                />
                <button type="submit" className="w-full py-5 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-black text-lg hover:opacity-90 transition-all">
                  Login
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-3xl font-black text-black dark:text-white mb-2 tracking-tight italic">Join ArtJoy</h2>
              <p className="text-black dark:text-white/60 font-bold mb-8">The first step to a better digital space.</p>
              
              <div className="space-y-4">
                <input 
                  type="text" 
                  required
                  placeholder="Full name"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-6 py-4 bg-gray-100 dark:bg-white/5 border-2 border-transparent focus:border-black dark:focus:border-white rounded-2xl outline-none text-black dark:text-white font-bold"
                />
                <input 
                  type="email" 
                  required
                  placeholder="Work email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-6 py-4 bg-gray-100 dark:bg-white/5 border-2 border-transparent focus:border-black dark:focus:border-white rounded-2xl outline-none text-black dark:text-white font-bold"
                />
                <select 
                  value={formData.sub}
                  onChange={e => setFormData({ ...formData, sub: e.target.value as SubscriptionStatus })}
                  className="w-full px-6 py-4 bg-gray-100 dark:bg-white/5 border-2 border-transparent focus:border-black dark:focus:border-white rounded-2xl outline-none text-black dark:text-white font-bold appearance-none"
                >
                  <option value="none">Select a plan</option>
                  <option value="individual">Individual Club - $199/mo</option>
                  <option value="pro">Creator Pro - $499/mo</option>
                  <option value="elite">Gallery Elite - Custom</option>
                </select>
                <button type="submit" className="w-full py-5 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-black text-lg hover:opacity-90 transition-all">
                  Start Today
                </button>
                <p className="text-center text-[10px] font-black text-black dark:text-white/40 uppercase tracking-widest mt-4">
                  Pause or cancel anytime.
                </p>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Modal;
