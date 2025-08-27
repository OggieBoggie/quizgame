import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Quiz from './Quiz';

const mockOnComplete = vi.fn();
const sampleQuiz = {
    id: 1,
    title: "Sample Quiz",
    category: "General Knowledge",
    questions: [
        {
            question: "What is 2 + 2?",
            choices: ["3", "4", "5", "6"],
            answer: "4",
            type: "multiple" as const
        },
        {
            question: "The sky is blue.",
            answer: "True",
            type: "boolean" as const
        }
    ]
}

test('render Quiz components with title and questions', () => {
    render(<Quiz quiz={sampleQuiz} onQuizComplete={mockOnComplete} /> );
    const titleElement = screen.getByText(/Sample Quiz/i);
    expect(titleElement).toBeInTheDocument();

    const questionElement = screen.getByText(/What is 2 \+ 2\?/i);
    expect(questionElement).toBeInTheDocument();
    fireEvent.click(screen.getByText("4"));
    const nextQuestionElement = screen.getByText(/The sky is blue\./i);
    expect(nextQuestionElement).toBeInTheDocument();
})

test('calls onQuizComplete with correct score when quiz is finished', () => {
    render(<Quiz quiz={sampleQuiz} onQuizComplete={mockOnComplete} /> );
    fireEvent.click(screen.getByText("4"));
    expect(mockOnComplete).not.toHaveBeenCalled();
    fireEvent.click(screen.getByText("True"));
    fireEvent.click(screen.getByText("Finish Quiz"));
    expect(mockOnComplete).toHaveBeenCalledWith(2);
})

test('calls onQuizComplete with correct score when quiz is ended early', () => {
    render(<Quiz quiz={sampleQuiz} onQuizComplete={mockOnComplete} /> );
    fireEvent.click(screen.getByText("4"));
    fireEvent.click(screen.getByText("End Quiz"));
    expect(screen.getByText(/Quiz Complete/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText("Finish Quiz"));
    expect(mockOnComplete).toHaveBeenCalledWith(1);

})