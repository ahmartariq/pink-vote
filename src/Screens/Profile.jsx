import { onValue, ref } from 'firebase/database'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { db } from '../../Firebase'
import { GlobalContext } from './GlobalContext'

const Profile = () => {
    const [image, setImage] = useState('https://firebasestorage.googleapis.com/v0/b/coin-ab637.appspot.com/o/profiles%2Fprofile.jpg?alt=media&token=d1c9cf40-4e39-429c-b610-595fd066ff01')
    const navigate = useNavigate()
    const { currentUser } = useContext(GlobalContext)
    const [coins, setCoins] = useState([])
    const [dbUser, setDbUser] = useState([])

    const loggedIn = localStorage.getItem('currentUser');

    useEffect(() => {
        if (!loggedIn) {
            navigate("/login")
        }
    }, [loggedIn])

    const dateDifference = (endDate) => {
        const currentDate = new Date();
        const targetDate = new Date(endDate);
        const timeDiff = currentDate.getTime() - targetDate.getTime();
        const diffMonths = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30.44));
        return diffMonths
    }

    useEffect(() => {
        if (currentUser != undefined) {
            setImage(currentUser.photoURL)
        }
    }, [currentUser])

    useEffect(() => {
        const userRef = ref(db, 'users/');
        onValue(userRef, snapshot => {
            snapshot.forEach(childSnapshot => {
                if (Object.values(childSnapshot.val()).includes(currentUser.uid)) {
                    setDbUser(childSnapshot.val())
                }
            })
        });

    }, [currentUser])

    useEffect(() => {
        const CoinsRef = ref(db, '/coins');
        onValue(CoinsRef, (snapshot) => {
            let coinList = [];
            snapshot.forEach(childSnapshot => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                if(childData.ownerId == currentUser.uid){
                    coinList.push({ key: childKey, coin: childData });
                }
            });
            setCoins(coinList);
        }, (error) => console.log(error))
    }, [currentUser]);


    const IsFav = (coin) => {
        return dbUser.fav && dbUser.fav.includes(coin.key);
    }

    const handleFav = (e, coin) => {

        e.stopPropagation();

        let favs = dbUser.fav
        if (favs.includes(coin.key)) {
            favs = favs.filter(e => e != coin.key)
        } else {
            favs.push(coin.key)
        }
        set(ref(db, `users/${currentUser.uid}/fav`), favs)
    }


    const upVote = (e, coin) => {
        e.stopPropagation();
        if (currentUser == undefined) {
            laert("please login to vote");
        }
        else if (!coin.coin.voteBy.includes(currentUser.uid)) {

            update(ref(db, `/coins/${coin.key}`), {
                votes: coin.coin.votes + 1,
                voteBy: [coin.coin.voteBy]
            })

            let valueBy = coin.coin.voteBy
            valueBy.push(currentUser.uid)
            set(ref(db, `coins/${coin.key}/voteBy`), valueBy)
        }
        else {
            alert("Cannot vote");
        }
    }

    return (
        <div className='mt-[120px] items-center flex justify-center w-full flex-col'>
            <div className='bg-primary h-[110px] justify-center px-[12px] max-h-[180px] flex mt-[20px] mx-[50px] md:w-[60%] w-[90%] flex-col'>
                <div className='w-[100px]  h-[100px] overflow-hidden rounded-[50%]'>
                    <img src={image} className={`w-full`} alt="" />
                </div>
            </div>
            <div className='w-full flex mt-[20px] px-[8px] md:w-[80%] flex-col'>
                <ul className=' overflow-x-auto overflow-y-hidden whitespace-nowrap flex gap-x-2'>
                    <li className='mt-[5px] border-b-[4px inline-block mr-[2px] border-[5px] border-primary'>
                        <p className={` bg-primary text-white text-[18px]  cursor-pointer block px-[20px] py-[10px]`}>
                            My Coins
                        </p>
                    </li>
                </ul>
                <table className='w-full border-[5px] border-secondary bg-primary text-center'>
                    <thead>
                        <tr className='w-full border-b border-b-white h-[30px] text-[10px] text-white'>
                            <td className='align-middle table-cell text-[10px] h-[5px] text-white'></td>
                            <td className='align-middle table-cell text-[10px] h-[5px] text-white'></td>
                            <td className='hidden md:table-cell align-middle text-[10px] h-[5px] text-white'>Chain</td>
                            <td className='hidden md:table-cell align-middle text-[10px] h-[5px] text-white'>24th</td>
                            <td className='hidden md:table-cell align-middle text-[10px] h-[5px] text-white'>Market Cap</td>
                            <td className='hidden md:table-cell align-middle text-[10px] h-[5px] text-white'>Since Launch</td>
                            <td className='align-middle table-cell text-[10px] h-[5px] text-white'>Votes</td>
                            <td className='hidden md:table-cell align-middle text-[10px] h-[5px] text-white'>Daily Rank</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            coins.length > 0 ?
                                coins.map(coin => (
                                    <tr onClick={() => navigate(`/coin/${coin.coin.name}`, { state: coin })} className='border-b border-b-white  hover:bg-secondary h-[70px] cursor-pointer w-full border-spacing-[10px] text-white text-center'>
                                        <td onClick={(e) => handleFav(e, coin)} className='group align-middle table-cell text-[16px] text-white'>
                                            <div className='flex flex-row w-full justify-center items-center'>
                                                <svg className={` ${IsFav(coin) ? "text-red-500" : "text-white"} group-hover:opacity-100 inline opacity-0  mr-[15px]`} width="25" height="22" viewBox="0 0 25 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.5738 1.49576C19.8981 -0.784512 15.9186 -0.374356 13.4625 2.15982L12.5006 3.15104L11.5387 2.15982C9.08751 -0.374356 5.10314 -0.784512 2.42736 1.49576C-0.639049 4.11295 -0.800182 8.81022 1.94396 11.6471L11.3922 21.403C12.0026 22.0329 12.9938 22.0329 13.6041 21.403L23.0524 11.6471C25.8014 8.81022 25.6402 4.11295 22.5738 1.49576Z" fill="currentColor" /></svg>
                                                <div className='w-[30px] h-[30px] overflow-hidden rounded-[50%]'>
                                                    <img src={coin.coin.coinLogo} alt="" />
                                                </div>
                                            </div>
                                        </td>
                                        <td className='group align-middle table-cell text-[16px] text-white'>
                                            <p className='text-white font-extrabold'>{coin.coin.name}<br /> <span className='text-[12px] font-medium'>${coin.coin.symbol}</span></p>
                                        </td>
                                        <td className='hidden md:table-cell align-middle text-[16px] text-white'>{coin.coin.chain}</td>
                                        <td className='hidden md:table-cell align-middle text-[16px] text-white'>{ }</td>
                                        <td className='hidden md:table-cell align-middle text-[16px] text-white'>$ {coin.coin.cap}</td>
                                        <td className='hidden md:table-cell align-middle text-[16px] text-white'>{`${dateDifference(coin.coin.launchDate)} Months`}</td>
                                        <td onClick={(e) => upVote(e, coin)} className='align-middle text-[16px] text-white'>
                                            <button className='hover:bg-redPrimary font-extrabold min-w-[80px] text-center border-[2px] border-redPrimary bg-primary rounded-[7px] p-[10px] text-white' style={{ lineHeight: 1.5 }}>
                                                <div className='flex flex-row justify-evenly items-start align-middle'>
                                                    <svg className='mt-[3px]' width="15" height="16" viewBox="0 0 18 34" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 0L0.339747 15L17.6603 15L9 0ZM10.5 34L10.5 13.5L7.5 13.5L7.5 34L10.5 34Z" fill="currentColor" /></svg>
                                                    <p className='ml-[2px]'>{coin.coin.votes}</p>
                                                </div>
                                            </button>
                                        </td>
                                        <td className='hidden md:table-cell align-middle text-center text-[16px] text-white'>{coin.coin.rank}</td>
                                    </tr>
                                ))
                                :
                                null

                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Profile