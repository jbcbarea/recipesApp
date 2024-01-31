import { Question } from "./questions.interface";

export interface Groups {
    name?:string;
    order?:number;
    questions?:Question[];
}