import { ChangeEvent, FocusEvent, Dispatch, SetStateAction, FC } from "react";
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
    about:String, 
    contact:String,
}

export type ContactFormData = {
    name: string, 
    email: string, 
    phone: string, 
    message: string
}
export type ContactField = keyof ContactFormData
interface FieldRowProps {
    fieldName:ContactField, 
    handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void
}
export type FieldRowComponent = FC<FieldRowProps>
export type ContactFormState = [ContactFormData, Dispatch<SetStateAction<ContactFormData>>]