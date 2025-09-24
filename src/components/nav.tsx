"use client";
import React, { useState, useEffect } from 'react';
import { IoMdMenu } from "react-icons/io";
import Image from "next/image";
import BloomLogo from "/public/BLOOM 4.png";
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import SearchBar from './SearchBar';



const Nav = () => {
    const [toggle, setToggle] = useState(false);
    const handleToggle = () => {
        setToggle(!toggle);
    }
    const path = usePathname();

 useEffect(() => {
    setToggle(false); 
}, [path]);
   

  return (
    <nav className={` md: bg-[#000]`}>
        {/* desktop view */}
        <div className={`p-4 flex justify-between items-center `}>
            <Link href="/" className={`w-[300px]`}>
                <Image className={`w-[10%] md:w-[20%]`} src={BloomLogo} alt="Bloom bookstore logo" />
            </Link>
            <button onClick={handleToggle} className={`md:hidden cursor-pointer`}>
                <IoMdMenu className={`text-[#fff]`} />  
            </button>
            <div className={`hidden md:flex w-[70%] lg:w-[50%] px-4 justify-between items-center gap-8`}>
                <Link onClick={handleToggle} href="/dashboard" className={` flex gap-2 items-center capitalize text-[18px] leading-[24px] font-[600] hover:ease-in-out hover:duration-300 hover:transition-all hover:delay-75 hover:text-[#1D7B84] ease-in-out transition-all duration-300 delay-75 ${path === "/dashboard" ? ` text-[#1D7B84] ` : `text-[#fff]`}`}>dashboard</Link>
                <Link onClick={handleToggle} href="/blog" className={` flex gap-2 items-center capitalize text-[18px] leading-[24px] font-[600] hover:ease-in-out hover:duration-300 hover:transition-all hover:delay-75 hover:text-[#1D7B84] ease-in-out transition-all duration-300 delay-75 ${path === "/blog" ? ` text-[#1D7B84] ` : `text-[#fff]`}`}>blog</Link>
                <Link onClick={handleToggle} href="/more" className={` flex gap-2 items-center capitalize text-[18px] leading-[24px] font-[600] hover:ease-in-out hover:duration-300 hover:transition-all hover:delay-75 hover:text-[#1D7B84] ease-in-out transition-all duration-300 delay-75 ${path === "/more" ? ` text-[#1D7B84] ` : `text-[#fff]`}`}>more</Link>
                <Link onClick={handleToggle} href="/cart" className={` flex gap-2 items-center capitalize text-[18px] leading-[24px] font-[600] hover:ease-in-out hover:duration-300 hover:transition-all hover:delay-75 hover:text-[#1D7B84] ease-in-out transition-all duration-300 delay-75 ${path === "/cart" ? ` text-[#1D7B84] ` : `text-[#fff]`}`}>cart</Link>
                <button className={`p-2 w-[89.12px] h-[44px] bg-[#1D7B84] font-[700] text-[10px] md:text-[15px] text-[#fff] leading-[16px] cursor-pointer rounded-[15px] uppercase`}>shop</button>
                <div>
                    <SearchBar />
                </div>
            </div>
        </div>

        <div className={`bg-[#000] md:hidden shadow-md fixed top-0 right-0 left-0 bottom-0 ${toggle ? `opacity-100 w-[85%] ease-in-out duration-1000 delay-75 transition-all translate-x-[0]` : `opacity-0 ease-in-out duration-700 delay-75 transition-all translate-x-[-100%]`}`}>
            {/* Mobile view */}
            <div className={``}>
                <div className={`md:hidden m-0 md:my-8 flex justify-between items-center p-4 pr-8`}>
                    <Link href="/" className={`w-[300px]`}>
                        <Image className={`w-[10%]`} src={BloomLogo} alt="Bloom bookstore logo" />
                    </Link>
                    <IoMdClose onClick={handleToggle} className={`cursor-pointer text-[#fff]`} />
                </div>
                <div className={`p-4 flex flex-col gap-8`}>
                    <Link onClick={handleToggle} href="/dashboard" className={` flex gap-2 items-center capitalize text-[18px] leading-[24px] font-[600] hover:ease-in-out hover:duration-300 hover:transition-all hover:delay-75 hover:text-[#1D7B84] ease-in-out transition-all duration-300 delay-75 ${path === "/dashboard" ? ` text-[#1D7B84] ` : `text-[#fff]`}`}>dashboard</Link>
                    <Link onClick={handleToggle} href="/blog" className={` flex gap-2 items-center capitalize text-[18px] leading-[24px] font-[600] hover:ease-in-out hover:duration-300 hover:transition-all hover:delay-75 hover:text-[#1D7B84] ease-in-out transition-all duration-300 delay-75 ${path === "/blog" ? ` text-[#1D7B84] ` : `text-[#fff]`}`}>blog</Link>
                    <Link onClick={handleToggle} href="/more" className={` flex gap-2 items-center capitalize text-[18px] leading-[24px] font-[600] hover:ease-in-out hover:duration-300 hover:transition-all hover:delay-75 hover:text-[#1D7B84] ease-in-out transition-all duration-300 delay-75 ${path === "/more" ? ` text-[#1D7B84] ` : `text-[#fff]`}`}>more</Link>
                    <Link onClick={handleToggle} href="/cart" className={` flex gap-2 items-center capitalize text-[18px] leading-[24px] font-[600] hover:ease-in-out hover:duration-300 hover:transition-all hover:delay-75 hover:text-[#1D7B84] ease-in-out transition-all duration-300 delay-75 ${path === "/cart" ? ` text-[#1D7B84] ` : `text-[#fff]`}`}>cart</Link>
                    <button className={`p-2 w-[89.12px] h-[44px] bg-[#1D7B84] font-[700] text-[10px] md:text-[20px] text-[#fff] leading-[16px] cursor-pointer rounded-[15px] uppercase`}>shop</button>
                    <div>
                        <SearchBar />
                    </div>
                </div>
            </div>
        </div>
        <div onClick={handleToggle} className={`md:hidden fixed h-[100vh] top-0 right-0 bottom-0 bg-[rgba(0,0,0,0.75)] ${toggle ? `w-[85%] ease-in-out duration-700 delay-75 transition-all translate-x-[0] left-[85%] lg:hidden` : `ease-in-out duration-700 delay-75 transition-all translate-x-[-100%] lg:hidden`}`}></div>
    </nav>
  )
}

export default Nav;
