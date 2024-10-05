import { Cardo } from "next/font/google";
import localFont from 'next/font/local'

export const cardo = Cardo({ 
    weight: ['400', '700'],
    subsets: ["greek"] 
});

export const bookmania = localFont({
    src: [
        {
            path: '../../public/fonts/Bookmania-Black.woff2', 
            weight: '900', 
            style: 'normal'
        },
        // {
        //     path: '../../public/fonts/Bookmania-BlackItalic.woff2', 
        //     weight: '900', 
        //     style: 'italic'
        // }, 
        // {
        //     path: '../../public/fonts/Bookmania-Bold.woff2', 
        //     weight: '700', 
        //     style: 'normal'
        // }, 
        // {
        //     path: '../../public/fonts/Bookmania-BoldItalic.woff2', 
        //     weight: '700', 
        //     style: 'italic'
        // }, 
        // {
        //     path: '../../public/fonts/Bookmania-Light.woff2', 
        //     weight: '100', 
        //     style: 'normal'
        // }, 
        // {
        //     path: '../../public/fonts/Bookmania-LightItalic.woff2', 
        //     weight: '100', 
        //     style: 'italic'
        // }, 
        {
            path: '../../public/fonts/Bookmania-Regular.woff2', 
            weight: '400', 
            style: 'normal'
        }, 
        // {
        //     path: '../../public/fonts/Bookmania-RegularItalic.woff2', 
        //     weight: '400', 
        //     style: 'italic'
        // }, 
        {
            path: '../../public/fonts/Bookmania-Semibold.woff2', 
            weight: '500', 
            style: 'normal'
        }, 
        // {
        //     path: '../../public/fonts/Bookmania-SemiboldItalic.woff2', 
        //     weight: '500', 
        //     style: 'italic'
        // }
    ]
})

export const acumen = localFont({
    src: '../../public/fonts/AcuminVariableConcept_2.otf'
    
})