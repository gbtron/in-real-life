import { ContactFormData, BooleanDisptach } from "@/app/lib/definitions"

export const checkNoFieldsAreEmpty = (fieldValues: ContactFormData, setFieldsFilled: BooleanDisptach) => {
    if (Object.values(fieldValues).every((field) => field !== '')) {
        setFieldsFilled(true)
    } else {
        setFieldsFilled(false)
    }
}