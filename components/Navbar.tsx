'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {

    const path = usePathname();

    if (path.includes("admin")) {
        return (
            <nav className="bg-orange-400 w-full absolute z-10 max-w-[1440px] mx-auto flex justify-between items-center 
            sm:px-16 px-6 py-4" style={{ fontSize: "1.3rem", lineHeight: "1.8rem" }}>

                <Link href="/" className={`flex justify-center items-center`}>
                    <img src="../images/logo.svg" alt="logo" style={{ width: "auto", height: "45px" }} />
                </Link>
                <Link href="/admin" className={`flex justify-center items-center ${path == "/admin" ? "underline underline-offset-4" : ""}`}>Dishes</Link>
                <Link href="/admin/categories" className={`flex justify-center items-center ${path == "/admin/categories" ? "underline underline-offset-4" : ""}`}>Categories</Link>
                <Link href="/" className={`flex justify-center items-center`}>Logout</Link>

            </nav>
        )
    }

    return (
        <nav className="bg-orange-400 w-full absolute z-10 max-w-[1440px] mx-auto flex justify-between items-center 
                            sm:px-16 px-6 py-4" style={{ fontSize: "1.3rem", lineHeight: "1.8rem" }}>

            <Link href="/" className={`flex justify-center items-center`}>
                <img src="../images/logo.svg" alt="logo" style={{ width: "auto", height: "45px" }} />
            </Link>
            <Link href="/about" className={`flex justify-center items-center ${path == "/about" ? "underline underline-offset-4" : ""}`}>About</Link>
            <Link href="/" className={`flex justify-center items-center ${path == "/" ? "underline underline-offset-4" : ""}`}>Menu</Link>
            <Link href="/contact" className={`flex justify-center items-center ${path == "/contact" ? "underline underline-offset-4" : ""}`}>Contact</Link>

        </nav>
    )
}

export default Navbar;