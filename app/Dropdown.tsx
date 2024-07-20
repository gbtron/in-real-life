"use client"
import Link from "next/link";
import path from "path";    
import React, {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import type {Page} from "./layout";

export function Dropdown({pages}: {pages: Page[]}) {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }

    const handleLinkClick = (url:string) => (event: React.MouseEvent) => {  
        event.preventDefault();
        setIsOpen(false);
        router.push(url)
    }
    useEffect(() => {
        const element = document.querySelector('.page-content')!
        if (isOpen) {   
            element.classList.add('hidden');
        } else {
            element.classList.remove('hidden');
        }
        return () => {
            element.classList.remove('hidden');
        };
    }, [isOpen]);

    return (
        <>
            <nav className="bg-gradient-to-r from-slate-100 via-indigo-200 via-70% to-fuchsia-200 pt-8 sm:hidden flex justify-between px-8 sm:pl-[28rem] pb-4 top-0 w-full z-10">
                <div className="flex justify-between" style={{width: '100%'}}>
                    <Link href={pages[0].path} className="font-bold">{pages[0].name}</Link>
                    {!isOpen && (
                        <button onClick={toggleDropdown}>
                            <div className="flex flex-col items-center justify-around h-6 w-10 p-1 bg-slate-100 rounded-full">
                                <div className="bg-black w-4 h-0.5 rounded-sm relative "></div>
                                <div className="bg-black w-4 h-0.5 rounded-sm relative "></div>
                                <div className="bg-black w-4 h-0.5 rounded-sm relative "></div>
                            </div>
                        </button>
                    )}
                    {isOpen && (
                        <button onClick={toggleDropdown}>
                            <div className="relative bg-slate-100 w-10 h-6 rounded-full font-medium text-1xl text-gray-700">X
                            </div>
                        </button>
                    )}
                </div>
            </nav>
            <div className={`fixed inset-x-0 bottom-0 top-16 bg-slate-100 h-6/6 flex justify-center items-center flex-col transition-opacity duration-300 ease-out ${isOpen ? 'opacity-100 z-20' : 'opacity-0 z-0'}`}>
                {pages.map((page, i) => {
                    if (page.path == "/") {
                        return null;
                    }
                    return (
                        <Link href={page.path} key={i} className={`text-4xl p-4 ${!isOpen ? 'pointer-events-none' : ''}`} onClick={handleLinkClick(page.path)}>
                            {page.name}
                        </Link>
                    )
                })}
            </div>
        </>
    );

}