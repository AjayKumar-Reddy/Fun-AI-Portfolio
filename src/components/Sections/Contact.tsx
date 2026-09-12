import React from 'react';

export const Contact: React.FC = () => {
  const entries = [
    { key: 'email', value: 'akumar23755@gmail.com', href: 'mailto:akumar23755@gmail.com' },
    { key: 'phone', value: '+91-7411776896', href: 'tel:+917411776896' },
    { key: 'github', value: 'github.com/AjayKumar-Reddy', href: 'https://github.com/AjayKumar-Reddy' },
    { key: 'linkedin', value: 'linkedin.com/in/ajay-kumar-reddy7411', href: 'https://www.linkedin.com/in/ajay-kumar-reddy7411/' },
    { key: 'location', value: 'Bengaluru, India', href: '' },
    { key: 'status', value: 'Open to opportunities', href: '' },
  ];

  return (
    <div className="my-2 text-ctp-text max-w-2xl">
      <div className="text-ctp-green text-sm mb-3">
        $ cat /etc/contact.conf
      </div>

      <div className="border border-ctp-surface0 rounded-sm overflow-hidden">
        {/* Header */}
        <div className="bg-ctp-surface0/40 px-3 py-1.5 text-ctp-overlay1 text-xs border-b border-ctp-surface0">
          # Contact Configuration — Ajay Kumar S
        </div>

        {/* Entries */}
        <div className="px-3 py-2 space-y-1 text-sm font-mono">
          {entries.map((entry) => (
            <div key={entry.key} className="flex flex-col sm:flex-row sm:gap-2">
              <span className="text-ctp-mauve font-semibold min-w-[90px]">{entry.key}</span>
              <span className="text-ctp-overlay0 hidden sm:inline">=</span>
              {entry.href ? (
                <a
                  href={entry.href}
                  target={entry.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="terminal-link"
                >
                  {entry.value}
                </a>
              ) : (
                <span className="text-ctp-text">{entry.value}</span>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-ctp-surface0/20 px-3 py-1.5 text-ctp-overlay0 text-xs border-t border-ctp-surface0">
          # All channels actively monitored · Response time: &lt; 24h
        </div>
      </div>
    </div>
  );
};
