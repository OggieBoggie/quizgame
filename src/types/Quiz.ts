import type { Question } from "./Question"

type Quiz = {
    id: number;
    title: string;
    questions: Question[];
}

export type { Quiz };