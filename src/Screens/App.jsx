import React, { useContext, useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { GlobalContext } from './GlobalContext'
import { auth, db } from '../../Firebase'
import Logo from '../assets/logo.png'
import { onValue, ref } from 'firebase/database'
import { DateObject } from 'react-multi-date-picker'



const App = () => {
    const navigate = useNavigate()
    const [userDropdown, setUserDropdown] = useState(false)
    const [sidebar, setsidebar] = useState(false)
    const [isAccountActive, setIsAccountActive] = useState(false)
    const [search, setSearch] = useState('')
    const { currentUser, setCurrentUser } = useContext(GlobalContext)
    const [displayName, setDisplayName] = useState('')
    const [image, setImage] = useState("https://firebasestorage.googleapis.com/v0/b/coin-ab637.appspot.com/o/Profiles%2Fprofile.jpg?alt=media&token=19d30fce-c1a6-4057-a9e0-e3a5c66caf38")
    const [trending, setTrending] = useState([])
    const [coins, setCoins] = useState(0)
    const [votes, setVotes] = useState(0)
    const [cap, setCap] = useState(0)
    const [oneTrending, setOneTrending] = useState([])
    const [recently, setRecently] = useState([])
    const [header, setHeader] = useState({})
    const [showSearch, setShowSearch] = useState(false)



    useEffect(() => {
        setUserDropdown(false)
        setImage(currentUser.photoURL)
        if (Object.keys(currentUser).length !== 0) {
            setDisplayName(currentUser.displayName)
        }
    }, [currentUser, currentUser.photoURL])

    useEffect(() => {

        const DataRef = ref(db, '/dataHeader');
        onValue(DataRef, (snapshot) => {
            snapshot.forEach(childSnapshot => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                setHeader(childData)
            })

        })


        const CoinsRef = ref(db, '/coins');
        onValue(CoinsRef, (snapshot) => {
            let coinList = [];
            let voteCount = 0
            let coinCount = 0
            let capCount = 0
            snapshot.forEach(childSnapshot => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                coinCount += 1
                voteCount += childData.votes
                capCount += parseInt(childData.cap)
                childData.addedDate = JSON.parse(childData.addedDate)
                childData.addedDate = new DateObject(childData.addedDate)
                coinList.push({ key: childKey, coin: childData });
            });

            setCoins(coinCount)
            let dollarUSLocale = Intl.NumberFormat('en-US');
            setVotes(dollarUSLocale.format(voteCount))
            setCap(dollarUSLocale.format(capCount))
            if (search.length === 0) {
                const trendingList = coinList.slice().sort(function (a, b) {
                    return b.coin.votes - a.coin.votes;
                }).slice(0, 5);
                setTrending(trendingList);
            }
            else {
                const filteredList = coinList.filter((coin) =>
                    coin.coin.name.toLowerCase().includes(search)
                );
                setTrending(filteredList)
            }

            const trendingCoin = coinList.slice().sort(function (a, b) {
                return b.coin.votes - a.coin.votes;
            }).slice(0, 5);
            setOneTrending(trendingCoin);

            const recentlyList = coinList
                .slice()
                .sort(function (a, b) {
                    return b.coin.addedDate - a.coin.addedDate;
                })
                .slice(0, 3);
            setRecently(recentlyList);
        }, (error) => console.log(error))
    }, [currentUser, search]);

    const handleLogout = async () => {
        await auth.signOut()
        setCurrentUser({})
        setDisplayName("")
        localStorage.removeItem("currentUser")
        setsidebar(false)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            // Handle your custom logic here
        }
    };

    return (
        <>
            <div className='z-[10000000] fixed w-full h-[72px] p-0 border-b-primary border-b-[5px] m-0 mb-[5px] bg-secondary top-0' style={{ boxShadow: '0px 1px 20px 0px rgb(73 73 73 / 50%)' }}>
                <div className='h-[72px] m-0 flex w-full justify-around items-center'>

                    <div className="z-20 lg:hidden w-full flex flex-row justify-between items-center px-[8px] bg-secondary ">
                        <Link to={'/'} className='inline-block relative max-w-[170px]  text-[#ffffff] text-[14.5px] leading-5'>
                            <img className="align-middle max-h-[72px] my-0 mx-auto w-full max-w-[80%] relative h-auto hover:scale-110" src={Logo} style={{ transition: "transform 0.3s" }} alt="" />
                        </Link>

                        <div className='flex flex-row '>
                            <button onClick={() => setShowSearch(!showSearch)} className='hover:bg-white hover:text-gray text-white py-[9px] px-[10px] mr-[15px] border border-transparent rounded-[4px]'>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.4746 19.7175L11.6667 12.9096C11.1017 13.3992 10.4426 13.7806 9.68927 14.0537C8.93597 14.3267 8.13559 14.4633 7.28814 14.4633C5.25424 14.4633 3.53107 13.7571 2.11864 12.3446C0.706215 10.9322 0 9.22787 0 7.23164C0 5.2354 0.706215 3.53107 2.11864 2.11864C3.53107 0.706215 5.24482 0 7.25989 0C9.25612 0 10.9557 0.706215 12.3588 2.11864C13.7618 3.53107 14.4633 5.2354 14.4633 7.23164C14.4633 8.04143 14.3314 8.82298 14.0678 9.57627C13.8041 10.3296 13.4087 11.0358 12.8814 11.6949L19.7458 18.5028C19.9153 18.6535 20 18.8465 20 19.0819C20 19.3173 19.9058 19.5292 19.7175 19.7175C19.548 19.887 19.3409 19.9718 19.096 19.9718C18.8512 19.9718 18.6441 19.887 18.4746 19.7175ZM7.25989 12.7684C8.78531 12.7684 10.0847 12.2269 11.1582 11.1441C12.2316 10.0612 12.7684 8.75706 12.7684 7.23164C12.7684 5.70621 12.2316 4.40207 11.1582 3.31921C10.0847 2.23635 8.78531 1.69492 7.25989 1.69492C5.71563 1.69492 4.40207 2.23635 3.31921 3.31921C2.23635 4.40207 1.69492 5.70621 1.69492 7.23164C1.69492 8.75706 2.23635 10.0612 3.31921 11.1441C4.40207 12.2269 5.71563 12.7684 7.25989 12.7684Z" fill="currentColor" /></svg>
                            </button>
                            <button onClick={() => setsidebar(!sidebar)} className='hover:bg-white hover:text-gray text-white py-[9px] px-[10px] mr-[15px] border border-transparent rounded-[4px]'>
                                <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.25015 0H18.7499C19.4402 0 20 0.559556 20 1.24993C20 1.94031 19.4402 2.50008 18.7499 2.50008H1.25015C0.55977 2.50008 0 1.94031 0 1.24993C0 0.559556 0.55977 0 1.25015 0ZM1.25015 6.2502H18.7499C19.4402 6.2502 20 6.80976 20 7.50013C20 8.19051 19.4402 8.75007 18.7499 8.75007H1.25015C0.55977 8.75007 0 8.19051 0 7.50013C0 6.80976 0.55977 6.2502 1.25015 6.2502ZM1.25015 12.4999H18.7499C19.4402 12.4999 20 13.0596 20 13.75C20 14.4404 19.4402 14.9999 18.7499 14.9999H1.25015C0.55977 14.9999 0 14.4404 0 13.75C0 13.0596 0.55977 12.4999 1.25015 12.4999Z" fill="currentColor" /></svg>
                            </button>
                        </div>
                    </div>

                    <div className='z-20 lg:block hidden p-0 m-0 h-[55px] overflow-visible w-auto max-h-[340px]'>
                        <ul className='h-[72px] flex flex-row justify-center items-center mt-[-5px] float-left m-0 list-none'>
                            <li className=''>
                                <Link to={'/'} className='inline-block relative max-w-[170px] text-[#ffffff] text-[14.5px] leading-5'>
                                    <img className="align-middle max-h-[72px] my-0 mx-auto w-full max-w-[75%] relative h-auto hover:scale-110" src={Logo} style={{ transition: "transform 0.3s" }} alt="" />
                                </Link>
                            </li>
                            <li>
                                <Link to={'/airdrops'} className='max-w-[170px] text-[#1a1a1a] text-[14.5px] leading-5 py-[10px] px-[15px] hover:text-[#9b2847]'>
                                    Airdops
                                </Link>
                            </li>
                            <li>
                                <Link to={'/advertise'} className='max-w-[170px] text-[#1a1a1a] text-[14.5px] leading-5 py-[10px] px-[15px] hover:text-[#9b2847]'>
                                    Advertise
                                </Link>
                            </li>

                            <li className='relative block'>
                                <div className='text-[#1a1a1a] flex flex-row justify-center items-center cursor-pointer max-w-[170px]  text-[14.5px] leading-5 py-[10px] px-[15px] hover:text-[#9b2847]'>
                                    <Link to={'/add-coin'} className='mr-[5px]'>Add Coin</Link>
                                </div>
                            </li>
                            <li className='relative block'>
                                <div className='text-[#1a1a1a] flex flex-row justify-center items-center cursor-pointer max-w-[170px]  text-[14.5px] leading-5 py-[10px] px-[15px] hover:text-[#9b2847]'>
                                    <Link to={'/add-airdrop'} className='mr-[5px]'>Add airdrop</Link>
                                </div>
                            </li>
                            <li className={`${currentUser.displayName === "admin" ? "block" : "hidden"}`}>
                                <Link to={'/add-partner'} className='max-w-[170px] text-[#1a1a1a] text-[14.5px] leading-5 py-[10px] px-[15px] hover:text-[#9b2847]'>
                                    Add Partners & Tools
                                </Link>
                            </li>
                            <li>
                                <Link to={'/partner'} className='max-w-[170px] text-[#1a1a1a] text-[14.5px] leading-5 py-[10px] px-[15px] hover:text-[#9b2847]'>
                                    Partners & Tools
                                </Link>
                            </li>
                            <li>
                                <Link to={'/token'} className='max-w-[170px] text-[#1a1a1a] text-[14.5px] leading-5 py-[10px] px-[15px] hover:text-[#9b2847]'>
                                    Pink Vote Token
                                </Link>
                            </li>
                            <div className='group/view relative ml-[1rem] flex justify-center items-center border-[#e2e2e2] border-[2px] h-[40px] rounded-[10px] bg-[#e2c5740d] max-w-[200px]'>
                                <form className='w-full flex relative' autoComplete="off">
                                    <input
                                        className=' focus-visible:outline-none text-ellipsis text-white pl-[40px] bg-inherit placeholder-gray-800'
                                        type="text" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyDown} placeholder={"Search coins..."} name={"search"} autoComplete="on" />
                                    <span className='inline-flex items-center justify-center text-[#1a1a1a] absolute w-[2.5rem] cursor-pointer text-[15px] left-0 mt-[2px] '>
                                        <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.4746 19.7175L11.6667 12.9096C11.1017 13.3992 10.4426 13.7806 9.68927 14.0537C8.93597 14.3267 8.13559 14.4633 7.28814 14.4633C5.25424 14.4633 3.53107 13.7571 2.11864 12.3446C0.706215 10.9322 0 9.22787 0 7.23164C0 5.2354 0.706215 3.53107 2.11864 2.11864C3.53107 0.706215 5.24482 0 7.25989 0C9.25612 0 10.9557 0.706215 12.3588 2.11864C13.7618 3.53107 14.4633 5.2354 14.4633 7.23164C14.4633 8.04143 14.3314 8.82298 14.0678 9.57627C13.8041 10.3296 13.4087 11.0358 12.8814 11.6949L19.7458 18.5028C19.9153 18.6535 20 18.8465 20 19.0819C20 19.3173 19.9058 19.5292 19.7175 19.7175C19.548 19.887 19.3409 19.9718 19.096 19.9718C18.8512 19.9718 18.6441 19.887 18.4746 19.7175ZM7.25989 12.7684C8.78531 12.7684 10.0847 12.2269 11.1582 11.1441C12.2316 10.0612 12.7684 8.75706 12.7684 7.23164C12.7684 5.70621 12.2316 4.40207 11.1582 3.31921C10.0847 2.23635 8.78531 1.69492 7.25989 1.69492C5.71563 1.69492 4.40207 2.23635 3.31921 3.31921C2.23635 4.40207 1.69492 5.70621 1.69492 7.23164C1.69492 8.75706 2.23635 10.0612 3.31921 11.1441C4.40207 12.2269 5.71563 12.7684 7.25989 12.7684Z" fill="currentColor" /></svg>
                                    </span>
                                </form>
                                <div className={`group-focus-within/view:flex hover:flex flex-col hidden absolute w-[380px] bg-[#F864D8] pb-[10px] top-[30px] pt-[28px] ml-[-2px] left-0 z-[1000] border-[2px] border-[#e2c5741a]`}>
                                        <h1 className='font-semibold text-[1rem] mb-[8px]'>{search !== "" ? 'Search Result' : "Trending 🔥"}</h1>
                                    <div className=' px-[18px] content flex flex-col overflow-y-scroll gap-y-2 w-full h-[200px]'>
                                        {
                                            trending.map(coin => (
                                                <div onClick={() => navigate(`/coin/${coin.coin.name}`, { state: coin })} className='group flex flex-row gap-2 cursor-pointer items-center'>
                                                    <div className='group w-[30px] h-[30px] overflow-hidden rounded-[50%]'>
                                                        <img src={coin.coin.coinLogo} alt="" />
                                                    </div>
                                                    <p className='group-hover:text-hover'>{coin.coin.name}</p>
                                                    <p className='text-center bg-white text-primary rounded-[12px] text-[0.7rem] px-[7px] py-[7px]'>{coin.coin.symbol}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            {displayName != "" ?

                                (
                                    <li onMouseEnter={() => setUserDropdown(true)} onMouseLeave={() => setUserDropdown(false)} className='ml-[15px] inline-flex relative'>
                                        <div className='w-[45px] h-[45px] rounded-[50%] overflow-hidden '>
                                            <img src={image} className="overflow-hidden" alt="" />
                                        </div>
                                        <div className={` ${userDropdown ? "block" : "hidden"} absolute right-[-20px] top-[40px] `}>
                                            <div className='bg-secondary border-[2px] border-primary rounded-[10px] mt-[8px]' style={{ boxShadow: 'rgb(81 89 105 / 12%) 0px 2px 10px, rgb(81 89 105 / 8%) 0px 1px 2px' }}>
                                                <Link to={`/profile/${displayName}`} className='flex p-[15px] flex-row w-[248px] gap-x-[20px] mb-[8px] items-center'>
                                                    <div className='w-[75px] h-[75px] rounded-[50%] overflow-hidden '>
                                                        <img src={image} className="overflow-hidden" alt="" />
                                                    </div>
                                                    <div className='flex flex-col gap-y-[4px]'>
                                                        <p>{displayName}</p>
                                                        <p>View my Profile</p>
                                                    </div>
                                                </Link>
                                                <hr className='border-[2px] border-primary w-full my-0 ' />
                                                <div className='rounded-[8px] p-[8px] cursor-pointer text-[12px] text-white hover:text-secondary hover:bg-white'>
                                                    <Link to={'/my-fav'} className=''>My Favourite</Link>
                                                </div>
                                                <div className='rounded-[8px] p-[8px] cursor-pointer text-[12px] text-white hover:text-secondary hover:bg-white'>
                                                    <Link to={'/my-orders'} className=''>My Orders</Link>
                                                </div>
                                                <div className='rounded-[8px] p-[8px] cursor-pointer text-[12px] text-white hover:text-secondary hover:bg-white'>
                                                    <Link to={'/my-coins'} className=''>My Coins</Link>
                                                </div>
                                                <div className='rounded-[8px] p-[8px] cursor-pointer text-[12px] text-white hover:text-secondary hover:bg-white'>
                                                    <Link to={'/account-settings'} className=''>Account Settings</Link>
                                                </div>
                                                <div onClick={handleLogout} className='rounded-[8px] p-[8px] cursor-pointer text-[12px]text-primary hover:text-secondary hover:bg-white'>
                                                    <p className=''>Logout</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ) :
                                (
                                    <li className='inline-flex relative'>
                                        <Link to={"/login"} className='ml-[5px] text-white text-[14.5px] py-[10px] px-[15px] rounded-[8px] hover:bg-white hover:text-primary' style={{ lineHeight: '20px' }}>
                                            Login
                                        </Link>
                                        <Link to={"/register"} className='font-medium ml-[5px] text-secondary text-[14.5px] py-[10px] px-[15px] rounded-[8px]' style={{ lineHeight: '20px', animation: 'shadow-pulse 3s infinite', background: "linear-gradient(180deg,white 0, white" }}>
                                            Register
                                        </Link>
                                    </li>
                                )
                            }

                        </ul>
                    </div>


                    <aside className={`${sidebar ? "block lg:hidden left-0 " : "left-full"} h-screen bg-secondary -z-0 w-full right-0  overflow-auto fixed top-0 bottom-0 `} style={{ transition: 'left 0.2s, width 0.2s' }}>
                        <ul className='w-full pt-[80px] px-[15px] pb-0 list-none mb-[10px]'>
                            <li>
                                <Link onClick={() => setsidebar(false)} to={'/airdrops'} className='relative flex items-center py-[10px] px-[20px] font-normal rounded-[10px] my-[2px] border-b border-b-[#e2c57412] text-white text-[16px] leading-[1.5] hover:text-white hover:bg-[#e2c5740d] hover:cursor-pointer' style={{ transition: 'border-left-color 0.3s, background-color 0.3s' }}>
                                    Airdrops
                                </Link>
                            </li>
                            <li>
                                <Link onClick={() => setsidebar(false)} to={'/advertise'} className='relative flex items-center py-[10px] px-[20px] font-normal rounded-[10px] my-[2px] border-b border-b-[#e2c57412] text-white text-[16px] leading-[1.5] hover:text-white hover:bg-[#e2c5740d] hover:cursor-pointer' style={{ transition: 'border-left-color 0.3s, background-color 0.3s' }}>
                                    Advertise
                                </Link>
                            </li>
                            <li>
                                <Link onClick={() => setsidebar(false)} to={'/add-coin'} className='relative flex items-center py-[10px] px-[20px] font-normal rounded-[10px] my-[2px] border-b border-b-[#e2c57412] text-white text-[16px] leading-[1.5] hover:text-white hover:bg-[#e2c5740d] hover:cursor-pointer' style={{ transition: 'border-left-color 0.3s, background-color 0.3s' }}>
                                    Add Coin
                                </Link>
                            </li>
                            <li>
                                <Link onClick={() => setsidebar(false)} to={'/add-airdrop'} className='relative flex items-center py-[10px] px-[20px] font-normal rounded-[10px] my-[2px] border-b border-b-[#e2c57412] text-white text-[16px] leading-[1.5] hover:text-white hover:bg-[#e2c5740d] hover:cursor-pointer' style={{ transition: 'border-left-color 0.3s, background-color 0.3s' }}>
                                    Add Airdrop
                                </Link>
                            </li>
                            <li className={`${currentUser.displayName === "admin" ? "block" : "hidden"}`}>
                                <Link onClick={() => setsidebar(false)} to={'/add-partner'} className='relative flex items-center py-[10px] px-[20px] font-normal rounded-[10px] my-[2px] border-b border-b-[#e2c57412] text-white text-[16px] leading-[1.5] hover:text-white hover:bg-[#e2c5740d] hover:cursor-pointer' style={{ transition: 'border-left-color 0.3s, background-color 0.3s' }}>
                                    Add Partners & Tools
                                </Link>
                            </li>
                            <li>
                                <Link onClick={() => setsidebar(false)} to={'/partner'} className='relative flex items-center py-[10px] px-[20px] font-normal rounded-[10px] my-[2px] border-b border-b-[#e2c57412] text-white text-[16px] leading-[1.5] hover:text-white hover:bg-[#e2c5740d] hover:cursor-pointer' style={{ transition: 'border-left-color 0.3s, background-color 0.3s' }}>
                                    Partners & Tools
                                </Link>
                            </li>
                            <li>
                                <Link onClick={() => setsidebar(false)} to={'/token'} className='relative flex items-center py-[10px] px-[20px] font-normal rounded-[10px] my-[2px] border-b border-b-[#e2c57412] text-white text-[16px] leading-[1.5] hover:text-white hover:bg-[#e2c5740d] hover:cursor-pointer' style={{ transition: 'border-left-color 0.3s, background-color 0.3s' }}>
                                    Pink Vote Token
                                </Link>
                            </li>
                            <li>
                                <div onClick={() => setIsAccountActive(!isAccountActive)} className={`${isAccountActive ? "text-white bg-[#e2c5740d] cursor-pointer" : "text-white"}  flex items-center flex-row  hover:text-white hover:bg-[#e2c5740d] hover:cursor-pointer justify-between rounded-[10px] py-[10px] px-[20px] text-[16px] leading-[1.5] my-[2px] border-b border-b-[#e2c57412]`} style={{ transition: 'border-left-color 0.3s, background-color 0.3s' }}>
                                    <Link to={'/'} className={`relative flex items-center font-normal`} >
                                        Account
                                    </Link>
                                    <svg className={`${isAccountActive ? "" : "-rotate-90"}`} style={{ transition: 'all 0.3s' }} width="14" height="8.5" viewBox="0 0 28 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.728676 1.45065C1.12112 1.08129 1.58283 0.890834 2.11379 0.879291C2.64475 0.867749 3.10646 1.0582 3.49891 1.45065L13.9912 11.9429L24.4834 1.45065C24.8528 1.08129 25.3087 0.885063 25.8512 0.861977C26.3937 0.838892 26.8612 1.02357 27.2536 1.41602C27.6461 1.78539 27.8481 2.24709 27.8596 2.80114C27.8712 3.35518 27.6807 3.81689 27.2883 4.18625L15.1339 16.3753C14.9723 16.5369 14.7934 16.6581 14.5971 16.7389C14.4009 16.8197 14.1989 16.8601 13.9912 16.8601C13.7834 16.8601 13.5814 16.8197 13.3852 16.7389C13.1889 16.6581 13.01 16.5369 12.8484 16.3753L0.694048 4.22088C0.324684 3.85152 0.14 3.39558 0.14 2.85308C0.14 2.31058 0.336226 1.8431 0.728676 1.45065Z" fill="currentColor" /></svg>
                                </div>
                                {displayName != "" ?
                                    (
                                        <ul className={`relative min-w-[160px] py-[5px] ml-[26px] ${isAccountActive ? "block" : "hidden"}`}>
                                            <li>
                                                <Link to={'/my-fav'} onClick={() => setsidebar(false)} className='flex items-center p-[8px] text-[13px] text-white hover:text-gray'>
                                                    My Favourite
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={'/my-orders'} onClick={() => setsidebar(false)} className='flex items-center p-[8px] text-[13px] text-white hover:text-gray'>
                                                    My Orders
                                                </Link>
                                            </li>   <li>
                                                <Link to={'/my-coins'} onClick={() => setsidebar(false)} className='flex items-center p-[8px] text-[13px] text-white hover:text-gray'>
                                                    My Coins
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={'/account-settings'} onClick={() => setsidebar(false)} className='flex items-center p-[8px] text-[13px] text-white hover:text-gray'>
                                                    Account Settings
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={''} onClick={handleLogout} className='flex items-center p-[8px] text-[13px] text-white hover:text-gray'>
                                                    Logout
                                                </Link>
                                            </li>
                                        </ul>
                                    ) :
                                    (
                                        <ul className={`relative min-w-[160px] py-[5px] ml-[26px] ${isAccountActive ? "block" : "hidden"}`}>
                                            <li>
                                                <p onClick={() => { navigate("/login"); setIsAccountActive(false); setsidebar(false); }} className='cursor-pointer flex items-center p-[8px] text-[13px] text-white hover:text-gray'>
                                                    Login
                                                </p>
                                            </li>
                                            <li>
                                                <p onClick={() => { navigate("/register"); setIsAccountActive(false); setsidebar(false) }} className='cursor-pointer flex items-center p-[8px] text-[13px] text-white hover:text-gray'>
                                                    Register
                                                </p>
                                            </li>
                                        </ul>
                                    )
                                }
                            </li>
                        </ul>
                    </aside>
                </div>
                <div className={` ${showSearch ? "flex" : "hidden"} md:hidden flex bg-secondary py-3 border-b-4 border-b-primary`}>
                    <div className='group/view px-[18px] flex flex-col w-full justify-center items-center bg-[#e2c5740d]'>
                        <form className='w-full flex h-[40px] relative bg-primary border-[#e2e2e2] border-[2px] rounded-t-[10px]' autoComplete="off">
                            <input
                                className='w-full relative focus-visible:outline-none text-ellipsis text-white pl-[40px] bg-inherit placeholder-secondary rounded-t-[10px]'
                                type="text" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyDown} placeholder={"Search coins..."} name={"search"} autoComplete="on" />
                            <span className='inline-flex items-center justify-center text-[#1a1a1a] absolute w-[2.5rem] cursor-pointer text-[15px] left-0 mt-[2px] top-[8px] '>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.4746 19.7175L11.6667 12.9096C11.1017 13.3992 10.4426 13.7806 9.68927 14.0537C8.93597 14.3267 8.13559 14.4633 7.28814 14.4633C5.25424 14.4633 3.53107 13.7571 2.11864 12.3446C0.706215 10.9322 0 9.22787 0 7.23164C0 5.2354 0.706215 3.53107 2.11864 2.11864C3.53107 0.706215 5.24482 0 7.25989 0C9.25612 0 10.9557 0.706215 12.3588 2.11864C13.7618 3.53107 14.4633 5.2354 14.4633 7.23164C14.4633 8.04143 14.3314 8.82298 14.0678 9.57627C13.8041 10.3296 13.4087 11.0358 12.8814 11.6949L19.7458 18.5028C19.9153 18.6535 20 18.8465 20 19.0819C20 19.3173 19.9058 19.5292 19.7175 19.7175C19.548 19.887 19.3409 19.9718 19.096 19.9718C18.8512 19.9718 18.6441 19.887 18.4746 19.7175ZM7.25989 12.7684C8.78531 12.7684 10.0847 12.2269 11.1582 11.1441C12.2316 10.0612 12.7684 8.75706 12.7684 7.23164C12.7684 5.70621 12.2316 4.40207 11.1582 3.31921C10.0847 2.23635 8.78531 1.69492 7.25989 1.69492C5.71563 1.69492 4.40207 2.23635 3.31921 3.31921C2.23635 4.40207 1.69492 5.70621 1.69492 7.23164C1.69492 8.75706 2.23635 10.0612 3.31921 11.1441C4.40207 12.2269 5.71563 12.7684 7.25989 12.7684Z" fill="currentColor" /></svg>
                            </span>
                        </form>
                        <div className={` bg-[#F864D8] pb-[10px] pt-[28px] border-[2px] border-[#e2c5741a] w-full rounded-b-[10px]`}>
                                <h1 className='font-semibold text-[1rem] mb-[8px]'>{search !== "" ? 'Search Result' : "Trending 🔥"}</h1>
                            <div className='content flex flex-col overflow-y-scroll gap-y-2 w-full h-[200px]'>
                                {
                                    trending.map(coin => (
                                        <div onClick={() => navigate(`/coin/${coin.coin.name}`, { state: coin })} className='group flex flex-row gap-2 cursor-pointer items-center'>
                                            <div className='group w-[30px] h-[30px] overflow-hidden rounded-[50%]'>
                                                <img src={coin.coin.coinLogo} alt="" />
                                            </div>
                                            <p className='group-hover:text-hover'>{coin.coin.name}</p>
                                            <p className='text-center bg-white text-primary rounded-[12px] text-[0.7rem] px-[7px] py-[7px]'>{coin.coin.symbol}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full hidden bg-secondary md:flex flex-row justify-center'>
                <div className='flex flex-row items-center text-center text-[11px] mt-[72px] py-[12px] gap-x-4 opacity-80 hover:opacity-100' style={{ transition: 'all .2s ease' }}>
                    <p>Coins: <span className='text-primary'>{coins}</span></p>
                    <p>Votes: <span className='text-primary'>{votes}</span></p>
                    <p>Market Cap: <span className='text-primary'>{cap}</span></p>
                    <p>BTC: <span className='text-primary'>${header.btc}</span></p>
                    <p>ETH: <span className='text-primary'>${header.eth}</span></p>
                    <p>BNB: <span className='text-primary'>${header.bnb}</span></p>
                    <div className='flex flex-row gap-x-2 items-center text-center cursor-pointer' onClick={() => navigate(`/coin/${oneTrending[0]?.coin.name}`, { state: oneTrending[0] })}>
                        <img className='w-[20px]' src={oneTrending[0]?.coin.coinLogo} alt="" />
                        <p>{oneTrending[0]?.coin.name}</p>
                    </div>
                    <div className='flex flex-row gap-x-2 items-center text-center cursor-pointer' onClick={() => navigate(`/coin/${recently[0]?.coin.name}`, { state: recently[0] })}>
                        <img className='w-[20px]' src={recently[0]?.coin.coinLogo} alt="" />
                        <p>{recently[0]?.coin.name}</p>
                    </div>
                </div>
            </div>

            <Outlet />
            <div className='mt-[100px]'>
            </div>
            <footer className='text-[#e8f5f6] text-[12px] bg-secondary w-full mt-[80px] '>
                <div className='w-full bg-secondary text-white items-center py-[10px] px-auto '>
                    <span className='block mx-auto text-center '>
                        {/* <Link to={'/'} className="p-[5px] inline-block ml-[12px] mt-0">
                            <img className='w-[130px] align-middle' src={'https://coinvote.cc/template/images/en_badge_web_generic.png'} alt="" />
                        </Link>
                        <Link to={'/'} className="p-[5px] inline-block ml-[12px] mt-0">
                            <svg id="livetype" xmlns="http://www.w3.org/2000/svg" width="119.66407" height="40" viewBox="0 0 119.66407 40" style={{ verticalAlign: "middle" }}>
                                <title>Download_on_the_App_Store_Badge_US-UK_RGB_blk_4SVG_092917</title>
                                <g>
                                    <g>
                                        <g>
                                            <path d="M110.13477,0H9.53468c-.3667,0-.729,0-1.09473.002-.30615.002-.60986.00781-.91895.0127A13.21476,13.21476,0,0,0,5.5171.19141a6.66509,6.66509,0,0,0-1.90088.627A6.43779,6.43779,0,0,0,1.99757,1.99707,6.25844,6.25844,0,0,0,.81935,3.61816a6.60119,6.60119,0,0,0-.625,1.90332,12.993,12.993,0,0,0-.1792,2.002C.00587,7.83008.00489,8.1377,0,8.44434V31.5586c.00489.3105.00587.6113.01515.9219a12.99232,12.99232,0,0,0,.1792,2.0019,6.58756,6.58756,0,0,0,.625,1.9043A6.20778,6.20778,0,0,0,1.99757,38.001a6.27445,6.27445,0,0,0,1.61865,1.1787,6.70082,6.70082,0,0,0,1.90088.6308,13.45514,13.45514,0,0,0,2.0039.1768c.30909.0068.6128.0107.91895.0107C8.80567,40,9.168,40,9.53468,40H110.13477c.3594,0,.7246,0,1.084-.002.3047,0,.6172-.0039.9219-.0107a13.279,13.279,0,0,0,2-.1768,6.80432,6.80432,0,0,0,1.9082-.6308,6.27742,6.27742,0,0,0,1.6172-1.1787,6.39482,6.39482,0,0,0,1.1816-1.6143,6.60413,6.60413,0,0,0,.6191-1.9043,13.50643,13.50643,0,0,0,.1856-2.0019c.0039-.3106.0039-.6114.0039-.9219.0078-.3633.0078-.7246.0078-1.0938V9.53613c0-.36621,0-.72949-.0078-1.09179,0-.30664,0-.61426-.0039-.9209a13.5071,13.5071,0,0,0-.1856-2.002,6.6177,6.6177,0,0,0-.6191-1.90332,6.46619,6.46619,0,0,0-2.7988-2.7998,6.76754,6.76754,0,0,0-1.9082-.627,13.04394,13.04394,0,0,0-2-.17676c-.3047-.00488-.6172-.01074-.9219-.01269-.3594-.002-.7246-.002-1.084-.002Z" style={{ fill: '#a6a6a6' }}></path>
                                            <path d="M8.44483,39.125c-.30468,0-.602-.0039-.90429-.0107a12.68714,12.68714,0,0,1-1.86914-.1631,5.88381,5.88381,0,0,1-1.65674-.5479,5.40573,5.40573,0,0,1-1.397-1.0166,5.32082,5.32082,0,0,1-1.02051-1.3965,5.72186,5.72186,0,0,1-.543-1.6572,12.41351,12.41351,0,0,1-.1665-1.875c-.00634-.2109-.01464-.9131-.01464-.9131V8.44434S.88185,7.75293.8877,7.5498a12.37039,12.37039,0,0,1,.16553-1.87207,5.7555,5.7555,0,0,1,.54346-1.6621A5.37349,5.37349,0,0,1,2.61183,2.61768,5.56543,5.56543,0,0,1,4.01417,1.59521a5.82309,5.82309,0,0,1,1.65332-.54394A12.58589,12.58589,0,0,1,7.543.88721L8.44532.875H111.21387l.9131.0127a12.38493,12.38493,0,0,1,1.8584.16259,5.93833,5.93833,0,0,1,1.6709.54785,5.59374,5.59374,0,0,1,2.415,2.41993,5.76267,5.76267,0,0,1,.5352,1.64892,12.995,12.995,0,0,1,.1738,1.88721c.0029.2832.0029.5874.0029.89014.0079.375.0079.73193.0079,1.09179V30.4648c0,.3633,0,.7178-.0079,1.0752,0,.3252,0,.6231-.0039.9297a12.73126,12.73126,0,0,1-.1709,1.8535,5.739,5.739,0,0,1-.54,1.67,5.48029,5.48029,0,0,1-1.0156,1.3857,5.4129,5.4129,0,0,1-1.3994,1.0225,5.86168,5.86168,0,0,1-1.668.5498,12.54218,12.54218,0,0,1-1.8692.1631c-.2929.0068-.5996.0107-.8974.0107l-1.084.002Z"></path>
                                        </g>
                                        <g id="_Group_" data-name="<Group>">
                                            <g id="_Group_2" data-name="<Group>">
                                                <g id="_Group_3" data-name="<Group>">
                                                    <path id="_Path_" data-name="<Path>" d="M24.76888,20.30068a4.94881,4.94881,0,0,1,2.35656-4.15206,5.06566,5.06566,0,0,0-3.99116-2.15768c-1.67924-.17626-3.30719,1.00483-4.1629,1.00483-.87227,0-2.18977-.98733-3.6085-.95814a5.31529,5.31529,0,0,0-4.47292,2.72787c-1.934,3.34842-.49141,8.26947,1.3612,10.97608.9269,1.32535,2.01018,2.8058,3.42763,2.7533,1.38706-.05753,1.9051-.88448,3.5794-.88448,1.65876,0,2.14479.88448,3.591.8511,1.48838-.02416,2.42613-1.33124,3.32051-2.66914a10.962,10.962,0,0,0,1.51842-3.09251A4.78205,4.78205,0,0,1,24.76888,20.30068Z" style={{ fill: "#fff" }}></path>
                                                    <path id="_Path_2" data-name="<Path>" d="M22.03725,12.21089a4.87248,4.87248,0,0,0,1.11452-3.49062,4.95746,4.95746,0,0,0-3.20758,1.65961,4.63634,4.63634,0,0,0-1.14371,3.36139A4.09905,4.09905,0,0,0,22.03725,12.21089Z" style={{ fill: "#fff" }}></path>
                                                </g>
                                            </g>
                                            <g>
                                                <path d="M42.30227,27.13965h-4.7334l-1.13672,3.35645H34.42727l4.4834-12.418h2.083l4.4834,12.418H43.438ZM38.0591,25.59082h3.752l-1.84961-5.44727h-.05176Z" style={{ fill: "#fff" }}></path>
                                                <path d="M55.15969,25.96973c0,2.81348-1.50586,4.62109-3.77832,4.62109a3.0693,3.0693,0,0,1-2.84863-1.584h-.043v4.48438h-1.8584V21.44238H48.4302v1.50586h.03418a3.21162,3.21162,0,0,1,2.88281-1.60059C53.645,21.34766,55.15969,23.16406,55.15969,25.96973Zm-1.91016,0c0-1.833-.94727-3.03809-2.39258-3.03809-1.41992,0-2.375,1.23047-2.375,3.03809,0,1.82422.95508,3.0459,2.375,3.0459C52.30227,29.01563,53.24953,27.81934,53.24953,25.96973Z" style={{ fill: "#fff" }}></path>
                                                <path d="M65.12453,25.96973c0,2.81348-1.50586,4.62109-3.77832,4.62109a3.0693,3.0693,0,0,1-2.84863-1.584h-.043v4.48438h-1.8584V21.44238H58.395v1.50586h.03418A3.21162,3.21162,0,0,1,61.312,21.34766C63.60988,21.34766,65.12453,23.16406,65.12453,25.96973Zm-1.91016,0c0-1.833-.94727-3.03809-2.39258-3.03809-1.41992,0-2.375,1.23047-2.375,3.03809,0,1.82422.95508,3.0459,2.375,3.0459C62.26711,29.01563,63.21438,27.81934,63.21438,25.96973Z" style={{ fill: "#fff" }}></path>
                                                <path d="M71.71047,27.03613c.1377,1.23145,1.334,2.04,2.96875,2.04,1.56641,0,2.69336-.80859,2.69336-1.91895,0-.96387-.67969-1.541-2.28906-1.93652l-1.60937-.3877c-2.28027-.55078-3.33887-1.61719-3.33887-3.34766,0-2.14258,1.86719-3.61426,4.51855-3.61426,2.624,0,4.42285,1.47168,4.4834,3.61426h-1.876c-.1123-1.23926-1.13672-1.9873-2.63379-1.9873s-2.52148.75684-2.52148,1.8584c0,.87793.6543,1.39453,2.25488,1.79l1.36816.33594c2.54785.60254,3.60645,1.626,3.60645,3.44238,0,2.32324-1.85059,3.77832-4.79395,3.77832-2.75391,0-4.61328-1.4209-4.7334-3.667Z" style={{ fill: "#fff" }}></path>
                                                <path d="M83.34621,19.2998v2.14258h1.72168v1.47168H83.34621v4.99121c0,.77539.34473,1.13672,1.10156,1.13672a5.80752,5.80752,0,0,0,.61133-.043v1.46289a5.10351,5.10351,0,0,1-1.03223.08594c-1.833,0-2.54785-.68848-2.54785-2.44434V22.91406H80.16262V21.44238H81.479V19.2998Z" style={{ fill: "#fff" }}></path>
                                                <path d="M86.065,25.96973c0-2.84863,1.67773-4.63867,4.29395-4.63867,2.625,0,4.29492,1.79,4.29492,4.63867,0,2.85645-1.66113,4.63867-4.29492,4.63867C87.72609,30.6084,86.065,28.82617,86.065,25.96973Zm6.69531,0c0-1.9541-.89551-3.10742-2.40137-3.10742s-2.40039,1.16211-2.40039,3.10742c0,1.96191.89453,3.10645,2.40039,3.10645S92.76027,27.93164,92.76027,25.96973Z" style={{ fill: "#fff" }}></path>
                                                <path d="M96.18606,21.44238h1.77246v1.541h.043a2.1594,2.1594,0,0,1,2.17773-1.63574,2.86616,2.86616,0,0,1,.63672.06934v1.73828a2.59794,2.59794,0,0,0-.835-.1123,1.87264,1.87264,0,0,0-1.93652,2.083v5.37012h-1.8584Z" style={{ fill: "#fff" }}></path>
                                                <path d="M109.3843,27.83691c-.25,1.64355-1.85059,2.77148-3.89844,2.77148-2.63379,0-4.26855-1.76465-4.26855-4.5957,0-2.83984,1.64355-4.68164,4.19043-4.68164,2.50488,0,4.08008,1.7207,4.08008,4.46582v.63672h-6.39453v.1123a2.358,2.358,0,0,0,2.43555,2.56445,2.04834,2.04834,0,0,0,2.09082-1.27344Zm-6.28223-2.70215h4.52637a2.1773,2.1773,0,0,0-2.2207-2.29785A2.292,2.292,0,0,0,103.10207,25.13477Z" style={{ fill: "#fff" }}></path>
                                            </g>
                                        </g>
                                    </g>
                                    <g id="_Group_4" data-name="<Group>">
                                        <g>
                                            <path d="M37.82619,8.731a2.63964,2.63964,0,0,1,2.80762,2.96484c0,1.90625-1.03027,3.002-2.80762,3.002H35.67092V8.731Zm-1.22852,5.123h1.125a1.87588,1.87588,0,0,0,1.96777-2.146,1.881,1.881,0,0,0-1.96777-2.13379h-1.125Z" style={{ fill: "#fff" }}></path>
                                            <path d="M41.68068,12.44434a2.13323,2.13323,0,1,1,4.24707,0,2.13358,2.13358,0,1,1-4.24707,0Zm3.333,0c0-.97607-.43848-1.54687-1.208-1.54687-.77246,0-1.207.5708-1.207,1.54688,0,.98389.43457,1.55029,1.207,1.55029C44.57522,13.99463,45.01369,13.42432,45.01369,12.44434Z" style={{ fill: "#fff" }}></path>
                                            <path d="M51.57326,14.69775h-.92187l-.93066-3.31641h-.07031l-.92676,3.31641h-.91309l-1.24121-4.50293h.90137l.80664,3.436h.06641l.92578-3.436h.85254l.92578,3.436h.07031l.80273-3.436h.88867Z" style={{ fill: "#fff" }}></path>
                                            <path d="M53.85354,10.19482H54.709v.71533h.06641a1.348,1.348,0,0,1,1.34375-.80225,1.46456,1.46456,0,0,1,1.55859,1.6748v2.915h-.88867V12.00586c0-.72363-.31445-1.0835-.97168-1.0835a1.03294,1.03294,0,0,0-1.0752,1.14111v2.63428h-.88867Z" style={{ fill: "#fff" }}></path>
                                            <path d="M59.09377,8.437h.88867v6.26074h-.88867Z" style={{ fill: "#fff" }}></path>
                                            <path d="M61.21779,12.44434a2.13346,2.13346,0,1,1,4.24756,0,2.1338,2.1338,0,1,1-4.24756,0Zm3.333,0c0-.97607-.43848-1.54687-1.208-1.54687-.77246,0-1.207.5708-1.207,1.54688,0,.98389.43457,1.55029,1.207,1.55029C64.11232,13.99463,64.5508,13.42432,64.5508,12.44434Z" style={{ fill: "#fff" }}></path>
                                            <path d="M66.4009,13.42432c0-.81055.60352-1.27783,1.6748-1.34424l1.21973-.07031v-.38867c0-.47559-.31445-.74414-.92187-.74414-.49609,0-.83984.18213-.93848.50049h-.86035c.09082-.77344.81836-1.26953,1.83984-1.26953,1.12891,0,1.76563.562,1.76563,1.51318v3.07666h-.85547v-.63281h-.07031a1.515,1.515,0,0,1-1.35254.707A1.36026,1.36026,0,0,1,66.4009,13.42432Zm2.89453-.38477v-.37646l-1.09961.07031c-.62012.0415-.90137.25244-.90137.64941,0,.40527.35156.64111.835.64111A1.0615,1.0615,0,0,0,69.29543,13.03955Z" style={{ fill: "#fff" }}></path>
                                            <path d="M71.34816,12.44434c0-1.42285.73145-2.32422,1.86914-2.32422a1.484,1.484,0,0,1,1.38086.79h.06641V8.437h.88867v6.26074h-.85156v-.71143h-.07031a1.56284,1.56284,0,0,1-1.41406.78564C72.0718,14.772,71.34816,13.87061,71.34816,12.44434Zm.918,0c0,.95508.4502,1.52979,1.20313,1.52979.749,0,1.21191-.583,1.21191-1.52588,0-.93848-.46777-1.52979-1.21191-1.52979C72.72121,10.91846,72.26613,11.49707,72.26613,12.44434Z" style={{ fill: "#fff" }}></path>
                                            <path d="M79.23,12.44434a2.13323,2.13323,0,1,1,4.24707,0,2.13358,2.13358,0,1,1-4.24707,0Zm3.333,0c0-.97607-.43848-1.54687-1.208-1.54687-.77246,0-1.207.5708-1.207,1.54688,0,.98389.43457,1.55029,1.207,1.55029C82.12453,13.99463,82.563,13.42432,82.563,12.44434Z" style={{ fill: "#fff" }}></path>
                                            <path d="M84.66945,10.19482h.85547v.71533h.06641a1.348,1.348,0,0,1,1.34375-.80225,1.46456,1.46456,0,0,1,1.55859,1.6748v2.915H87.605V12.00586c0-.72363-.31445-1.0835-.97168-1.0835a1.03294,1.03294,0,0,0-1.0752,1.14111v2.63428h-.88867Z" style={{ fill: "#fff" }}></path>
                                            <path d="M93.51516,9.07373v1.1416h.97559v.74854h-.97559V13.2793c0,.47168.19434.67822.63672.67822a2.96657,2.96657,0,0,0,.33887-.02051v.74023a2.9155,2.9155,0,0,1-.4834.04541c-.98828,0-1.38184-.34766-1.38184-1.21582v-2.543h-.71484v-.74854h.71484V9.07373Z" style={{ fill: "#fff" }}></path>
                                            <path d="M95.70461,8.437h.88086v2.48145h.07031a1.3856,1.3856,0,0,1,1.373-.80664,1.48339,1.48339,0,0,1,1.55078,1.67871v2.90723H98.69v-2.688c0-.71924-.335-1.0835-.96289-1.0835a1.05194,1.05194,0,0,0-1.13379,1.1416v2.62988h-.88867Z" style={{ fill: "#fff" }}></path>
                                            <path d="M104.76125,13.48193a1.828,1.828,0,0,1-1.95117,1.30273A2.04531,2.04531,0,0,1,100.73,12.46045a2.07685,2.07685,0,0,1,2.07617-2.35254c1.25293,0,2.00879.856,2.00879,2.27V12.688h-3.17969v.0498a1.1902,1.1902,0,0,0,1.19922,1.29,1.07934,1.07934,0,0,0,1.07129-.5459Zm-3.126-1.45117h2.27441a1.08647,1.08647,0,0,0-1.1084-1.1665A1.15162,1.15162,0,0,0,101.63527,12.03076Z" style={{ fill: "#fff" }}></path>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </Link> */}
                        <p className='my-[8px] text-[1.2rem] font-semibold'>Coming Soon on APP Store and Google Pay.</p>
                        <p className='my-[8px] text-[1.2rem] text-blue-600 font-semibold'><a href="mailto:contact@pink-vote.com">contact@pink-vote.com</a></p>
                        <p className='my-[8px] text-[1.2rem] text-blue-600 font-semibold'><a href="mailto:Support@pink-vote.com">Support@pink-vote.com</a></p>
                    </span>
                    {/* <div className='flex flex-row gap-x-[20px] w-[50%] justify-center items-center mx-auto'>
                        <Link to='/'>
                            <span className=' flex justify-center items-center rounded-[50%] h-[3em] text-primary bg-white align-middle w-[3em] hover:bg-gray' style={{ lineHeight: "2em" }}>
                                <svg width="20" height="15" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.9573 1.14521L12.6937 11.8203C12.5229 12.5737 12.0775 12.7612 11.4447 12.4063L7.9957 9.86474L6.33149 11.4653C6.14732 11.6495 5.99329 11.8035 5.63835 11.8035L5.88614 8.29094L12.2784 2.51475C12.5564 2.26696 12.2182 2.12967 11.8465 2.37746L3.944 7.35335L0.541912 6.28853C-0.198109 6.05748 -0.211503 5.54851 0.695944 5.19356L14.0029 0.0669903C14.6191 -0.164057 15.1582 0.204279 14.9573 1.14521Z" fill="currentColor" /></svg>
                            </span>
                        </Link>
                        <Link to='/'>
                            <span className='flex justify-center items-center rounded-[50%] h-[3em] text-primary bg-white align-middle w-[3em] hover:bg-gray' style={{ lineHeight: "2em" }}>
                                <svg width="20" height="15" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.4582 3.03616C13.4677 3.16941 13.4677 3.30268 13.4677 3.43592C13.4677 7.5 10.3744 12.1828 4.72083 12.1828C2.97906 12.1828 1.36105 11.6783 0 10.8027C0.247472 10.8312 0.485393 10.8408 0.742386 10.8408C2.17955 10.8408 3.50254 10.3554 4.55902 9.52732C3.20749 9.49876 2.07487 8.61361 1.68464 7.39532C1.87501 7.42386 2.06535 7.4429 2.26524 7.4429C2.54125 7.4429 2.81729 7.40481 3.07425 7.33822C1.66562 7.05266 0.609114 5.81536 0.609114 4.32107V4.28301C1.01836 4.51144 1.49429 4.65421 1.9987 4.67322C1.17065 4.12118 0.628157 3.17893 0.628157 2.11293C0.628157 1.54187 0.780413 1.01839 1.04693 0.561535C2.56026 2.42702 4.83503 3.64528 7.38577 3.77855C7.33819 3.55012 7.30963 3.3122 7.30963 3.07425C7.30963 1.38006 8.6802 0 10.3839 0C11.269 0 12.0685 0.371193 12.6301 0.970814C13.3249 0.837572 13.9911 0.580578 14.5812 0.228429C14.3528 0.942279 13.8674 1.5419 13.2297 1.92259C13.8484 1.85599 14.448 1.68464 15 1.44671C14.5813 2.05583 14.0578 2.59832 13.4582 3.03616Z" fill="currentColor" /></svg>
                            </span>
                        </Link>
                        <Link to='/'>
                            <span className='flex justify-center items-center rounded-[50%] h-[3em] text-primary bg-white align-middle w-[3em] hover:bg-gray' style={{ lineHeight: "2em" }}>
                                <svg width="20" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.50167 3.65337C5.3734 3.65337 3.65672 5.37005 3.65672 7.49833C3.65672 9.6266 5.3734 11.3433 7.50167 11.3433C9.62995 11.3433 11.3466 9.6266 11.3466 7.49833C11.3466 5.37005 9.62995 3.65337 7.50167 3.65337ZM7.50167 9.99805C6.12633 9.99805 5.00195 8.87702 5.00195 7.49833C5.00195 6.11963 6.12298 4.99861 7.50167 4.99861C8.88037 4.99861 10.0014 6.11963 10.0014 7.49833C10.0014 8.87702 8.87702 9.99805 7.50167 9.99805ZM12.4007 3.4961C12.4007 3.9947 11.9992 4.39292 11.5039 4.39292C11.0053 4.39292 10.6071 3.99136 10.6071 3.4961C10.6071 3.00084 11.0086 2.59927 11.5039 2.59927C11.9992 2.59927 12.4007 3.00084 12.4007 3.4961ZM14.9473 4.4063C14.8904 3.20496 14.616 2.14083 13.7359 1.26408C12.8592 0.38734 11.795 0.112939 10.5937 0.052705C9.35555 -0.0175683 5.64445 -0.0175683 4.4063 0.052705C3.20831 0.109593 2.14417 0.383993 1.26408 1.26074C0.383993 2.13748 0.112939 3.20162 0.052705 4.40296C-0.0175683 5.6411 -0.0175683 9.3522 0.052705 10.5904C0.109593 11.7917 0.383993 12.8558 1.26408 13.7326C2.14417 14.6093 3.20496 14.8837 4.4063 14.9439C5.64445 15.0142 9.35555 15.0142 10.5937 14.9439C11.795 14.8871 12.8592 14.6127 13.7359 13.7326C14.6127 12.8558 14.8871 11.7917 14.9473 10.5904C15.0176 9.3522 15.0176 5.64445 14.9473 4.4063ZM13.3477 11.9189C13.0867 12.5747 12.5814 13.08 11.9222 13.3444C10.935 13.7359 8.59258 13.6456 7.50167 13.6456C6.41076 13.6456 4.06497 13.7326 3.08115 13.3444C2.42526 13.0834 1.91997 12.5781 1.65561 11.9189C1.26408 10.9317 1.35443 8.58924 1.35443 7.49833C1.35443 6.40742 1.26743 4.06163 1.65561 3.0778C1.91662 2.42192 2.42192 1.91662 3.08115 1.65226C4.06832 1.26074 6.41076 1.35109 7.50167 1.35109C8.59258 1.35109 10.9384 1.26408 11.9222 1.65226C12.5781 1.91327 13.0834 2.41857 13.3477 3.0778C13.7393 4.06498 13.6489 6.40742 13.6489 7.49833C13.6489 8.58924 13.7393 10.935 13.3477 11.9189Z" fill="currentColor" /></svg>
                            </span>
                        </Link>
                        <Link to='/'>
                            <span className='flex justify-center items-center rounded-[50%] h-[3em] text-primary bg-white align-middle w-[3em] hover:bg-gray' style={{ lineHeight: "2em" }}>
                                <svg width="20" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.35759 14.9997H0.247768V4.98516H3.35759V14.9997ZM1.801 3.61908C0.806585 3.61908 0 2.79542 0 1.801C7.11763e-09 1.32335 0.189748 0.865256 0.527502 0.527502C0.865256 0.189748 1.32335 0 1.801 0C2.27866 0 2.73675 0.189748 3.07451 0.527502C3.41226 0.865256 3.60201 1.32335 3.60201 1.801C3.60201 2.79542 2.79509 3.61908 1.801 3.61908ZM14.9967 14.9997H11.8935V10.1247C11.8935 8.96283 11.8701 7.47288 10.2767 7.47288C8.65982 7.47288 8.41205 8.73516 8.41205 10.041V14.9997H5.30558V4.98516H8.28817V6.35123H8.3317C8.74687 5.5644 9.76105 4.73404 11.2741 4.73404C14.4214 4.73404 15 6.80659 15 9.49855V14.9997H14.9967Z" fill="currentColor" /></svg>
                            </span>
                        </Link>
                    </div> */}
                    <div className='flex justify-center items-center mt-[8px]'>
                        <Link to={"/"} className="text-[20px] text-white font-medium">
                            🚀 Need to boost your marketing?
                        </Link>
                    </div>
                    <ul className='px-[5px] flex flex-wrap flex-row justify-center items-center text-[1.1rem] text-center gap-x-[18px] mt-[8px]'>
                        <li className='text-[#1a1a1a] hover:text-[#9b2847]'>
                            <Link to={"/disclaimer"} className=''>Disclaimer</Link>
                        </li>
                        <li className='text-[#1a1a1a] hover:text-[#9b2847]'>
                            <Link to={"/terms"} className=''>Terms of Use</Link>
                        </li>
                        <li className='text-[#1a1a1a] hover:text-[#9b2847]'>
                            <Link to={"/privacy"} className=''>Privacy Policy</Link>
                        </li>
                        <li className='text-[#1a1a1a] hover:text-[#9b2847]'>
                            <Link to={"/cgv"} className=''>Terms & Conditions</Link>
                        </li>
                        <li className='text-[#1a1a1a] hover:text-[#9b2847]'>
                            <Link to={"/contact"} className=''>Contact</Link>
                        </li>
                        <li className='text-[#1a1a1a] hover:text-[#9b2847]'>
                            <Link to={"/mobile"} className=''>Mobile App</Link>
                        </li>
                    </ul>
                    <div className='flex justify-center items-center px-[5px] mt-[5px]'>
                        © 2023 Pink Vote. All rights reserved.
                    </div>
                    <div className='flex justify-center items-center px-[5px] mt-[5px]'>
                        <img className='lg:w-[13%] md:w-[21%] w-[35%]' src="https://images.dmca.com/Badges/dmca-badge-w250-5x1-09.png?ID=42663165-1ec2-4a03-be8a-5ded6dd2930c" alt="" />
                    </div>
                    <div className='flex justify-center items-center px-[5px] mt-[5px]'>
                        <img className='lg:w-[4%] md:w-[6%] w-[15%]' src="https://b.sf-syn.com/badge_img/3457098/light-default?&variant_id=sf&r=https://coinvote.cc/" alt="" />
                    </div>

                </div>
            </footer>
        </>
    )
}

export default App