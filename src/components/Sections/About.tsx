import React from 'react';
import { NEOFETCH_ART } from '@/lib/ascii';

export const About: React.FC = () => {
  const artLines = NEOFETCH_ART.split('\n');
  
  const info = [
    { label: 'Name', value: 'Ajay Kumar S' },
    { label: 'Role', value: 'Full Stack Developer · CS Undergrad' },
    { label: 'Location', value: 'Bengaluru, India' },
    { label: 'Education', value: 'B.Tech ISE — MS Ramaiah Institute of Technology' },
    { label: 'CGPA', value: '9.32 / 10' },
    { label: 'Diploma', value: 'CS Engineering — RL Jalappa Polytechnic (9.94)' },
    { label: 'Status', value: 'Available for opportunities' },
    { label: 'DSA', value: '200+ problems solved (LeetCode, GFG)' },
    { label: 'Interests', value: 'System Design · AI/ML · Microservices · DevOps' },
  ];

  return (
    <div className="my-2 text-ctp-text max-w-3xl">
      {/* neofetch-style layout */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
        {/* ASCII Art */}
        <div className="text-ctp-blue font-bold text-xs sm:text-sm leading-tight shrink-0 hidden sm:block">
          <pre className="select-none">{NEOFETCH_ART}</pre>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-0.5 text-sm">
          <div className="mb-1">
            <span className="text-ctp-green font-bold">ajay</span>
            <span className="text-ctp-text">@</span>
            <span className="text-ctp-blue font-bold">portfolio</span>
          </div>
          <div className="text-ctp-surface2 mb-1">─────────────────────</div>
          
          {info.map((item) => (
            <div key={item.label} className="flex">
              <span className="text-ctp-mauve font-semibold min-w-[100px] sm:min-w-[120px]">
                {item.label}
              </span>
              <span className="text-ctp-subtext0 mx-1">~</span>
              <span className="text-ctp-text">{item.value}</span>
            </div>
          ))}

          {/* Color blocks like real neofetch */}
          <div className="mt-3 flex gap-0">
            {['bg-ctp-red', 'bg-ctp-peach', 'bg-ctp-yellow', 'bg-ctp-green', 'bg-ctp-teal', 'bg-ctp-blue', 'bg-ctp-mauve', 'bg-ctp-pink'].map((color) => (
              <span key={color} className={`${color} inline-block w-4 h-4 sm:w-5 sm:h-5`} />
            ))}
          </div>
          <div className="flex gap-0">
            {['bg-ctp-maroon', 'bg-ctp-peach/60', 'bg-ctp-yellow/60', 'bg-ctp-green/60', 'bg-ctp-teal/60', 'bg-ctp-sapphire', 'bg-ctp-lavender', 'bg-ctp-flamingo'].map((color) => (
              <span key={color} className={`${color} inline-block w-4 h-4 sm:w-5 sm:h-5`} />
            ))}
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="mt-4 pt-3 border-t border-ctp-surface0 text-sm">
        <div className="text-ctp-yellow font-semibold mb-1.5">Certifications</div>
        <div className="text-ctp-subtext1 space-y-0.5 pl-2">
          <div><span className="text-ctp-green">●</span> Software Engineering Simulation — JPMorgan Chase & Co. (Forage, 2026)</div>
          <div><span className="text-ctp-green">●</span> Introduction to Data Science — Cisco Networking Academy (2025)</div>
        </div>
      </div>
    </div>
  );
};
