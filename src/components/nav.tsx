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
    <nav  className={` md:pb-10 bg-[#000]`}>
        <div className={`p-4 flex justify-between items-center`}>
            <Link href="/" className={`w-[300px]`}>
                <Image className={`w-[10%]`} src={BloomLogo} alt="Bloom bookstore logo" />
            </Link>
            <button onClick={handleToggle} className={`md:hidden cursor-pointer`}>
                <IoMdMenu className={`text-[#fff]`} />  
            </button>
            <div className={`hidden md:flex w-[70%] lg:w-[50%] p-4 justify-between items-center gap-8`}>
                <Link onClick={handleToggle} href="/event" className={` flex gap-2 items-center capitalize text-[18px] leading-[24px] font-[600] hover:ease-in-out hover:duration-300 hover:transition-all hover:delay-75 hover:text-[#EA2229] ease-in-out transition-all duration-300 delay-75 ${path === "/event" ? ` text-[#1D7B84] ` : `text-[#fff]`}`}>events</Link>
                <Link onClick={handleToggle} href="/blog" className={` flex gap-2 items-center capitalize text-[18px] leading-[24px] font-[600] hover:ease-in-out hover:duration-300 hover:transition-all hover:delay-75 hover:text-[#EA2229] ease-in-out transition-all duration-300 delay-75 ${path === "/blog" ? ` text-[#1D7B84] ` : `text-[#fff]`}`}>blog</Link>
                <Link onClick={handleToggle} href="/more" className={` flex gap-2 items-center capitalize text-[18px] leading-[24px] font-[600] hover:ease-in-out hover:duration-300 hover:transition-all hover:delay-75 hover:text-[#EA2229] ease-in-out transition-all duration-300 delay-75 ${path === "/more" ? ` text-[#1D7B84] ` : `text-[#fff]`}`}>more</Link>
                <Link onClick={handleToggle} href="/cart" className={` flex gap-2 items-center capitalize text-[18px] leading-[24px] font-[600] hover:ease-in-out hover:duration-300 hover:transition-all hover:delay-75 hover:text-[#EA2229] ease-in-out transition-all duration-300 delay-75 ${path === "/cart" ? ` text-[#1D7B84] ` : `text-[#fff]`}`}>cart</Link>
                <button className={`p-2 w-[89.12px] h-[44px] bg-[#1D7B84] font-[700] text-[10px] md:text-[20px] text-[#fff] leading-[16px] cursor-pointer rounded-[15px] uppercase`}>shop</button>
                <div>
                    <SearchBar />
                    {/* <IoSearchSharp onClick={openSearch} className={`text-[#fff] ${search ? `hidden` : `block`}`} /> */}
                    {/* <input className={`${search ? `block` : `hidden`} p-2 px-6 w-full border border-[#fff] outline-none text-[#fff] text-[12px] rounded-[15px]`} type="text" name="" id="" /> */}
                </div>
            </div>
        </div>

        <div className={`bg-[#000] md:hidden shadow-md fixed top-0 right-0 left-0 bottom-0 ${toggle ? `opacity-100 w-[85%] ease-in-out duration-1000 delay-75 transition-all translate-x-[0]` : `opacity-0 ease-in-out duration-700 delay-75 transition-all translate-x-[-100%]`}`}>

            <div className={`md:hidden my-8 flex justify-between items-center p-4 pr-8`}>
                <Link href="/" className={`w-[300px]`}>
                    <Image className={``} src={BloomLogo} alt="Bloom bookstore logo" />
                </Link>
                <IoMdClose onClick={handleToggle} className={`cursor-pointer text-[#fff]`} />
            </div>
            <div className={`p-4 flex flex-col gap-8`}>
                <Link onClick={handleToggle} href="/event" className={` flex gap-2 items-center capitalize text-[18px] leading-[24px] font-[600] hover:ease-in-out hover:duration-300 hover:transition-all hover:delay-75 hover:text-[#EA2229] ease-in-out transition-all duration-300 delay-75 ${path === "/event" ? ` text-[#1D7B84] ` : `text-[#fff]`}`}>events</Link>
                <Link onClick={handleToggle} href="/blog" className={` flex gap-2 items-center capitalize text-[18px] leading-[24px] font-[600] hover:ease-in-out hover:duration-300 hover:transition-all hover:delay-75 hover:text-[#EA2229] ease-in-out transition-all duration-300 delay-75 ${path === "/blog" ? ` text-[#1D7B84] ` : `text-[#fff]`}`}>blog</Link>
                <Link onClick={handleToggle} href="/more" className={` flex gap-2 items-center capitalize text-[18px] leading-[24px] font-[600] hover:ease-in-out hover:duration-300 hover:transition-all hover:delay-75 hover:text-[#EA2229] ease-in-out transition-all duration-300 delay-75 ${path === "/more" ? ` text-[#1D7B84] ` : `text-[#fff]`}`}>more</Link>
                <Link onClick={handleToggle} href="/cart" className={` flex gap-2 items-center capitalize text-[18px] leading-[24px] font-[600] hover:ease-in-out hover:duration-300 hover:transition-all hover:delay-75 hover:text-[#EA2229] ease-in-out transition-all duration-300 delay-75 ${path === "/cart" ? ` text-[#1D7B84] ` : `text-[#fff]`}`}>cart</Link>
                <button className={`p-2 w-[89.12px] h-[44px] bg-[#1D7B84] font-[700] text-[10px] md:text-[20px] text-[#fff] leading-[16px] cursor-pointer rounded-[15px] uppercase`}>shop</button>
                <div>
                    {/* <IoSearchSharp onClick={openSearch} className={`text-[#fff] ${search ? `hidden` : `block`}`} /> */}
                    <SearchBar />
                    {/* <input className={`${search ? `block` : `hidden`} p-2 px-6 w-full border border-[#fff] outline-none text-[#fff] text-[12px] rounded-[15px]`} type="text" name="" id="" /> */}
                </div>
            </div>
        </div>

        
        <div onClick={handleToggle} className={`md:hidden fixed h-[100vh] top-0 right-0 bottom-0 bg-[rgba(0,0,0,0.75)] ${toggle ? `w-[85%] ease-in-out duration-700 delay-75 transition-all translate-x-[0] left-[85%] lg:hidden` : `ease-in-out duration-700 delay-75 transition-all translate-x-[-100%] lg:hidden`}`}></div>
    </nav>
  )
}

export default Nav;
