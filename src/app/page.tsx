import Image from "next/image";
import BloomProgramming from "/public/Rectangle 6.png";
import GetIt from "/public/Rectangle 36.png";
import MadHoney from "/public/Rectangle 37.png";
import SmallWorld from "/public/Rectangle 38.png";
import NormalPeople from "/public/Rectangle 39.png";
import Alchemist from "/public/Rectangle 40.png";
import Homecoming from "/public/Rectangle 41.png";
import AmericanDirt from "/public/Rectangle 42.png";
import PaulaHawkins from "/public/Rectangle 43.png";
import There from "/public/Rectangle 45.png";
import Kindred from "/public/Rectangle 44.png";
import { FaQuoteLeft } from "react-icons/fa";
import style from "../styles/landingPage.module.css";
import Nav from "../components/nav";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main>
      <header className={`${style.header}`}>
        {/* <Nav /> */}
        <div className={`flex flex-col p-4 items-center justify-center`}>
          <h1 className={`p-4 uppercase font-[700] text-[20px] md:text-[60px] md:mb-8 leading-[24px] text-[#fff]`}>
            bloom bookshop
          </h1>
          <p className={`font-[400] text-[8px] md:text-[18px] text-[#fff] text-center leading-[24px] mb-6 capitalize`}>Step Into Your Local Bookstore, Online: Expertly Curated, Community-Driven</p>
          <div>
            <button className={`bg-[#1D7B84] cursor-pointer text-[#fff] w-[143px] py-1 uppercase text-[10px] md:text-[16px] font-[700] leading-[30px] text-center px-4 md:py-2 rounded-[35px] flex justify-center items-center mb-8 md:mb-[8rem]`}>shop now</button>
          </div>
        </div>
      </header>

      <section className={`my-4 p-4 md:mt-10`}>
        <h2 className={`capitalize font-[700] text-[20px] md:text-[38px] leading-[30px] text-center text-[#000] mb-4 md:mb-10`}>who we are</h2>
        <div>
          <p className={`font-[400] text-[10px] md:text-[18px] text-center leading-[12px] md:leading-[22px] text-[#000] mb-4 md:mb-6`}>Welcome to Bloom, your favorite hometown bookstore now online! We&apos;re passionate about sharing the joy of reading and connecting book lovers everywhere.</p>
          <p className={`font-[400] text-[10px] md:text-[18px] text-center leading-[12px] md:leading-[22px] text-[#000] mb-8`}>At Bloom, we&apos;re more than booksellers - we&apos;re community builders. Discover curated selections, lively events, and your next favorite book with us.Trust Bloom for expertly curated books, author talks, and workshops, all guided by passionate booksellers with decades of expertise.</p>
        </div>

        <div>
          <div className={`flex justify-center items-center`}>
            <div className={`w-full h-[1.5px] bg-[#000] mr-2`}></div>
            <FaQuoteLeft  className={`text-[50px]`} />
            <div className={`w-full h-[1.5px] bg-[#000] ml-2`}></div>
          </div>
          <div className={`my-4`}>
            <p className={`font-[400] text-[10px] md:text-[22px] md:mb-6 leading-[16px] text-[#000] italic text-center`}>“There is no friend as loyal as a book.”</p>
            <p className={`font-[500] text-[10px] md:text-[22px] leading-[16px] text-[#000] text-center`}>-Ernest Hemingway</p>
          </div>
          <div className={`flex justify-center items-center`}>
            <div className={`w-full h-[1.5px] bg-[#000] mr-2`}></div>
            <FaQuoteLeft className={`rotate-180 text-[50px]`} />
            <div className={`w-full h-[1.5px] bg-[#000] ml-2`}></div>
          </div>
        </div>
      </section>

      <section className={`p-4 md:mb-8`}>
        <div className={`flex justify-center md:justify-between items-center`}>
          <div className={`w-[50%] md:w-[35%]`}>
            <Image className={`md:w-full`} src={BloomProgramming} alt="Bloom Programming image" />
          </div>
          <div className={`w-[60%] md:w-[60%]`}>
            <h3 className={`mb-4 font-[700] text-[17px] md:text-[38px] md:mb-8 leading-[16px] text-[#000] capitalize`}>bloom programming</h3>
            <p className={`font-[400] text-[9.5px] md:text-[18px] leading-[12px] md:leading-[22px] md:mb-6 text-[#000] mb-4`}>To further community engagement, we host an array of literary and cultural events, including monthly book clubs for children and adults, an annual book fair, and an annual holiday gift bazaar.</p>
            <p className={`font-[400] text-[9.5px] md:text-[18px] leading-[12px] md:leading-[22px] text-[#000]`}>Inspired by London&apos;s Gresham College — an institution providing free public lectures since 1597 — our mission is to foster the advancement of culture and knowledge. Bloom Programming events seek to entertain our sense of curiosity, inspire new areas of interest, and ultimately contribute to Tampa&apos;s emergence as a cultural destination.</p>
            <div>
              <button className={`w-[172px] cursor-pointer rounded-[35px] bg-[#000] my-4 py-2 px-4 text-[#fff] uppercase text-[10px] text-center leading-[16px]`}>learn more</button>
            </div>
          </div>
        </div>
      </section>

      <section className={`p-4 mb-8`}>
        <div className={``}>
          <h4 className={`mb-4 font-[700] text-[17px] md:text-[38px] md:leading-[22px] md:mb-[4rem] leading-[16px] text-[#000] capitalize text-center`}>what booksellers recommend</h4>
          <div className={`mb-6 md:mb-[4.5rem]`}>
            <div className={`flex justify-between items-center mb-4 md:flex-col md:justify-center md:items-center text-center`}>
              <p className={`capitalize text-[15px] md:text-[24px] md:mb-6 font-[500] leading-[16px] text-[#000] w-[50%]`}>Jane&apos;s picks</p>
              <p className={`text-[8px] md:text-[18px] italic font-[400] leading-[16px] md:leading-[22px] md:mb-8 text-[#000] w-[95%]`}>For the lover of thought-provoking fiction and timeless classics. Jane&apos;s picks are sure to challenge your mind and stir your emotions.</p>
            </div>
            <div className={`grid grid-cols-5 gap-2 md:w-[80%] md:mx-auto`}>
              <Image className={`md:w-full`} src={GetIt} alt="recommended books (Get it)" />
              <Image className={`md:w-full`} src={MadHoney} alt="recommended books (Mad honey)" />
              <Image className={`md:w-full`} src={SmallWorld} alt="recommended books (Small world)" />
              <Image className={`md:w-full`} src={NormalPeople} alt="recommended books (Normal people)" />
              <Image className={`md:w-full`} src={Alchemist} alt="recommended books (Alchemist)" />
            </div>
          </div>

          <div className={`mb-6`}>
            <div className={`flex justify-between items-center mb-4 md:flex-col md:justify-center md:items-center text-center`}>
              <p className={`capitalize text-[15px] md:text-[24px] md:mb-6 font-[500] leading-[16px] text-[#000] w-[50%]`}>Sarah&apos;s picks</p>
              <p className={`text-[8px] md:text-[18px] italic font-[400] leading-[16px] md:leading-[22px] md:mb-8 text-[#000] w-[95%]`}>For the adventure-seeker and mystery enthusiast. Sarah&apos;s selections will keep you on the edge of your seat with thrilling plots and unexpected twists.</p>
            </div>
            <div className={`grid grid-cols-5 gap-2 md:w-[80%] md:mx-auto`}>
              <Image className={`md:w-full`} src={Homecoming} alt="recommended books (Homecoming)" />
              <Image className={`md:w-full`} src={AmericanDirt} alt="recommended books (American dirt)" />
              <Image className={`md:w-full`} src={PaulaHawkins} alt="recommended books (Paula hawkins)" />
              <Image className={`md:w-full`} src={There} alt="recommended books (There)" />
              <Image className={`md:w-full`} src={Kindred} alt="recommended books (Kindred)" />
            </div>
          </div>
        </div>
      </section>
      {/* <Footer /> */}
    </main>
  );
}
