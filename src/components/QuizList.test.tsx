import { fireEvent, render, screen } from '@testing-library/react';
import QuizList from './QuizList';
import quizData from '../data/quizData.json'
import type { Quiz as QuizType } from '../types/Quiz';

const quizDataTyped = quizData as QuizType[];

const mockOnQuizSelect = vi.fn();

test('renders QuizList component with quiz titles', () => {
    render(<QuizList quizzes={quizDataTyped} onQuizSelect={mockOnQuizSelect} />);
    quizDataTyped.forEach(quiz => {
        const titleElement = screen.getByText(quiz.title);
        expect(titleElement).toBeInTheDocument();
    })
})

test('calls onQuizSelect when a quiz is clicked', () => {
    render(<QuizList quizzes={quizDataTyped} onQuizSelect={mockOnQuizSelect} />);
    const startButton = screen.getAllByText("Start Quiz")[0];
    fireEvent.click(startButton);
    expect(mockOnQuizSelect).toHaveBeenCalledWith(quizDataTyped[0]);
})