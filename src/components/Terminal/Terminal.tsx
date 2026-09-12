"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Output, OutputLine } from './Output';
import { Input } from './Input';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { processCommand } from './CommandProcessor';
import { BOOT_MESSAGES, WELCOME_BANNER } from '@/lib/ascii';

export const Terminal: React.FC = () => {
  const [lines, setLines] = useState<OutputLine[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bootPhase, setBootPhase] = useState<'booting' | 'ready'>('booting');
  const [uptime, setUptime] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);
  
  const booted = usePortfolioStore((state) => state.booted);
  const completeBoot = usePortfolioStore((state) => state.completeBoot);
  const sessionStart = usePortfolioStore((state) => state.sessionStart);

  const pushLines = useCallback((newLines: OutputLine[]) => {
    setLines((prev) => [...prev, ...newLines]);
  }, []);

  const clearLines = useCallback(() => {
    setLines([]);
  }, []);

  // Uptime counter
  useEffect(() => {
    const timer = setInterval(() => {
      setUptime(Math.floor((Date.now() - sessionStart) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [sessionStart]);

  // Boot sequence
  useEffect(() => {
    if (booted) {
      setBootPhase('ready');
      // Show welcome after boot
      setLines([
        {
          id: 'welcome-banner',
          content: (
            <pre className="text-ctp-green text-[0.5rem] sm:text-xs leading-tight select-none">{WELCOME_BANNER}</pre>
          ),
        },
        {
          id: 'welcome-msg',
          content: (
            <div className="my-2 text-sm">
              <div className="text-ctp-subtext0">
                Welcome to Ajay Kumar&apos;s portfolio terminal.
              </div>
              <div className="text-ctp-overlay1 mt-1">
                Type <span className="text-ctp-green font-semibold">help</span> to see available commands, 
                or try <span className="text-ctp-green font-semibold">about</span>, <span className="text-ctp-green font-semibold">projects</span>, <span className="text-ctp-green font-semibold">quiz</span>.
              </div>
            </div>
          ),
        },
      ]);
      return;
    }

    // Realistic Linux boot sequence
    let currentStep = 0;
    const bootInterval = setInterval(() => {
      if (currentStep < BOOT_MESSAGES.length) {
        const step = currentStep;
        setLines((prev) => {
          if (prev.some((l) => l.id === `boot-${step}`)) return prev;
          return [
            ...prev,
            {
              id: `boot-${step}`,
              content: (
                <span className="text-[0.65rem] sm:text-xs text-ctp-overlay1 boot-flicker">
                  {BOOT_MESSAGES[step]}
                </span>
              ),
            },
          ];
        });
        currentStep++;
      } else {
        clearInterval(bootInterval);
        setTimeout(() => {
          setLines([]);
          completeBoot();
          setBootPhase('ready');
        }, 600);
      }
    }, 180);

    return () => clearInterval(bootInterval);
  }, [booted, completeBoot]);

  const handleCommand = useCallback(
    (command: string) => {
      setIsProcessing(true);
      processCommand(command, usePortfolioStore.getState().addCommandToHistory, pushLines, clearLines);
      setIsProcessing(false);
    },
    [pushLines, clearLines]
  );

  const formatUptime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-full h-full flex items-center justify-center p-0 sm:p-4 md:p-6"
    >
      <div className="terminal-window w-full h-full sm:h-[calc(100vh-2rem)] md:h-[calc(100vh-3rem)] max-w-5xl bg-ctp-base sm:rounded-lg overflow-hidden flex flex-col relative">
        
        {/* ═══════ Title Bar ═══════ */}
        <div className="bg-ctp-mantle px-3 sm:px-4 py-2 flex items-center justify-between border-b border-ctp-surface0 shrink-0">
          <div className="flex items-center gap-2">
            {/* Traffic light dots */}
            <div className="hidden sm:flex items-center gap-1.5 mr-3">
              <span className="w-3 h-3 rounded-full bg-ctp-red/80 hover:bg-ctp-red transition-colors" />
              <span className="w-3 h-3 rounded-full bg-ctp-yellow/80 hover:bg-ctp-yellow transition-colors" />
              <span className="w-3 h-3 rounded-full bg-ctp-green/80 hover:bg-ctp-green transition-colors" />
            </div>
            <span className="text-ctp-subtext0 text-xs sm:text-sm font-mono">
              <span className="text-ctp-green">ajay</span>
              <span className="text-ctp-overlay0">@</span>
              <span className="text-ctp-blue">portfolio</span>
              <span className="text-ctp-overlay0">: </span>
              <span className="text-ctp-mauve">~</span>
            </span>
          </div>
          <div className="text-ctp-overlay0 text-xs font-mono hidden sm:block">
            portfolio-terminal v2.0
          </div>
        </div>

        {/* ═══════ Terminal Body ═══════ */}
        <div
          ref={terminalRef}
          className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 relative"
          onClick={() => {
            // Focus the input when clicking the terminal body
            const input = document.querySelector<HTMLInputElement>('.terminal-input-area');
            input?.focus();
          }}
        >
          {/* Subtle scanline overlay */}
          <div className="terminal-scanline" />
          
          {/* Output */}
          <Output lines={lines} />
          
          {/* Input */}
          <AnimatePresence>
            {bootPhase === 'ready' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Input onCommand={handleCommand} disabled={isProcessing} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ═══════ Status Bar (tmux-style) ═══════ */}
        <div className="bg-ctp-mantle px-3 sm:px-4 py-1 flex items-center justify-between border-t border-ctp-surface0 shrink-0 text-[0.65rem] sm:text-xs font-mono">
          <div className="flex items-center gap-2 sm:gap-3 text-ctp-overlay0">
            <span className="text-ctp-green">[main]</span>
            <span className="text-ctp-surface2">│</span>
            <span>0:portfolio</span>
            <span className="text-ctp-surface2">│</span>
            <span className="text-ctp-overlay1 hidden sm:inline">
              {usePortfolioStore.getState().commandHistory.length} cmds
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 text-ctp-overlay0">
            <span className="hidden sm:inline">
              ▲ {formatUptime(uptime)}
            </span>
            <span className="text-ctp-surface2 hidden sm:inline">│</span>
            <span className="text-ctp-subtext0">{currentTime}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
