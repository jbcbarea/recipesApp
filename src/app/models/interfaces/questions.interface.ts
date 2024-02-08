import { Choice } from "./choice.interface";

export interface Question {

    name?:string;
    id?:number;
    label?:string;
    info?:string;
    questionTypeId?: number;
    img?:string;
    required?:boolean;
    checked?:boolean;
    extra?:string;
    min?:number;
    max?:number;
    choices?:Choice[];
}