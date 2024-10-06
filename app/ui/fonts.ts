
import localFont from 'next/font/local'
import {EB_Garamond} from 'next/font/google'

export const garamond = EB_Garamond({ 
    subsets: ["latin"], 
    variable:'--font-sans', 
    display:'swap' 
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
    ], 
    display:'swap', 
    variable:'--font-bookmania'
})