export const initialCourses = [
  {
    id: 1,
    title: "Complete React.js Developer Course",
    category: "Web Development",
    instructor: "John Smith",
    instructorBio: "Senior Frontend Developer with 8 years of experience.",
    level: "Beginner",
    duration: "12 hours",
    price: 49,
    rating: 4.8,
    students: 1250,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    description: "Learn React from scratch, including components, hooks, routing and state management.",
    lessons: [
      {
        id: 101,
        title: "Introduction to React",
        duration: "20 min",
        content: "React is a JavaScript library used to build interactive user interfaces. It allows developers to create reusable UI components."
      },
      {
        id: 102,
        title: "Components and Props",
        duration: "35 min",
        content: "Components are reusable building blocks of React applications. Props allow components to receive data from their parent components."
      },
      {
        id: 103,
        title: "React State and Hooks",
        duration: "45 min",
        content: "React hooks allow functional components to manage state and lifecycle-related behavior. useState and useEffect are commonly used hooks."
      },
      {
        id: 104,
        title: "React Router",
        duration: "40 min",
        content: "React Router enables navigation between different pages without reloading the browser."
      }
    ],
    quiz: [
      {
        question: "What is React?",
        options: [
          "Programming language",
          "JavaScript library",
          "Database",
          "Operating system"
        ],
        answer: 1
      },
      {
        question: "Which hook is used to manage state?",
        options: ["useEffect", "useRef", "useState", "useMemo"],
        answer: 2
      },
      {
        question: "What is JSX?",
        options: [
          "JavaScript XML",
          "Java Syntax",
          "JSON Extension",
          "CSS Framework"
        ],
        answer: 0
      }
    ]
  },
  {
    id: 2,
    title: "Python Programming Masterclass",
    category: "Programming",
    instructor: "Sarah Williams",
    instructorBio: "Python developer and technical trainer.",
    level: "Beginner",
    duration: "15 hours",
    price: 59,
    rating: 4.9,
    students: 980,
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800",
    description: "Master Python programming, OOP, functions and practical programming.",
    lessons: [
      {
        id: 201,
        title: "Python Introduction",
        duration: "25 min",
        content: "Python is a high-level, interpreted programming language known for its readability."
      },
      {
        id: 202,
        title: "Variables and Data Types",
        duration: "30 min",
        content: "Learn strings, integers, floats, booleans and variables in Python."
      },
      {
        id: 203,
        title: "Functions and OOP",
        duration: "50 min",
        content: "Learn how to create reusable functions and implement object-oriented programming."
      }
    ],
    quiz: [
      {
        question: "Which keyword defines a function in Python?",
        options: ["function", "def", "fun", "define"],
        answer: 1
      },
      {
        question: "Which data type stores True or False?",
        options: ["String", "Integer", "Boolean", "List"],
        answer: 2
      }
    ]
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    category: "Design",
    instructor: "Michael Brown",
    instructorBio: "Product designer specializing in user experience.",
    level: "Intermediate",
    duration: "10 hours",
    price: 39,
    rating: 4.7,
    students: 760,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
    description: "Understand design principles, wireframing, prototyping and user experience.",
    lessons: [
      {
        id: 301,
        title: "Introduction to UI/UX",
        duration: "20 min",
        content: "Understand the difference between user interface and user experience design."
      },
      {
        id: 302,
        title: "Design Principles",
        duration: "35 min",
        content: "Explore visual hierarchy, alignment, contrast and consistency."
      },
      {
        id: 303,
        title: "Wireframing",
        duration: "40 min",
        content: "Learn how to create wireframes for digital products."
      }
    ],
    quiz: [
      {
        question: "What does UX stand for?",
        options: [
          "User Experience",
          "User Extension",
          "Universal Experience",
          "User Execution"
        ],
        answer: 0
      }
    ]
  },
  {
    id: 4,
    title: "Data Analytics with Excel",
    category: "Data Science",
    instructor: "David Wilson",
    instructorBio: "Data analyst and business intelligence consultant.",
    level: "Intermediate",
    duration: "8 hours",
    price: 29,
    rating: 4.6,
    students: 540,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    description: "Learn spreadsheet analysis, formulas, charts and data visualization.",
    lessons: [
      {
        id: 401,
        title: "Excel Fundamentals",
        duration: "30 min",
        content: "Learn the Excel interface, cells, worksheets and workbooks."
      },
      {
        id: 402,
        title: "Formulas and Functions",
        duration: "45 min",
        content: "Understand formulas and commonly used Excel functions."
      },
      {
        id: 403,
        title: "Charts and Dashboards",
        duration: "50 min",
        content: "Create meaningful charts and interactive dashboards."
      }
    ],
    quiz: [
      {
        question: "Which function calculates the average?",
        options: ["SUM", "COUNT", "AVERAGE", "MAX"],
        answer: 2
      }
    ]
  }
];

export const initialUser = {
  name: " Arun Kumar",
  email: "arun.kumar@example.com",
  role: "student",
  bio: "Passionate learner interested in technology and development.",
  joined: "November 2026"
};