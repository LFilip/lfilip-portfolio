"use client";

import { useEffect, useRef, useState } from "react";
import type { SMSMessage } from "../types/reminder";

interface SMSPreviewProps {
  messages: SMSMessage[];
  confirmationCode: string;
  onReply: (code: string) => void;
  disabled?: boolean;
}

export function SMSPreview({ messages, confirmationCode, onReply, disabled }: SMSPreviewProps) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || disabled) return;
    onReply(input.trim());
    setInput("");
  };

  const handleQuickReply = (code: string) => {
    if (disabled) return;
    onReply(code);
  };

  return (
    <div className="bg-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden max-w-sm mx-auto">
      {/* Phone header */}
      <div className="bg-zinc-900 px-4 py-3 flex items-center justify-between border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center">
            <span className="text-white text-sm font-bold">N</span>
          </div>
          <div>
            <div className="text-zinc-100 text-sm font-medium">Nudge</div>
            <div className="text-zinc-500 text-xs">SMS</div>
          </div>
        </div>
        <div className="text-zinc-500 text-xs">
          {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>

      {/* Messages */}
      <div className="h-80 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={msg.id}
            className={`flex ${msg.direction === "incoming" ? "justify-end" : "justify-start"}`}
            style={{
              animation: index === messages.length - 1 ? "fadeSlideIn 0.3s ease-out" : undefined,
            }}
          >
            <div
              className={`
                max-w-[80%] px-3 py-2 rounded-2xl text-sm whitespace-pre-wrap
                ${
                  msg.direction === "incoming"
                    ? "bg-emerald-600 text-white rounded-br-md"
                    : "bg-zinc-800 text-zinc-100 rounded-bl-md"
                }
              `}
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick reply buttons */}
      {!disabled && messages.length > 0 && (
        <div className="px-4 pb-2 flex gap-2 flex-wrap">
          <button
            onClick={() => handleQuickReply(confirmationCode)}
            className="px-3 py-1.5 text-xs rounded-full bg-emerald-600/20 text-emerald-400 border border-emerald-600/30 hover:bg-emerald-600/30 transition-colors"
          >
            {confirmationCode}
          </button>
          <button
            onClick={() => handleQuickReply("SNOOZE")}
            className="px-3 py-1.5 text-xs rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700 hover:bg-zinc-700 transition-colors"
          >
            SNOOZE
          </button>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-zinc-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={disabled ? "Demo complete" : "Type a reply..."}
            disabled={disabled}
            className="flex-1 px-3 py-2 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={disabled || !input.trim()}
            className={`
              p-2 rounded-full transition-colors
              ${
                disabled || !input.trim()
                  ? "bg-zinc-800 text-zinc-500"
                  : "bg-emerald-600 text-white hover:bg-emerald-500"
              }
            `}
            aria-label="Send"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </form>

      <style jsx>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
