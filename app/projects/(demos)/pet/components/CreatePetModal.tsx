"use client";

import { useState } from 'react';

interface CreatePetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: { name: string; emoji: string }) => void;
}

const EMOJI_OPTIONS = ['🐱', '🐶', '🐦', '🐰', '🐼', '🦊', '🐸', '🐢'];

export const CreatePetModal = ({ isOpen, onClose, onConfirm }: CreatePetModalProps) => {
  const [name, setName] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!name.trim() || !selectedEmoji) return;

    onConfirm({
      name: name.trim(),
      emoji: selectedEmoji
    });

    // Reset for next time
    setName('');
    setSelectedEmoji(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleConfirm();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-zinc-900 rounded-3xl shadow-2xl p-8 max-w-lg w-full border-2 border-zinc-700 max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-200 text-2xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-zinc-800 transition-colors"
        >
          ×
        </button>

        <h2 className="text-3xl font-bold text-zinc-100 mb-6">
          Create Your Pet
        </h2>

        {/* Name Input */}
        <div className="mb-6">
          <label
            htmlFor="pet-name-modal"
            className="block text-lg font-semibold text-zinc-200 mb-2"
          >
            Pet Name
          </label>
          <input
            id="pet-name-modal"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter a name..."
            maxLength={20}
            autoFocus
            className="w-full px-4 py-3 text-lg rounded-xl border-2 border-zinc-700 bg-zinc-800 text-zinc-100 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder-zinc-500"
          />
          {name && (
            <p className="mt-1 text-sm text-zinc-400">
              {name.length}/20 characters
            </p>
          )}
        </div>

        {/* Emoji Selection */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-zinc-200 mb-3">
            Choose Appearance
          </label>
          <div className="grid grid-cols-4 gap-3">
            {EMOJI_OPTIONS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => setSelectedEmoji(emoji)}
                className={`
                  text-4xl p-3 rounded-xl border-2 transition-all duration-200
                  hover:scale-110 active:scale-95
                  ${
                    selectedEmoji === emoji
                      ? 'border-emerald-500 bg-emerald-900/30 ring-2 ring-emerald-500/50'
                      : 'border-zinc-700 bg-zinc-800 hover:border-zinc-600'
                  }
                `}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Preview */}
        {name && selectedEmoji && (
          <div className="mb-6 p-4 bg-zinc-800 rounded-xl border-2 border-zinc-700">
            <p className="text-center text-zinc-400 text-sm mb-2">Preview:</p>
            <div className="text-center">
              <span className="text-5xl">{selectedEmoji}</span>
              <p className="text-xl font-bold text-zinc-100 mt-2">{name}</p>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-6 text-lg font-semibold rounded-xl border-2 border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!name.trim() || !selectedEmoji}
            className={`
              flex-1 py-3 px-6 text-lg font-bold rounded-xl transition-all
              ${
                name.trim() && selectedEmoji
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg hover:shadow-xl'
                  : 'bg-zinc-700 text-zinc-500 cursor-not-allowed'
              }
            `}
          >
            Create Pet
          </button>
        </div>
      </div>
    </div>
  );
};
