import { onValue, ref } from 'firebase/database';
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../../Firebase';
import { GlobalContext } from './GlobalContext';


const options = ['All', 'Listing', 'Audit', 'Marketing', 'Launchpad', 'News', 'dApp', 'Other']


const Partners = () => {
  const [type, setType] = useState([options[0]])
  const [paid, setPaid] = useState(false);
  const [dbUser, setDbUser] = useState([])
  const [partnerData, setPartnerData] = useState([])
  const [collapse, setCollapse] = useState([])

  const { currentUser } = useContext(GlobalContext)

  const handleOptionClick = (option) => {
    setType((prevType) => {
      if (option === 'All') {
        return [option];
      }
      else if (prevType.includes(option)) {
        const updatedType = prevType.filter((item) => item !== option);
        return updatedType.length === 0 ? ['All'] : updatedType;
      }
      else {
        const newType = prevType.filter((item) => item !== 'All');
        const updatedType = [...newType, option];
        return updatedType.length === options.length ? [...newType] : updatedType;
      }
    });
  };

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
    const PartnerRef = ref(db, '/partners');
    onValue(PartnerRef, (snapshot) => {
      let PartnerList = [];
      snapshot.forEach(childSnapshot => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        PartnerList.push({ key: childKey, partner: childData });
      });

      if(type.includes("All")){
        setPartnerData(PartnerList);
      }
      else{
        setPartnerData( PartnerList.filter(list => type.some(type => list.partner.type.includes(type))))
      }

      if(paid){
        setPartnerData(partnerData.filter(data=> {
          if(!data.partner.paid && paid){
            return false
          }

          return true
        }))
      }
    }, (error) => console.log(error))
  }, [currentUser , type, paid]);

  const toggleCollapse = (id) => {
    if (collapse.includes(id)) {
      setCollapse(collapse.filter((divId) => divId !== id));
    } else {
      setCollapse([...collapse, id]);
    }
  };

  return (
    <div className='mt-[120px] items-center flex justify-center w-full flex-col'>

      <div className='w-full flex mt-[20px] px-[8px] md:w-[80%] flex-col'>
        <h1 className='text-[2.5rem] font-bold text-primary'>Partners & Tools</h1>
        <h1 className='text-[1.0rem] font-medium text-black'>Find here the platform that will help you, among our partners or among the tools we recommend. We are in contact with them and would be happy to advise you, you will even get discounts.</h1>

        <ul className='flex flex-row gap-x-3'>
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleOptionClick(option)}
              className={`${type.includes(option)
                ? 'bg-primary text-white'
                : 'text-primary bg-white'
                } border-[2px] py-[10px] px-[30px] border-primary hover:bg-primary hover:text-white cursor-pointer`}
            >
              {option}
            </li>
          ))}

        </ul>

        <div
          className={`mt-[18px] w-[65px] h-[30px] rounded-full px-1 border-[2px] border-primary ${paid ? "bg-primary" : "bg-hover"} transition-all duration-300 ease-in-out`}
          onClick={() => setPaid(!paid)}
        >
          <div
            className={`m-0 p-0 w-[28px] h-[28px] rounded-full ${paid ? "bg-white" : "bg-white"
              } shadow-md transform ${paid ? "translate-x-[32px]" : "-translate-x-1"
              } transition-all duration-300 ease-in-out`}
          ></div>
        </div>
        <p className='text-black font-bold'>Hide Paid Services</p>


        <div className='flex flex-col gap-y-5 mt-[18px] mb-[50px]'>

          {
            partnerData.map((partner, index) => (
              <div key={index} className='relative border-[2px] border-secondary bg-primary rounded-[5px] p-[2rem]'>
                <ul className='absolute top-[-15px] left-[10px] m-0 p-0 flex flex-row gap-x-2'>
                  {partner.partner.type.map(type => (
                    <li className='bg-hover text-[12px] min-w-[10px] font-bold text-primary py-[3px] px-[7px] rounded-[4px]'>
                      #{type}
                    </li>
                  ))}

                </ul>

                {/* Bottom More Details Button */}
                <div onClick={() => toggleCollapse(index)} className='absolute bottom-[-15px] left-1/2 bg-hover text-primary py-[3px] px-[10px] rounded-[5px] cursor-pointer' style={{ transform: "translateX(-50%)" }}>
                  More Details
                </div>

                {/* Main Content */}
                <div className='flex flex-row flex-wrap'>
                  <div className='md:w-[16.66666674%] w-full flex justify-center items-center'>
                    <img className='rounded-[5px]' src={partner.partner.Logo} alt="" />
                  </div>

                  <div className='md:w-[33.33333337%] w-full px-4'>
                    <h1 className='font-bold text-[1.5rem] '>{partner.partner.name}</h1>
                    <p>{partner.partner.shortDescription}</p>
                  </div>

                  <div className='md:w-[25%] w-full'>
                    <h1 className='font-bold text-[1.5rem] '>&nbsp;</h1>
                    <ul className='text-[1rem]'>
                      {
                        partner.partner.points.map(point => (
                          <li className='flex flex-row gap-x-1 font-medium'>
                            <svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M17.8721 1.37241L6.87213 12.3724L1.87213 7.37241" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            {point}
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                  <div className='md:w-[25%] w-full'>
                    <h1 className='font-bold text-[1.5rem] '>&nbsp;</h1>
                    <div className='w-full flex flex-row mb-[18px]'>
                      <div className='w-1/2 flex flex-col items-center'>
                        <h1 className='text-[1.5rem] font-bold'>{partner.partner.deliveryDuration} Hours</h1>
                        <p>Delivery Duration</p>
                      </div>
                      <div className='w-1/2 flex flex-col items-center'>
                        <h1 className='text-[1.5rem] font-bold'>{partner.partner.discount}</h1>
                        <p>Discount</p>
                      </div>
                    </div>

                    <button onClick={() => window.open(partner.partner.link , "_blank")} className='w-full font-medium ml-[5px] text-secondary text-[14.5px] py-[10px] px-[15px] rounded-[8px]' style={{ lineHeight: '20px', animation: 'shadow-pulse 3s infinite', background: "linear-gradient(180deg,white 0, white" }}>
                      {partner.partner.link}
                    </button>
                  </div>

                </div>
                {collapse.includes(index) &&
                  <div className={`flex flex-row gap-2 flex-wrap mt-[25px]` }>
                    <hr className='w-full border-y-2 border-white rounded-lg' />
                      <div className='w-full md:w-[48%]'>
                        <h1 className='font-bold text-[1.5rem]'>Description</h1>
                        <p>{partner.partner.description}</p>
                      </div>
                      <div className='w-full md:w-[48%]'>
                        <h1 className='font-bold text-[1.5rem]'>Services</h1>
                        <p>{partner.partner.services}</p>
                      </div>
                  </div>}

              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Partners