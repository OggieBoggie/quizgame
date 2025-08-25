import quizData from "./quizData.json";

export const categories = Array.from(new Set(quizData.map(quiz => quiz.category)));