import type { Question } from "./Question"

type Quiz = {
    id: number;
    title: string;
    category: string;
    questions: Question[];
}

export type { Quiz };