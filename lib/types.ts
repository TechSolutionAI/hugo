export interface Question {
    title: string;
    description: string;
    type: "number" | "radio" | "select" | "checkbox";
    order: number;
    options?: string[]; // Optional, only for radio, select, and checkbox types
    required: boolean;
}