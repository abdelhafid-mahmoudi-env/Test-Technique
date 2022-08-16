export interface Answer {
    label: string;
    correct: boolean;
}

export interface Question {
    id: number;
    answers: Answer[];
    image?: string | null;
    label: string;
    time: number;
}

export type Questions = Question[];