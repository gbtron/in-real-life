import { ContactFormData, BooleanDisptach } from "@/app/lib/definitions"

export const checkNoFieldsAreEmpty = (fieldValues: ContactFormData, setFieldsFilled: BooleanDisptach) => {
    if (Object.values(fieldValues).every((field) => field !== '')) {
        setFieldsFilled(true)
    } else {
        setFieldsFilled(false)
    }
}

export const checkFieldsAreValid = (fieldErrors: ContactFormData, setFieldsValid: BooleanDisptach)=> {
    console.log('field errors-', fieldErrors)
    if (Object.values(fieldErrors).every((field) => field === '')) {
        setFieldsValid(true)
    } else {
        setFieldsValid(false)
    }
}