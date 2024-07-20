import Link from "next/link";
import path from "path";
import React from "react";
import type {Page} from "./layout";

export function Navigation({pages}: {pages: Page[]}) {
    return (
        <div className="bg-gradient-to-r from-slate-100 via-indigo-200 via-70% to-fuchsia-200 ">
            <nav className="pt-8 sm:flex justify-between hidden bg-inherit top-0 w-100% z-10 px-12 sm:px-[--columnPaddingNormal] sm:mx-auto sm:overflow-hidden sm:max-w-[calc(var(--columnPaddingNormal)*2+var(--layoutWidthMax))]">
            <ul className="flex space-x-12 text-lg " >
                {pages.map((page, i) => {
                    let classes = "font-nav hover:text-gray-400";
                    if (page.path == "/") {
                        classes += " hover:cursor-pointer font-bold";
                    }
                    return (
                        <li key={i} className={classes}>
                            <Link href={page.path}>
                                {page.name}
                            </Link>
                        </li>
                )})}
            </ul>
        </nav>
        </div>
    );
    }