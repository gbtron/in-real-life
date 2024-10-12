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
    '/':String, 
    'contact':String,
    'about':String
}
export type LinkName = keyof Links

export type ContactField = {
    name: string, 
    email: string, 
    phone: string, 
    message: string
}
export type ContactFieldName = keyof ContactField
export type ContactFormValidation = { 
    ContactFieldName: boolean
}
export type ContactFormDispatch = Dispatch<SetStateAction<ContactField>>
export type ContactFormState = [ContactField, ContactFormDispatch]
export type ContactResponse = {
    errors?: {
        name?: string[];
        email?: string[];
        phone?: string[];
        message?: string[];
        form?: string;
    }, 
    submissionPending: boolean;
    messageSent:boolean
};
export type ContactFormTarget = {name:ContactFieldName, value:string}

interface FieldRowProps {
    fieldName:ContactFieldName, 
    contactFields: ContactField, 
    setContactFields:ContactFormDispatch
    apiState:ContactResponse,
    fieldErrors:ContactField, 
    setFieldErrors:ContactFormDispatch, 
}
export type FieldRowComponent = FC<FieldRowProps>

export type Sign = "mind" | "body" | "spirit" | "heart"
export type Event = {
    id: string,
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
