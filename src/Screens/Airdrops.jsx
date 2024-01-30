import axios from 'axios'
import { onValue, ref, update } from 'firebase/database'
import React, { useContext, useEffect, useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { Link, useNavigate } from 'react-router-dom'
import { db } from '../../Firebase'
import { GlobalContext } from './GlobalContext'

const Airdrops = () => {
  const navigate = useNavigate()
  const { currentUser } = useContext(GlobalContext)

  const [banner, setBanner] = useState([])
  const [dbUser, setDbUser] = useState([])
  const [airdropData, setAirdropData] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [clickedAirdrop, setClickedAirdrop] = useState({});
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [recaptchaKey, setRecaptchaKey] = useState(Date.now());
  const captchaRef = useRef(null)
  const [hourError, setHourError] = useState(false);


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
    const AirdropRef = ref(db, '/airdrops');
    onValue(AirdropRef, (snapshot) => {
      let AirdropList = [];
      snapshot.forEach(childSnapshot => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        AirdropList.push({ key: childKey, airdrop: childData });
      });

      AirdropList.sort((a, b) => b.airdrop.votes - a.airdrop.votes);

      setAirdropData(AirdropList);
    }, (error) => console.log(error))
  }, [currentUser]);

  const upVote = (e, coin) => {
    e.stopPropagation();
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
    console.log("clicked airdrop", clickedAirdrop)

    if (token) {
        let valid_token = await verifyToken(token);
        const res = await axios.get('https://geolocation-db.com/json/')
        console.log(res.data.IPv4);
        try {
            const response = await axios.get(`https://pinkvote-backend.herokuapp.com/verifyIp/${res.data.IPv4}`);
            console.log(response.data.success);
            if (valid_token.success && response.data.success) {
                update(ref(db, `/airdrops/${clickedAirdrop.key}`), {
                    votes: clickedAirdrop.airdrop.votes + 1,
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
      {
        banner.length > 0 ?

          <div className='bg-secondary text-white px-[8px] border-[3px] border-primary rounded-[5px] flex flex-row w-full items-center gap-x-[140px]'>
            <h1 className=''>Logo</h1>
            <div className=' py-[8px]  flex flex-col justify-center items-center'>
              <img src={banner[0].image} className={"w-full "} alt="" />
            </div>
          </div> :
          <div className='bg-secondary text-white border-[3px] border-primary rounded-[5px] flex flex-row w-full md:w-full lg:w-[50%] items-center gap-x-[140px]'>
            <h1 className=''>Logo</h1>
            <div className=' py-[8px]  flex flex-col justify-center items-center'>
              <h2 className='text-[1.5rem] font-medium'>YOUR BANNER HERE</h2>
              <h2 className='text-white text-[1rem] font-medium'>Pink Vote.com</h2>
            </div>
          </div>
      }
      <div className='w-full flex mt-[20px] px-[8px] md:w-[80%] flex-col'>
        <h1 className='text-[2.5rem] font-bold text-primary'>Ongoing Airdrops</h1>
        <h1 className='text-[1.5rem] font-medium text-black'>Listed below are all the exclusive crypto airdrops : cryptocurrencies, tokens and other cryptoassets.</h1>
        <table className='w-full border-[5px] border-secondary bg-primary text-center'>
          <thead>
            <tr className='w-full border-b border-b-white h-[30px] text-[10px] text-white'>
              <td className='align-middle table-cell text-[10px] h-[5px] text-white'></td>
              <td className='hidden md:table-cell align-middle text-[10px] h-[5px] text-white'>Name</td>
              <td className='hidden md:table-cell align-middle text-[10px] h-[5px] text-white'>Status</td>
              <td className='hidden md:table-cell align-middle text-[10px] h-[5px] text-white'>Start</td>
              <td className='hidden md:table-cell align-middle text-[10px] h-[5px] text-white'>End</td>
              <td className='align-middle table-cell text-[10px] h-[5px] text-white'>Rewards</td>
              <td className='align-middle table-cell text-[10px] h-[5px] text-white'>Votes</td>
            </tr>
          </thead>
          <tbody>
            {
              airdropData.map(airdrop => (

                <tr key={airdrop.key} onClick={() => navigate(`/airdrop/${airdrop.airdrop.name}`, { state: airdrop })} className='border-b border-b-white  hover:bg-secondary h-[70px] cursor-pointer w-full border-spacing-[10px] text-white text-center'>
                  <td className='group align-middle table-cell text-[16px] text-primary'>
                    <div className='ml-[18px] w-[50px] h-[50px] overflow-hidden rounded-[50%]'>
                      <img src={airdrop.airdrop.Logo} alt="" />
                    </div>
                  </td>
                  <td className='group align-middle table-cell text-[16px] text-white'>
                    <p className='text-white font-extrabold'>{airdrop.airdrop.name}<br /> <span className='text-[12px] font-medium'>{airdrop.airdrop.shortDescription}</span></p>
                  </td>
                  <td className='hidden md:table-cell align-middle text-[16px] text-white'>{airdrop.airdrop.status}</td>
                  <td className='hidden md:table-cell align-middle text-[16px] text-white'>{airdrop.airdrop.startDate}</td>
                  <td className='hidden md:table-cell align-middle text-[16px] text-white'>{airdrop.airdrop.endDate}</td>
                  <td className='hidden md:table-cell align-middle text-[16px] text-white'>{airdrop.airdrop.rewards}</td>
                  <td onClick={(e) => { upVote(e, airdrop); setClickedAirdrop(airdrop) }} className='align-middle text-[16px] text-white'>
                    <button className='hover:bg-redPrimary font-extrabold min-w-[80px] text-center border-[2px] border-redPrimary bg-primary rounded-[7px] p-[10px] text-white' style={{ lineHeight: 1.5 }}>
                      <div className='flex flex-row justify-evenly items-start align-middle'>
                        <svg className='mt-[3px]' width="15" height="16" viewBox="0 0 18 34" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 0L0.339747 15L17.6603 15L9 0ZM10.5 34L10.5 13.5L7.5 13.5L7.5 34L10.5 34Z" fill="currentColor" /></svg>
                        <p className='ml-[2px]'>{airdrop.airdrop.votes}</p>
                      </div>
                    </button>
                  </td>
                </tr>
              ))

            }
          </tbody>
        </table>
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
                                        {clickedAirdrop.airdrop.name}
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
                                    <p className='mb-[40px]'>Total Votes: {clickedAirdrop.airdrop.votes}</p>

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

export default Airdrops