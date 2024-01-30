import React, { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

import Banner3 from "../assets/sliderImages2.jpg";
import Banner6 from "../assets/voteimg.jpg";
import Banner7 from "../assets/voteimg2.jpg";
import video1 from "../assets/tokenPageVideo.mp4";
import video3 from "../assets/ladyVid.mp4";
import video4 from "../assets/teamVideo.mp4";
import partner1 from "../assets/coinboom.png";
import partner2 from "../assets/allpresale.png";
import partner3 from "../assets/coindiscovery.png";
import partner4 from "../assets/coinmarketcap.png";
import partner5 from "../assets/coinscope.png";
import partner6 from "../assets/coinsgem.png";
import partner7 from "../assets/coinsniper.png";
import partner8 from "../assets/dexscreener.png";
import partner9 from "../assets/geckoterminal.png";
import partner10 from "../assets/gemfinder.png";
import partner11 from "../assets/mycoinvote.png";
import partner12 from "../assets/top100token.png";
import partner14 from "../assets/watcher.png";
import twitter1 from "../assets/t.png";
import youtube1 from "../assets/yt.png";
import tiktok1 from "../assets/tt.png";
import discord1 from "../assets/d.png";
import facebook1 from "../assets/fb.png";
import reddit1 from "../assets/r.png";
import linktree1 from "../assets/lt.png";
import tokenomics1 from "../assets/tokenomics.png";
import dp1Src from "../assets/dp1.jpg";
import dp2Src from "../assets/dp2.jpg";
import dp3Src from "../assets/dp3.jpg";
import insta from "../assets/fb.png";
import twitter from "../assets/twitter.png";
import linked from "../assets/in.png";
import new1 from "../assets/new1.jpg";
import new2 from "../assets/new2.jpg";
import PDF from '../assets/pinkvote-whitepaper.pdf'

const Token = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [tokenAddress, setTokenAddresss] = useState(
    "0x026593a507f20DCF25E0B45E0983C39871735B013"
  );
  const [copyState, getCopyState] = useState("Copy");

  const slides = [
    {
      url: Banner6,
    },
    {
      url: Banner3,
    },
    {
      url: Banner7,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <>
      <div className="align-middle py-10 lg:max-h-[80%] md:max-h-[80%] md:max-w-[80%] sm:max-h-[100%] sm:max-w-[100%] my-0 mx-auto w-full lg:max-w-[80%] relative h-auto">
        <div className="mt-[80px] items-center flex justify-center object-contain w-full flex-col">
          <div className="h-[470px] md:h-[390px] sm:h-[100px] w-full m-auto object-contain relative group">
            <div
              style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
              className="w-10/12 h-full object-fill rounded-2xl bg-center bg-cover duration-500 m-auto"
            ></div>
            {/* Left Arrow */}
            <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
              <BsChevronCompactLeft onClick={prevSlide} size={30} />
            </div>
            {/* Right Arrow */}
            <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
              <BsChevronCompactRight onClick={nextSlide} size={30} />
            </div>
          </div>
        </div>
        <div className="bg-secondary w-full mt-5 pb-5 flex-1">
          <div className="mt-16 bg-inherit text-center text-[black]">
            <h1 className="text-[2.5rem] mb-10">Get the Token</h1>
            <p>{tokenAddress}</p>
            <button
              id="copyAddr"
              onClick={async () => {
                let flag = false;
                document.getElementById("copyAddr").innerText = "Copied";
                setTimeout(() => {
                  document.getElementById("copyAddr").innerText = "Copy";
                }, 3000);
                navigator.clipboard.writeText(tokenAddress);
              }}
              className=" text-[white] hover:bg-[#eb57a4] bg-[#e13c91] px-8 py-4 mt-6"
            >
              Copy
            </button>
          </div>
        </div>

        <div className="mt-20 mb-8 font-bold text-[2.5rem] flex-1 text-center text-[black] ">
          <h1>Meet Our Team</h1>
        </div>
        <div className="flex flex-1 flex-row justify-around flex-wrap ">
          <div className="flex flex-col items-center justify-center rounded-lg shadow-lg bg-secondary dark:bg-gray-800 p-8 my-2 mx-4">
            <div className="flex items-center justify-center">
              <img
                src={dp3Src}
                className="rounded-full h-52 w-52 object-cover"
              />
            </div>
            <div className="mt-6">
              <h2 className="text-lg font-large text-black dark:text-white">
                Paul Hellersdorf
              </h2>
              <div className="mt-6 text-center">
                <p className="text-black dark:text-gray-400">CEO</p>
              </div>
            </div>
            <div className="flex mt-6 text-center">
              <a
                href="https://www.facebook.com/profile.php?id=100090275384678"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={insta}
                  className="w-10 h-10 object-cover mr-4"
                  alt="Instagram"
                />
              </a>
              <a
                href="https://twitter.com/PaulHellersdorf?t=66GwBOHJxEq4l_exCOD48A&s=09"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={twitter}
                  className="w-10 h-10 object-cover mr-4"
                  alt="Twitter"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/paul-hellersdorf-b74631266/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={linked}
                  className="w-10 h-10 object-cover"
                  alt="LinkedIn"
                />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center rounded-lg shadow-lg bg-secondary dark:bg-gray-800 p-8 my-2 mx-4">
            <div className="flex items-center justify-center">
              <img
                src={dp2Src}
                className="rounded-full h-52 w-52 object-cover"
              />
            </div>
            <div className="mt-6">
              <h2 className="text-lg font-large text-black dark:text-white">
                Ponta Kalkuo
              </h2>
              <div className="mt-6 text-center">
                <p className="text-black dark:text-gray-400">COO</p>
              </div>
            </div>
            <div className="flex mt-6 text-center">
              {/* <img
                src={insta}
                className="w-10 h-10 object-cover mr-4"
                alt="Instagram"
              /> */}
              <a
                href="https://twitter.com/PontaKalkuo?t=upQpwN_BUrneTmT3xsxarA&s=09"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={twitter}
                  className="w-10 h-10 object-cover mr-4"
                  alt="Twitter"
                />
              </a>
              {/* <img
                src={linked}
                className="w-10 h-10 object-cover"
                alt="LinkedIn"
              /> */}
            </div>
          </div>

          <div className="flex flex-col items-center  justify-center rounded-lg shadow-lg bg-secondary dark:bg-gray-800 p-8 my-2 mx-4">
            <div className="flex items-center justify-center">
              <img
                src={dp1Src}
                className="rounded-full h-52 w-52 object-cover"
              />
            </div>
            <div className="mt-6">
              <h2 className="text-lg font-large text-black dark:text-white">
                Vanes Texs
              </h2>
              <div className="mt-6 text-center">
                <p className="text-black dark:text-gray-400">CTO</p>
              </div>
            </div>
            <div className="flex mt-6 text-center">
              {/* <img
                src={insta}
                className="w-10 h-10 object-cover mr-4"
                alt="Instagram"
              /> */}
              <a
                href="https://twitter.com/vanessatexs?t=gMEEECv31k2aNkmOmnxpMQ&s=09"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={twitter}
                  className="w-10 h-10 object-cover mr-4"
                  alt="Twitter"
                />
              </a>
              {/* <img
                src={linked}
                className="w-10 h-10 object-cover"
                alt="LinkedIn"
              /> */}
            </div>
          </div>
        </div>
        <div className="mt-20 mb-8 font-bold text-[2.5rem]  text-center text-[black] ">
          <h1>More from us</h1>
        </div>
        <div className="flex flex-row justify-around flex-wrap ">
          <div className="flex flex-1 flex-wrap w-[100%] m-2 justify-start flex-col rounded-lg p-1">
            <div className="flex-1 justify-start flex p-3 ml-16">
              <video controls className="h-52 w-52 object-cover">
                <source src={video4} type="video/mp4" />
              </video>
            </div>
          </div>

          <div className="flex m-2 flex-1 w-[100%] flex-wrap flex-col justify-end rounded-lg p-1">
            <div className="flex-1 justify-end flex p-3 mr-16">
              <video controls className="flex h-52 w-52 object-cover ">
                <source src={video3} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>

        <div className="m-8">
          <video width="1000" height="1000" controls>
            <source src={video1} type="video/mp4" />
          </video>
        </div>

        <div className="bg-secondary w-full flex flex-row justify-around flex-wrap items-center lg:p-[122px] md:!p-[100px] sm:!p-[80px]  space-x-20  ">
          <div className="flex flex-col md:items-center sm:items-center sm:mb-3 md:mb-3 relative md:w-[30%] w-full">
            <h1 className="md:absolute md:text-center md:right-[210px] sm:text-center xs:text-center sm:mb-3 xs:mb-2 md:top-[-90px] font-bold text-[2.5rem] text-black font-libre-baskerville">
              <span className="border-b-4 border-red-500 pb-1/2">Audit</span>{" "}
            </h1>
            <br />
            <h1 className="md:absolute sm:text-center xs:text-center sm:mb-3 xs:mb-2 md:right-[240px] md:top-[0px] font-bold text-[1.0rem] text-black">
              The Audit
            </h1>
            <a
              // href={PDF}
              // target={"_blank"}
              // download={"Pinkvote-whitepaper"}
              className="sm:text-center xs:text-center sm:mb-3 xs:mb-2"
            >
              <button class="md:absolute md:right-[45px] md:top-[90px] bg-cont text-white hover:text-maroon hover:bg-gray md:m-2 sm:m-4 !md:w-[200px] lg:w-[300px] !md:h-[40px] !sm:w-[100px] !sm:h-[20px] lg:h-[60px] py-2 px-3 rounded ">
                Coming Soon
              </button>
            </a>
          </div>
          <div className=" md:w-[50%]  w-full flex  justify-end xs:!justify-center xs:!m-0">
            <img
              className="lg:w-full xs:w-[40%] sm:w-full md:w-full"
              src={new2}
              style={{ transition: "transform 0.3s" }}
              alt=""
            />
          </div>
        </div>

        <div className="bg-secondary w-full flex flex-row justify-around flex-wrap items-center mt-[12px] lg:p-[122px] md:!p-[100px] sm:!p-[80px] space-x-20  ">
          <div className="flex flex-col relative md:w-[30%] w-full">
            <h1 className="md:absolute md:right-[115px] sm:text-center xs:text-center sm:mb-3 xs:mb-2 md:top-[-90px] font-bold text-[2.5rem] text-black font-libre-baskerville">
              <span className="border-b-4 border-red-500 pb-1/2">
                WhitePaper
              </span>{" "}
            </h1>
            <br />
            <h1 className="md:absolute sm:text-center xs:text-center sm:mb-3 xs:mb-2 md:right-[105px] md:top-[0px] font-bold text-[1.0rem] text-black">
              Get All the infos You need
            </h1>
            <a
              href="https://drive.google.com/file/d/1z1pvR4PEnmgbfRM-l4hWROZ3WqIWtZI9/view?usp=sharing"
              download
              target={"_blank"}
              className="sm:text-center xs:text-center sm:mb-3 xs:mb-2"
            >
              <button class="md:absolute md:right-[45px] md:top-[90px] bg-cont text-white hover:text-maroon hover:bg-gray md:m-2 sm:m-4 !md:w-[200px] lg:w-[300px] !md:h-[40px] !sm:w-[100px] !sm:h-[20px] lg:h-[60px] py-2 px-3 rounded">
                Download the WhitePaper
              </button>
            </a>
          </div>
          <div className=" md:w-[50%] xs:!justify-center xs:!m-0 sm:justify-center md:justify-center w-full flex lg:justify-end xl:justify-end 2xl:justify-end">
            <img
              className="lg:w-full xs:w-[40%] sm:w-full md:w-full"
              src={new1}
              style={{ transition: "transform 0.3s" }}
              alt=""
            />
          </div>
        </div>

        <div className="mt-20 font-bold text-[2.5rem]  text-center text-[black] ">
          <h1>Tokenomics</h1>
          <div className="flex flex-row px-10">
            <img src={tokenomics1} alt="" />
          </div>
        </div>

        <div className="mt-20 font-bold text-[2.5rem]  text-center text-[black] ">
          <h1>Timeline</h1>
        </div>
        <div className="flex justify-center relative  w-[100%] ">
          <button
            className="flex items-center text-black bg-primary w-[70%] h-[40px] p-5"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="mr-1">Ǫ1 2023 </span>
            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
              <path d="M10 14l-5-5h10l-5 5z" />
            </svg>
          </button>
          {isOpen && (
            <div className="flex  absolute top-0 left-50 z-10 bg-secondary mt-11 w-[70%]">
              <p className=" p-4  text-black">
                - Marketing Campaign <br /> - Contract <br />- Audit <br /> -
                Presale Pinksale <br /> - Listing on CoinMarketCap
                <br />
                - Listing on CoinGecko
                <br />
                - Listing on Pancakeswap
                <br />
                - Promotion discounts for PinkVote holders
                <br />- LP lock tracking and safety indicators.
              </p>
            </div>
          )}
        </div>
        <div className="flex justify-center relative  w-[100%] mt-4 ">
          <button
            className="flex items-center text-black bg-primary w-[70%] h-[40px] p-5"
            onClick={() => setIsOpen2(!isOpen2)}
          >
            <span className="mr-1">Ǫ2 2023 </span>
            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
              <path d="M10 14l-5-5h10l-5 5z" />
            </svg>
          </button>
          {isOpen2 && (
            <div className="flex  absolute top-0 left-50 z-10 bg-secondary mt-11 w-[70%]">
              <p className=" p-4  text-black">
                - Improve price charts with 7 days, month, market cap view
                <br /> - Improve NFT (user mint, auctions) <br /> - Start Hiring
                process, Content Writer <br /> - Improve our blog <br /> -
                Strengthening our Partnerships <br /> - Investigate listing
                PinkVote Token in further exchanges
              </p>
            </div>
          )}
        </div>
        <div className="flex justify-center relative  w-[100%] mt-4 ">
          <button
            className="flex items-center text-black bg-primary w-[70%] h-[40px] p-5"
            onClick={() => setIsOpen3(!isOpen3)}
          >
            <span className="mr-1">Ǫ3 2023 </span>
            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
              <path d="M10 14l-5-5h10l-5 5z" />
            </svg>
          </button>
          {isOpen3 && (
            <div className="flex  absolute top-0 left-50 z-10 bg-secondary mt-11 w-[70%]">
              <p className=" p-4  text-black">
                - Hiring process, 1 software engineer, marketing specialist
                <br /> - Advanced search feature <br />- Mainstream tokens
                listing (BTC, ETH, etc.)
                <br /> - Create a public API for token information and chart
                prices.
                <br />- Improve Airdrop (generic airdrops/giveaways, more
                trackable tasks)
              </p>
            </div>
          )}
        </div>
        <div className="flex justify-center relative  w-[100%] mt-4 ">
          <button
            className="flex items-center text-black bg-primary w-[70%] h-[40px] p-5"
            onClick={() => setIsOpen4(!isOpen4)}
          >
            <span className="mr-1">Ǫ4 2023 </span>
            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
              <path d="M10 14l-5-5h10l-5 5z" />
            </svg>
          </button>
          {isOpen4 && (
            <div className="flex  absolute top-0 left-50 z-10 bg-secondary mt-11 w-[70%]">
              <p className=" p-4  text-black">
                - Hiring process, 1 more software engineer
                <br /> - Mainstream tokens price tracking <br />- Inhouse
                trading/exchange application
                <br /> -Improve Portfolio with automatic tracking from wallet,
                statistics, predictions.
                <br />- Improve Portfolio with automatic tracking from wallet,
                statistics, predictions.
              </p>
            </div>
          )}
        </div>
        
        <div className="flex">
          <div className="mt-20 font-bold text-[2.5rem] justify-center flex-wrap flex flex-1 flex-col items-center text-center text-[black] ">
            <h1 className="mb-10">Our Partners</h1>
            <div className="flex flex-row m-auto mb-6 mx-20 my-2">
              {/* <a href="#" target="_blank">
                <img
                  className="m-auto sm:w-[65%] md:w-[50%] lg:w-[50%] "
                  src={partner4}
                />
              </a>
              <a href="#" target="_blank">
                <img
                  className="m-auto  sm:w-[70%] md:w-[50%] lg:w-[50%] "
                  src={partner9}
                />
              </a> */}
              <a href="#" target="_blank">
                <img
                  src={partner1}
                  className="m-auto sm:w-[70%] md:w-[50%] lg:w-[50%] "
                />
              </a>
              <a href="#" target="_blank">
                <img
                  src={partner2}
                  className="m-auto sm:w-[70%] md:w-[50%] lg:w-[50%] "
                />
              </a>
              <a href="#" target="_blank">
                <img
                  src={partner3}
                  className="m-auto sm:w-[70%] md:w-[50%] lg:w-[50%] "
                />
              </a>
            </div>
            <div className="flex flex-row px-10 mb-6 mx-20 my-2">
              <a href="#" target="_blank">
                <img
                  src={partner3}
                  className="m-auto sm:w-[70%] md:w-[50%] lg:w-[50%] "
                />
              </a>

              <a href="#" target="_blank">
                <img
                  src={partner5}
                  className="m-auto sm:w-[70%] md:w-[50%] lg:w-[50%] "
                />
              </a>
              <a href="#" target="_blank">
                <img
                  src={partner6}
                  className="m-auto sm:w-[70%] md:w-[50%] lg:w-[50%] "
                />
              </a>
              <a href="#" target="_blank">
                <img
                  src={partner7}
                  className="m-auto sm:w-[70%] md:w-[50%] lg:w-[50%] "
                />
              </a>
              <a href="#" target="_blank">
                <img
                  src={partner14}
                  className="m-auto sm:w-[70%] md:w-[50%] lg:w-[50%] "
                />
              </a>
            </div>
            <div className="flex flex-row px-10 mb-6 mx-20 my-2 ">
              <a href="#" target="_blank">
                <img
                  src={partner8}
                  className="m-auto sm:w-[70%] md:w-[50%] lg:w-[50%] "
                />
              </a>
              <a href="#" target="_blank">
                <img
                  src={partner11}
                  className="m-auto sm:w-[70%] md:w-[50%] lg:w-[50%] "
                />
              </a>
              <a href="#" target="_blank">
                <img
                  src={partner10}
                  className="m-auto sm:w-[70%] md:w-[50%] lg:w-[50%] "
                />
              </a>
              <a href="#" target="_blank">
                <img
                  src={partner12}
                  className="m-auto sm:w-[70%] md:w-[50%] lg:w-[50%] "
                />
              </a>
            </div>
            <div className="flex flex-row px-10"></div>
          </div>
        </div>
        <div className="mt-20 font-bold text-[2.5rem] text-center text-[black] ">
          <h1 className="mb-3">Our Socials</h1>
          <div className="flex flex-row px-28">
            <a
              href="https://twitter.com/Pink_Vote_?t=Fs4Izby8WFFg0UOSZ0To9Q&s=09"
              target="_blank"
            >
              <img
                src={twitter1}
                className="m-auto sm:w-[70%] md:w-[50%] lg:w-[50%] "
              />
            </a>
            <a href="https://www.youtube.com/@Pinkvote" target="_blank">
              <img
                src={youtube1}
                className="m-auto sm:w-[70%] md:w-[50%] lg:w-[50%] "
              />
            </a>
            <a
              href="https://www.tiktok.com/@weddingwdd?_t=8Zmpo7IXEAf&_r=1"
              target="_blank"
            >
              <img
                src={tiktok1}
                className="m-auto sm:w-[70%] md:w-[50%] lg:w-[50%] "
              />
            </a>

            <a href="https://discord.gg/aABaxkDBUw" target="_blank">
              <img
                src={discord1}
                className="m-auto sm:w-[70%] md:w-[50%] lg:w-[50%] "
              />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100090409299616"
              target="_blank"
            >
              <img
                src={facebook1}
                className="m-auto sm:w-[70%] md:w-[50%] lg:w-[50%] "
              />
            </a>
            <a href="https://www.reddit.com/r/PinkVote/" target="_blank">
              <img
                src={reddit1}
                className="m-auto sm:w-[70%] md:w-[50%] lg:w-[50%] "
              />
            </a>
            <a href="https://linktr.ee/pinkvote" target="_blank">
              <img
                src={linktree1}
                className="m-auto sm:w-[70%] md:w-[50%] lg:w-[50%] "
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Token;
