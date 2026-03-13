export const MOCK_COURSES = [
  // {
  //   _id: "mock-1", title: "Complete React Development", description: "Master React from zero to hero with hooks, context, and more.", price: 2999,
  //   courseType: "recorded", thumbnail: "https://picsum.photos/seed/react/400/250",
  //   videoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  // },
  // {
  //   _id: "mock-2", title: "Node.js & Express Masterclass", description: "Build scalable REST APIs with Node.js, Express, and MongoDB.", price: 3499,
  //   courseType: "live", thumbnail: "https://picsum.photos/seed/node/400/250",
  //   liveClassLink: "https://meet.google.com/demo",
  // },
  // {
  //   _id: "mock-3", title: "Full Stack Web Development", description: "End-to-end web development bootcamp with modern tools.", price: 4999,
  //   courseType: "recorded", thumbnail: "https://picsum.photos/seed/fullstack/400/250",
  //   videoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  // },
  // {
  //   _id: "mock-4", title: "UI/UX Design Fundamentals", description: "Learn design thinking, Figma, and user-centered design.", price: 1999,
  //   courseType: "live", thumbnail: "https://picsum.photos/seed/design/400/250",
  //   liveClassLink: "https://meet.google.com/demo",
  // },
  // {
  //   _id: "mock-5", title: "Python for Data Science", description: "From Python basics to pandas, numpy and machine learning.", price: 3999,
  //   courseType: "recorded", thumbnail: "https://picsum.photos/seed/python/400/250",
  //   videoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  // },
  // {
  //   _id: "mock-6", title: "DevOps with Docker & Kubernetes", description: "CI/CD pipelines, Docker containers, and Kubernetes orchestration.", price: 5499,
  //   courseType: "live", thumbnail: "https://picsum.photos/seed/devops/400/250",
  //   liveClassLink: "https://meet.google.com/demo",
  // },
];

export const MOCK_ASSIGNMENTS = [
  {
    _id: "a1",
    title: "Build a REST API",
    description: "Create a complete REST API with CRUD operations.",
    dueDate: new Date(Date.now() + 7 * 86400000).toISOString(),
    courseId: "mock-1",
  },
  {
    _id: "a2",
    title: "UI Component Library",
    description: "Build 5 reusable React components with props and state.",
    dueDate: new Date(Date.now() + 14 * 86400000).toISOString(),
    courseId: "mock-2",
  },
  {
    _id: "a3",
    title: "Database Design",
    description: "Design a MongoDB schema for an e-commerce platform.",
    dueDate: new Date(Date.now() + 5 * 86400000).toISOString(),
    courseId: "mock-3",
  },
];

export const MOCK_TESTIMONIALS = [
  {
    name: "Rahul Sharma",
    role: "Frontend Developer",
    text: "EduVerse transformed my career. The live classes are incredibly interactive and the instructors are world-class!",
    rating: 5,
    avatar: "RS",
  },
  {
    name: "Priya Patel",
    role: "Data Scientist",
    text: "I landed my dream job after completing the Data Science bootcamp. The curriculum is perfectly structured.",
    rating: 5,
    avatar: "PP",
  },
  {
    name: "Arjun Singh",
    role: "Full Stack Developer",
    text: "The best investment I made in my career. The quality of content and mentorship is unparalleled.",
    rating: 5,
    avatar: "AS",
  },
];
