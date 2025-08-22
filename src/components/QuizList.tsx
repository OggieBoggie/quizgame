import type { Quiz } from "../types/Quiz";

interface QuizListProps {
    quizzes: Quiz[];
    onQuizSelect: (quiz: Quiz) => void;
}

export default function QuizList({ quizzes, onQuizSelect}: QuizListProps) {
    if (quizzes.length === 0) {
        return <div className="text-red-400">No quizzes available.</div>;
    }

    return (
        <div className="p-4 bg-gray-800 rounded lg shadow-md text-gray-100">
            {quizzes.map((quiz) => (
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