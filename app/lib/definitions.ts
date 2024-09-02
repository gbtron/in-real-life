import { ChangeEvent, FocusEvent } from "react";
// Manually define the type defintions of the data

export type Lead = {
    id: string;
    name: string; 
    phone: string; 
    email: string;
    message: string;
    date:string;
}

export type SettableEvent = ChangeEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>

// type defs on UI variables
export type Links = {
    privacy:String, 
    about:String, 
    contact:String, 
    press:String
}