"use client"
import Link from "next/link";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import React from "react";
import type {Page} from "../layout";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export function Navigation({pages}: {pages: Page[]}) {
    const pathName = usePathname();

    return (
        <div className={clsx(
            "text-slate-800", 
            {
                "bg-gradient-to-r from-slate-100 via-indigo-200 via-70% to-fuchsia-200": pathName === "/", 
                "bg-slate-100": pathName !== "/", 
                "hidden": pathName.includes("/dashboard")
            } 
            )}>
            <nav className="pt-8 sm:flex justify-between hidden bg-inherit top-0 w-100% z-10 px-12 sm:px-8 sm:mx-auto sm:overflow-hidden sm:max-w-6xl">
                <ul className="flex text-lg " >
                    <div className="flex space-x-12 items-center z-10">
                    {pages.map((page, i) => (
                        <li key={i} className={clsx(
                            `hover:text-blue-400 `,
                            {
                                'font-bold': page.path === pathName, 
                                ' ': page.path !== pathName
                            }
                        )}>
                            {page.path === "/" 
                                ?
                                <Link href="/">
                                    <Image src="/assets/IRL_Logo_Final_Main.png" alt="In Real Life Logo" width={100} height={100} className="relative"/>    
                                </Link>
                                :
                                <Link href={page.path}>
                                    {page.name}
                                </Link>
                            }
                        </li>
                    ))}
                    </div>
                    <Link href="/dashboard/login" className="absolute right-80 top-16 z-10">
                        <li className={`hover:text-blue-400  `}>
                            <FaUser className="inline-block mr-2"/>
                            Login
                        </li>
                    </Link>
                </ul>
            </nav>
        </div>
    );
}