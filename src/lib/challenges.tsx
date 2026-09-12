import { QuizQuestion } from '@/store/usePortfolioStore';

// ═══════════════════════════════════════════════════════════
// CS Fundamentals MCQ Question Bank
// 40 questions across 5 categories
// ═══════════════════════════════════════════════════════════

export const CS_QUESTIONS: QuizQuestion[] = [
  // ──────────────────────── DSA (10) ────────────────────────
  {
    category: 'DSA',
    question: 'What is the time complexity of binary search in the worst case?',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
    answer: 2,
  },
  {
    category: 'DSA',
    question: 'Which data structure follows LIFO (Last In First Out) principle?',
    options: ['Queue', 'Stack', 'Deque', 'Priority Queue'],
    answer: 1,
  },
  {
    category: 'DSA',
    question: 'What is the optimal time complexity to merge two sorted arrays of size N and M?',
    options: ['O(N * M)', 'O(N + M)', 'O(N log M)', 'O((N+M) log(N+M))'],
    answer: 1,
  },
  {
    category: 'DSA',
    question: 'Which sorting algorithm has the best guaranteed worst-case time complexity?',
    options: ['Quick Sort', 'Bubble Sort', 'Merge Sort', 'Insertion Sort'],
    answer: 2,
  },
  {
    category: 'DSA',
    question: 'What is the most efficient data structure for implementing a priority queue?',
    options: ['Sorted Array', 'Linked List', 'Hash Map', 'Binary Heap'],
    answer: 3,
  },
  {
    category: 'DSA',
    question: 'Which graph traversal algorithm uses a Queue internally?',
    options: ['Depth First Search', 'Breadth First Search', 'Topological Sort', 'Bellman-Ford'],
    answer: 1,
  },
  {
    category: 'DSA',
    question: 'What is the space complexity of reversing a singly linked list in-place?',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
    answer: 0,
  },
  {
    category: 'DSA',
    question: 'What is the average-case time complexity of inserting into a balanced BST?',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
    answer: 2,
  },
  {
    category: 'DSA',
    question: "Which algorithm paradigm does Dijkstra's shortest path algorithm follow?",
    options: ['Divide and Conquer', 'Dynamic Programming', 'Greedy', 'Backtracking'],
    answer: 2,
  },
  {
    category: 'DSA',
    question: 'What is the worst-case time complexity of searching in a hash table?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    answer: 2,
  },

  // ──────────────── Operating Systems (8) ─────────────────
  {
    category: 'OS',
    question: 'What is the key difference between a process and a thread?',
    options: [
      'Threads cannot execute code',
      'Threads share the same memory space within a process',
      'Processes are faster than threads',
      'A process can only have one thread',
    ],
    answer: 1,
  },
  {
    category: 'OS',
    question: 'How many necessary conditions must hold simultaneously for a deadlock to occur?',
    options: ['2', '3', '4', '5'],
    answer: 2,
  },
  {
    category: 'OS',
    question: "Which page replacement algorithm can suffer from Belady's anomaly?",
    options: ['LRU', 'FIFO', 'Optimal', 'LFU'],
    answer: 1,
  },
  {
    category: 'OS',
    question: 'What distinguishes a mutex from a counting semaphore?',
    options: [
      'Mutex is faster',
      'Mutex allows only binary (0/1) values, semaphore can have count > 1',
      'Semaphore cannot be shared between processes',
      'Mutex does not require OS support',
    ],
    answer: 1,
  },
  {
    category: 'OS',
    question: 'What technique does the OS use to run programs larger than physical memory?',
    options: ['Caching', 'Virtual Memory with paging', 'Multithreading', 'DMA Transfer'],
    answer: 1,
  },
  {
    category: 'OS',
    question: 'Which CPU scheduling algorithm requires a time quantum parameter?',
    options: ['FCFS', 'SJF', 'Round Robin', 'Priority Scheduling'],
    answer: 2,
  },
  {
    category: 'OS',
    question: 'What scheduling technique prevents starvation by gradually increasing priority?',
    options: ['Preemption', 'Aging', 'Throttling', 'Spooling'],
    answer: 1,
  },
  {
    category: 'OS',
    question: 'Thrashing occurs when a system spends most of its time doing what?',
    options: ['CPU computation', 'Disk I/O', 'Swapping / paging', 'Network communication'],
    answer: 2,
  },

  // ──────────────────── DBMS (8) ──────────────────────
  {
    category: 'DBMS',
    question: 'In ACID properties, what does the "A" stand for?',
    options: ['Availability', 'Atomicity', 'Authentication', 'Aggregation'],
    answer: 1,
  },
  {
    category: 'DBMS',
    question: 'Which normal form eliminates transitive functional dependencies?',
    options: ['1NF', '2NF', '3NF', 'BCNF'],
    answer: 2,
  },
  {
    category: 'DBMS',
    question: 'What distinguishes a PRIMARY KEY from a UNIQUE constraint?',
    options: [
      'PRIMARY KEY allows duplicates',
      'PRIMARY KEY cannot be NULL and a table can have only one',
      'UNIQUE is always clustered',
      'There is no difference',
    ],
    answer: 1,
  },
  {
    category: 'DBMS',
    question: 'Which data structure is most commonly used for database indexing?',
    options: ['Hash Table', 'Linked List', 'B+ Tree', 'Red-Black Tree'],
    answer: 2,
  },
  {
    category: 'DBMS',
    question: 'What is the difference between WHERE and HAVING clauses in SQL?',
    options: [
      'WHERE is faster',
      'HAVING filters groups after GROUP BY; WHERE filters rows before',
      'WHERE can only be used with SELECT',
      'HAVING replaces WHERE in newer SQL standards',
    ],
    answer: 1,
  },
  {
    category: 'DBMS',
    question: 'Which transaction isolation level provides the strongest consistency guarantee?',
    options: ['Read Uncommitted', 'Read Committed', 'Repeatable Read', 'Serializable'],
    answer: 3,
  },
  {
    category: 'DBMS',
    question: 'A foreign key in a relational database enforces what kind of integrity?',
    options: ['Domain Integrity', 'Entity Integrity', 'Referential Integrity', 'User Integrity'],
    answer: 2,
  },
  {
    category: 'DBMS',
    question: 'What is a database VIEW?',
    options: [
      'A physical copy of a table',
      'A virtual table defined by a stored query',
      'A backup of the schema',
      'An index on multiple columns',
    ],
    answer: 1,
  },

  // ────────────── Computer Networks (8) ───────────────
  {
    category: 'CN',
    question: 'How many layers does the OSI reference model have?',
    options: ['4', '5', '6', '7'],
    answer: 3,
  },
  {
    category: 'CN',
    question: 'Which protocol is connection-oriented and provides reliable delivery?',
    options: ['UDP', 'TCP', 'ICMP', 'ARP'],
    answer: 1,
  },
  {
    category: 'CN',
    question: 'What does DNS resolve?',
    options: [
      'MAC address to IP address',
      'Domain name to IP address',
      'Port number to process ID',
      'IP address to domain name',
    ],
    answer: 1,
  },
  {
    category: 'CN',
    question: 'At which OSI layer does HTTP operate?',
    options: ['Transport', 'Network', 'Session', 'Application'],
    answer: 3,
  },
  {
    category: 'CN',
    question: 'A router operates at which OSI layer?',
    options: ['Data Link (Layer 2)', 'Network (Layer 3)', 'Transport (Layer 4)', 'Application (Layer 7)'],
    answer: 1,
  },
  {
    category: 'CN',
    question: 'What is the purpose of a subnet mask?',
    options: [
      'Encrypt network traffic',
      'Divide an IP address into network and host portions',
      'Assign domain names',
      'Route packets between networks',
    ],
    answer: 1,
  },
  {
    category: 'CN',
    question: 'What are the three steps of the TCP three-way handshake?',
    options: [
      'SYN → ACK → FIN',
      'SYN → SYN-ACK → ACK',
      'ACK → SYN → FIN',
      'FIN → ACK → RST',
    ],
    answer: 1,
  },
  {
    category: 'CN',
    question: 'What does ARP resolve?',
    options: [
      'Domain name to IP address',
      'IP address to MAC address',
      'Port number to application',
      'URL to server location',
    ],
    answer: 1,
  },

  // ──────────────────── OOP (6) ──────────────────────
  {
    category: 'OOP',
    question: 'What does polymorphism mean in object-oriented programming?',
    options: [
      'Objects can only have one form',
      'Same interface can have different implementations',
      'Classes cannot be inherited',
      'Variables must be static',
    ],
    answer: 1,
  },
  {
    category: 'OOP',
    question: 'What is encapsulation?',
    options: [
      'Inheriting from multiple classes',
      'Hiding internal state and bundling data with methods',
      'Creating abstract classes',
      'Using generic types',
    ],
    answer: 1,
  },
  {
    category: 'OOP',
    question: 'What distinguishes an abstract class from an interface (in Java)?',
    options: [
      'Interfaces are faster',
      'Abstract classes can have implemented methods and state',
      'Abstract classes cannot be extended',
      'Interfaces support constructors',
    ],
    answer: 1,
  },
  {
    category: 'OOP',
    question: 'In SOLID principles, what does "S" stand for?',
    options: [
      'Substitution Principle',
      'Single Responsibility Principle',
      'Separation of Concerns',
      'Static Binding Principle',
    ],
    answer: 1,
  },
  {
    category: 'OOP',
    question: 'Method overloading is an example of which type of polymorphism?',
    options: [
      'Runtime polymorphism',
      'Compile-time polymorphism',
      'Dynamic dispatch',
      'Ad-hoc abstraction',
    ],
    answer: 1,
  },
  {
    category: 'OOP',
    question: 'The "Diamond Problem" occurs in which OOP concept?',
    options: [
      'Encapsulation',
      'Multiple inheritance',
      'Composition',
      'Abstraction',
    ],
    answer: 1,
  },
];

/**
 * Select N random questions from the bank, ensuring category diversity
 */
export function selectQuizQuestions(count: number = 5): QuizQuestion[] {
  const categories = ['DSA', 'OS', 'DBMS', 'CN', 'OOP'];
  const selected: QuizQuestion[] = [];

  // Pick one from each category first (up to count)
  const shuffledCategories = categories.sort(() => Math.random() - 0.5);
  for (const cat of shuffledCategories) {
    if (selected.length >= count) break;
    const catQuestions = CS_QUESTIONS.filter(
      (q) => q.category === cat && !selected.includes(q)
    );
    if (catQuestions.length > 0) {
      selected.push(catQuestions[Math.floor(Math.random() * catQuestions.length)]);
    }
  }

  // Fill remaining slots randomly
  while (selected.length < count) {
    const remaining = CS_QUESTIONS.filter((q) => !selected.includes(q));
    if (remaining.length === 0) break;
    selected.push(remaining[Math.floor(Math.random() * remaining.length)]);
  }

  return selected.sort(() => Math.random() - 0.5);
}
