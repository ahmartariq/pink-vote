import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { push, ref, set } from 'firebase/database'
import { getDownloadURL, ref as imageRef, uploadBytes } from "firebase/storage";
import React, { useContext, useEffect, useState } from 'react'
import { DateObject } from 'react-multi-date-picker';
import { useNavigate } from 'react-router-dom'
import { db, storage } from '../../Firebase'
import { GlobalContext } from './GlobalContext'
import CoinpaymentsError from 'coinpayment-2.0/lib/error'
import Coinpayments from 'coinpayment-2.0';

// const querystring = require('querystring');

// const CoinpaymentsError = require(`coinpayments/lib/error`);
// const Coinpayments = require("coinpayments");

const CoinpaymentsCredentials = {
  key: '0584d8cb098305a8ccace8e7edc3772e8775424984bfa4b672aaac31aee911af',
  secret: '2550606e0f13d0bB5675992B344a37B1eDbe6A3F0453061f12f4Eb349602a285'
};

const client = new Coinpayments(CoinpaymentsCredentials);


const options = [
  { value: 'BSC', label: 'Binance Smart Chain (BSC)' },
  { value: 'ETH', label: 'Ethereum (ETH)' },
  { value: 'SOL', label: 'Solana (SOL)' },
  { value: 'TRX', label: 'Tron (TRX)' },
  { value: 'MATRIC', label: 'Polygon (MATIC)' },
  { value: 'KCC', label: 'KuCoinChain (KCC)' },
  { value: 'ADA', label: 'Cardano (ADA)' },
  { value: 'AVAX', label: 'Avalanche (AVAX)' },
  { value: 'FTM', label: 'Fantom (FTM)' },
  { value: 'ARBITRUM', label: 'Arbitrum (ARBITRUM)' }
];

const type = [
  { value: 'certified', label: 'Certified Coin' },
  { value: 'today', label: 'Today' },
  { value: 'trending', label: 'Trending' },
  { value: 'presales', label: 'Presales' },
  { value: 'soon', label: 'Soon Launch' },
  { value: 'new', label: 'New' },
  { value: 'blocklist', label: 'Blocklist' },

]

