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

export type ContactFormState = [ContactFormData, Dispatch<SetStateAction<ContactFormData>>]

export type ContactResponse = {
    errors?: {
        name?: string[];
        email?: string[];
        phone?: string[];
        message?: string[];
        form?: string;
    }, 
    submissionPending: boolean;
};

interface FieldRowProps {
    fieldName:ContactField, 
    formData: ContactFormData, 
    setFormData:Dispatch<SetStateAction<ContactFormData>>
    state:ContactResponse,
}
export type FieldRowComponent = FC<FieldRowProps>

export type Sign = "mind" | "body" | "spirit" | "heart"
export type Event = {
    title: string, 
    date: Date,
    membersOnly? : boolean,
    location : string, 
    instructors? : string[], 
    description: string, 
    sign: Sign
}
export type ActiveEventDispatch = Dispatch<SetStateAction<Event>>
export type ActiveEventState = [Event, ActiveEventDispatch]
