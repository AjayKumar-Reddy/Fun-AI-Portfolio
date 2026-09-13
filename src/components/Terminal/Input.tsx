"use client";

import React, { useState, useEffect, useRef } from 'react';
import { usePortfolioStore } from '@/store/usePortfolioStore';

interface InputProps {
  onCommand: (command: string) => void;
  disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({ onCommand, disabled = false }) => {
  const [input, setInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const commandHistory = usePortfolioStore((state) => state.commandHistory);
  const isQuizActive = usePortfolioStore((state) => state.quiz.active);

  // Auto focus (desktop only; on touch devices avoid auto-focusing on mount so keyboard doesn't jump or push content)
  useEffect(() => {
    const isTouchDevice =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || navigator.maxTouchPoints > 0);

    const focusInput = () => {
      if (!disabled && inputRef.current) {
        inputRef.current.focus({ preventScroll: true });
      }
    };

    // Auto-focus on desktop
    if (!isTouchDevice) {
      focusInput();
    }

    const handleClick = (e: MouseEvent) => {
      const selection = window.getSelection();
      if (selection && selection.toString().length > 0) return;
      focusInput();
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [disabled]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (input.trim()) {
        onCommand(input.trim());
        setInput('');
        setHistoryIndex(-1);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'c' && e.ctrlKey) {
      setInput('');
      setHistoryIndex(-1);
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      onCommand('clear');
      setInput('');
    }
  };

  return (
    <div className="flex items-center font-mono text-sm sm:text-base py-1">
      {/* Prompt */}
      {isQuizActive ? (
        <span className="mr-1.5 whitespace-nowrap select-none">
          <span className="text-ctp-yellow font-semibold">quiz</span>
          <span className="text-ctp-text">&gt; </span>
        </span>
      ) : (
        <span className="mr-1.5 whitespace-nowrap select-none">
          <span className="text-ctp-green font-semibold">ajay</span>
          <span className="text-ctp-text">@</span>
          <span className="text-ctp-blue font-semibold">portfolio</span>
          <span className="text-ctp-text">:</span>
          <span className="text-ctp-mauve font-semibold">~</span>
          <span className="text-ctp-text">$ </span>
        </span>
      )}
      
      {/* Input field */}
      <div className="flex-1 relative">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className="w-full bg-transparent outline-none border-none text-ctp-text terminal-input-area caret-ctp-green"
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          aria-label="Terminal input"
        />
      </div>
    </div>
  );
};
