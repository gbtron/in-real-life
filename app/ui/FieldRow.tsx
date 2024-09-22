import { ContactField, ContactFormData, FieldRowComponent } from '@/app/lib/definitions';

export const FieldRow : FieldRowComponent = ({ fieldName, setFormData, formData, state }) => {

    const labels : ContactFormData = {
        name: 'Name', 
        email: 'Email', 
        phone: 'Phone Number', 
        message: 'Message'
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const {name, value} = event.target as {name: ContactField, value: string}
        if (name === 'phone') {
            let formattedPhone = value;
            if (value.length === 4 && !['(', '+', '-'].some(char => value.includes(char))) {
                formattedPhone = `${value.slice(0,3)}-${value.slice(-1)}`
            } else if (value.length === 10 && !value.includes('(') && !value.includes('+')) {
                formattedPhone = `(${value.slice(0,3)}) ${value.slice(4,7)}-${value.slice(7)}`
            }
            if (formData.phone !== formattedPhone) {
                setFormData( (previousData => ({
                    ...previousData, 
                    phone: formattedPhone
                }) ))
            }
        } else {
            if (formData[name] !== value) { 
                setFormData({
                    ...formData,
                    [name]: value
                })
            }
            
        }
    }
    const textBoxAttributes = {
        ariaDescribedBy : `${fieldName}-error`, 
        className: "md:ml-16 md:w-80 bg-slate-100 dark:bg-black rounded-sm px-2 py-1" , 
        id: fieldName, 
        name: fieldName, 
        value: formData[fieldName], 
        onChange: handleInputChange

    }

    return (
    <>
        <div className="mt-8 flex flex-col md:flex-row">
            <label className="font-semibold text-sm inline-block w-24 dark:text-tangerine-100" htmlFor={fieldName}>
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
        <div id={`${fieldName}-error`} className="text-red-600" aria-live="polite" aria-atomic="true">
            {state?.errors?.[fieldName]?.[0] &&
                state.errors[fieldName].map( (error:string) => (
                    <p className="text-red-600 my-2 text-sm" key={error}>
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
        </div>
    </>
) }