import axios from 'axios';
import { onValue, ref, set, update } from 'firebase/database';
import React, { useContext, useEffect, useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { db } from '../../Firebase';
import { GlobalContext } from './GlobalContext';
import Twitter from '../assets/twitterLogo.png'
import Youtube from '../assets/youtube.png'
import Instagram from '../assets/insta.png'
import Telegram from '../assets/telegram.png'
import Reddit from '../assets/reddit.png'
import Discord from '../assets/discord.png'
import CoinBrain from '../assets/coinbrain.png'
import Arken from '../assets/arken.jpg'
import Gecko from '../assets/geckoterminalLogo.png'
import PooCoin from '../assets/poocoin.png'
import Coingecko from '../assets/coingecko.png'
import PancakeSwap from '../assets/pancakeswap.png'
import CoinMarketCap from '../assets/coinmarketcap.png'
import UniSwap from '../assets/uniswap.png'
import Dextools from '../assets/dextools.png'
import Ethereum from '../assets/ethereum.png'

const CoinDetails = () => {
    const navigate = useNavigate()
    const { state } = useLocation();
    const [fav, setFav] = useState(false)
    const [coinsData, setCoinsData] = useState([])
    const [dbUser, setDbUser] = useState([])
    const { currentUser } = useContext(GlobalContext)
    const [showModal, setShowModal] = useState(false);
    const [recaptchaToken, setRecaptchaToken] = useState(null);
    const [recaptchaKey, setRecaptchaKey] = useState(Date.now());
    const captchaRef = useRef(null)
    const [hourError, setHourError] = useState(false);
    const [collapse1, setcollapse1] = useState(true);
    const [collapse2, setcollapse2] = useState(true);
    const paragraphRef = useRef(null);
    const [copyText, setCopyText] = useState('');


    function copyToClipboard() {
        const textToCopy = paragraphRef.current.textContent;
        navigator.clipboard.writeText(textToCopy)
            .then(() => console.log('Copied to clipboard:', textToCopy))
            .catch((error) => console.error('Error copying to clipboard:', error));
    }

    useEffect(() => {
        const userRef = ref(db, 'users/');
        onValue(userRef, snapshot => {
            snapshot.forEach(childSnapshot => {
                if (Object.values(childSnapshot.val()).includes(currentUser.uid)) {
                    setDbUser(childSnapshot.val());
                }
            });
        });
    }, []);


    const IsFav = () => {
        return dbUser.fav && dbUser.fav.includes(state.key);
    };

    const handleFav = () => {
        let favs = dbUser.fav
        if (favs.includes(state.key)) {
            favs = favs.filter(e => e != state.key)
        } else {
            favs.push(state.key)
        }
        set(ref(db, `users/${currentUser.uid}/fav`), favs)
    }

    const upVote = () => {
        setRecaptchaKey(Date.now());
        setShowModal(true)
    }

    const handleModalClose = () => {
        setShowModal(false);
        setRecaptchaToken(null);
        // Reset the reCAPTCHA widget
        setRecaptchaKey(Date.now());
    }

    const handleVote = async () => {
        const token = captchaRef.current.getValue();
        console.log(state.coin)
        console.log(state.key)

        if (token) {
            let valid_token = await verifyToken(token);
            const res = await axios.get('https://geolocation-db.com/json/')
            console.log(res.data.IPv4);
            try {
                const response = await axios.get(`https://pinkvote-backend.herokuapp.com/verifyIp/${res.data.IPv4}`);
                console.log(response.data.success);
                if (valid_token.success && response.data.success) {
                    console.log(state.coin.votes)
                    update(ref(db, `/coins/${state.key}`), {
                        votes: state.coin.votes + 1,
                    })
                    state.coin.votes += 1,
                        setShowModal(false)
                } else {
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
            let response = await axios.post(`https://pinkvote-backend.herokuapp.com/verify-token`, {

                secret: import.meta.env.VITE_REACT_APP_SECRET_KEY,
                token
            });
            return response.data;
        } catch (error) {
            console.log("error ", error);
        }
        setRecaptchaKey(Date.now());
    }

    return (
        <div className='mt-[120px] items-center flex justify-center w-full flex-col'>
            <div className='w-full flex items-center justify-center'>
                <Link to={'/advertise'} className='bg-primary text-white px-[8px] border-[3px] border-secondary rounded-[5px] flex flex-row w-full md:w-full lg:w-[40%] items-center gap-x-[140px]'>
                    <h1 className=''>Logo</h1>
                    <div className=' py-[8px]  flex flex-col justify-center items-center'>
                        <h2 className='text-[1.5rem] font-medium'>YOUR BANNER HERE</h2>
                        <h2 className='text-white text-[1rem] font-medium'>Pink Vote.com</h2>
                    </div>
                </Link>
            </div>

            <div className='md:w-[80%] w-full my-[20px] rounded-[12px] pt-[20px] pb-[30px] px-[5px] bg-primary border-[5px] border-secondary '>
                <div onClick={() => navigate("/")} className='inline-flex cursor-pointer flex-row items-center gap-x-[8px] text-white p-[20px] hover:text-hover'>
                    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4965 18.1877L10.5055 19.1787C10.0859 19.5983 9.40743 19.5983 8.9923 19.1787L0.314697 10.5055C-0.104899 10.0859 -0.104899 9.40743 0.314697 8.9923L8.9923 0.314697C9.4119 -0.104899 10.0904 -0.104899 10.5055 0.314697L11.4965 1.30566C11.9205 1.72972 11.9116 2.4216 11.4786 2.83674L6.09977 7.96117H18.9287C19.5224 7.96117 20 8.43879 20 9.03247V10.4609C20 11.0546 19.5224 11.5322 18.9287 11.5322H6.09977L11.4786 16.6566C11.9161 17.0718 11.925 17.7636 11.4965 18.1877Z" fill="currentColor" /></svg>
                    <p>Go back</p>
                </div>

                <div className='w-full flex flex-row flex-wrap gap-x-1 justify-between px-[10px]'>

                    {/* left side */}
                    <div className='w-full md:w-[72%] bg-secondary rounded-[15px] p-[15px] '>
                        <div className='flex flex-row'>
                            <img src={state.coin.coinLogo} alt="Logo" className='rounded-[50%] max-w-[100px] align-middle w-[100px] h-[100px]' />
                            <h1 className='text-white ml-[12px] break-all mt-[20px] mb-[10px] text-[2.5rem] font-bold'>
                                {state.coin.name}
                                <b className='ml-[8px] bg-white inline-block min-w-[10px] py-[3px] px-[7px] text-[15px] font-bold text-primary text-center align-baseline rounded-[4px]'>
                                    {state.coin.symbol}
                                </b>
                            </h1>
                        </div>
                        {/* socials */}
                        <div className='flex flex-wrap flex-row gap-x-1 gap-y-5 mt-[20px]'>
                            <div className={` ${state.coin.website !== "" ? "block" : "hidden"} text-[16px] text-center p-[5px]`}>
                                <a  href={state.coin.website} target='_blank' className='flex flex-row items-center justify-center gap-x-2 font-bold min-w-[80px] text-center text-white hover:text-primary hover:bg-white border-[2px] border-white rounded-[7px] p-[10px] whitespace-nowrap cursor-pointer'>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.5571 19.3782C6.44996 18.714 6.32146 17.971 6.27857 17.721C6.06428 16.5782 5.89289 15.414 5.77857 14.2567C4.59283 14.1424 3.42863 13.971 2.29297 13.7496C2.10722 13.7139 1.38575 13.5496 0.585876 13.3711C1.58587 16.1496 3.78577 18.371 6.55726 19.3784L6.5571 19.3782Z" fill="currentColor" />
                                        <path d="M18.2929 7.83586C17.0285 7.55015 15.7071 7.33586 14.3572 7.19301C14.4929 9.05014 14.5 10.9216 14.3857 12.7717C15.6928 12.6289 17.0072 12.4218 18.2999 12.1502C18.3713 12.1359 19.1069 12.0287 19.8071 11.9216C19.9356 11.3001 20 10.6572 20 10.0002C20 9.37872 19.9429 8.77877 19.8286 8.19318C19.093 8.01461 18.3571 7.84322 18.2929 7.83604L18.2929 7.83586Z" fill="currentColor" />
                                        <path d="M19.3713 13.457C18.6285 13.5785 17.9214 13.6857 17.7213 13.7214C16.5712 13.9357 15.4142 14.1071 14.257 14.2214C14.1427 15.4071 13.9713 16.5713 13.7498 17.707C13.6998 17.957 13.5356 18.7142 13.3927 19.3999C16.157 18.4071 18.3641 16.2142 19.3714 13.4571L19.3713 13.457Z" fill="currentColor" />
                                        <path d="M0 9.99992C0 10.6214 0.0570772 11.2214 0.171395 11.807V11.8141C0.928573 11.9927 1.65004 12.1569 1.7071 12.1641C2.97145 12.4498 4.29287 12.6641 5.64282 12.807C5.50714 10.9498 5.49997 9.07833 5.61428 7.22823C4.30723 7.37108 2.99279 7.57819 1.70011 7.84973V7.85691C1.63586 7.87125 0.928768 8.00694 0.178773 8.14979C0.0572805 8.74975 0.000203345 9.36407 0.000203345 9.99974L0 9.99992Z" fill="currentColor" />
                                        <path d="M0.6073 6.59995C1.40019 6.44274 2.1001 6.30706 2.27867 6.27852C3.42871 6.06424 4.58572 5.89285 5.74293 5.77853C5.85725 4.59278 6.02865 3.42859 6.25011 2.29292C6.293 2.05728 6.4644 1.31428 6.6216 0.593018C3.82873 1.59301 1.60736 3.80728 0.607365 6.60032L0.6073 6.59995Z" fill="currentColor" />
                                        <path d="M14.2215 5.74281C15.4073 5.85712 16.5715 6.02852 17.7072 6.24999C18.1501 6.33577 18.5928 6.43573 19.0286 6.5357C19.0856 6.54287 19.2285 6.57141 19.4071 6.6143C18.4071 3.82861 16.2072 1.62169 13.4283 0.614349C13.4427 0.792919 13.4569 0.9286 13.4641 0.98584C13.5568 1.41441 13.6426 1.84298 13.7212 2.27873C13.9355 3.42158 14.1069 4.58577 14.2212 5.74299L14.2215 5.74281Z" fill="currentColor" />
                                        <path d="M12.1501 1.69991C12.1358 1.6213 11.9859 0.857136 11.8572 0.17857C11.2573 0.0570771 10.6358 0 10.0001 0C9.3786 0 8.77146 0.0570771 8.18587 0.171395C8.03584 0.799879 7.85009 1.6213 7.83591 1.7071C7.55019 2.97145 7.33591 4.29287 7.19305 5.64282C9.05018 5.50714 10.9217 5.49997 12.7718 5.61428C12.6289 4.30005 12.4218 2.99279 12.1503 1.70011L12.1501 1.69991Z" fill="currentColor" />
                                        <path d="M7.0926 12.9428C9.02834 13.0784 10.9926 13.0643 12.9423 12.907C13.078 10.9713 13.0638 9.00704 12.9066 7.0573C10.9709 6.92162 9.00662 6.9358 7.05688 7.09301C6.9212 9.02875 6.93539 10.993 7.0926 12.9428Z" fill="currentColor" />
                                        <path d="M7.22852 14.3856C7.37137 15.6998 7.57848 17.0071 7.85002 18.2998C7.87139 18.3997 8.01424 19.2926 8.10002 19.8141C8.71434 19.9356 9.35001 19.9999 10 19.9999C10.6285 19.9999 11.2429 19.9428 11.8358 19.8285C11.9573 19.2784 12.1501 18.3856 12.1644 18.2928C12.4501 17.0284 12.6644 15.707 12.8073 14.3571C11.8145 14.4285 10.8145 14.4642 9.81449 14.4642C8.94298 14.4642 8.08585 14.4357 7.22871 14.3856L7.22852 14.3856Z" fill="currentColor" />
                                    </svg>
                                    Website
                                </a>
                            </div>
                            <div className={` ${state.coin.telegram !== "" ? "block" : "hidden"} text-[16px] text-center p-[5px]`}>
                                <a href={state.coin.telegram} target='_blank' className='flex flex-row items-center justify-center gap-x-2 font-bold min-w-[80px] text-center text-white hover:text-primary hover:bg-white border-[2px] border-white rounded-[7px] p-[10px] whitespace-nowrap cursor-pointer'>
                                    <img className='w-[20px]' src={Telegram} alt="" />
                                    Telegram
                                </a>
                            </div>
                            <div className={`${state.coin.twitter !== "" ? "block" : "hidden"} text-[16px] text-center p-[5px]`}>
                                <a href={state.coin.twitter} target='_blank' className='flex flex-row items-center justify-center gap-x-2 font-bold min-w-[80px] text-center text-white hover:text-primary hover:bg-white border-[2px] border-white rounded-[7px] p-[10px] whitespace-nowrap cursor-pointer'>
                                    <img className='w-[20px]' src={Twitter} alt="" />
                                    Twitter
                                </a>
                            </div>
                            <div className={`${state.coin.insta !== "" ? "block" : "hidden"} text-[16px] text-center p-[5px]`}>
                                <a href={state.coin.insta} target='_blank' className='flex flex-row items-center justify-center gap-x-2 font-bold min-w-[80px] text-center text-white hover:text-primary hover:bg-white border-[2px] border-white rounded-[7px] p-[10px] whitespace-nowrap cursor-pointer'>
                                    <img className='w-[20px]' src={Instagram} alt="" />
                                    Instagram
                                </a>
                            </div>
                            <div className={`${state.coin.youtube !== "" ? "block" : "hidden"} text-[16px] text-center p-[5px]`}>
                                <a href={state.coin.youtube} target='_blank' className='flex flex-row items-center justify-center gap-x-2 font-bold min-w-[80px] text-center text-white hover:text-primary hover:bg-white border-[2px] border-white rounded-[7px] p-[10px] whitespace-nowrap cursor-pointer'>
                                    <img className='w-[20px]' src={Youtube} alt="" />
                                    Youtube
                                </a>
                            </div>
                            <div className={`${state.coin.discord !== "" ? "block" : "hidden"} text-[16px] text-center p-[5px]`}>
                                <a href={state.coin.discord} target='_blank' className='flex flex-row items-center justify-center gap-x-2 font-bold min-w-[80px] text-center text-white hover:text-primary hover:bg-white border-[2px] border-white rounded-[7px] p-[10px] whitespace-nowrap cursor-pointer'>
                                    <img className='w-[20px]' src={Discord} alt="" />
                                    Discord
                                </a>
                            </div>
                            <div className={`${state.coin.reddit !== "" ? "block" : "hidden"} text-[16px] text-center p-[5px]`}>
                                <a href={state.coin.reddit} target='_blank' className='flex flex-row items-center justify-center gap-x-2 font-bold min-w-[80px] text-center text-white hover:text-primary hover:bg-white border-[2px] border-white rounded-[7px] p-[10px] whitespace-nowrap cursor-pointer'>
                                    <img className='w-[20px]' src={Reddit} alt="" />
                                    Reddit
                                </a>
                            </div>

                            {/* COINSSS LINKS */}
                            <div className={`text-[16px] text-center p-[5px]`}>
                                <a target='_blank' href={`https://coinbrain.com/coins/${state.coin.symbol.toLowerCase()}-${state.coin.address}`} className='flex flex-row items-center justify-center gap-x-2 font-bold min-w-[80px] text-center text-white hover:text-primary hover:bg-white border-[2px] border-white rounded-[7px] p-[10px] whitespace-nowrap cursor-pointer'>
                                    <img className='w-[20px]' src={CoinBrain} alt="" />
                                    Coinbrain
                                </a>
                            </div>
                            <div className={`text-[16px] text-center p-[5px]`}>
                                <a target='_blank' href={`https://swap.arken.finance/tokens/${state.coin.chain.toLowerCase()}/${state.coin.address}`} className='flex flex-row items-center justify-center gap-x-2 font-bold min-w-[80px] text-center text-white hover:text-primary hover:bg-white border-[2px] border-white rounded-[7px] p-[10px] whitespace-nowrap cursor-pointer'>
                                    <img className='w-[20px]' src={Arken} alt="" />
                                    Arken Swap
                                </a>
                            </div>
                            <div className={`text-[16px] text-center p-[5px]`}>
                                <a target='_blank' href={`https://geckoterminal.com/${state.coin.chain.toLowerCase()}/pools/${state.coin.address}`} className='flex flex-row items-center justify-center gap-x-2 font-bold min-w-[80px] text-center text-white hover:text-primary hover:bg-white border-[2px] border-white rounded-[7px] p-[10px] whitespace-nowrap cursor-pointer'>
                                    <img className='w-[20px]' src={Gecko} alt="" />
                                    GeckoTerminal
                                </a>
                            </div>

                            <div className={`${state.coin.pooCoin ? "block" : "hidden"} text-[16px] text-center p-[5px]`}>
                                <a target='_blank' href={`https://poocoin.app/tokens/${state.coin.address}`} className='flex flex-row items-center justify-center gap-x-2 font-bold min-w-[80px] text-center text-white hover:text-primary hover:bg-white border-[2px] border-white rounded-[7px] p-[10px] whitespace-nowrap cursor-pointer'>
                                    <img className='w-[20px]' src={PooCoin} alt="" />
                                    Poocoin
                                </a>
                            </div>
                            <div className={`${state.coin.coingecko ? "block" : "hidden"} text-[16px] text-center p-[5px]`}>
                                <a target='_blank' href={`https://www.coingecko.com/en/coins/${state.coin.name.toLowerCase().replace(" ", "-")}`} className='flex flex-row items-center justify-center gap-x-2 font-bold min-w-[80px] text-center text-white hover:text-primary hover:bg-white border-[2px] border-white rounded-[7px] p-[10px] whitespace-nowrap cursor-pointer'>
                                    <img className='w-[20px]' src={Coingecko} alt="" />
                                    Coingecko
                                </a>
                            </div>
                            <div className={`${state.coin.pancakeswap ? "block" : "hidden"} text-[16px] text-center p-[5px]`}>
                                <a target='_blank' href={`https://pancakeswap.finance/swap?outputCurrency=${state.coin.address}`} className='flex flex-row items-center justify-center gap-x-2 font-bold min-w-[80px] text-center text-white hover:text-primary hover:bg-white border-[2px] border-white rounded-[7px] p-[10px] whitespace-nowrap cursor-pointer'>
                                    <img className='w-[20px]' src={PancakeSwap} alt="" />
                                    PanCakeSwap
                                </a>
                            </div>
                            <div className={`${state.coin.coinMarketCap ? "block" : "hidden"} text-[16px] text-center p-[5px]`}>
                                <a target='_blank' href={`https://coinmarketcap.com/currencies/${state.coin.name.toLowerCase().replace(" ", "-")}`} className='flex flex-row items-center justify-center gap-x-2 font-bold min-w-[80px] text-center text-white hover:text-primary hover:bg-white border-[2px] border-white rounded-[7px] p-[10px] whitespace-nowrap cursor-pointer'>
                                    <img className='w-[20px]' src={CoinMarketCap} alt="" />
                                    CoinMarketCap
                                </a>
                            </div>
                            <div className={`${state.coin.uniswap ? "block" : "hidden"} text-[16px] text-center p-[5px]`}>
                                <a target='_blank' href={`https://app.uniswap.org/#/tokens/${state.coin.chain.toLowerCase()}/${state.coin.address}`} className='flex flex-row items-center justify-center gap-x-2 font-bold min-w-[80px] text-center text-white hover:text-primary hover:bg-white border-[2px] border-white rounded-[7px] p-[10px] whitespace-nowrap cursor-pointer'>
                                    <img className='w-[20px]' src={UniSwap} alt="" />
                                    Uniswap
                                </a>
                            </div>
                            <div className={`${state.coin.dextools ? "block" : "hidden"} text-[16px] text-center p-[5px]`}>
                                <a target='_blank' href={`https://www.dextools.io/app/en/ether/pair-explorer/${state.coin.address}`} className='flex flex-row items-center justify-center gap-x-2 font-bold min-w-[80px] text-center text-white hover:text-primary hover:bg-white border-[2px] border-white rounded-[7px] p-[10px] whitespace-nowrap cursor-pointer'>
                                    <img className='w-[20px]' src={Dextools} alt="" />
                                    Dextools
                                </a>
                            </div>
                        </div>

                        <div onClick={async () => {
                            let flag = false;
                            navigator.clipboard.writeText(state.coin.address)
                        }} className="text-[11px] text-center p-[5px] my-10 flex">
                            <div className='flex flex-row flex-wrap items-center gap-x-2 font-bold text-center text-primary bg-white border-[2px] border-white rounded-[7px] p-[10px] whitespace-nowrap cursor-pointer'>
                                <p ref={paragraphRef}>{state.coin.address}</p>
                                <button className='flex flex-row gap-x-2' onClick={copyToClipboard}>
                                    <svg width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.67058 1.20882V2.05397C8.67036 2.09192 8.68535 2.12825 8.7122 2.15499C8.73893 2.18184 8.77537 2.19671 8.81322 2.1965H9.65814L8.67047 1.20882L8.67058 1.20882ZM2.46384 2.54948V0.771082C2.46405 0.76526 2.46653 0.759654 2.47074 0.755665C2.47483 0.751461 2.48033 0.748981 2.48626 0.748657H8.01901V2.0544C8.01922 2.26463 8.1031 2.46614 8.2521 2.61438L8.25339 2.61567C8.40164 2.76445 8.60303 2.84812 8.81315 2.84823H10.1189V10.966C10.119 10.972 10.1167 10.978 10.1125 10.9825C10.108 10.9866 10.1022 10.9889 10.096 10.9889H8.42677V4.84036L6.13521 2.54943L2.46384 2.54948ZM6.32621 3.66232V4.50746C6.32686 4.58595 6.39036 4.64935 6.46885 4.65H7.314L6.32633 3.66232L6.32621 3.66232ZM7.77459 5.30119H6.46885C6.25829 5.30076 6.05656 5.21688 5.90768 5.0681C5.7588 4.91921 5.67502 4.71738 5.67459 4.50682V3.20108H0.1424C0.136255 3.20097 0.130325 3.20324 0.125904 3.20744C0.121592 3.21154 0.119112 3.21704 0.118896 3.22286V13.4178C0.119436 13.4302 0.129355 13.4402 0.141753 13.4407H7.75169C7.75784 13.4407 7.76377 13.4384 7.76819 13.4343C7.77228 13.4298 7.77455 13.4239 7.77455 13.4178L7.77459 5.30119Z" fill="currentColor" />
                                    </svg>
                                    Copy
                                </button>
                            </div>
                        </div>



                        <hr className='border-[2px] border-primatext-primary my-[20px]' />
                        <div className={` ${!collapse1 || !collapse2 ? "flex-col" : "flex-row"} flex  justify-start w-full mb-[40px] gap-2`}>
                            <div onClick={() => setcollapse1(!collapse1)} className={`${!collapse1 ? "w-full" : "md:w-[45%]"} pl-[1rem] cursor-pointer w-full bg-primary border border-white rounded-[20px] flex flex-col pr-[10px]`}>
                                <div className='flex flex-row w-full justify-between items-center'>
                                    <h1 className='font-bold text-[1.5rem] my-[15px]'>Token Chart</h1>
                                    <svg className={!collapse1 ? "rotate-180" : ""} width="20" height="17" viewBox="0 0 28 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.728676 1.45065C1.12112 1.08129 1.58283 0.890834 2.11379 0.879291C2.64475 0.867749 3.10646 1.0582 3.49891 1.45065L13.9912 11.9429L24.4834 1.45065C24.8528 1.08129 25.3087 0.885063 25.8512 0.861977C26.3937 0.838892 26.8612 1.02357 27.2536 1.41602C27.6461 1.78539 27.8481 2.24709 27.8596 2.80114C27.8712 3.35518 27.6807 3.81689 27.2883 4.18625L15.1339 16.3753C14.9723 16.5369 14.7934 16.6581 14.5971 16.7389C14.4009 16.8197 14.1989 16.8601 13.9912 16.8601C13.7834 16.8601 13.5814 16.8197 13.3852 16.7389C13.1889 16.6581 13.01 16.5369 12.8484 16.3753L0.694048 4.22088C0.324684 3.85152 0.14 3.39558 0.14 2.85308C0.14 2.31058 0.336226 1.8431 0.728676 1.45065Z" fill="currentColor" /></svg>
                                </div>
                                <div className={!collapse1 ? "block" : "hidden"}>
                                    <iframe width="100%" height="500" src={`https://coinbrain.com/embed/${state.coin.symbol.toLowerCase()}-${state.coin?.address}?theme=dark&padding=16&chart=1&trades=0`}></iframe>
                                </div>
                            </div>
                            <div onClick={() => setcollapse2(!collapse2)} className={`${!collapse2 ? "w-full" : "md:w-[45%]"} pl-[1rem] cursor-pointer w-full bg-primary border border-white rounded-[20px] flex flex-col pr-[10px]`}>
                                <div className='flex flex-row w-full justify-between items-center'>
                                    <h1 className='font-bold text-[1.5rem] my-[15px]'>BubbleMaps</h1>
                                    <svg className={!collapse2 ? "rotate-180" : ""} width="20" height="17" viewBox="0 0 28 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.728676 1.45065C1.12112 1.08129 1.58283 0.890834 2.11379 0.879291C2.64475 0.867749 3.10646 1.0582 3.49891 1.45065L13.9912 11.9429L24.4834 1.45065C24.8528 1.08129 25.3087 0.885063 25.8512 0.861977C26.3937 0.838892 26.8612 1.02357 27.2536 1.41602C27.6461 1.78539 27.8481 2.24709 27.8596 2.80114C27.8712 3.35518 27.6807 3.81689 27.2883 4.18625L15.1339 16.3753C14.9723 16.5369 14.7934 16.6581 14.5971 16.7389C14.4009 16.8197 14.1989 16.8601 13.9912 16.8601C13.7834 16.8601 13.5814 16.8197 13.3852 16.7389C13.1889 16.6581 13.01 16.5369 12.8484 16.3753L0.694048 4.22088C0.324684 3.85152 0.14 3.39558 0.14 2.85308C0.14 2.31058 0.336226 1.8431 0.728676 1.45065Z" fill="currentColor" /></svg>
                                </div>
                                <div className={!collapse2 ? "block" : "hidden"}>
                                    <iframe width="100%" height="500" src={`https://app.bubblemaps.io/${state.coin.chain.toLowerCase()}/token/${state.coin.address}`} />
                                </div>
                            </div>
                        </div>
                        <p className=''>{state.coin.description}</p>
                    </div>

                    {/* right side */}
                    <div className='w-full md:w-[25%] flex flex-col'>
                        <div className='flex flex-col w-full gap-0'>
                            <Link to={"/"} className="m-0 min-h-[65px] font-bold min-w-[80px] text-center inline-block w-full text-white hover:text-primary border-[2px] border-white hover:bg-white cursor-pointer align-middle whitespace-nowrap p-[10px]">
                                Trending Vote <br />
                                <span>0</span>
                            </Link>
                            <div onClick={upVote} className="m-0 min-h-[65px] font-bold min-w-[80px] text-center inline-block w-full text-white hover:text-primary border-[2px] border-white hover:bg-white cursor-pointer align-middle whitespace-nowrap p-[10px]">
                                Vote <br />
                                <span>{state.coin.votes}</span>
                            </div>
                            <div onClick={handleFav} className={` ${IsFav() ? "text-red-500" : "text-white"}  m-0 min-h-[50px] font-bold min-w-[80px] text-center flex justify-center items-center w-ful border-[2px] border-white hover:bg-primary cursor-pointer align-middle whitespace-nowrap p-[10px] `}>
                                <svg width="25" height="22" viewBox="0 0 25 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.5738 1.49576C19.8981 -0.784512 15.9186 -0.374356 13.4625 2.15982L12.5006 3.15104L11.5387 2.15982C9.08751 -0.374356 5.10314 -0.784512 2.42736 1.49576C-0.639049 4.11295 -0.800182 8.81022 1.94396 11.6471L11.3922 21.403C12.0026 22.0329 12.9938 22.0329 13.6041 21.403L23.0524 11.6471C25.8014 8.81022 25.6402 4.11295 22.5738 1.49576Z" fill="currentColor" /></svg>
                            </div>
                        </div>

                        <div className=' bg-secondary mt-[12px] py-[12px] w-full border-y-[2px] border-primary flex flex-col'>
                            <div className='flex flex-col mb-[5px] items-center'>
                                <p className='text-[15px] font-bold'>Price</p>
                                <p className='text-[15px] '>{state.coin.price}</p>
                            </div>
                            <div className='flex flex-col mb-[5px] items-center'>
                                <p className='text-[15px] font-bold'>Market Cap</p>
                                <p className='text-[15px] '>{state.coin.cap}</p>
                            </div>
                            <div className='flex flex-col mb-[5px] items-center'>
                                <p className='text-[15px] font-bold'>24th</p>
                                <p className='text-[15px] '>-</p>
                            </div>
                            <div className='flex flex-col mb-[5px] items-center'>
                                <p className='text-[15px] font-bold'>Launch Date</p>
                                <p className='text-[15px] '>{state.coin.launchDate}</p>
                            </div>
                            <div className='flex flex-col mb-[5px] items-center'>
                                <p className='text-[15px] font-bold'>Coin Owner</p>
                                <Link to={`/profile/${state.coin.owner}`} className='text-[15px] text-white border-b border-white hover:text-hover hover:border-hover '>{state.coin.owner}</Link>
                            </div>
                        </div>

                        <div className='flex flex-col items-center border border-primary py-[5px] px-[1px] font-bold bg-primatext-primary rounded-[5px] text-[13px] mt-[20px]'>
                            <p className='text-[14px] my-[14px] '>Contact Support</p>
                            <Link to={''} className="text-white border border-white py-[8px] px-[16px] hover:bg-white hover:text-primary mt-[8px]">Via Email</Link>
                            <Link to={''} className="text-white border border-white py-[8px] px-[4px] hover:bg-white hover:text-primary mt-[8px]">Via Telegram</Link>
                        </div>

                        <img className='max-w-full h-auto mx-auto block mt-[10px] rounded-[20px] align-middle' src={state.coin.cover} alt="" />
                    </div>
                </div>
            </div>

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
                                        {state.coin.name}
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
                                    <p className='mb-[40px]'>Total Votes: {state.coin.votes}</p>

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
    )
}

export default CoinDetails