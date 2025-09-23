import React from 'react';
import Image from 'next/image';
import Twitter from "/public/🦆 icon _circle twitterbird_.png";
import Facebook from "/public/🦆 icon _facebook icon_.png";
import Instagram from "/public/🦆 icon _instagram with circle icon_.png";
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className={`bg-[#000] p-8 `}>
        <div className={`hidden md:flex justify-between items-center mb-8`}>
            <div className={`font-[700] text-[20px] leading-[16px] text-[#fff] flex flex-col gap-8`}>
                <Link className={`font-[700] text-[20px] leading-[16px] text-[#fff] `} href="/faq" >FAQ</Link>
                <Link className={`font-[700] text-[20px] leading-[16px] text-[#fff] `} href="/policy" >Shipping & Return Policy</Link>
                <Link className={`font-[700] text-[20px] leading-[16px] text-[#fff] `} href="/about" >About Us</Link>
                <Link className={`font-[700] text-[20px] leading-[16px] text-[#fff] `} href="/terms" >Terms and Conditions</Link>
            </div>
            <div>
                <h6 className={`font-[700] text-[20px] leading-[16px] text-[#fff] mb-8 capitalize`}>stay updated</h6>
                <div className={`flex gap-2 items-center`}>
                    <input className={`border border-[#fff] py-2 font-[300] text-[#fff]  px-6 outline-none w-[227px] `} placeholder='your email....' type="text" name="" id="" />
                    <button className={`cursor-pointer uppercase bg-[#1D7B84] p-6 py-2 text-[#fff] font-[700] text-[16px] text-center rounded-[35px]`}>subscribe</button>
                </div>
            </div>

        </div>

        <div className={`flex justify-between items-center`}>
            <div  className={`flex items-center gap-6`}>
                <a href="twitter.com">
                    <Image src={Twitter} alt="Twitter icon" />
                </a>
                <a href="facebook.com">
                    <Image src={Facebook} alt="Facebook icon" />
                </a>
                <a href="instagram.com">
                    <Image src={Instagram} alt="Instagram icon" />
                </a>
            </div>
            <button className={`text-[#fff] font-[500] text-[10px] leading-[16px] cursor-pointer md:hidden`}>Back to top ˆ </button>
        </div>
        
          

      </footer>
  )
}

export default Footer;
