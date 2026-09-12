import React from 'react';

const SKILLS_DATA = [
  {
    category: 'Languages',
    items: [
      { name: 'Java', level: 90 },
      { name: 'Python', level: 80 },
      { name: 'JavaScript', level: 85 },
      { name: 'C', level: 70 },
    ],
  },
  {
    category: 'Frameworks & Libraries',
    items: [
      { name: 'Spring Boot', level: 85 },
      { name: 'React', level: 85 },
      { name: 'Next.js', level: 90 },
      { name: 'FastAPI', level: 75 },
      { name: 'Express.js', level: 80 },
      { name: 'LangChain', level: 70 },
      { name: 'Tailwind CSS', level: 85 },
      { name: 'Scikit-learn', level: 65 },
    ],
  },
  {
    category: 'Databases & Cloud',
    items: [
      { name: 'MySQL', level: 85 },
      { name: 'MongoDB', level: 80 },
      { name: 'PostgreSQL', level: 80 },
      { name: 'Redis', level: 75 },
      { name: 'PGVector', level: 65 },
      { name: 'AWS', level: 60 },
      { name: 'Google Cloud', level: 65 },
    ],
  },
  {
    category: 'Tools & Concepts',
    items: [
      { name: 'DSA', level: 85 },
      { name: 'Linux', level: 80 },
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 75 },
      { name: 'REST APIs', level: 90 },
      { name: 'Apache Kafka', level: 70 },
      { name: 'JWT/OAuth2', level: 80 },
      { name: 'Jest', level: 70 },
    ],
  },
];

const SkillBar: React.FC<{ name: string; level: number; index: number }> = ({ name, level, index }) => {
  const filled = Math.round(level / 5);
  const empty = 20 - filled;
  const barColor = level >= 85 ? 'text-ctp-green' : level >= 70 ? 'text-ctp-blue' : level >= 50 ? 'text-ctp-yellow' : 'text-ctp-red';

  return (
    <div 
      className="flex items-center gap-2 text-xs sm:text-sm output-line" 
      style={{ animationDelay: `${index * 30}ms` }}
    >
      <span className="text-ctp-subtext1 w-[110px] sm:w-[140px] truncate">{name}</span>
      <span className={`${barColor} font-mono tracking-tight`}>
        {'█'.repeat(filled)}
        <span className="text-ctp-surface1">{'░'.repeat(empty)}</span>
      </span>
      <span className="text-ctp-overlay1 w-[35px] text-right">{level}%</span>
    </div>
  );
};

export const Skills: React.FC = () => {
  return (
    <div className="my-2 text-ctp-text max-w-3xl">
      <div className="text-ctp-green text-sm mb-3">
        $ dpkg --list | grep installed
      </div>
      
      <div className="space-y-4">
        {SKILLS_DATA.map((section) => (
          <div key={section.category}>
            <div className="text-ctp-mauve font-semibold text-sm mb-1.5 border-b border-ctp-surface0 pb-1">
              /{section.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}/
            </div>
            <div className="space-y-0.5 pl-1">
              {section.items.map((item, i) => (
                <SkillBar 
                  key={item.name} 
                  name={item.name} 
                  level={item.level} 
                  index={i} 
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-2 border-t border-ctp-surface0 text-xs text-ctp-overlay0">
        {SKILLS_DATA.reduce((acc, s) => acc + s.items.length, 0)} packages installed · 
        Last updated: September 2026
      </div>
    </div>
  );
};
