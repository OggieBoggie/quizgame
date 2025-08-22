import { useState } from 'react';
import type { Quiz } from "../types/Quiz";
import Question from './Question';

interface Props {
    quiz: Quiz;
    onQuizComplete: (score: number) => void;
}

export default function Quiz({ quiz, onQuizComplete}: Props) {
    const [score, setScore] = useState<number>(0);
    const [isOnGoing, setIsOnGoing] = useState<boolean>(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    if (quiz.questions.length === 0) {
        return <div className="text-red-400">No questions available.</div>;
    }

    const handleAnswer = (isCorrect: boolean) => {
        if (isCorrect) {
            setScore(prevScore => prevScore + 1);
        } 
        const nextIndex = currentQuestionIndex + 1;
        if (nextIndex < quiz.questions.length) {
            setCurrentQuestionIndex(nextIndex);
        } else {
            setIsOnGoing(false);
        }
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];
    return (
        <div className='p-4 bg-gray-800 rounded-lg shadow-md text-gray-100'>
            <h1 className='text-2xl font-bold mb-4'>{quiz.title}</h1>
            <h2 className='text-xl font-semibold mb-4'>Question {currentQuestionIndex + 1} of {quiz.questions.length}</h2>
            <Question
                {...currentQuestion}
                onAnswer={handleAnswer}
                />
                {isOnGoing && (
                    <div className='mt-4'>
                        <h3 className='text-lg font-bold'>Current Score: {score}</h3>
                        <p className='text-gray-300'>Answer the question above to continue.</p>
                        <button
                            className='mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200'
                            onClick={() => setIsOnGoing(false)}
                        >
                            End Quiz
                        </button>
                    </div>
                )} 
            {!isOnGoing && (
                <div className='mt-4'>
                    <h3 className='text-lg font-bold'>Quiz Complete</h3>
                    <p className='text-gray-300'>Your score: {score} out of {quiz.questions.length}</p>
                    <button
                        className='mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200'
                        onClick={() => onQuizComplete(score)}
                    >
                        Finish Quiz
                    </button>               
                </div>
            )}
        </div>
    )
}
