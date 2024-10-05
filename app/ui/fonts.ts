import { Cardo } from "next/font/google";
import localFont from 'next/font/local'

export const cardo = Cardo({ 
    weight: ['400', '700'],
    subsets: ["greek"] 
});

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
    ]
})

export const acumen = localFont({
    src: '../../public/fonts/AcuminVariableConcept_2.otf'
    
})