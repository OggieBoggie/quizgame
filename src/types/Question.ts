type QuestionType = "multiple" | "boolean";

type Question = {
    question: string;
    choices?: string[];
    answer: string;
    type: QuestionType;
}

export type { Question, QuestionType };
