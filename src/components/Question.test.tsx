import { render, screen, fireEvent } from '@testing-library/react';
import Question from './Question'; 

const mockOnAnswer = vi.fn();
const sampleQuestionmultiple = {
    question: "What is 2 + 2?",
    choices: ["3", "4", "5", "6"],
    answer: "4",
    type: "multiple" as const
}

const sampleQuestionboolean = {
    question: "The sky is blue.",
    answer: "True",
    type: "boolean" as const
}

test('renders Question Component with all the props', () => {
    render(<Question {...sampleQuestionmultiple} onAnswer={mockOnAnswer} />);
    const questionElement = screen.getByText(/What is 2 \+ 2\?/i);
    expect(questionElement).toBeInTheDocument();

    sampleQuestionmultiple.choices?.forEach(choice => {
        const choiceElement = screen.getByText(choice);
        expect(choiceElement).toBeInTheDocument();
    })
})

test('calls onAnswer with true when correct answer is clicked', () => {
    render(<Question {...sampleQuestionmultiple} onAnswer={mockOnAnswer} />);
    const correctChoice = screen.getByText("4");
    fireEvent.click(correctChoice);
    expect(mockOnAnswer).toHaveBeenCalledWith(true);
});

test('calls onAnswer with false when false answer is clicked', () => {
    render(<Question {...sampleQuestionmultiple} onAnswer={mockOnAnswer} />);
    const incorrectChoice = screen.getByText("5");
    fireEvent.click(incorrectChoice)
    expect(mockOnAnswer).toHaveBeenCalledWith(false);
})

test('renders boolean question type correctly', () => {
    render(<Question {...sampleQuestionboolean} onAnswer={mockOnAnswer} />);
    const questionElement = screen.getByText(/The sky is blue\./i);
    expect(questionElement).toBeInTheDocument();

    const trueButton = screen.getByText("True");
    const falseButton = screen.getByText("False");
    expect(trueButton).toBeInTheDocument();
    expect(falseButton).toBeInTheDocument();
});

test('calls onAnswer with true when True button is clicked', () => {
    render(<Question {...sampleQuestionboolean} onAnswer={mockOnAnswer} />);
    const trueButton = screen.getByText("True");
    fireEvent.click(trueButton);
    expect(mockOnAnswer).toHaveBeenCalledWith(true);
});

test('calls onAnswer with false when False button is clicked', () => {
    render(<Question {...sampleQuestionboolean} onAnswer={mockOnAnswer} />);
    const falseButton = screen.getByText("False");
    fireEvent.click(falseButton);
    expect(mockOnAnswer).toHaveBeenCalledWith(false);
});