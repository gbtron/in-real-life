'use client'
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "next-themes";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import { bookmania, acumen  } from "@/app/ui/fonts";

export function Banner({user}:UserProfile) {
    const {theme, setTheme} = useTheme()
    let themeNot = 'dark'
    let icon = <FaMoon/>
    console.log('user-', user)

    if (theme == 'dark') {
        themeNot = 'light'
        icon = <FaSun/>
    }
    
    return (
        <div className={`flex justify-between px-12 pt-12 pb-12 ${acumen.className} font-bold`}>
            <button onClick={()=>setTheme(themeNot)}>{icon}</button>
            {user !== undefined ? <a href='/api/auth/logout' >Log Out</a> : <a href='/api/auth/login'>Log In</a>}
            
        </div>
    )
}