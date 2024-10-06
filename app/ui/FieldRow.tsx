'use client'
import { ContactFieldName, ContactField, ContactFormTarget, FieldRowComponent } from '@/app/lib/definitions';
import { useDebouncedCallback } from 'use-debounce';
import { getClientSideValidation } from '../lib/validation';
import clsx from 'clsx';
import React from 'react';

export const FieldRow : FieldRowComponent = ({ fieldName, setContactFields, contactFields, apiState, fieldErrors, setFieldErrors }) => {
    const labels : ContactField = {
        name: 'Name', 
        email: 'Email', 
        phone: 'Phone Number', 
        message: 'Message'
    }

    const slowlyValidate = useDebouncedCallback(
        async (name:ContactFieldName, value: string) => {
            const error = getClientSideValidation(value, name) 
            setFieldErrors({
                ...fieldErrors, 
                [name]: error
            })
        }, 
        1000
    )

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const {name, value} = event.target as ContactFormTarget 
        slowlyValidate(name, value)

        if (name === 'phone') {
            let formattedPhone = value;
            if (value.length === 4 && !['(', '+', '-'].some(char => value.includes(char))) {
                formattedPhone = `${value.slice(0,3)}-${value.slice(-1)}`
            } else if (value.length === 10 && !value.includes('(') && !value.includes('+')) {
                formattedPhone = `(${value.slice(0,3)}) ${value.slice(4,7)}-${value.slice(7)}`
            }
            if (contactFields.phone !== formattedPhone) {
                setContactFields( (previousData => ({
                    ...previousData, 
                    phone: formattedPhone
                }) ))
            }
        } else {
            if (contactFields[name] !== value) { 
                setContactFields({
                    ...contactFields,
                    [name]: value
                })
            } 
        }
    }
    const textBoxAttributes = {
        ariaDescribedBy : `${fieldName}-error`, 
        className: "md:ml-16 md:w-80 bg-slate-100 dark:bg-slate-400 rounded-sm px-2 py-1 " , 
        id: fieldName, 
        name: fieldName, 
        value: contactFields[fieldName], 
        onChange: handleInputChange
    }

    return (
    <div className="h-22 sm:flex">
        <div className={clsx(
            "flex flex-col md:flex-row", 
            {
                'mb-0 sm:mb-8':apiState?.errors?.[fieldName] || fieldErrors[fieldName], 
                'mb-6 sm:mb-8':!apiState?.errors?.[fieldName] && !fieldErrors[fieldName]
            }
        )}>
            <label 
                className={clsx(
                    "font-bold inline-block w-28 dark:text-tangerine-100", 
                    { 'text-red-600 dark:text-red-500':fieldErrors[fieldName]}
                )} 
                htmlFor={fieldName}>
                {labels[fieldName]}
            </label>
            {
            fieldName == 'message' 
                ? <textarea 
                    aria-describedby={textBoxAttributes.ariaDescribedBy}
                    className={textBoxAttributes.className}
                    id={textBoxAttributes.id}
                    name={textBoxAttributes.name} 
                    value={textBoxAttributes.value} 
                    onChange={textBoxAttributes.onChange}
                /> 
                : <input 
                    aria-describedby={textBoxAttributes.ariaDescribedBy}
                    className={textBoxAttributes.className}
                    id={textBoxAttributes.id}
                    name={textBoxAttributes.name} 
                    value={textBoxAttributes.value} 
                    onChange={textBoxAttributes.onChange}
                />
            }
        </div>
        <div id={`${fieldName}-error`} className="dark:text-red-300 text-red-600" aria-live="polite" aria-atomic="true">
            {apiState?.errors?.[fieldName]?.[0] &&
                apiState.errors[fieldName].map( (error:string) => (
                    <p className="my-2" key={error}>
                        {error
                            .replace(
                                'String', 
                                `Your ${labels[fieldName].toLocaleLowerCase()}`)
                            .replace(
                                'must', 
                                'should'
                            )
                        }
                    </p>
                ))
            } 
            {fieldErrors[fieldName] && (
                <p className="sm:px-4">{fieldErrors[fieldName]}</p>
            )}
        </div>
    </div>
) }