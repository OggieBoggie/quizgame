import { useMemo, useState } from "react";
import type { Quiz } from "../types/Quiz";
import { categories } from "../data/Categories";

interface QuizListProps {
    quizzes: Quiz[];
    onQuizSelect: (quiz: Quiz) => void;
}

export default function QuizList({ quizzes, onQuizSelect}: QuizListProps) {
    const [searchedQuiz, setSearchedQuiz] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredQuizzes = useMemo(() => {
        return quizzes.filter(quiz => {
            const matchesSearch = quiz.title.toLowerCase().includes(searchedQuiz.toLowerCase());
            console.log(quiz.category, selectedCategory);
            const matchesCategory = selectedCategory === "All" || quiz.category === selectedCategory;
            return matchesSearch && matchesCategory;
        })
    }, [quizzes, searchedQuiz, selectedCategory]);



    if (quizzes.length === 0) {
        return <div className="text-red-400">No quizzes available.</div>;
    }

    return (
        <div className="p-4 bg-gray-800 rounded lg shadow-md text-gray-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <input
                type="text"
                placeholder="Search quizzes..."
                value={searchedQuiz}
                onChange={(e) => setSearchedQuiz(e.target.value)}
                className="w-full p-2 mb-4 mr-4 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 mb-4 rounded bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                <option value="All">No Filter</option>
                {categories.map((category) => (
                    <option
                        key={category}
                        value={category}
                    >{category}</option>
                ))}
            </select>
            </div>
            {filteredQuizzes.map((quiz) => (
                <div
                    key={quiz.id}
                    className="p-4 mb-4 bg-gray-700 rounded-lg shadow hover:bg-gray-600 cursor-pointer transition-colors duration-200">             
                    <h2 className="text-xl font-semibold mb-2">{quiz.title}</h2>
                    <p className="text-gray-300 mb-2">Questions: {quiz.questions.length}</p>
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
                        onClick={() => onQuizSelect(quiz)}
                    >
                        Start Quiz
                    </button>
                </div>
            ))}
        </div>
    )
}