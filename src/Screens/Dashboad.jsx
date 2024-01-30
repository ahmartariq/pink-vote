import { onValue, ref, set, update } from "firebase/database";
import React, { useContext, useEffect, useState, useRef } from "react";
import { DateObject } from "react-multi-date-picker";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../Firebase";
import { GlobalContext } from "./GlobalContext";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

import Banner1 from "../assets/banner1.jpg";
import Banner3 from "../assets/banner3.jpg";
import Banner4 from "../assets/Banner4.jpg";
import Banner6 from "../assets/Banner6.jpg";
import Banner7 from "../assets/newImg1.jpg";
import video1 from "../assets/videopinkvote.mp4";
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
import Token from "./Token";
import { Pagination } from "./Pagination";

const coinType = [
  {
    name: "All",
    image: "",
  },
  {
    name: "BSC",
    image: "https://coinvote.cc/template/images/bsc.png",
  },
  {
    name: "ETH",
    image: "https://coinvote.cc/template/images/ethereum.png",
  },
  {
    name: "TRX",
    image: "https://coinvote.cc/template/images/tron.png",
  },
  {
    name: "KCC",
    image: "https://coinvote.cc/template/images/kcc.png",
  },
  {
    name: "MATRIC",
    image: "https://coinvote.cc/template/images/polygon.png",
  },
  {
    name: "SOL",
    image: "https://coinvote.cc/template/images/solana.png",
  },
  {
    name: "ADA",
    image: "https://coinvote.cc/template/images/ada.png",
  },
  {
    name: "AVAX",
    image: "https://coinvote.cc/template/images/avax.png",
  },
  {
    name: "FTM",
    image: "https://coinvote.cc/template/images/ftm.png",
  },
  {
    name: "ARBITRUM",
    image: "https://coinvote.cc/template/images/arbitrum.png",
  },
];

