import { useState } from 'react';
import type { Question } from "../types/Question";

type Props = Question & {
    onAnswer: (isCorrect: boolean) => void;
}

function checkValidQuestion(question: Question) {
    if (question.type === "boolean" && question.choices) {
        return "Boolean questions should not have choices defined.";
    }

    if (question.type === "multiple" && !question.choices) {
        return "Multiple choice questions must have choices defined.";
    }

    return null;
}

export default function Question({ question, choices, answer, type, onAnswer }: Props) {
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
    const error = checkValidQuestion({ question, choices, answer, type });
    if (error) {
        return <div className="text-red-400">{error}</div>;
    }

    const handleAnswer = (choice: string) => {
        const correct = choice === answer;
        setCorrectAnswer(answer);
        setIsCorrect(correct);
        onAnswer(correct);
    }

    return (
        <div className="p-4 bg-gray-700 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2 text-gray-100">{question}</h2>
            {type === "multiple" && choices &&
                <ul className="list-disc pl-5">
                    {choices.map((choice, index) => (
                        <li
                            key={index}
                            className="mb-1 bg-gray-600
                        hover:bg-gray-500 cursor-pointer
                        transition-colors duration-200"
                            onClick={() => handleAnswer(choice)}
                        >
                            {choice}
                        </li>
                    ))}
                </ul>}
            {type === "boolean" && (
                <div className="flex space-x-4">
                    <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 
                    transition-colors duration-200"
                        onClick={() => handleAnswer("True")}>
                        True
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 
                    transition-colors duration-200"
                        onClick={() => handleAnswer("False")}>
                        False
                    </button>
                </div>
            )}
            {isCorrect != null && (
                <div className='mt-2 text-lg font-bold'>
                    <h1 className={isCorrect ? 'text-green-400' : 'text-red-400'}>
                        {isCorrect ? "Correct!" : `Incorrect! The correct answer is ${correctAnswer}.`}
                    </h1>
                </div>
            )}
        </div>
    )
}

