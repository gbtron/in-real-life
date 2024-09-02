import {RegistrationField} from "@/app/dashboard/register/page"
import { Dispatch, SetStateAction } from "react"

type FieldValidation = {
    [F in RegistrationField]: {
        condition: boolean, 
        message:string
    }[]
}
export const getClientSideValidation = (value:string, name:RegistrationField, setFieldsValid:Dispatch<SetStateAction<boolean>>) => {
    const nameFieldValidation = [
        { condition: value.length > 1, message: `at least 2 characters`}, 
        { condition: /^[\p{L}\s'-]*$/u.test(value), message: `Unicode letters, apostrophes, and hyphens`}
    ]

    const fieldValidation:FieldValidation = {
        firstName: nameFieldValidation, 
        lastName: nameFieldValidation,
        phone: [
            {
                condition: /^\s*(\+?\d{1,3})?[-. (]*\(?(\d{3})\)?[-. ]*(\d{3})[-. ]*(\d{4})(?:\s*x\s*\d+)?\s*$/
                    .test(value), 
                message: `the right number of digits and optional separators (dash, period, space)`
            }
        ], 
        email: [
            {
                condition: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z]{2,})+$/
                    .test(value), 
                message:''
            }
        ], 
        password: [
            {
                condition: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/
                    .test(value), 
                message:`at least one lowercase letter, one uppercase letter, one number, and one special character`
            }
        ]
    }

    const userfyName = (name:string) => {
        if (name == 'firstName') {
            name = 'first name'
        } else if (name === 'lastName') {
            name = 'last name'
        } else if (name === 'phone') {
            name += ' number'
        }
        return name
    }
    const messagePrefix = `Please enter your ${userfyName(name)}`

    let validationMessage = ''
    let fieldsValid = true
    if (value === '') {
        validationMessage = `${messagePrefix}.`
        fieldsValid = false
    } else {
        for (let validation of fieldValidation[name]) {
            if (validation.condition === false) {
                validationMessage = `${validation.message !== '' 
                    ? `Use ${validation.message}` 
                    : `${messagePrefix.replace('enter', 'correct')}`}.`
                fieldsValid = false
            }
        }
    }
    
    setFieldsValid(fieldsValid)
    return validationMessage
}