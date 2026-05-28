const initialCourses = [
  {
    id: '1a2b3c4d-0001-0000-0000-000000000001',
    title: 'The Complete React Developer Course',
    instructor: 'Andrew Mead',
    organization: 'Udemy',
    description:
      'A comprehensive deep-dive into React, covering hooks, context, performance optimisation, and building production-ready applications from scratch.',
    topics: [
      'JSX and component fundamentals',
      'useState and useEffect hooks',
      'Context API and state management',
      'React Router for navigation',
      'Testing with React Testing Library',
    ],
    url: 'https://www.udemy.com/course/react-2nd-edition/',
    totalLessons: 200,
    currentLesson: 130,
    progress: 65,
    status: 'in-progress',
  },
  {
    id: '1a2b3c4d-0002-0000-0000-000000000002',
    title: 'CSS for JavaScript Developers',
    instructor: 'Josh Comeau',
    organization: 'css-for-js.dev',
    description:
      'An interactive course that reframes CSS fundamentals from a JavaScript developer perspective, covering layout, animations, and responsive design.',
    topics: [
      'The box model and flow layout',
      'Flexbox and CSS Grid',
      'Responsive design with media queries',
      'CSS animations and transitions',
      'CSS variables and theming',
    ],
    url: 'https://css-for-js.dev/',
    totalLessons: 80,
    currentLesson: 24,
    progress: 30,
    status: 'in-progress',
  },
  {
    id: '1a2b3c4d-0003-0000-0000-000000000003',
    title: 'Node.js: The Complete Guide',
    instructor: 'Maximilian Schwarzmüller',
    organization: 'Udemy',
    description:
      'Master Node.js by building real-world applications. Covers REST APIs, authentication, databases, and deployment.',
    topics: [
      'Node.js core modules and event loop',
      'Building RESTful APIs with Express',
      'MongoDB and Mongoose ODM',
      'Authentication with JWT',
      'Deploying to AWS and Heroku',
    ],
    url: 'https://www.udemy.com/course/nodejs-the-complete-guide/',
    totalLessons: 0,
    currentLesson: 0,
    progress: 0,
    status: 'not-started',
  },
]

export default initialCourses
