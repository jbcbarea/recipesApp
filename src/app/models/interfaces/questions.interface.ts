import { Choice } from "./choice.interface";

export interface Question {

    name?:string;
    label?:string;
    info?:string;
    questionTypeId?: number;
    img?:string;
    extra?:string;
    min?:number;
    max?:number;
    choices?:Choice[];
}