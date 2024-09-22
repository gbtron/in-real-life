'use client'
import { FaSun, FaMoon } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useTheme } from "next-themes";
import { useUser } from "@auth0/nextjs-auth0/client";
import { usePathname } from "next/navigation";

export function Banner() {
    const currentPath = usePathname()
    const { user, error, isLoading } = useUser()
    const { theme, setTheme } = useTheme()

    const isDarkMode = theme == 'dark'
    const isLoggedIn = user !== undefined

    const toggleDarkMode = () => {
        setTheme(isDarkMode ? 'light' : 'dark')
    }
    const themeIcon = isDarkMode ? <FaSun/> : <FaMoon/>
    const themeLabel = isDarkMode ? "Sun icon" : "Moon icon"
    const themeColor = isDarkMode ? "#F7E6DE" : "black"
    const accountLabel = isLoggedIn ? "log out" : "log in"
    
    return (
        <header aria-label={`${themeLabel} and ${accountLabel} buttons.`} className='flex gap-4 sm:gap-12 items-center p-4 sm:p-12'>
            <button 
                className="rounded-xl p-1.5" 
                onClick={toggleDarkMode} 
                value="darkModeToggle"
            >
                <IconContext.Provider value={{ color: themeColor }}>{themeIcon}</IconContext.Provider>
            </button>
            <div className="dark:text-tangerine-100 hover:font-bold rounded-md p-1">
                {isLoggedIn
                    ? (!isLoading && !error) && <a href='/api/auth/logout'>Log Out</a> 
                    : currentPath !== '/' && <a href='/api/auth/login'>Log In</a>
                }
            </div>
            
        </header>
    )
}