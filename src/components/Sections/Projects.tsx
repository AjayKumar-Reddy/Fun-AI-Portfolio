import React, { useState, useEffect } from 'react';

// ═══════════════════════════════════════════════════════════
// Hardcoded top projects from resume + GitHub API fallback
// ═══════════════════════════════════════════════════════════

interface Project {
  name: string;
  description: string;
  tech: string[];
  github: string;
  demo?: string;
  year: string;
  highlights: string[];
}

const FEATURED_PROJECTS: Project[] = [
  {
    name: 'MSR Insight',
    description: 'Analytics & Reporting Platform — Distributed multi-service platform with RAG-powered conversational agent',
    tech: ['Next.js', 'Express', 'FastAPI', 'PostgreSQL', 'PGVector', 'Redis', 'RabbitMQ', 'LangChain', 'Jest'],
    github: 'https://github.com/AjayKumar-Reddy/MSR-Insight.git',
    demo: 'https://student-dashboard-sigma-henna.vercel.app/',
    year: '2026',
    highlights: [
      'Distributed multi-service architecture with Redis-backed session auth',
      'Async report pipeline using RabbitMQ for PDF generation & email notifications',
      'RAG-powered agent using LangChain + PGVector with hybrid BM25 + cosine retrieval',
      'Comprehensive test suites using Jest, Supertest, and Pytest',
    ],
  },
  {
    name: 'JobPortal',
    description: 'Microservices Recruitment Platform — Spring Cloud architecture with AI-powered features',
    tech: ['Spring Boot 3', 'Spring Cloud', 'Next.js', 'Apache Kafka', 'Redis', 'Spring AI', 'MySQL', 'Docker'],
    github: 'https://github.com/AjayKumar-Reddy/Job-Portal-SpringBoot.git',
    year: '2025',
    highlights: [
      'Spring Cloud Gateway + Eureka for API routing and service discovery',
      'Apache Kafka for event-driven async communication',
      'Shared Maven modules for security, DTOs, caching, and persistence',
      'Spring AI (Gemini) for resume parsing, recommendations, and RAG career assistant',
    ],
  },
  {
    name: 'GetMeaChai',
    description: 'Secure Crowdfunding Platform — Full-stack SaaS with Razorpay payment integration',
    tech: ['Next.js 15', 'NextAuth.js', 'MongoDB', 'Razorpay', 'Vercel'],
    github: 'https://github.com/AjayKumar-Reddy/GetMeaChai-Website-NextJs.git',
    year: '2025',
    highlights: [
      'Next.js 15 Server Actions with NextAuth.js JWT session mapping',
      'HMAC-SHA256 signature verification on payment redirects',
      'AES-256-GCM encryption for API credentials at rest',
      'Interactive SVG earnings charts with CSV export support',
    ],
  },
];

interface GithubRepo {
  id: number;
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  updated_at: string;
}

export const Projects: React.FC = () => {
  const [githubRepos, setGithubRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const cached = localStorage.getItem('portfolio-repos-v2');
        const cachedTime = localStorage.getItem('portfolio-repos-v2-time');
        
        if (cached && cachedTime && (Date.now() - parseInt(cachedTime)) < 3600000) {
          setGithubRepos(JSON.parse(cached));
          setLoading(false);
          return;
        }

        const res = await fetch('https://api.github.com/users/AjayKumar-Reddy/repos?sort=updated&per_page=10');
        if (!res.ok) throw new Error('GitHub API error');
        
        const data = await res.json();
        const filtered = data
          .filter((r: GithubRepo) => !r.name.includes('.github'))
          .sort((a: GithubRepo, b: GithubRepo) => 
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          )
          .slice(0, 6);
        
        setGithubRepos(filtered);
        localStorage.setItem('portfolio-repos-v2', JSON.stringify(filtered));
        localStorage.setItem('portfolio-repos-v2-time', Date.now().toString());
      } catch {
        setError('GitHub API unavailable');
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchRepos, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="my-2 text-ctp-text max-w-3xl">
      {/* Featured Projects */}
      <div className="text-ctp-green text-sm mb-3">
        $ ls -la ~/projects/ --featured
      </div>

      <div className="space-y-4">
        {FEATURED_PROJECTS.map((project, i) => (
          <div 
            key={project.name} 
            className="border border-ctp-surface0 rounded-sm overflow-hidden output-line"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            {/* Project header */}
            <div className="bg-ctp-surface0/40 px-3 py-1.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <div className="flex items-center gap-2">
                <span className="text-ctp-green">drwxr-xr-x</span>
                <span className="text-ctp-blue font-bold">{project.name}</span>
                <span className="text-ctp-overlay0 text-xs">({project.year})</span>
              </div>
              <div className="flex gap-2 text-xs">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="terminal-link"
                >
                  [source]
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="terminal-link"
                  >
                    [live]
                  </a>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="px-3 py-2 text-sm">
              <div className="text-ctp-subtext1 mb-2">{project.description}</div>
              
              {/* Tech stack */}
              <div className="flex flex-wrap gap-1.5 mb-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-1.5 py-0.5 bg-ctp-surface0/60 text-ctp-sapphire text-xs rounded-sm border border-ctp-surface1/50"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Highlights */}
              <div className="text-xs text-ctp-overlay1 space-y-0.5">
                {project.highlights.map((h, j) => (
                  <div key={j} className="flex gap-1.5">
                    <span className="text-ctp-overlay0 select-none shrink-0">├──</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* GitHub Repos */}
      <div className="mt-5 pt-3 border-t border-ctp-surface0">
        <div className="text-ctp-green text-sm mb-2">
          $ curl -s api.github.com/users/AjayKumar-Reddy/repos
        </div>

        {loading ? (
          <div className="text-ctp-overlay1 text-sm">
            <span className="animate-pulse">Fetching repositories...</span>
          </div>
        ) : error ? (
          <div className="text-ctp-overlay0 text-sm">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {githubRepos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="block border border-ctp-surface0/60 p-2.5 hover:bg-ctp-surface0/20 hover:border-ctp-surface1 transition-all duration-150 rounded-sm"
              >
                <div className="text-ctp-blue font-semibold text-sm">{repo.name}</div>
                <div className="text-ctp-overlay1 text-xs mt-0.5 line-clamp-2">
                  {repo.description || 'No description'}
                </div>
                <div className="flex gap-3 mt-1.5 text-xs text-ctp-overlay0">
                  {repo.language && (
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-ctp-yellow" />
                      {repo.language}
                    </span>
                  )}
                  {repo.stargazers_count > 0 && <span>★ {repo.stargazers_count}</span>}
                  {repo.forks_count > 0 && <span>⑂ {repo.forks_count}</span>}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
