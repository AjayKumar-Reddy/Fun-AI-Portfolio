import React from 'react';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { OutputLine } from './Output';
import { About } from '../Sections/About';
import { Skills } from '../Sections/Skills';
import { Projects } from '../Sections/Projects';
import { Contact } from '../Sections/Contact';
import { selectQuizQuestions } from '@/lib/challenges';
import {
  WELCOME_BANNER,
  NEOFETCH_ART,
  COWSAY_COW,
  PROGRAMMING_QUOTES,
  PORTFOLIO_TREE,
} from '@/lib/ascii';

const genId = () => Math.random().toString(36).substr(2, 9);

const formatUptime = (ms: number): string => {
  const seconds = Math.floor(ms / 1000);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}h ${m}m ${s}s`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
};

export const processCommand = (
  input: string,
  addCommandToHistory: (c: string) => void,
  pushLines: (lines: OutputLine[]) => void,
  clearLines: () => void
) => {
  const store = usePortfolioStore.getState();
  const [cmd, ...args] = input.trim().split(' ');
  const command = cmd.toLowerCase();

  addCommandToHistory(input);

  // Echo the command
  pushLines([{ id: genId(), content: input, isCommand: true }]);

  // ═══════════════════════════════════════════════════
  // QUIZ MODE — intercept input as quiz answer
  // ═══════════════════════════════════════════════════
  if (store.quiz.active) {
    const { quiz, answerQuiz, endQuiz, addAchievement } = store;
    const currentQ = quiz.questions[quiz.currentIndex];

    if (!currentQ) {
      endQuiz();
      return;
    }

    const userAnswer = parseInt(input.trim());
    
    if (isNaN(userAnswer) || userAnswer < 1 || userAnswer > 4) {
      pushLines([{
        id: genId(),
        content: (
          <span className="text-ctp-red">
            Invalid input. Type a number between 1 and 4.
          </span>
        ),
      }]);
      return;
    }

    const isCorrect = (userAnswer - 1) === currentQ.answer;
    answerQuiz(isCorrect);

    // Show result
    pushLines([{
      id: genId(),
      content: (
        <div className="text-sm my-1">
          {isCorrect ? (
            <span className="text-ctp-green font-semibold">✓ Correct!</span>
          ) : (
            <span className="text-ctp-red font-semibold">
              ✗ Wrong — Answer: {currentQ.options[currentQ.answer]}
            </span>
          )}
        </div>
      ),
    }]);

    // Get updated state after answering
    const updatedQuiz = usePortfolioStore.getState().quiz;

    // Check if quiz is done
    if (updatedQuiz.currentIndex >= updatedQuiz.questions.length) {
      const score = updatedQuiz.score;
      const total = updatedQuiz.questions.length;
      const percentage = Math.round((score / total) * 100);
      
      const filled = Math.round((score / total) * 20);
      const barColor = percentage >= 80 ? 'text-ctp-green' : percentage >= 60 ? 'text-ctp-yellow' : 'text-ctp-red';

      endQuiz();
      
      if (score >= 4) addAchievement('quiz_ace');
      if (score === total) addAchievement('perfect_score');

      pushLines([{
        id: genId(),
        content: (
          <div className="my-2 text-sm">
            <div className="text-ctp-mauve font-semibold mb-2">
              ═══ Quiz Complete ═══
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-ctp-subtext1 w-[60px]">Score:</span>
              <span className={`${barColor} font-bold`}>{score}/{total}</span>
              <span className="text-ctp-overlay0">({percentage}%)</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-ctp-subtext1 w-[60px]">Grade:</span>
              <span className={`${barColor} font-mono`}>
                {'█'.repeat(filled)}
                <span className="text-ctp-surface1">{'░'.repeat(20 - filled)}</span>
              </span>
            </div>
            <div className="text-ctp-overlay0">
              {percentage === 100 ? 'Perfect score! 🎯' :
               percentage >= 80 ? 'Excellent knowledge!' :
               percentage >= 60 ? 'Good effort — keep studying!' :
               'Review the fundamentals and try again.'}
            </div>
            <div className="text-ctp-overlay0 mt-1">
              Type <span className="text-ctp-blue">quiz</span> to start a new round.
            </div>
          </div>
        ),
      }]);
      return;
    }

    // Show next question
    const nextQ = updatedQuiz.questions[updatedQuiz.currentIndex];
    pushLines([{
      id: genId(),
      content: renderQuizQuestion(nextQ, updatedQuiz.currentIndex + 1, updatedQuiz.questions.length),
    }]);

    return;
  }

  // ═══════════════════════════════════════════════════
  // NORMAL COMMAND PROCESSING
  // ═══════════════════════════════════════════════════
  let output: React.ReactNode | string = '';

  switch (command) {
    // ─────────── help ───────────
    case 'help':
    case 'man':
      output = (
        <div className="text-sm my-1">
          <div className="text-ctp-mauve font-semibold mb-2">PORTFOLIO(1) — User Commands</div>
          <div className="text-ctp-subtext0 mb-3">Interactive terminal portfolio of Ajay Kumar S</div>
          
          <div className="text-ctp-yellow font-semibold mb-1">NAVIGATION</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-0.5 pl-2 mb-3">
            <div><span className="text-ctp-green w-[100px] inline-block">about</span> <span className="text-ctp-overlay1">Display profile information</span></div>
            <div><span className="text-ctp-green w-[100px] inline-block">skills</span> <span className="text-ctp-overlay1">List technical proficiencies</span></div>
            <div><span className="text-ctp-green w-[100px] inline-block">projects</span> <span className="text-ctp-overlay1">Show project portfolio</span></div>
            <div><span className="text-ctp-green w-[100px] inline-block">contact</span> <span className="text-ctp-overlay1">Display contact information</span></div>
            <div><span className="text-ctp-green w-[100px] inline-block">resume</span> <span className="text-ctp-overlay1">Print formatted resume</span></div>
          </div>

          <div className="text-ctp-yellow font-semibold mb-1">SYSTEM</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-0.5 pl-2 mb-3">
            <div><span className="text-ctp-green w-[100px] inline-block">neofetch</span> <span className="text-ctp-overlay1">System information display</span></div>
            <div><span className="text-ctp-green w-[100px] inline-block">clear</span> <span className="text-ctp-overlay1">Clear terminal output</span></div>
            <div><span className="text-ctp-green w-[100px] inline-block">history</span> <span className="text-ctp-overlay1">Show command history</span></div>
            <div><span className="text-ctp-green w-[100px] inline-block">tree</span> <span className="text-ctp-overlay1">Display directory structure</span></div>
            <div><span className="text-ctp-green w-[100px] inline-block">uptime</span> <span className="text-ctp-overlay1">Show session duration</span></div>
            <div><span className="text-ctp-green w-[100px] inline-block">date</span> <span className="text-ctp-overlay1">Display current date/time</span></div>
            <div><span className="text-ctp-green w-[100px] inline-block">uname -a</span> <span className="text-ctp-overlay1">System version info</span></div>
            <div><span className="text-ctp-green w-[100px] inline-block">whoami</span> <span className="text-ctp-overlay1">Current user info</span></div>
          </div>

          <div className="text-ctp-yellow font-semibold mb-1">INTERACTIVE</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-0.5 pl-2 mb-3">
            <div><span className="text-ctp-green w-[100px] inline-block">quiz</span> <span className="text-ctp-overlay1">CS fundamentals MCQ quiz</span></div>
            <div><span className="text-ctp-green w-[100px] inline-block">fortune</span> <span className="text-ctp-overlay1">Random programming quote</span></div>
            <div><span className="text-ctp-green w-[100px] inline-block">cowsay</span> <span className="text-ctp-overlay1">Cow says your message</span></div>
          </div>

          <div className="text-ctp-overlay0 text-xs">
            Tip: Try <span className="text-ctp-blue">sudo</span>, <span className="text-ctp-blue">exit</span>, <span className="text-ctp-blue">rm -rf /</span>, <span className="text-ctp-blue">vim</span>, <span className="text-ctp-blue">ping</span> for easter eggs
          </div>
        </div>
      );
      break;

    // ─────────── clear ───────────
    case 'clear':
      clearLines();
      return;

    // ─────────── about ───────────
    case 'about':
      output = <About />;
      break;

    // ─────────── skills ───────────
    case 'skills':
      output = <Skills />;
      break;

    // ─────────── projects ───────────
    case 'projects':
      output = <Projects />;
      break;

    // ─────────── contact ───────────
    case 'contact':
      output = <Contact />;
      break;

    // ─────────── neofetch ───────────
    case 'neofetch': {
      const uptimeMs = Date.now() - store.sessionStart;
      output = (
        <div className="my-1 flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm">
          <pre className="text-ctp-blue font-bold text-xs leading-tight select-none hidden sm:block">{NEOFETCH_ART}</pre>
          <div className="flex flex-col gap-0.5">
            <div>
              <span className="text-ctp-green font-bold">ajay</span>
              <span className="text-ctp-text">@</span>
              <span className="text-ctp-blue font-bold">portfolio</span>
            </div>
            <div className="text-ctp-surface2">─────────────────────</div>
            <div><span className="text-ctp-mauve font-semibold">OS</span> <span className="text-ctp-overlay0">~</span> Portfolio Linux v2.0</div>
            <div><span className="text-ctp-mauve font-semibold">Host</span> <span className="text-ctp-overlay0">~</span> Next.js 16 / React 19</div>
            <div><span className="text-ctp-mauve font-semibold">Kernel</span> <span className="text-ctp-overlay0">~</span> TypeScript 5.x</div>
            <div><span className="text-ctp-mauve font-semibold">Uptime</span> <span className="text-ctp-overlay0">~</span> {formatUptime(uptimeMs)}</div>
            <div><span className="text-ctp-mauve font-semibold">Shell</span> <span className="text-ctp-overlay0">~</span> portfolio-sh 2.0</div>
            <div><span className="text-ctp-mauve font-semibold">Theme</span> <span className="text-ctp-overlay0">~</span> Catppuccin Mocha</div>
            <div><span className="text-ctp-mauve font-semibold">Terminal</span> <span className="text-ctp-overlay0">~</span> JetBrains Mono</div>
            <div><span className="text-ctp-mauve font-semibold">CPU</span> <span className="text-ctp-overlay0">~</span> Curiosity-driven @ ∞ GHz</div>
            <div><span className="text-ctp-mauve font-semibold">Memory</span> <span className="text-ctp-overlay0">~</span> {store.commandHistory.length} commands loaded</div>
            <div className="mt-2 flex gap-0">
              {['bg-ctp-red', 'bg-ctp-peach', 'bg-ctp-yellow', 'bg-ctp-green', 'bg-ctp-teal', 'bg-ctp-blue', 'bg-ctp-mauve', 'bg-ctp-pink'].map((c) => (
                <span key={c} className={`${c} inline-block w-3 h-3`} />
              ))}
            </div>
          </div>
        </div>
      );
      break;
    }

    // ─────────── resume ───────────
    case 'resume':
    case 'cv': {
      output = (
        <div className="my-1 text-sm max-w-3xl">
          <div className="text-ctp-green mb-2">$ cat ~/resume.md</div>
          <div className="border border-ctp-surface0 rounded-sm p-3 space-y-3">
            <div className="text-center">
              <div className="text-ctp-blue font-bold text-lg">Ajay Kumar S</div>
              <div className="text-ctp-overlay1 text-xs">
                akumar23755@gmail.com · +91-7411776896 · Bengaluru, India
              </div>
              <div className="text-ctp-overlay0 text-xs">
                <a href="https://github.com/AjayKumar-Reddy" target="_blank" rel="noreferrer" className="terminal-link">GitHub</a>
                {' · '}
                <a href="https://www.linkedin.com/in/ajay-kumar-reddy7411/" target="_blank" rel="noreferrer" className="terminal-link">LinkedIn</a>
              </div>
            </div>

            <div>
              <div className="text-ctp-mauve font-semibold border-b border-ctp-surface0 pb-0.5 mb-1">Education</div>
              <div className="pl-2 space-y-1">
                <div>
                  <span className="text-ctp-text font-semibold">B.Tech in Information Science Engineering</span>
                  <span className="text-ctp-overlay0"> — MSRIT (2024-2027) · CGPA: </span>
                  <span className="text-ctp-green font-semibold">9.32</span>
                </div>
                <div>
                  <span className="text-ctp-text font-semibold">Diploma in Computer Science</span>
                  <span className="text-ctp-overlay0"> — RL Jalappa Polytechnic (2021-2024) · CGPA: </span>
                  <span className="text-ctp-green font-semibold">9.94</span>
                </div>
              </div>
            </div>

            <div>
              <div className="text-ctp-mauve font-semibold border-b border-ctp-surface0 pb-0.5 mb-1">Technical Skills</div>
              <div className="pl-2 space-y-0.5 text-xs">
                <div><span className="text-ctp-yellow">Languages:</span> <span className="text-ctp-subtext1">Java, Python, JavaScript, C</span></div>
                <div><span className="text-ctp-yellow">Frameworks:</span> <span className="text-ctp-subtext1">Spring Boot, React, Next.js, FastAPI, LangChain, Express.js</span></div>
                <div><span className="text-ctp-yellow">Databases:</span> <span className="text-ctp-subtext1">MySQL, MongoDB, PostgreSQL, PGVector, Redis</span></div>
                <div><span className="text-ctp-yellow">Cloud & Tools:</span> <span className="text-ctp-subtext1">AWS, GCP, Docker, Kafka, Git, Linux, JWT/OAuth2</span></div>
              </div>
            </div>

            <div className="text-ctp-overlay0 text-xs">
              Type <span className="text-ctp-blue">projects</span> for detailed project descriptions
            </div>
          </div>
        </div>
      );
      break;
    }

    // ─────────── quiz ───────────
    case 'quiz': {
      const questions = selectQuizQuestions(5);
      store.startQuiz(questions);
      store.addAchievement('quiz_started');

      const firstQ = questions[0];
      output = (
        <div className="my-1 text-sm">
          <div className="text-ctp-mauve font-semibold mb-2">
            ═══ CS Fundamentals Quiz ═══
          </div>
          <div className="text-ctp-subtext0 mb-3">
            5 questions · Topics: DSA, OS, DBMS, CN, OOP<br />
            Type the option number (1-4) to answer.
          </div>
          {renderQuizQuestion(firstQ, 1, 5)}
        </div>
      );
      break;
    }

    // ─────────── history ───────────
    case 'history': {
      const hist = store.commandHistory.slice(-20);
      output = (
        <div className="text-sm">
          {hist.length === 0 ? (
            <span className="text-ctp-overlay0">No commands in history.</span>
          ) : (
            hist.map((cmd, i) => (
              <div key={i} className="text-ctp-subtext1">
                <span className="text-ctp-overlay0 w-[30px] inline-block text-right mr-2">
                  {store.commandHistory.length - hist.length + i + 1}
                </span>
                {cmd}
              </div>
            ))
          )}
        </div>
      );
      break;
    }

    // ─────────── tree ───────────
    case 'tree':
      output = <pre className="text-ctp-blue text-xs sm:text-sm">{PORTFOLIO_TREE}</pre>;
      break;

    // ─────────── whoami ───────────
    case 'whoami':
      output = (
        <span className="text-ctp-green">visitor</span>
      );
      store.addAchievement('curious');
      break;

    // ─────────── pwd ───────────
    case 'pwd':
      output = <span className="text-ctp-text">/home/visitor/ajay-portfolio</span>;
      break;

    // ─────────── date ───────────
    case 'date': {
      const now = new Date();
      output = <span className="text-ctp-text">{now.toString()}</span>;
      break;
    }

    // ─────────── uptime ───────────
    case 'uptime': {
      const uptimeMs = Date.now() - store.sessionStart;
      const now = new Date();
      const timeStr = now.toLocaleTimeString();
      output = (
        <span className="text-ctp-text">
          {timeStr} up {formatUptime(uptimeMs)}, 1 user, load average: 0.42, 0.38, 0.35
        </span>
      );
      break;
    }

    // ─────────── uname ───────────
    case 'uname':
      output = (
        <span className="text-ctp-text">
          {args.includes('-a')
            ? 'Portfolio Linux 6.1.0-v2 #1 SMP PREEMPT_DYNAMIC x86_64 Next.js/React GNU/TypeScript'
            : 'Portfolio Linux'}
        </span>
      );
      break;

    // ─────────── echo ───────────
    case 'echo':
      output = <span className="text-ctp-text">{args.join(' ')}</span>;
      break;

    // ─────────── fortune ───────────
    case 'fortune': {
      const quote = PROGRAMMING_QUOTES[Math.floor(Math.random() * PROGRAMMING_QUOTES.length)];
      output = (
        <div className="text-ctp-yellow text-sm my-1 italic pl-2 border-l-2 border-ctp-surface1">
          {quote}
        </div>
      );
      break;
    }

    // ─────────── cowsay ───────────
    case 'cowsay': {
      const message = args.length > 0 ? args.join(' ') : 'Moo! Visit my GitHub!';
      const padded = message.length < 38 ? message + ' '.repeat(38 - message.length) : message;
      output = (
        <pre className="text-ctp-text text-xs sm:text-sm">{` ${'_'.repeat(padded.length + 2)}
