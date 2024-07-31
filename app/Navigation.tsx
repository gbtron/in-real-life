"use client"
import Link from "next/link";
import path from "path";
import React from "react";
import type {Page} from "./layout";
import { hanken_grotesk } from "@/app/ui/fonts";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export function Navigation({pages}: {pages: Page[]}) {
    const pathname = usePathname();
    console.log("pathname-:", pathname, "pagespath-:", pages[0].path);

    return (
        <div className={clsx(
            "text-slate-800", 
            {
                "bg-gradient-to-r from-slate-100 via-indigo-200 via-70% to-fuchsia-200": pathname === "/", 
                "bg-slate-100": pathname === "/contact"
            } 
            )}>
            <nav className="pt-8 sm:flex justify-between hidden bg-inherit top-0 w-100% z-10 px-12 sm:px-[--columnPaddingNormal] sm:mx-auto sm:overflow-hidden sm:max-w-[calc(var(--columnPaddingNormal)*2+var(--layoutWidthMax))]">
                <ul className="flex space-x-12 text-lg " >
                    {pages.map((page, i) => (
                            <li key={i} className={clsx(
                                `${hanken_grotesk.className} hover:text-blue-400 `,
                                {
                                    'font-semibold': page.path === pathname, 
                                    'font-medium': page.path !== pathname
                                }
                            )}>
                                <Link href={page.path}>
                                    {page.name}
                                </Link>
                            </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
    }