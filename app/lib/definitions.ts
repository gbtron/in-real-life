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
}
export type LinkName = keyof Links

export type ContactFormData = {
    name: string, 
    email: string, 
    phone: string, 
    message: string
}
export type ContactField = keyof ContactFormData
export type ContactFormValidation = { 
    ContactField: boolean
}
export type ContactFormDispatch = Dispatch<SetStateAction<ContactFormData>>
export type ContactFormState = [ContactFormData, ContactFormDispatch]
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
export type ContactFormTarget = {name:ContactField, value:string}
export type BooleanDisptach = Dispatch<SetStateAction<boolean>>

interface FieldRowProps {
    fieldName:ContactField, 
    fieldValues: ContactFormData, 
    setFieldValues:ContactFormDispatch
    apiState:ContactResponse,
    setFieldsValid: BooleanDisptach, 
    fieldErrors:ContactFormData, 
    setFieldErrors:ContactFormDispatch, 
    setFieldsFilled: BooleanDisptach
}
export type FieldRowComponent = FC<FieldRowProps>