"use client";

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface OutputLine {
  id: string;
  content: React.ReactNode | string;
  isCommand?: boolean;
}

interface OutputProps {
  lines: OutputLine[];
}

export const Output: React.FC<OutputProps> = ({ lines }) => {
  return (
    <div className="flex flex-col space-y-0.5 mb-2 font-mono">
      <AnimatePresence initial={false}>
        {lines.map((line, index) => (
          <motion.div
            key={line.id}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.12,
              delay: Math.min(index * 0.01, 0.1),
              ease: 'easeOut',
            }}
            className={cn(
              'w-full',
              line.id === 'welcome-banner' ? 'overflow-x-auto no-scrollbar' : 'whitespace-pre-wrap break-words',
              line.isCommand
                ? 'text-ctp-text'
                : 'text-ctp-subtext1'
            )}
          >
            {line.isCommand && (
              <span className="mr-0">
                <span className="text-ctp-green font-semibold">ajay</span>
                <span className="text-ctp-text">@</span>
                <span className="text-ctp-blue font-semibold">portfolio</span>
                <span className="text-ctp-text">:</span>
                <span className="text-ctp-mauve font-semibold">~</span>
                <span className="text-ctp-text">$ </span>
              </span>
            )}
            {line.content}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
