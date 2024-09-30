'use client'
import { ContactField, BooleanDisptach } from "@/app/lib/definitions"

type FieldValidation = {
    [F in ContactField]: {
        condition: boolean, 
        message:string
    }[]
}
export const getClientSideValidation = (value:string, name:ContactField ) => {
    const nameFieldValidation = [
        { condition: value.length > 4, message: `at least 5 characters`}, 
        { condition: /^[\p{L}\s'-]*$/u.test(value), message: `Unicode letters, apostrophes, and hyphens`}
    ]

    const fieldValidation:FieldValidation = {
        name: nameFieldValidation, 
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
        message: [
            {
                condition: value.length > 10, message: `more than 10 characters`
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
    if (value === '') {
        validationMessage = `${messagePrefix}.`
    } else {
        for (let validation of fieldValidation[name]) {
            if (validation.condition === false) {
                validationMessage = `${validation.message !== '' 
                    ? `Use ${validation.message}` 
                    : `${messagePrefix.replace('enter', 'correct')}`}.`
            } 
            
        }

    }
    return validationMessage
}
