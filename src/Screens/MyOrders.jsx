import { onValue, ref } from 'firebase/database'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../Firebase'
import { GlobalContext } from './GlobalContext'

const MyOrders = () => {
    const navigate = useNavigate()
    const [order, SetOrders] = useState('')
    const [promoted, SetPromoted] = useState('')
    const [banner, SetBanner] = useState('')
    const [vote, SetVote] = useState('')
    const [certified, SetCertified] = useState('')
    const {currentUser} = useContext(GlobalContext)
    const loggedIn = localStorage.getItem('currentUser');

    useEffect(() => {
        if (!loggedIn) {
            navigate("/login")
        }
    }, [loggedIn])

    useEffect(() => {
        const promotionRef = ref(db, '/promoted');
        onValue(promotionRef, (snapshot) => {
            let promotionList = [];
            let bannerList = [];
            let voteList = [];
            snapshot.forEach(childSnapshot => {
                const childData = childSnapshot.val();
                if (JSON.parse(childData.promoted).length > 0) {
                    console.log("promoted");
                    promotionList.push(childData);
                }
                if (JSON.parse(childData.banner).length > 0) {
                    console.log("promoted");
                    bannerList.push({ date: JSON.parse(childData.banner), image: childData.bannerImage, url: childData.bannerURL });
                    
                }
                if (childData.voteImage !== "") {
                    console.log("promoted");
                    voteList.push(JSON.parse(childData.vote));
                }
            });
        }, (error) => console.log(error))
    }, [currentUser]);

    return (
        <div className='mt-[120px] items-center flex justify-center w-full flex-col'>
            <div className='md:w-[80%] w-full flex flex-col justify-center items-center my-[20px]  rounded-[12px] pt-[20px] pb-[90px] px-[5px] bg-primary border-[5px] border-secondary '>
                <div onClick={() => navigate("/")} className='self-start inline-flex cursor-pointer flex-row items-center gap-x-[8px] text-white p-[20px] hover:text-white'>
                    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4965 18.1877L10.5055 19.1787C10.0859 19.5983 9.40743 19.5983 8.9923 19.1787L0.314697 10.5055C-0.104899 10.0859 -0.104899 9.40743 0.314697 8.9923L8.9923 0.314697C9.4119 -0.104899 10.0904 -0.104899 10.5055 0.314697L11.4965 1.30566C11.9205 1.72972 11.9116 2.4216 11.4786 2.83674L6.09977 7.96117H18.9287C19.5224 7.96117 20 8.43879 20 9.03247V10.4609C20 11.0546 19.5224 11.5322 18.9287 11.5322H6.09977L11.4786 16.6566C11.9161 17.0718 11.925 17.7636 11.4965 18.1877Z" fill="currentColor" /></svg>
                    <p>Go back</p>
                </div>

                <h1 className='text-[2.5rem] font-semibold'>My Orders</h1>
                <p className='text-[1.2rem] font-medium'>Find your running order, download your invoices...</p>

                <div className='flex flex-col justify-center items-center mt-[40px] '>
                    <h1 className='text-[1.5rem] mb-[10px] mt-[20px] font-medium'>Pending Orders</h1>
                    {order.length === 0 ?
                        <h1 className='text-[1rem]  font-normal'>No data there..</h1>
                        :
                        <></>
                    }
                </div>
                <div className='flex flex-col justify-center items-center mt-[40px] '>
                    <h1 className='text-[1.5rem] mb-[10px] mt-[20px] font-medium'>Promoted Coin</h1>
                    {promoted.length === 0 ?
                        <h1 className='text-[1rem]  font-normal'>No data there..</h1>
                        :
                        <></>
                    }
                </div>
                <div className='flex flex-col justify-center items-center mt-[40px] '>
                    <h1 className='text-[1.5rem] mb-[10px] mt-[20px] font-medium'>Banner Ad</h1>
                    {banner.length === 0 ?
                        <h1 className='text-[1rem]  font-normal'>No data there..</h1>
                        :
                        <></>
                    }
                </div>
                <div className='flex flex-col justify-center items-center mt-[40px] '>
                    <h1 className='text-[1.5rem] mb-[10px] mt-[20px] font-medium'>Vote ad</h1>
                    {vote.length === 0 ?
                        <h1 className='text-[1rem]  font-normal'>No data there..</h1>
                        :
                        <></>
                    }
                </div>
                <div className='flex flex-col justify-center items-center mt-[40px] '>
                    <h1 className='text-[1.5rem] mb-[10px] mt-[20px] font-medium'>Certified Coin</h1>
                    {certified.length === 0 ?
                        <h1 className='text-[1rem]  font-normal'>No data there..</h1>
                        :
                        <></>
                    }
                </div>
            </div>
        </div>
    )
}

export default MyOrders