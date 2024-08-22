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
type FieldData = {
    clientErrors:string, 
    value:string
}
export type FormData = {
    firstName: FieldData, 
    lastName: FieldData, 
    email: FieldData, 
    phone: FieldData, 
    password: FieldData
}
export type RegistrationField = keyof FormData

export type FieldValidation = {
    [F in RegistrationField]: {
        condition: boolean, 
        message:string
    }[]
}
export type FormEventTarget = {name: RegistrationField, value:string}
export type SettableEvent = ChangeEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>