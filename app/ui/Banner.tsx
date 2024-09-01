'use client'
import Link from "next/link";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "next-themes";

export function Banner() {
    const {theme, setTheme} = useTheme()
    let themeNot = 'dark'
    let icon = <FaMoon/>

    if (theme == 'dark') {
        themeNot = 'light'
        icon = <FaSun/>
    }

    return (
        <div className='flex justify-between px-12 pt-12 pb-12'>
            <button onClick={()=>setTheme(themeNot)}>{icon}</button>
            <Link href='/dashboard/register'>Register</Link>
        </div>
    )
}