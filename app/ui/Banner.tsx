import Link from "next/link";
import { FaSun, FaMoon } from "react-icons/fa";

export function Banner() {
    return (
        <div className='flex justify-between px-12'>
            <button><FaMoon/></button>
            <Link href='/dashboard/register'>Register</Link>
        </div>
    )
}