const AddCoin = () => {
  const navigate = useNavigate()
  const [typeCoin, setTypeCoin] = useState(type[0].value)
  const [name, setName] = useState("")
  const [symbol, setSymbol] = useState("")
  const [launchDate, setLaunchDate] = useState(new Date().toJSON().slice(0, 10))
  const [description, setDescription] = useState("")
  const [descCount, setDescCount] = useState(0)
  const [chain, setChain] = useState(options[0].value)
  const [address, setAddress] = useState("")
  const [presale, setPresale] = useState(false)
  const [cap, setCap] = useState("")
  const [price, setPrice] = useState("")
  const [token, setToken] = useState(false)
  const [presaleLink, setPresaleLink] = useState("")
  const [presaleDate, setPresaleDate] = useState(new Date().toJSON().slice(0, 10))
  const [explorerLink, setExplorerLink] = useState("")
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [cover, setCover] = useState(null);
  const [error2, setError2] = useState(null);
  const [website, setWebsite] = useState("")
  const [youtube, setYoutube] = useState("")
  const [telegram, setTelegram] = useState("")
  const [discord, setDiscord] = useState("")
  const [twitter, setTwitter] = useState("")
  const [insta, setInsta] = useState("")
  const [reddit, setReddit] = useState("")
  const [pooCoin, setPooCoin] = useState(false)
  const [pancakeswap, setPancakeswap] = useState(false)
  const [uniswap, setUniswap] = useState(false)
  const [coingecko, setCoingecko] = useState(false)
  const [coinMarketCap, setCoinMarketCap] = useState(false)
  const [dextools, setDextools] = useState(false)
  const [checkErr, setCheckErr] = useState("")
  const [logoFile, setLogoFile] = useState("")
  const [coverFile, setCoverFile] = useState("")
  const [logoLink, setLogoLink] = useState("")
  const [coverLink, setCoverLink] = useState("")
  const { currentUser } = useContext(GlobalContext)
  const coinDate = new DateObject()


  const loggedIn = localStorage.getItem('currentUser');

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login")
    }
  }, [loggedIn])


  const coinPaymentsApiKey = import.meta.env.PUBLIC_KEY

  const keyOptions = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'HMAC': 'your_generated_hmac'
    }
  };

  const getCoins = async () => {
    // axios.post(`https://www.coinpayments.net/api.php',
    //   'version=1&cmd=rates&key=${coinPaymentsApiKey}&format=json`,
    //   keyOptions)
    //   .then(response => {
    //     console.log(response.data);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });

    // callback (err, result)
    // client.getBasicInfo(callback);

    // promise
    // client.getBasicInfo().then().catch();

    // async/await
    await client.getBasicInfo();
  };

  useEffect(() => {
    getCoins()

  }, [])

  useEffect(() => {
    if (logoLink && coverLink) {
      console.log(coinDate);
      Promise.all([logoLink, coverLink]).then(([logoUrl, coverUrl]) => {
        push(ref(db, 'coins/'), {
          name,
          symbol: symbol.toUpperCase(),
          launchDate,
          description,
          chain,
          address,
          cap,
          price,
          type: typeCoin,
          token,
          presale,
          presaleLink,
          presaleDate,
          explorerLink,
          coinLogo: logoUrl,
          cover: coverUrl,
          website,
          youtube,
          telegram,
          discord,
          twitter,
          insta,
          reddit,
          pooCoin,
          pancakeswap,
          uniswap,
          coingecko,
          coinMarketCap,
          dextools,
          rank: 0,
          votes: 0,
          addedDate: JSON.stringify(coinDate),
          owner: currentUser.displayName,
          ownerId: currentUser.uid,
        });
        navigate('/');
      });
    }
  }, [logoLink, coverLink]);

  const handleChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setImage(null);
      setError(null);
      return;
    }

    if (!/\.(gif|jpg|jpeg|png)$/i.test(file.name)) {
      setImage(null);
      setError('File format is not supported. Only gif, png, jpg, and jpeg formats are allowed.');
      return;
    }

    if (file.size > 512 * 512) {
      setImage(null);
      setError('File size is too large. Maximum size is 512x512 pixels.');
      return;
    }

    setLogoFile(file)
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
      setError(null);
      onChange(file);
    };
    reader.onerror = (error) => {
      setImage(null);
      setError(error.message);
    };
  };

  const handleCover = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setCover(null);
      setError2(null);
      return;
    }

    if (!/\.(gif|jpg|jpeg|png)$/i.test(file.name)) {
      setCover(null);
      setError2('File format is not supported. Only gif, png, jpg, and jpeg formats are allowed.');
      return;
    }

    if (file.size > 440 * 160) {
      setCover(null);
      setError2('File size is too large. Maximum size is 440x160 pixels.');
      return;
    }

    setCoverFile(file)
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setCover(reader.result);
      setError2(null);
      onChange(file);
    };
    reader.onerror = (error) => {
      setCover(null);
      setError2(error.message);
    };
  };

  const handleSubmit = async () => {
    if (name === '') {
      setCheckErr('Please enter name of coin');
    } else if (symbol === '') {
      setCheckErr('Please enter symbol for coin');
    } else if (cap === '') {
      setCheckErr('Please enter Market cap of coin');
    } else if (price === '') {
      setCheckErr('Please enter price of coin');
    } else {
      setCheckErr('');
      const StorageRef = imageRef(storage, `coins/${name}/${logoFile.name}-logo`);
      try {
        await uploadBytes(StorageRef, logoFile);
        console.log('Uploaded logo blob or file!');
        const logoUrl = await getDownloadURL(StorageRef, logoFile);
        console.log(`LogoLink: ${logoUrl}`);
        setLogoLink(logoUrl);
      } catch (error) {
        console.error(error);
      }

      const CoverRef = imageRef(storage, `coins/${name}/${coverFile.name}-cover`);
      try {
        await uploadBytes(CoverRef, coverFile);
        console.log('Uploaded cover blob or file!');
        const coverUrl = await getDownloadURL(CoverRef, coverFile);
        console.log(`CoverLink: ${coverUrl}`);
        setCoverLink(coverUrl);
      } catch (error) {
        console.error(error);
      }
    }
  };


  useEffect(() => {
    setDescCount(description.length)
  }, [description])




  return (
    <div className='mt-[120px] items-center flex justify-center w-full flex-col'>
      <div className='md:w-[80%] w-full my-[20px] rounded-[12px] pt-[20px] pb-[30px] px-[5px] bg-primary border-[5px] border-secondary '>
        <div onClick={() => navigate("/")} className='inline-flex cursor-pointer flex-row items-center gap-x-[8px] text-white p-[20px] hover:text-white'>
          <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4965 18.1877L10.5055 19.1787C10.0859 19.5983 9.40743 19.5983 8.9923 19.1787L0.314697 10.5055C-0.104899 10.0859 -0.104899 9.40743 0.314697 8.9923L8.9923 0.314697C9.4119 -0.104899 10.0904 -0.104899 10.5055 0.314697L11.4965 1.30566C11.9205 1.72972 11.9116 2.4216 11.4786 2.83674L6.09977 7.96117H18.9287C19.5224 7.96117 20 8.43879 20 9.03247V10.4609C20 11.0546 19.5224 11.5322 18.9287 11.5322H6.09977L11.4786 16.6566C11.9161 17.0718 11.925 17.7636 11.4965 18.1877Z" fill="currentColor" /></svg>
          <p>Go back</p>
        </div>

        <div className='flex justify-center items-center flex-col md:w-[80%] w-full text-center mx-auto px-[5px]'>
          <h1 className='font-bold text-[2.5rem] mt-[20px] mb-[10px]'>Add a coin</h1>
          <p className='font-medium text-[1.5rem] '> List your project on Pink Vote. You will be able to update your token page whenever you want even if its listing is live. We fairly recommend you to upvote to get trending on Soon Launch section.</p>
        </div>

        <div className='w-full px-[30px] flex flex-row flex-wrap gap-x-6'>
          <div className='md:w-[49%] w-full flex flex-col '>
            <h2 className='text-[20px] mt-[20px] mb-[10px] font-medium'>Coin Information</h2>

            <div className='break-words mb-[15px] mt-[20px]'>
              <label className='cursor-pointer mb-[5px] font-semibold flex flex-col'>
                Name
              </label>
              <input
                className='text-ellipsis focus-visible:outline-none w-full h-[34px] py-[6px] px-[12px] text-[#495057] bg-white border border-[#ced4da] rounded-[0.25rem]'
                style={{ boxShadow: 'inset 0 1px 1px rgb(0 0 0 / 8%)', transition: "border-color ease-in-out .15s, box-shadow ease-in-out .15s" }}
                type="text"
                placeholder='Bitcoin'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className='break-words mb-[15px]'>
              <label className='cursor-pointer mb-[5px] font-semibold flex flex-col'>
                Symbol
              </label>
              <input
                className='text-ellipsis focus-visible:outline-none w-full h-[34px] py-[6px] px-[12px] text-[#495057] bg-white border border-[#ced4da] rounded-[0.25rem]'
                style={{ boxShadow: 'inset 0 1px 1px rgb(0 0 0 / 8%)', transition: "border-color ease-in-out .15s, box-shadow ease-in-out .15s" }}
                type="text"
                placeholder='BTC'
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
              />
            </div>

            <div className='break-words mb-[15px]'>
              <label className='cursor-pointer mb-[5px] font-semibold flex flex-col'>
                Launch Date
              </label>
              <input
                className='text-ellipsis focus-visible:outline-none w-full h-[34px] py-[6px] px-[12px] text-[#495057] bg-white border border-[#ced4da] rounded-[0.25rem]'
                style={{ boxShadow: 'inset 0 1px 1px rgb(0 0 0 / 8%)', transition: "border-color ease-in-out .15s, box-shadow ease-in-out .15s" }}
                type="date"
                placeholder='yyyy-mm-dd'
                value={launchDate}
                onChange={(e) => setLaunchDate(e.target.value)}
              />
            </div>
            <div className='break-words mb-[15px]'>
              <label className='cursor-pointer mb-[5px] font-semibold flex flex-col'>
                Description
              </label>
              <textarea
                className='text-ellipsis focus-visible:outline-none w-full py-[6px] px-[12px] text-[#495057] bg-white border border-[#ced4da] rounded-[0.25rem]'
                style={{ boxShadow: 'inset 0 1px 1px rgb(0 0 0 / 8%)', transition: "border-color ease-in-out .15s, box-shadow ease-in-out .15s" }}
                type="text"
                placeholder='Describe your project, include links, emojis, be concise and efficient to increase your attractiveness'
                rows={4}
                value={description}
                maxLength={1800}
                onChange={e => setDescription(e.target.value)}
              ></textarea>
              <p className='text-white font-semibold text-[14px]'>{descCount}/1800 characters (max)</p>
            </div>

            <div className='w-full flex-row '>
              <h1 className='font-semibold text-[16px] mt-[20px] mb-[15px]'>Coin Images</h1>
              <label
                htmlFor="image-input"
                className=' hover:bg-white hover:text-primary bg-transparent text-white border-[2px] border-white px-[16px] py-[8px] cursor-pointer rounded-[4px]'
              >
                {image ? 'Change Logo' : 'Upload Logo'}
              </label>
              <label
                className='block text-white mt-[12px] cursor-pointer'
              >
                {image ? '' : 'Recommended size 512x512 px'}
              </label>
              <input
                id="image-input"
                type="file"
                accept="image/*"
                onChange={handleChange}
                style={{ display: 'none' }}
              />
              {image && (
                <img
                  src={image}
                  alt="Uploaded Image"
                  style={{ width: '256px', height: '256px', objectFit: 'cover', marginTop: '16px' }}
                />
              )}
              {error && (
                <div style={{ color: 'red', marginTop: '8px' }}>{error}</div>
              )}
            </div>
          </div>

          <div className='md:w-[49%] w-full flex flex-col '>
            <h2 className='text-[20px] mt-[20px] mb-[10px] font-medium'>Coin market</h2>

            <div className={` flex flex-row flex-wrap break-words mb-[15px] mt-[20px]`}>

              <div className='w-[50%]'>
                <label className={`${!token ? "block" : "hidden"} cursor-pointer mb-[5px] font-semibold flex flex-col`}>
                  Network/Chain
                </label>
                <select
                  className={`${!token ? "block" : "hidden"} text-ellipsis focus-visible:outline-none w-full h-[34px] py-[6px] px-[12px] text-[#495057] bg-white border border-[#ced4da] rounded-[0.25rem]`}
                  style={{ boxShadow: 'inset 0 1px 1px rgb(0 0 0 / 8%)', transition: "border-color ease-in-out .15s, box-shadow ease-in-out .15s" }}
                  type="text"
                  placeholder='Bitcoin'
                  value={chain}
                  onChange={(e) => setChain(e.target.value)}>
                  {options.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <label className={`${token ? "block" : "hidden"} cursor-pointer mb-[5px] font-semibold flex flex-col`}>
                  Explorer URL
                </label>
                <input
                  className={`${token ? "block" : "hidden"} text-ellipsis focus-visible:outline-none w-full h-[34px] py-[6px] px-[12px] text-[#495057] bg-white border border-[#ced4da] rounded-[0.25rem]`}
                  style={{ boxShadow: 'inset 0 1px 1px rgb(0 0 0 / 8%)', transition: "border-color ease-in-out .15s, box-shadow ease-in-out .15s" }}
                  type="text"
                  placeholder='URL/IP'
                  value={explorerLink}
                  onChange={(e) => setExplorerLink(e.target.value)}
                />
              </div>

              <div className='w-[50%] flex justify-end'>
                <button onClick={() => setToken(!token)} className='mt-[26px] border border-white py-[6px] px-[20px] bg-primary text-[15px] h-[35px] whitespace-nowrap align-middle rounded-[4px] hover:text-primary hover:bg-white'>
                  {token ? "Token" : "Coin/Explorer?"}
                </button>
              </div>

            </div>

            <div className={`${!token ? "block" : "hidden"} break-words mb-[15px]`}>
              <label className='cursor-pointer mb-[5px] font-semibold flex flex-col'>
                Contract Address
              </label>
              <input
                className='text-ellipsis focus-visible:outline-none w-full h-[34px] py-[6px] px-[12px] text-[#495057] bg-white border border-[#ced4da] rounded-[0.25rem]'
                style={{ boxShadow: 'inset 0 1px 1px rgb(0 0 0 / 8%)', transition: "border-color ease-in-out .15s, box-shadow ease-in-out .15s" }}
                type="text"
                placeholder='(optional for presales)'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className='flex flex-row items-center align-middle mb-[15px]'>
              <input type="checkbox" checked={presale} onClick={() => setPresale(!presale)} />
              <label onClick={() => setPresale(!presale)} className='select-none ml-[4px] cursor-pointer font-medium text-[13px] flex flex-col'>
                Project in Presale ?
              </label>
            </div>

            <div className={`${presale ? "block" : "hidden"} break-words mb-[15px]`}>
              <label className='cursor-pointer mb-[5px] font-semibold flex flex-col'>
                Presale Link
              </label>
              <input
                className={` text-ellipsis focus-visible:outline-none w-full h-[34px] py-[6px] px-[12px] text-[#495057] bg-white border border-[#ced4da] rounded-[0.25rem]`}
                style={{ boxShadow: 'inset 0 1px 1px rgb(0 0 0 / 8%)', transition: "border-color ease-in-out .15s, box-shadow ease-in-out .15s" }}
                type="text"
                placeholder='https://dxsale.com/your-presale-link'
                value={presaleLink}
                onChange={(e) => setPresaleLink(e.target.value)}
              />
            </div>

            <div className={`${presale ? "block" : "hidden"} break-words mb-[15px]`}>
              <label className='cursor-pointer mb-[5px] font-semibold flex flex-col'>
                Presale date (optional but needed to be listed on Presale Section)
              </label>
              <input
                className={`text-ellipsis focus-visible:outline-none w-full h-[34px] py-[6px] px-[12px] text-[#495057] bg-white border border-[#ced4da] rounded-[0.25rem]`}
                style={{ boxShadow: 'inset 0 1px 1px rgb(0 0 0 / 8%)', transition: "border-color ease-in-out .15s, box-shadow ease-in-out .15s" }}
                type="date"
                placeholder='yyyy-mm-dd'
                value={presaleDate}
                onChange={(e) => setPresaleDate(e.target.value)}
              />
            </div>

            <div className='break-words mb-[15px]'>
              <label className='cursor-pointer mb-[5px] font-semibold flex flex-col'>
                Market Cap
              </label>
              <input
                className='text-ellipsis focus-visible:outline-none w-full h-[34px] py-[6px] px-[12px] text-[#495057] bg-white border border-[#ced4da] rounded-[0.25rem]'
                style={{ boxShadow: 'inset 0 1px 1px rgb(0 0 0 / 8%)', transition: "border-color ease-in-out .15s, box-shadow ease-in-out .15s" }}
                type="number"
                placeholder='0'
                value={cap}
                onChange={(e) => setCap(e.target.value)}
              />
              <span className='text-[9px]'>* If not needed, leave -</span>
            </div>

            <div className='break-words mb-[15px]'>
              <label className='cursor-pointer mb-[5px] font-semibold flex flex-col'>
                Price
              </label>
              <input
                className='text-ellipsis focus-visible:outline-none w-full h-[34px] py-[6px] px-[12px] text-[#495057] bg-white border border-[#ced4da] rounded-[0.25rem]'
                style={{ boxShadow: 'inset 0 1px 1px rgb(0 0 0 / 8%)', transition: "border-color ease-in-out .15s, box-shadow ease-in-out .15s" }}
                type="number"
                placeholder='0'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <span className='text-[9px]'>* If not needed, leave -</span>
            </div>

            <div className='break-words mb-[15px]'>
              <label className={`${!token ? "block" : "hidden"} cursor-pointer mb-[5px] font-semibold flex flex-col`}>
                Type of Coin
              </label>
              <select
                className={`text-ellipsis focus-visible:outline-none w-full h-[34px] py-[6px] px-[12px] text-[#495057] bg-white border border-[#ced4da] rounded-[0.25rem]`}
                style={{ boxShadow: 'inset 0 1px 1px rgb(0 0 0 / 8%)', transition: "border-color ease-in-out .15s, box-shadow ease-in-out .15s" }}
                value={typeCoin}
                onChange={(e) => setTypeCoin(e.target.value)}>
                {type.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>


            <div className='w-full flex-row '>
              <h1 className='font-semibold text-[16px] mt-[70px] mb-[15px]'></h1>
              <label
                htmlFor="image-input2"
                className=' hover:bg-white hover:text-primary bg-transparent text-white border-[2px] border-white px-[16px] py-[8px] cursor-pointer rounded-[4px]'
              >
                {cover ? 'Change cover' : 'Upload cover'}
              </label>
              <label
                className='block text-white mt-[12px] cursor-pointer'
              >
                {cover ? '' : 'Recommended size 440x160 px'}
              </label>
              <input
                id="image-input2"
                type="file"
                accept="image/*"
                onChange={handleCover}
                style={{ display: 'none' }}
              />
              {cover && (
                <img
                  src={cover}
                  alt="Uploaded cover"
                  style={{ width: '440px', height: '160px', objectFit: 'cover', marginTop: '16px' }}
                />
              )}
              {error2 && (
                <div style={{ color: 'red', marginTop: '8px' }}>{error2}</div>
              )}
            </div>
          </div>
        </div>

        <div className='w-full px-[30px] flex flex-row flex-wrap gap-x-6 mt-[20px]'>
          <div className='md:w-[49%] w-full flex flex-col '>
            <h1 className='font-semibold text-[16px] mt-[20px] mb-[15px]'>Coin Socials</h1>

            <div className='break-words mb-[15px] mt-[20px]'>
              <label className='cursor-pointer mb-[5px] font-semibold flex flex-col'>
                Website
              </label>
              <input
                className='text-ellipsis focus-visible:outline-none w-full h-[34px] py-[6px] px-[12px] text-[#495057] bg-white border border-[#ced4da] rounded-[0.25rem]'
                style={{ boxShadow: 'inset 0 1px 1px rgb(0 0 0 / 8%)', transition: "border-color ease-in-out .15s, box-shadow ease-in-out .15s" }}
                type="text"
                placeholder='https://your-website.com'
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <div className='break-words mb-[15px] mt-[5px]'>
              <label className='cursor-pointer mb-[5px] font-semibold flex flex-col'>
                Youtube
              </label>
              <input
                className='text-ellipsis focus-visible:outline-none w-full h-[34px] py-[6px] px-[12px] text-[#495057] bg-white border border-[#ced4da] rounded-[0.25rem]'
                style={{ boxShadow: 'inset 0 1px 1px rgb(0 0 0 / 8%)', transition: "border-color ease-in-out .15s, box-shadow ease-in-out .15s" }}
                type="text"
                placeholder='youtube video link'
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}
              />
            </div>

            <div className='break-words mb-[15px] mt-[5px]'>
              <label className='cursor-pointer mb-[5px] font-semibold flex flex-col'>
                Telegram
              </label>
              <input
                className='text-ellipsis focus-visible:outline-none w-full h-[34px] py-[6px] px-[12px] text-[#495057] bg-white border border-[#ced4da] rounded-[0.25rem]'
                style={{ boxShadow: 'inset 0 1px 1px rgb(0 0 0 / 8%)', transition: "border-color ease-in-out .15s, box-shadow ease-in-out .15s" }}
                type="text"
                placeholder='telegram link'
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}
              />
            </div>

            <div className='break-words mb-[15px] mt-[5px]'>
              <label className='cursor-pointer mb-[5px] font-semibold flex flex-col'>
                Discord
              </label>
              <input
                className='text-ellipsis focus-visible:outline-none w-full h-[34px] py-[6px] px-[12px] text-[#495057] bg-white border border-[#ced4da] rounded-[0.25rem]'
                style={{ boxShadow: 'inset 0 1px 1px rgb(0 0 0 / 8%)', transition: "border-color ease-in-out .15s, box-shadow ease-in-out .15s" }}
                type="text"
                placeholder='Discord invite Link'
                value={discord}
                onChange={(e) => setDiscord(e.target.value)}
              />
            </div>
          </div>
          <div className='md:w-[49%] w-full flex flex-col md:mt-[60px]'>

            <div className='break-words mb-[15px] mt-[20px]'>
              <label className='cursor-pointer mb-[5px] font-semibold flex flex-col'>
                Twitter
              </label>
              <input
                className='text-ellipsis focus-visible:outline-none w-full h-[34px] py-[6px] px-[12px] text-[#495057] bg-white border border-[#ced4da] rounded-[0.25rem]'
                style={{ boxShadow: 'inset 0 1px 1px rgb(0 0 0 / 8%)', transition: "border-color ease-in-out .15s, box-shadow ease-in-out .15s" }}
                type="text"
                placeholder='twitter link'
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
              />
            </div>

            <div className='break-words mb-[15px] mt-[4px]'>
              <label className='cursor-pointer mb-[5px] font-semibold flex flex-col'>
                Instagram
              </label>
              <input
                className='text-ellipsis focus-visible:outline-none w-full h-[34px] py-[6px] px-[12px] text-[#495057] bg-white border border-[#ced4da] rounded-[0.25rem]'
                style={{ boxShadow: 'inset 0 1px 1px rgb(0 0 0 / 8%)', transition: "border-color ease-in-out .15s, box-shadow ease-in-out .15s" }}
                type="text"
                placeholder='instagram link'
                value={insta}
                onChange={(e) => setInsta(e.target.value)}
              />
            </div>

            <div className='break-words mb-[15px] mt-[4px]'>
              <label className='cursor-pointer mb-[5px] font-semibold flex flex-col'>
                Reddit
              </label>
              <input
                className='text-ellipsis focus-visible:outline-none w-full h-[34px] py-[6px] px-[12px] text-[#495057] bg-white border border-[#ced4da] rounded-[0.25rem]'
                style={{ boxShadow: 'inset 0 1px 1px rgb(0 0 0 / 8%)', transition: "border-color ease-in-out .15s, box-shadow ease-in-out .15s" }}
                type="text"
                placeholder='Reddit link'
                value={reddit}
                onChange={(e) => setReddit(e.target.value)}
              />
            </div>
          </div>
        </div>


        <div className='w-full px-[30px] flex flex-row flex-wrap gap-x-6 mt-[20px]'>

          <div className='md:w-[49%] w-full flex flex-col '>
            <h1 className='font-semibold text-[16px] mt-[20px] mb-[15px]'>Coin Listings</h1>

            <div className='flex flex-row items-center align-middle mb-[15px]'>
              <input type="checkbox" checked={pooCoin} onClick={() => setPooCoin(!pooCoin)} />
              <label onClick={() => setPooCoin(!pooCoin)} className='select-none ml-[4px] cursor-pointer font-medium text-[13px] flex flex-col'>
                Listed on PooCoin?
              </label>
            </div>

            <div className='flex flex-row items-center align-middle mb-[15px]'>
              <input type="checkbox" checked={pancakeswap} onClick={() => setPancakeswap(!pancakeswap)} />
              <label onClick={() => setPancakeswap(!pancakeswap)} className='select-none ml-[4px] cursor-pointer font-medium text-[13px] flex flex-col'>
                Listed on Pancakeswap?
              </label>
            </div>

            <div className='flex flex-row items-center align-middle mb-[15px]'>
              <input type="checkbox" checked={uniswap} onClick={() => setUniswap(!uniswap)} />
              <label onClick={() => setUniswap(!uniswap)} className='select-none ml-[4px] cursor-pointer font-medium text-[13px] flex flex-col'>
                Listed on Uniswap ?
              </label>
            </div>
          </div>

          <div className='md:w-[49%] w-full flex flex-col md:mt-[60px]'>
            <div className='flex flex-row items-center align-middle mb-[15px]'>
              <input type="checkbox" checked={coingecko} onClick={() => setCoingecko(!coingecko)} />
              <label onClick={() => setCoingecko(!coingecko)} className='select-none ml-[4px] cursor-pointer font-medium text-[13px] flex flex-col'>
                Listed on Coingecko?
              </label>
            </div>

            <div className='flex flex-row items-center align-middle mb-[15px]'>
              <input type="checkbox" checked={coinMarketCap} onClick={() => setCoinMarketCap(!coinMarketCap)} />
              <label onClick={() => setCoinMarketCap(!coinMarketCap)} className='select-none ml-[4px] cursor-pointer font-medium text-[13px] flex flex-col'>
                Listed on CoinMarketCap?
              </label>
            </div>

            <div className='flex flex-row items-center align-middle mb-[15px]'>
              <input type="checkbox" checked={dextools} onClick={() => setDextools(!dextools)} />
              <label onClick={() => setDextools(!dextools)} className='select-none ml-[4px] cursor-pointer font-medium text-[13px] flex flex-col'>
                Listed on Dextools?
              </label>
            </div>
          </div>
        </div>

        <div className='w-full flex flex-col justify-center items-center mt-[20px]'>

          <button onClick={handleSubmit} className='border border-white py-[6px] px-[50px] bg-primary text-[15px] h-[35px] whitespace-nowrap align-middle rounded-[4px] hover:text-primary hover:bg-white'>
            Submit
          </button>
          <p className='text-red-500 mt-[12px]'>{checkErr}</p>
        </div>
      </div>
    </div>
  )
}

export default AddCoin