< ${padded} >
 ${'‾'.repeat(padded.length + 2)}
${COWSAY_COW}`}</pre>
      );
      store.addAchievement('cowsay');
      break;
    }

    // ─────────── sudo ───────────
    case 'sudo':
      output = (
        <span className="text-ctp-red">
          [sudo] permission denied: visitor is not in the sudoers file. This incident will be reported.
        </span>
      );
      store.addAchievement('sudo_attempt');
      break;

    // ─────────── exit ───────────
    case 'exit':
    case 'logout':
      output = (
        <span className="text-ctp-yellow">
          logout: There is no escape from this terminal. Perhaps try <span className="text-ctp-blue">help</span>?
        </span>
      );
      store.addAchievement('escape_attempt');
      break;

    // ─────────── rm -rf / ───────────
    case 'rm':
      if (args.join(' ').includes('-rf')) {
        output = (
          <div className="text-ctp-red text-sm">
            rm: cannot remove '/': Operation not permitted<br />
            <span className="text-ctp-overlay0">Nice try. This portfolio has immutable snapshots enabled.</span>
          </div>
        );
        store.addAchievement('destroyer');
      } else {
        output = <span className="text-ctp-red">rm: missing operand</span>;
      }
      break;

    // ─────────── vim / nano ───────────
    case 'vim':
    case 'vi':
    case 'nano':
    case 'emacs':
      output = (
        <span className="text-ctp-yellow">
          {command}: This is a read-only portfolio terminal. But great editor choice.
        </span>
      );
      store.addAchievement('editor_war');
      break;

    // ─────────── ping ───────────
    case 'ping':
      output = (
        <div className="text-ctp-text text-sm">
          <div>PING {args[0] || 'portfolio.dev'} (127.0.0.1): 56 data bytes</div>
          <div>64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.042 ms</div>
          <div>64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.038 ms</div>
          <div>64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.041 ms</div>
          <div className="text-ctp-overlay0 mt-1">--- {args[0] || 'portfolio.dev'} ping statistics ---</div>
          <div className="text-ctp-overlay0">3 packets transmitted, 3 received, 0% packet loss</div>
        </div>
      );
      break;

    // ─────────── ls ───────────
    case 'ls':
      output = (
        <div className="text-sm flex flex-wrap gap-x-4 gap-y-0.5">
          <span className="text-ctp-blue font-bold">about/</span>
          <span className="text-ctp-blue font-bold">skills/</span>
          <span className="text-ctp-blue font-bold">projects/</span>
          <span className="text-ctp-text">contact.conf</span>
          <span className="text-ctp-text">resume.md</span>
          <span className="text-ctp-green">quiz*</span>
        </div>
      );
      break;

    // ─────────── cat ───────────
    case 'cat':
      if (args[0] === 'resume' || args[0] === 'resume.md') {
        // Redirect to resume command
        processCommand('resume', addCommandToHistory, pushLines, clearLines);
        return;
      } else if (args[0] === 'contact.conf' || args[0] === 'contact') {
        processCommand('contact', addCommandToHistory, pushLines, clearLines);
        return;
      } else {
        output = <span className="text-ctp-red">cat: {args[0] || ''}: No such file or directory</span>;
      }
      break;

    // ─────────── cd ───────────
    case 'cd':
      output = (
        <span className="text-ctp-overlay0">
          Navigation not supported. Use commands: <span className="text-ctp-blue">about</span>, <span className="text-ctp-blue">skills</span>, <span className="text-ctp-blue">projects</span>, <span className="text-ctp-blue">contact</span>
        </span>
      );
      break;

    // ─────────── htop ───────────
    case 'htop': {
      const cpu = Math.floor(Math.random() * 30 + 20);
      const mem = Math.floor(Math.random() * 20 + 40);
      const tasks = store.commandHistory.length + 3;
      output = (
        <div className="text-xs sm:text-sm font-mono my-1">
          <div className="text-ctp-mauve font-semibold mb-1">htop — process viewer</div>
          <div className="space-y-0.5">
            <div className="flex gap-2">
              <span className="text-ctp-blue w-[40px]">CPU</span>
              <span className="text-ctp-green">{'|'.repeat(Math.round(cpu / 5))}</span>
              <span className="text-ctp-surface1">{'|'.repeat(20 - Math.round(cpu / 5))}</span>
              <span className="text-ctp-overlay0">{cpu}%</span>
            </div>
            <div className="flex gap-2">
              <span className="text-ctp-blue w-[40px]">MEM</span>
              <span className="text-ctp-yellow">{'|'.repeat(Math.round(mem / 5))}</span>
              <span className="text-ctp-surface1">{'|'.repeat(20 - Math.round(mem / 5))}</span>
              <span className="text-ctp-overlay0">{mem}%</span>
            </div>
            <div className="text-ctp-overlay0 mt-1">Tasks: {tasks}, running: 1, sleeping: {tasks - 1}</div>
            <div className="text-ctp-overlay0">Load avg: 0.42 0.38 0.35</div>
            <div className="text-ctp-overlay0">Uptime: {formatUptime(Date.now() - store.sessionStart)}</div>
          </div>
        </div>
      );
      break;
    }

    // ─────────── achievements ───────────
    case 'achievements': {
      const achs = store.achievements;
      output = (
        <div className="text-sm my-1">
          <div className="text-ctp-mauve font-semibold mb-1">Achievements Unlocked: {achs.length}</div>
          {achs.length === 0 ? (
            <span className="text-ctp-overlay0">No achievements yet. Explore the terminal!</span>
          ) : (
            achs.map((a) => (
              <div key={a} className="text-ctp-yellow">
                <span className="text-ctp-green mr-1">●</span>
                {a.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
              </div>
            ))
          )}
        </div>
      );
      break;
    }

    // ─────────── banner ───────────
    case 'banner':
      output = <pre className="text-ctp-blue text-xs leading-tight">{WELCOME_BANNER}</pre>;
      break;

    // ─────────── sl (steam locomotive joke) ───────────
    case 'sl':
      output = (
        <span className="text-ctp-yellow">
          You meant <span className="text-ctp-blue">ls</span>, didn&apos;t you? It happens to the best of us.
        </span>
      );
      break;

    // ─────────── grep ───────────
    case 'grep':
      output = (
        <span className="text-ctp-overlay0">
          grep: use the terminal commands to explore. Try <span className="text-ctp-blue">help</span>.
        </span>
      );
      break;

    // ─────────── unknown ───────────
    default:
      output = (
        <span className="text-ctp-red">
          {command}: command not found. Type <span className="text-ctp-blue">help</span> for available commands.
        </span>
      );
  }

  pushLines([{ id: genId(), content: output }]);
};

// ═══════════════════════════════════════════════════
// Quiz question renderer
// ═══════════════════════════════════════════════════
function renderQuizQuestion(
  q: { question: string; options: string[]; category: string },
  num: number,
  total: number
): React.ReactNode {
  return (
    <div className="text-sm my-2">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-ctp-overlay0">
          [{num}/{total}]
        </span>
        <span className="px-1.5 py-0.5 bg-ctp-surface0 text-ctp-sapphire text-xs rounded-sm">
          {q.category}
        </span>
      </div>
      <div className="text-ctp-text font-semibold mb-2">
        {q.question}
      </div>
      <div className="space-y-1 pl-2">
        {q.options.map((opt, i) => (
          <div key={i} className="text-ctp-subtext1 quiz-option px-1.5 py-0.5 rounded-sm">
            <span className="text-ctp-mauve font-semibold mr-2">{i + 1}.</span>
            {opt}
          </div>
        ))}
      </div>
      <div className="text-ctp-overlay0 text-xs mt-2">
        Type a number (1-4) to answer:
      </div>
    </div>
  );
}
