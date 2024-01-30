import React, { useState } from "react";

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex justify-center relative  w-[100%] ">
      <button
        className="flex items-center text-gray-700 bg-primary w-[70%] h-[40px] p-5"
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
  );
}