const Dashboad = () => {
  const navigate = useNavigate();
  const [coins, setCoins] = useState("promoted");
  const [allCoins, setAllCoins] = useState("alltime");
  const [type, setType] = useState(0);
  const [typeName, setTypeName] = useState("All");
  const [coinsData, setCoinsData] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [Typefiltered, setTypeFiltered] = useState([]);
  const [promotionData, setPromotionData] = useState([]);
  const [promotedCoin, setPromotedCoin] = useState([]);
  const [dbUser, setDbUser] = useState([]);
  const [banner, setBanner] = useState([]);
  const [trending, setTrending] = useState([]);
  const [recently, setRecently] = useState([]);
  const [price, setPrice] = useState([]);
  const { currentUser } = useContext(GlobalContext);
  const todayDate = new DateObject();
  const [showModal, setShowModal] = useState(false);
  const [clickedCoin, setClickedCoin] = useState({});
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [recaptchaKey, setRecaptchaKey] = useState(Date.now());
  const [hourError, setHourError] = useState(false);
  const [currentPage , setCurrentPage] = useState(1);
  const [perPage] = useState(20);



  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const captchaRef = useRef(null);

  const dateDifference = (endDate) => {
    const currentDate = new Date();
    const targetDate = new Date(endDate);
    const timeDiff = currentDate.getTime() - targetDate.getTime();
    const diffMonths = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30.44));
    return diffMonths;
  };

  useEffect(() => {
    const userRef = ref(db, "users/");
    onValue(userRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        if (Object.values(childSnapshot.val()).includes(currentUser.uid)) {
          setDbUser(childSnapshot.val());
        }
      });
    });
  }, [currentUser]);

  useEffect(() => {
    const CoinsRef = ref(db, "/coins");
    onValue(
      CoinsRef,
      (snapshot) => {
        let coinList = [];
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          childData.addedDate = JSON.parse(childData.addedDate);
          childData.addedDate = new DateObject(childData.addedDate);
          coinList.push({ key: childKey, coin: childData });
        });

        coinList.sort((a, b) => b.coin.votes - a.coin.votes);
        setCoinsData(coinList);
        setFilteredCoins(coinList);
        setTypeFiltered(coinList);
        const trendingList = coinList
          .slice()
          .sort(function (a, b) {
            return b.coin.votes - a.coin.votes;
          })
          .slice(0, 3);
        setTrending(trendingList);

        const priceList = coinList
          .slice()
          .sort(function (a, b) {
            return b.coin.price - a.coin.price;
          })
          .slice(0, 3);
        setPrice(priceList);

        const recentlyList = coinList
          .slice()
          .sort(function (a, b) {
            return b.coin.addedDate - a.coin.addedDate;
          })
          .slice(0, 3);
        setRecently(recentlyList);
      },
      (error) => console.log(error)
    );
  }, [currentUser]);

  useEffect(() => {
    const promotionRef = ref(db, "/promoted");
    onValue(
      promotionRef,
      (snapshot) => {
        let promotionList = [];
        let bannerList = [];
        let voteList = [];
        snapshot.forEach((childSnapshot) => {
          const childData = childSnapshot.val();
          if (JSON.parse(childData.promoted).length > 0) {
            promotionList.push(childData);
          }
          if (JSON.parse(childData.banner).length > 0) {
            bannerList.push({
              date: JSON.parse(childData.banner),
              image: childData.bannerImage,
              url: childData.bannerURL,
            });
          }
          if (childData.voteImage !== "") {
            voteList.push(JSON.parse(childData.vote));
          }
        });

        const newArr = promotionList.map((obj) => {
          const newPromoted = JSON.parse(obj.promoted).map(
            (timestamp) => new DateObject(timestamp)
          );
          return { ...obj, promoted: newPromoted };
        });

        const filteredData = newArr.filter((item) => {
          let matchFound = false;
          item.promoted.forEach((date) => {
            if (
              date.day === todayDate.day &&
              date.month.number === todayDate.month.number &&
              date.year === todayDate.year
            ) {
              matchFound = true;
            }
          });
          return matchFound;
        });

        setPromotionData(filteredData);

        const updatedBannerList = bannerList.map((item) => {
          item.date = item.date.map((date) => new DateObject(date));
          return item;
        });
        // let temp2 = voteList.flat();
        // voteList= temp2.map(ban => new DateObject(ban));
        const matchedData = updatedBannerList.filter((item) => {
          return item.date.some(
            (date) =>
              date.day === todayDate.day &&
              date.month.number === todayDate.month.number &&
              date.year === todayDate.year
          );
        });
        setBanner(matchedData);
      },
      (error) => console.log(error)
    );
  }, [currentUser, coinsData]);

  useEffect(() => {
    if (promotionData.length > 0) {
      const result = coinsData.filter((coin) => {
        return promotionData.some((coin2) => {
          return coin.key === coin2.coin && coin2.promoted.length > 0;
        });
      });
      setPromotedCoin(result);
    }
  }, [promotionData, coinsData]);

  const IsFav = (coin) => {
    return dbUser.fav && dbUser.fav.includes(coin.key);
  };

  const handleFav = (e, coin) => {
    e.stopPropagation();

    let favs = dbUser.fav;
    if (favs.includes(coin.key)) {
      favs = favs.filter((e) => e != coin.key);
    } else {
      favs.push(coin.key);
    }
    set(ref(db, `users/${currentUser.uid}/fav`), favs);
  };

  const upVote = (e, coin) => {
    e.stopPropagation();
    setRecaptchaKey(Date.now());
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setRecaptchaToken(null);
    // Reset the reCAPTCHA widget
    setRecaptchaKey(Date.now());
  };

  const handleVote = async () => {
        const token = captchaRef.current.getValue();

        if (token) {
            let valid_token = await verifyToken(token);
            const res = await axios.get('https://geolocation-db.com/json/')
            console.log(res.data.IPv4);
            try {
                const response = await axios.get(`https://pinkvote-backend.herokuapp.com/verifyIp/${res.data.IPv4}`);
                console.log(response.data.success);
                if (valid_token.success && response.data.success) {
                    update(ref(db, `/coins/${clickedCoin.key}`), {
                        votes: clickedCoin.coin.votes + 1,
                    })
                    setShowModal(false)
                }else{
                    setHourError(true)
                }
              } catch (error) {
                console.log(error);
              }
          
        }
    }

  useEffect(() => {
    // Reset the reCAPTCHA widget when the component first loads
    if (captchaRef.current) {
      setRecaptchaKey(Date.now());
    }
  }, [showModal]);

  const verifyToken = async (token) => {
    try {
      let response = await axios.post(
        `https://pinkvote-backend.herokuapp.com/verify-token`,
        {
          secret: import.meta.env.VITE_REACT_APP_SECRET_KEY,
          token,
        }
      );
      return response.data;
    } catch (error) {
      console.log("error ", error);
    }
    setRecaptchaKey(Date.now());
  };

  const filterCoins = (type1) => {
    filterSymbol(type, typeName);
    if (type1 === "all") {
      setFilteredCoins(coinsData);
    } else {
      setFilteredCoins(coinsData.filter((coin) => coin.coin.type === type1));
    }
  };

  useEffect(() => {
    filterSymbol(type, coinType[0]);
  }, [filteredCoins]);

  const filterSymbol = (index, name) => {
    setType(index);
    setTypeName(name);
    if (name.name === "All") {
      setTypeFiltered(filteredCoins);
    } else {
      setTypeFiltered(
        filteredCoins.filter((coin) => coin.coin.chain === name.name)
      );
    }
  };

  const indexOfLastData = currentPage * perPage;
  const indexOfFirstData = indexOfLastData - perPage;
  const currentData = Typefiltered.slice(indexOfFirstData, indexOfLastData)


  return (
    <div className="mt-[120px] items-center flex justify-center w-full flex-col">
      <div className="w-full px-[8px] md:w-[80%] gap-y-3 flex flex-row justify-between flex-wrap">
        <div className="w-full md:w-full lg:w-[50%] flex flex-col">
          <h1 className="text-[2.5rem] font-bold text-primary">
            Today's Most Voted
          </h1>
          <h1 className="text-[1.5rem] font-medium text-black">
            Find the best coins of the last 24 hours
          </h1>
        </div>
        {banner.length > 0 ? (
          <div className="bg-secondary text-white px-[8px] border-[3px] border-primary rounded-[5px] flex flex-row w-full md:w-full lg:w-[50%] items-center gap-x-[140px]">
            <h1 className="">Logo</h1>
            <div className=" py-[8px]  flex flex-col justify-center items-center">
              <img src={banner[0].image} className={"w-full "} alt="" />
            </div>
          </div>
        ) : (
          <div className="bg-secondary text-white px-[8px] border-[3px] border-primary rounded-[5px] flex flex-row w-full md:w-full lg:w-[50%] items-center gap-x-[140px]">
            <h1 className="">Logo</h1>
            <div className=" py-[8px]  flex flex-col justify-center items-center">
              <h2 className="text-[1.5rem] font-medium">YOUR BANNER HERE</h2>
              <h2 className="text-white text-[1rem] font-medium">
                Pink Vote.com
              </h2>
            </div>
          </div>
        )}
      </div>
      <img
        className="align-middle py-10 max-h-[80%] my-0 mx-auto w-full max-w-[80%] relative h-auto "
        src={Banner1}
        style={{ transition: "transform 0.3s" }}
        alt=""
      />
      <div className="w-full flex mt-[20px] px-[8px] md:w-[80%] flex-col">
        <ul className=" overflow-x-auto overflow-y-hidden whitespace-nowrap flex gap-x-2">
          <li
            onClick={() => setCoins("promoted")}
            className="mt-[5px] border-b-[4px inline-block mr-[2px] border-[5px] border-primary"
          >
            <p
              className={`${
                coins === "promoted"
                  ? "bg-primary text-white"
                  : "bg-white text-primary"
              } text-[18px]  cursor-pointer block px-[20px] py-[10px]`}
            >
              Promoted Coins
            </p>
          </li>
          <li
            onClick={() => setCoins("certified")}
            className="mt-[5px] border-[5px] inline-block mr-[2px] border-primary"
          >
            <p
              className={`${
                coins === "certified"
                  ? "bg-primary text-white"
                  : "bg-white text-primary"
              } text-[18px]  cursor-pointer block px-[20px] py-[10px]`}
            >
              Certified Coins
            </p>
          </li>
        </ul>
        <table className="w-full border-[5px] border-secondary bg-primary text-center">
          <thead>
            <tr className="w-full border-b border-b-white h-[30px] text-[10px] text-white">
              <td className="align-middle table-cell text-[10px] h-[5px] text-white"></td>
              <td className="align-middle table-cell text-[10px] h-[5px] text-white"></td>
              <td className="hidden md:table-cell align-middle text-[10px] h-[5px] text-white">
                Chain
              </td>
              <td className="hidden md:table-cell align-middle text-[10px] h-[5px] text-white">
                24th
              </td>
              <td className="hidden md:table-cell align-middle text-[10px] h-[5px] text-white">
                Market Cap
              </td>
              <td className="hidden md:table-cell align-middle text-[10px] h-[5px] text-white">
                Since Launch
              </td>
              <td className="align-middle table-cell text-[10px] h-[5px] text-white">
                Votes
              </td>
              <td className="hidden md:table-cell align-middle text-[10px] h-[5px] text-white">
                Daily Rank
              </td>
            </tr>
          </thead>
          <tbody>
            {promotedCoin.map((coin) => (
              <tr
                key={coin.coin.name}
                onClick={() =>
                  navigate(`/coin/${coin.coin.name}`, { state: coin })
                }
                className="border-b border-b-white  hover:bg-secondary h-[70px] cursor-pointer w-full border-spacing-[10px] text-white text-center"
              >
                <td
                  onClick={(e) => handleFav(e, coin)}
                  className="group align-middle table-cell text-[16px] text-primary"
                >
                  <div className="flex flex-row w-full justify-center items-center">
                    <svg
                      className={` ${
                        IsFav(coin) ? "text-red-500" : "text-white"
                      } group-hover:opacity-100 inline opacity-0  mr-[15px]`}
                      width="25"
                      height="22"
                      viewBox="0 0 25 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22.5738 1.49576C19.8981 -0.784512 15.9186 -0.374356 13.4625 2.15982L12.5006 3.15104L11.5387 2.15982C9.08751 -0.374356 5.10314 -0.784512 2.42736 1.49576C-0.639049 4.11295 -0.800182 8.81022 1.94396 11.6471L11.3922 21.403C12.0026 22.0329 12.9938 22.0329 13.6041 21.403L23.0524 11.6471C25.8014 8.81022 25.6402 4.11295 22.5738 1.49576Z"
                        fill="currentColor"
                      />
                    </svg>
                    <div className="w-[30px] h-[30px] overflow-hidden rounded-[50%]">
                      <img src={coin.coin.coinLogo} alt="" />
                    </div>
                  </div>
                </td>
                <td className="group align-middle table-cell text-[16px] text-white">
                  <p className="text-white font-extrabold">
                    {coin.coin.name}
                    <br />{" "}
                    <span className="text-[12px] font-medium">
                      ${coin.coin.symbol}
                    </span>
                  </p>
                </td>
                <td className="hidden md:table-cell align-middle text-[16px] text-white">
                  {coin.coin.chain}
                </td>
                <td className="hidden md:table-cell align-middle text-[16px] text-white">
                  {}
                </td>
                <td className="hidden md:table-cell align-middle text-[16px] text-white">
                  $ {coin.coin.cap}
                </td>
                <td className="hidden md:table-cell align-middle text-[16px] text-white">{`${dateDifference(
                  coin.coin.launchDate
                )} Months`}</td>
                <td
                  onClick={(e) => upVote(e, coin)}
                  className="align-middle text-[16px] text-white"
                >
                  <button
                    className="hover:bg-redPrimary font-extrabold min-w-[80px] text-center border-[2px] border-redPrimary bg-primary rounded-[7px] p-[10px] text-white"
                    style={{ lineHeight: 1.5 }}
                  >
                    <div className="flex flex-row justify-evenly items-start align-middle">
                      <svg
                        className="mt-[3px]"
                        width="15"
                        height="16"
                        viewBox="0 0 18 34"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 0L0.339747 15L17.6603 15L9 0ZM10.5 34L10.5 13.5L7.5 13.5L7.5 34L10.5 34Z"
                          fill="currentColor"
                        />
                      </svg>
                      <p className="ml-[2px]">{coin.coin.votes}</p>
                    </div>
                  </button>
                </td>
                <td className="hidden md:table-cell align-middle text-center text-[16px] text-white">
                  {coin.coin.rank}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="w-full justify-center items-center flex my-[12px]">
          <Link
            to={"/advertise"}
            className="uppercase font-bold rounded-[50px] border-none align-middle text-center text-[15px] bg-[#fff] hover:bg-primary text-primary hover:text-white  py-[6px] px-[12px] block"
          >
            Advertise With Us
          </Link>
        </div>
      </div>
      <div className="flex flex-row gap-x-[18px] justify-start px-[8px] mt-[20px] md:w-[80%] w-full flex-wrap gap-y-3">
        <div className="w-full md:w-[32%] bg-primary p-[14px] rounded-[0.375rem] border-[2px] border-secondary flex-col gap-y-2">
          <div className="w-full flex justify-between items-center flex-row">
            <h4 className="text-[18px] my-[10px] font-semibold">🔥 Trending</h4>
            <div className="group relative flex justify-center">
              <span className="absolute top-10 scale-0 rounded bg-black p-2 text-xs w-[250px] text-white group-hover:scale-100">
                The trending section is based on a voting scores
              </span>
              <button className="min-w-[20px] h-[20px] text-black rounded-[50%] bg-white">
                i
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-y-2 w-full">
            {trending.map((coin) => (
              <div
                onClick={() =>
                  navigate(`/coin/${coin.coin.name}`, { state: coin })
                }
                key={coin.key}
                className="hover:text-gray  gap-x-2 text-white flex flex-row w-full cursor-pointer"
              >
                <div className="group w-[30px] h-[30px] overflow-hidden rounded-[50%]">
                  <img src={coin.coin.coinLogo} alt="" />
                </div>
                <div className="flex flex-row gap-x-1 items-center">
                  <p className="text-[16px] ">{coin.coin.name}</p>
                  <p className="">{coin.coin.symbol}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-[32%] bg-primary p-[14px] rounded-[0.375rem] border-[2px] border-secondary flex-col gap-y-2">
          <div className="w-full flex justify-between items-center flex-row">
            <h4 className="text-[18px] my-[10px]  font-semibold">
              🌕 Top gainers
            </h4>
            <div className="group relative flex justify-center">
              <span className="absolute top-10 scale-0 rounded bg-black p-2 text-xs w-[250px] text-white group-hover:scale-100">
                Top ganers are based on the biggest price.
              </span>
              <button className="min-w-[20px] h-[20px] text-black rounded-[50%] bg-white">
                i
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-y-2 w-full">
            {price.map((coin) => (
              <div
                onClick={() =>
                  navigate(`/coin/${coin.coin.name}`, { state: coin })
                }
                key={coin.key}
                className=" gap-x-2 hover:text-gray text-white flex flex-row w-full cursor-pointer"
              >
                <div className="group w-[30px] h-[30px] overflow-hidden rounded-[50%]">
                  <img src={coin.coin.coinLogo} alt="" />
                </div>
                <div className="flex flex-row gap-x-1 items-center">
                  <p className="text-[16px]">{coin.coin.name}</p>
                  <p className="">{coin.coin.symbol}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full md:w-[32%] bg-primary p-[14px] rounded-[0.375rem] border-[2px] border-secondary flex-col gap-y-2">
          <div className="w-full flex justify-between items-center flex-row">
            <h4 className="text-[18px] my-[10px] font-semibold">
              ✨ Recently added
            </h4>
            <div className="group relative flex justify-center">
              <span className="absolute top-10 scale-0 rounded bg-black p-2 text-xs w-[250px] text-white group-hover:scale-100">
                recently added highlights recently listed projects on Pink Vote
                to give everyone a chance to be seen
              </span>
              <button className="min-w-[20px] h-[20px] text-black rounded-[50%] bg-white">
                i
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-y-2 w-full">
            {recently.map((coin) => (
              <div
                onClick={() =>
                  navigate(`/coin/${coin.coin.name}`, { state: coin })
                }
                key={coin.key}
                className="hover:text-gray gap-x-2 text-white flex flex-row w-full cursor-pointer"
              >
                <div className="group w-[30px] h-[30px] overflow-hidden rounded-[50%]">
                  <img src={coin.coin.coinLogo} alt="" />
                </div>
                <div className="flex flex-row gap-x-1 items-center">
                  <p className="text-[16px]">{coin.coin.name}</p>
                  <p className="">{coin.coin.symbol}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-secondary w-full flex flex-row flex-wrap items-center my-[18px]">
        <div className="flex flex-col relative md:w-[30%] w-full">
          <h1 className="md:absolute md:right-[-150px] md:top-[-90px] font-bold text-[5.5rem] text-[#911439] font-libre-baskerville">
            Pink Vote
          </h1>
          <br />
          <h1 className="font-bold text-[2.5rem] md:right-[-21px] md:absolute">
            The New Vote <br /> Generation
          </h1>
        </div>
        <div className="md:w-[70%]  py-4 px-[24px] w-full flex justify-center items-center">
          <img
            className="w-full"
            src={Banner3}
            style={{ transition: "transform 0.3s" }}
            alt=""
          />
        </div>
      </div>
      <div>
        <video width="1000" height="1000" controls>
          <source src={video1} type="video/mp4" />
        </video>
      </div>
      <div className="w-full flex flex-row my-[18px] flex-wrap">
        <div className="flex flex-col relative md:w-[40%] sm:w-[80%] lg:ml-40 md:ml-10 sm:ml-0">
          <div className="font-bold text-[1rem] text-[#911439] font-libre-baskerville flex-wrap">
            <div className="w-full p-4 shadow-md lg:max-w-lg ">

            <h1 className="font-bold text-[2rem] text-[#ec5cb7] font-libre-baskerville">
              About
            </h1>
            Pinkvote is the world's most-innovative website for listing and
            voting crypto assets. Its mission is to expand crypto adoption, and
            help new investors ﬁnd their next potential gem. PinkVote uses
            unique and game-changing features to be ahead of the 120B low-market
            cap crypto market. It supports multiple blockchain networks and
            operates on a large scale throughout the world with a great amount
            of daily users interacting with the application. PinkVote can help
            retail investors discover the latest NFTs, community and DeFi
            projects, see what’s trending and explore active Airdrops through
            its innovative services like Upvotes, Airdrops and a NFT
            marketplace.
            </div>
            <div className="w-full p-4 shadow-md lg:max-w-lg">

            <h1 className="font-bold text-[2rem] text-[#ec5cb7] font-libre-baskerville">
              Price Charts
            </h1>
            PinkVote offers real time price charts and useful indicators like
            the last hour price change, last 24 hours price change, minimum and
            maximum price in the last 24 hours. It also offers token indicators
            like the burned, circulating and total supply of the tokens..
            </div>
            <div className="w-full p-4 shadow-md lg:max-w-lg">

            <h1 className="font-bold text-[2rem] text-[#ec5cb7] font-libre-baskerville">
              Airdrops
            </h1>
            The platform manages the organization of crypto airdrops. It
            provides quality airdrops from the most recent crypto projects.
            Users can navigate its list of current, upcoming, and closed
            airdrops. It's a great chance for the users to earn coins without
            any risk.
            </div>
            <div className="w-full p-4 shadow-md lg:max-w-lg">

            <h1 className="font-bold text-[2rem] text-[#ec5cb7] font-libre-baskerville">
              NFTs
            </h1>
            PinkVote´s NFT Marketplace brings together artists, creators, and
            crypto enthusiasts on a single platform to buy, sell and discover
            rare digital items and crypto collectibles. PinkVote contains a
            unique collection of masterpieces created by artists around the
            globe.
            </div>
            <div className="w-full p-4 shadow-md lg:max-w-lg">

            <h1 className="font-bold text-[2rem] text-[#ec5cb7] font-libre-baskerville">
              UpVote
            </h1>
            PinkVote offers real time Voting charts and useful indicators like -
            Verified contract code - Owner Privileges - StaySAFU scan - Auto rug
            Check - Bubblemap
            </div>
            <div className="w-full p-4 shadow-md lg:max-w-lg">

            <h1 className="font-bold text-[2rem] text-[#ec5cb7] font-libre-baskerville">
              Portfolio
            </h1>
            The portfolio tracker allows users to watch proﬁts, losses and
            portfolio valuation with an easy-to-use platform. This allows retail
            investors to make more informed decisions about which projects to
            invest in for a balanced crypto portfolio.
            </div>
            <div className="w-full p-4 shadow-md lg:max-w-lg">

            <h1 className="font-bold text-[2rem] text-[#ec5cb7] font-libre-baskerville">
              Blog / Newsletter
            </h1>
            PinkVote is covering the latest cryptocurrency news, crypto trading,
            investment and information around the world. Its ﬁrst priority is to
            spread the D.Y.O.R. principals, so it provides guides on how to
            investigate, buy and track cryptocurrency assets. PinkVote aims to
            stay true to its mission and become the leading website for helping
            new investors become familiar with new crypto tokens and discover
            new investment opportunities. PinkVote will be launching its native
            token [PIT] that will allow users to get access to exclusive NFT
            launches, exclusive content and early access to new features [PIT]
            Token holders will receive priority service and purchasing services
            with [PIT] will be discounted. The tokens used are burned manually
            by the team in order to intervene in a deflationary manner and thus
            force an increase in value.
            </div>
            <div className="w-full p-4 shadow-md lg:max-w-lg">

            <h1 className="font-bold text-[2rem] text-[#ec5cb7] font-libre-baskerville">
              Real Use
            </h1>
            NFTs, Voting, Portfolio, Airdrops, Price Charts. PinkVote holders
            will get beneﬁts and discounts from all of its services.
            </div>
            <div className="w-full p-4 sm:p-0 shadow-md lg:max-w-lg">

            <h1 className="font-bold text-[2rem] text-[#ec5cb7] font-libre-baskerville">
              Secure
            </h1>
            The Pinkvote token is audited and transparent for everyone.
            </div>
            <div className="w-full p-4 shadow-md lg:max-w-lg">

            <h1 className="font-bold text-[2rem] text-[#ec5cb7] font-libre-baskerville">
              No Fee´s
            </h1>
            There is are no Fee on each transaction of PinkVote tokens.
            </div>
            <div className="w-full p-4 shadow-md lg:max-w-lg">

            <h1 className="font-bold text-[2rem] text-[#ec5cb7] font-libre-baskerville">
              Growth
            </h1>
            The rapid rise of active users and website engagement has enabled
            PinkVote team to deliver multiple features and create a challenging
            roadmap to add continuous value to its community.
            </div>
            <div className="w-full p-4 shadow-md lg:max-w-lg">

            <h1 className="font-bold text-[2rem] text-[#ec5cb7] font-libre-baskerville">
              Marketing on Steroids
            </h1>
            PinkVote team has created a network with dozens of inﬂuencers,
            promoters from many social channels. It has also amassed a user base
            of more than half a million subscribers.
            </div>
            <div className="w-full p-4 shadow-md lg:max-w-lg">

            <h1 className="font-bold text-[2rem] text-[#ec5cb7] font-libre-baskerville">
              Reputation
            </h1>
            PinkVote is the leading early coin listing and voting platform. It
            has built an ecosystem based on its team’s hard work and trustworthy
            reputation.
            </div>
          </div>
        </div>
        <div className="md:w-[40%] h-[50%] py-2 px-[16px] w-full flex justify-center flex-col lg:mr-20 md:mr-16 ">
          <img
            className="w-full"
            src={Banner4}
            style={{ transition: "transform 0.3s" }}
            alt=""
          />
          <img
            className="w-full py-20"
            src={Banner6}
            style={{ transition: "transform 0.3s" }}
            alt=""
          />
        <img
            className="w-full py-2"
            src={Banner7}
            style={{ transition: "transform 0.3s" }}
            alt=""
          />
        </div>
      </div>
      <div className="flex flex-row gap-x-[18px] justify-start px-[8px] mt-[20px] md:w-[80%] w-full flex-wrap">
        {coinType.map((coin, index) => (
          <div
            key={coin.key}
            onClick={() => filterSymbol(index, coin)}
            className={`flex flex-row gap-x-3 cursor-pointer mb-[3px] p-[10px] border-[2px] border-primary w-auto   ${
              type === index ? "bg-primary text-white" : "bg-white text-primary"
            } `}
          >
            <img src={coin.image} alt="" />
            <p>{coin.name}</p>
          </div>
        ))}
      </div>

      <div className="w-full flex mt-[20px] px-[8px] md:w-[80%] flex-col">
        <ul className=" overflow-x-auto overflow-y-hidden whitespace-nowrap flex gap-x-2 flex-wrap">
          <li
            onClick={() => {
              setAllCoins("alltime");
              filterCoins("all");
            }}
            className="mt-[5px] border-[5px]  inline-block mr-[2px] border-primary"
          >
            <p
              className={`${
                allCoins === "alltime"
                  ? "bg-primary text-white"
                  : "bg-white text-primary"
              } text-[18px]  cursor-pointer block px-[20px] py-[10px]`}
            >
              ALL Time
            </p>
          </li>
          <li
            onClick={() => {
              setAllCoins("today");
              filterCoins("today");
            }}
            className="mt-[5px] border-[5px]  inline-block mr-[2px] border-primary"
          >
            <p
              className={`${
                allCoins === "today"
                  ? "bg-primary text-white"
                  : "bg-white text-primary"
              } text-[18px]  cursor-pointer block px-[20px] py-[10px]`}
            >
              Today
            </p>
          </li>
          <li
            onClick={() => {
              setAllCoins("trending");
              filterCoins("trending");
            }}
            className="mt-[5px] border-[5px]  inline-block mr-[2px] border-primary"
          >
            <p
              className={`${
                allCoins === "trending"
                  ? "bg-primary text-white"
                  : "bg-white text-primary"
              } text-[18px]  cursor-pointer block px-[20px] py-[10px]`}
            >
              Trending
            </p>
          </li>
          <li
            onClick={() => {
              setAllCoins("presales");
              filterCoins("presales");
            }}
            className="mt-[5px] border-[5px]  inline-block mr-[2px] border-primary"
          >
            <p
              className={`${
                allCoins === "presales"
                  ? "bg-primary text-white"
                  : "bg-white text-primary"
              } text-[18px]  cursor-pointer block px-[20px] py-[10px]`}
            >
              Presales
            </p>
          </li>
          <li
            onClick={() => {
              setAllCoins("soon");
              filterCoins("soon");
            }}
            className="mt-[5px] border-[5px]  inline-block mr-[2px] border-primary"
          >
            <p
              className={`${
                allCoins === "soon"
                  ? "bg-primary text-white"
                  : "bg-white text-primary"
              } text-[18px]  cursor-pointer block px-[20px] py-[10px]`}
            >
              soon Launch
            </p>
          </li>
          <li
            onClick={() => {
              setAllCoins("new");
              filterCoins("new");
            }}
            className="mt-[5px] border-[5px]  inline-block mr-[2px] border-primary"
          >
            <p
              className={`${
                allCoins === "new"
                  ? "bg-primary text-white"
                  : "bg-white text-primary"
              } text-[18px]  cursor-pointer block px-[20px] py-[10px]`}
            >
              New
            </p>
          </li>
          <li
            onClick={() => {
              setAllCoins("blocklist");
              filterCoins("blocklist");
            }}
            className="mt-[5px] border-[5px]  inline-block mr-[2px] border-primary"
          >
            <p
              className={`${
                allCoins === "blocklist"
                  ? "bg-primary text-white"
                  : "bg-white text-primary"
              } text-[18px]  cursor-pointer block px-[20px] py-[10px]`}
            >
              Blocklist
            </p>
          </li>
        </ul>
        <table className="w-full border-[5px] border-secondary bg-primary text-center">
          <thead>
            <tr className="w-full border-b border-b-white h-[30px] text-[10px] text-white">
              <td className="align-middle table-cell text-[10px] h-[5px] text-white"></td>
              <td className="align-middle table-cell text-[10px] h-[5px] text-white"></td>
              <td className="hidden md:table-cell align-middle text-[10px] h-[5px] text-white">
                Chain
              </td>
              <td className="hidden md:table-cell align-middle text-[10px] h-[5px] text-white">
                24th
              </td>
              <td className="hidden md:table-cell align-middle text-[10px] h-[5px] text-white">
                Market Cap
              </td>
              <td className="hidden md:table-cell align-middle text-[10px] h-[5px] text-white">
                Since Launch
              </td>
              <td className="align-middle table-cell text-[10px] h-[5px] text-white">
                Votes
              </td>
              <td className="hidden md:table-cell align-middle text-[10px] h-[5px] text-white">
                Daily Rank
              </td>
            </tr>
          </thead>
          <tbody>
            {currentData.map((coin) => (
              <tr
                key={coin.key}
                onClick={() =>
                  navigate(`/coin/${coin.coin.name}`, { state: coin })
                }
                className="border-b border-b-white  hover:bg-secondary h-[70px] cursor-pointer w-full border-spacing-[10px] text-white text-center"
              >
                <td
                  onClick={(e) => handleFav(e, coin)}
                  className="group align-middle table-cell text-[16px] text-primary"
                >
                  <div className="flex flex-row w-full justify-center items-center">
                    <svg
                      className={` ${
                        IsFav(coin) ? "text-red-500" : "text-white"
                      } group-hover:opacity-100 inline opacity-0  mr-[15px]`}
                      width="25"
                      height="22"
                      viewBox="0 0 25 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22.5738 1.49576C19.8981 -0.784512 15.9186 -0.374356 13.4625 2.15982L12.5006 3.15104L11.5387 2.15982C9.08751 -0.374356 5.10314 -0.784512 2.42736 1.49576C-0.639049 4.11295 -0.800182 8.81022 1.94396 11.6471L11.3922 21.403C12.0026 22.0329 12.9938 22.0329 13.6041 21.403L23.0524 11.6471C25.8014 8.81022 25.6402 4.11295 22.5738 1.49576Z"
                        fill="currentColor"
                      />
                    </svg>
                    <div className="w-[30px] h-[30px] overflow-hidden rounded-[50%]">
                      <img src={coin.coin.coinLogo} alt="" />
                    </div>
                  </div>
                </td>
                <td className="group align-middle table-cell text-[16px] text-white">
                  <p className="text-white font-extrabold">
                    {coin.coin.name}
                    <br />{" "}
                    <span className="text-[12px] font-medium">
                      ${coin.coin.symbol}
                    </span>
                  </p>
                </td>
                <td className="hidden md:table-cell align-middle text-[16px] text-white">
                  {coin.coin.chain}
                </td>
                <td className="hidden md:table-cell align-middle text-[16px] text-white">
                  {}
                </td>
                <td className="hidden md:table-cell align-middle text-[16px] text-white">
                  $ {coin.coin.cap?.toString().slice(0, 6)}
                </td>
                <td className="hidden md:table-cell align-middle text-[16px] text-white">{`${dateDifference(
                  coin.coin.launchDate
                )} Months`}</td>
                <td
                  onClick={(e) => {
                    upVote(e, coin);
                    setClickedCoin(coin);
                  }}
                  className="align-middle text-[16px] text-white"
                >
                  <button
                    className="hover:bg-redPrimary font-extrabold min-w-[80px] text-center border-[2px] border-redPrimary bg-primary rounded-[7px] p-[10px] text-white"
                    style={{ lineHeight: 1.5 }}
                  >
                    <div className="flex flex-row justify-evenly items-start align-middle">
                      <svg
                        className="mt-[3px]"
                        width="15"
                        height="16"
                        viewBox="0 0 18 34"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 0L0.339747 15L17.6603 15L9 0ZM10.5 34L10.5 13.5L7.5 13.5L7.5 34L10.5 34Z"
                          fill="currentColor"
                        />
                      </svg>
                      <p className="ml-[2px]">{coin.coin.votes}</p>
                    </div>
                  </button>
                </td>
                <td className="hidden md:table-cell align-middle text-center text-[16px] text-white">
                  {coin.coin.rank}
                </td>
              </tr>
            ))}


          </tbody>
        </table>
        <div className="w-full flex justify-center text-primary mt-[8px]">
          <p>Page:</p>
        </div>
          <Pagination perPage={perPage} totalData={Typefiltered.length} paginate={paginate} currentPage={currentPage}/>
      </div>

      <div className="flex flex-row justify-center items-center gap-[10px] px-[8px] mt-[20px] md:w-[80%] w-full flex-wrap">
        <div className="w-full md:w-[45%] justify-center items-center flex flex-col p-[10px] bg-primary rounded-[10px]">
          <h1 className="mt-[20px] mb-[10px] text-[30px] font-medium">
            List Your Coin
          </h1>
          <p>Not listed yet? Apply right now and attract investors!</p>
          <p>Ask your community to vote and you will grow!</p>
          <button
            onClick={() => navigate("/add-coin")}
            className="border border-white py-[6px] mt-[12px] px-[12px] bg-primary text-[15px] h-[35px] whitespace-nowrap align-middle rounded-[4px] hover:text-primary hover:bg-white"
          >
            Submit Coin
          </button>
        </div>
        <div className="w-full md:w-[45%] justify-center items-center flex flex-col p-[10px] bg-primary rounded-[10px]">
          <h1 className="mt-[20px] mb-[10px] text-[30px] font-medium">
            Trending on Socials
          </h1>
          <p>Discover now the super active tokens on social networks!</p>
          <p>You can rely votes on a reliable indicator!</p>
          <button
            onClick={() => navigate("/")}
            className="border border-white py-[6px] mt-[12px] px-[12px] bg-primary text-[15px] h-[35px] whitespace-nowrap align-middle rounded-[4px] hover:text-primary hover:bg-white"
          >
            Submit Coin
          </button>
        </div>
      </div>

      <div className="flex flex-row justify-center items-center gap-[10px] px-[8px] mt-[20px] md:w-[80%] w-full flex-wrap text-black">
        <div className="w-full md:w-[45%] justify-center flex flex-col">
          <h1 className="mt-[20px] mb-[10px] text-[30px] font-medium">
            Find the next moon shot first
          </h1>
          <p>
            You've probably already asked yourself how to be ahead of the others
            and bet on the winning token. Thanks to Pink Vote.com and our daily
            listing of new tokens, be early and join a project that hasn't been
            listed on major exchanges like CoinMarketCap, CoinGecko and others!
          </p>
          <br />
          <p>
            Disclaimer: before investing always do your own research (DYOR)! A
            token listed on Pink Vote.com does NOT mean we guarantee the project
            reliability, they could be scams. Be careful with your investments.
          </p>
        </div>
        <div className="w-full md:w-[45%] justify-center text-right items-end flex flex-col">
          <h1 className="mt-[20px] mb-[10px] text-[30px] font-medium">
            How it works?
          </h1>
          <p>
            Every project can be listed by
            <Link className="text-primary" to={"/add-coin"}>
              {" "}
              Applying Here{" "}
            </Link>
            . After verification within 24 hours, we validate it or not. If it
            is accepted, it instantly become visible on the New Coins section.
            The coin will also be visible on all section and you will be able to
            vote for it.
          </p>
          <br />
          <p>
            Ask your community to vote for your project to attract the interest
            of all our visitors and investors! The more votes you have, the more
            visibility you get. On average promoted coins have three times more
            visitors: aim for the top!
          </p>
          <br />
          <p>
            <b>Note on voting:</b> You can vote up to two times per hour, the
            votes are added to those of the Today and the All Time section.
          </p>
        </div>
      </div>
      


      <div className="bg-secondary w-full flex flex-row flex-wrap items-center my-[18px]"></div>

      {showModal ? (
                <>
                    <div
                        className="z-[30000000] justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none"
                    >
                        <div className="bg-primary text-white relative my-6 mx-auto w-[50%]">
                            {/*content*/}
                            <div className={` border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none`}>
                                {/*header*/}
                                <div className={`${hourError ? "block" : "hidden"} w-full bg-green-300 my-[8px] py-[20px] px-[8px]`}>
                                    <p>Thank you for voting! +2 votes :) come back in an hour</p>
                                </div> 
                                <div className="flex  items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className=" text-2xl font-semibold text-center">
                                        {clickedCoin.coin.name}
                                    </h3>
                                    <button
                                        className="text-primary p-1 ml-auto bg-transparent border-0 text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={handleModalClose}
                                    >
                                        <span className="bg-transparent text-white h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            X
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex w-full flex-col">
                                    <p className='mb-[40px]'>Total Votes: {clickedCoin.coin.votes}</p>

                                    <ReCAPTCHA className='self-center' sitekey={import.meta.env.VITE_REACT_APP_SITE_KEY} ref={captchaRef} key={recaptchaKey} onChange={setRecaptchaToken} />
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button onClick={handleVote} className='border border-white py-[6px] px-[50px] bg-primary text-[15px] h-[35px] whitespace-nowrap align-middle rounded-[4px] hover:text-primary hover:bg-white'>
                                        Vote
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
    </div>
  );
};

export default Dashboad;

// Link to={banner[0].url} className='bg-[#262626] text-primary px-[8px] border-[3px] border-[#211f1f] rounded-[5px] flex flex-row w-full md:w-full lg:w-[50%] items-center gap-x-[140px]'>
//                             <h1 className=''>ads</h1>
//                             <div className=' py-[8px]  flex flex-col justify-center items-center'>
//                                 <img src={banner[0].image} className={"w-full "} alt="" />
//                             </div>
//                         </Link> :
