'use client'
import Link from "next/link";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "next-themes";

export function Banner() {
    const {theme, setTheme} = useTheme()
    let otherTheme = 'dark'
    let icon = <FaMoon/>

    if (theme == 'dark') {
        otherTheme = 'light'
        icon = <FaSun/>
    }

    return (
        <div className='flex justify-between px-12 pt-12 pb-12'>
            <button onClick={()=>setTheme( otherTheme)}>{icon}</button>
            <Link href='/dashboard/register'>Register</Link>
        </div>
    )
}