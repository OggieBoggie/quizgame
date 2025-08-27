import { render, screen, fireEvent } from '@testing-library/react';
import Question from './Question'; 

const mockOnAnswer = vi.fn();
const sampleQuestion = {
    question: "What is 2 + 2?",
    choices: ["3", "4", "5", "6"],
    answer: "4",
    type: "multiple" as const
}

test('renders Question Component with all the props', () => {
    render(<Question {...sampleQuestion} onAnswer={mockOnAnswer} />);
    const questionElement = screen.getByText(/What is 2 \+ 2\?/i);
    expect(questionElement).toBeInTheDocument();

    sampleQuestion.choices?.forEach(choice => {
        const choiceElement = screen.getByText(choice);
        expect(choiceElement).toBeInTheDocument();
    })
})

test('calls onAnswer with true when correct answer is clicked', () => {
    render(<Question {...sampleQuestion} onAnswer={mockOnAnswer} />);
    const correctChoice = screen.getByText("4");
    fireEvent.click(correctChoice);
    expect(mockOnAnswer).toHaveBeenCalledWith(true);
});

test('calls onAnswer with false when false answer is clicked', () => {
    render(<Question {...sampleQuestion} onAnswer={mockOnAnswer} />);
    const incorrectChoice = screen.getByText("5");
    fireEvent.click(incorrectChoice)
    expect(mockOnAnswer).toHaveBeenCalledWith(false);
})