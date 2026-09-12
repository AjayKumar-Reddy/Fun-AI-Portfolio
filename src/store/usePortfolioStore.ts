import { create } from 'zustand';

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: number; // 0-indexed correct option
  category: string;
}

export interface QuizState {
  active: boolean;
  questions: QuizQuestion[];
  currentIndex: number;
  score: number;
}

interface PortfolioState {
  booted: boolean;
  commandHistory: string[];
  quiz: QuizState;
  achievements: string[];
  sessionStart: number;

  completeBoot: () => void;
  addCommandToHistory: (cmd: string) => void;
  startQuiz: (questions: QuizQuestion[]) => void;
  answerQuiz: (correct: boolean) => void;
  endQuiz: () => void;
  addAchievement: (id: string) => void;
}

export const usePortfolioStore = create<PortfolioState>()((set) => ({
  booted: false,
  commandHistory: [],
  quiz: {
    active: false,
    questions: [],
    currentIndex: 0,
    score: 0,
  },
  achievements: [],
  sessionStart: Date.now(),

  completeBoot: () => set({ booted: true }),

  addCommandToHistory: (cmd) =>
    set((s) => ({
      commandHistory: [...s.commandHistory, cmd].slice(-50),
    })),

  startQuiz: (questions) =>
    set({
      quiz: {
        active: true,
        questions,
        currentIndex: 0,
        score: 0,
      },
    }),

  answerQuiz: (correct) =>
    set((s) => ({
      quiz: {
        ...s.quiz,
        score: correct ? s.quiz.score + 1 : s.quiz.score,
        currentIndex: s.quiz.currentIndex + 1,
      },
    })),

  endQuiz: () =>
    set((s) => ({
      quiz: { ...s.quiz, active: false },
    })),

  addAchievement: (id) =>
    set((s) => {
      if (s.achievements.includes(id)) return s;
      return { achievements: [...s.achievements, id] };
    }),
}));
