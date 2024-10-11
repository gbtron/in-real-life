
import localFont from 'next/font/local'

export const acumen = localFont({ 
    src: '../../public/fonts/AcuminVariableConcept_2.otf',
    display:'swap', 
    variable:'--font-acumen'
})

export const bookmania = localFont({
    src: [
        {
            path: '../../public/fonts/Bookmania-Bold.woff2', 
            weight: '700', 
            style: 'normal'
        }, 
        {
            path: '../../public/fonts/Bookmania-Regular.woff2', 
            weight: '400', 
            style: 'normal'
        }
    ], 
    display:'swap', 
    variable:'--font-bookmania'
})