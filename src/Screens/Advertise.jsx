import { onValue, push, ref, set } from 'firebase/database';
import React, { useContext, useEffect, useState } from 'react';
import { getDownloadURL, ref as imageRef, uploadBytes } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import { db, storage } from "../../Firebase"
import { GlobalContext } from './GlobalContext';
import { Calendar, DateObject } from "react-multi-date-picker"
import "react-multi-date-picker/styles/colors/yellow.css"
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


const Advertise = () => {
    const navigate = useNavigate()
    const { currentUser } = useContext(GlobalContext)
    const [userCoins, setUserCoins] = useState([])
    const [coin, setCoin] = useState(undefined)
    const [collapse1, setcollapse1] = useState(true)
    const [collapse2, setcollapse2] = useState(true)
    const [collapse3, setcollapse3] = useState(true)
    const [collapse4, setcollapse4] = useState(true)
    const [date1, setDate1] = useState([])
    const [date2, setDate2] = useState([])
    const [date3, setDate3] = useState([])
    const [subtotal, setSubtotal] = useState(0.00)
    const [reduction, setReduction] = useState(0.00)
    const [total, setTotal] = useState(0.00)
    const [terms, setTerms] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [err, setErr] = useState(false);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState("");
    const [street, setStreet] = useState("");
    const [additionalAddress, setAdditionalAddress] = useState("");
    const [city, setCity] = useState("");
    const [postal, setPostal] = useState("");
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState(undefined);
    const [paymentModal, setPaymentModal] = useState(false);
    const [error, setError] = useState("");
    const [bannerDisabled, setBannerDisabled] = useState([])
    const [voteDisabled, setVoteDisabled] = useState([])
    const [bannerImage, setBannerImage] = useState(null)
    const [bannerLink, setBannerLink] = useState(null)
    const [bannerErr, setBannerErr] = useState(null)
    const [bannerFile, setBannerFile] = useState(null)
    const [voteImage, setVoteImage] = useState('')
    const [voteLink, setVoteLink] = useState('')
    const [voteErr, setVoteErr] = useState('')
    const [voteFile, setVoteFile] = useState('')
    const [link1, setLink1] = useState('')
    const [link2, setLink2] = useState('')
    const [forPay, setForPay] = useState('')
    const [currency, setCurrency] = useState('BNB')
    const [price, setPrice] = useState()

    const loggedIn = localStorage.getItem('currentUser');

    useEffect(() => {
        if (!loggedIn) {
            navigate("/login")
        }
    }, [loggedIn])


    useEffect(() => {
        const queryString = currency === 'BNB' ? `https://coin-ab637-default-rtdb.firebaseio.com/coins/-NOWBEhCORoCg40a3sgc.json` : `https://coin-ab637-default-rtdb.firebaseio.com/coins/-NOUoXxxRWe8ZcWtdMVP.json`


        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: queryString,
            headers: {}
        };

        axios(config)
            .then(function (response) {
                const result = response.data

                setPrice(result.price)
            })
            .catch(function (error) {
                console.log(error);
            });

    }, [currency])

    const getCountries = async () => {

        try {
            let res = await axios.get('https://restcountries.com/v2/all')
            setCountries(res.data)
        } catch (error) {
        }
        setCountry(countries[0].name)
    }

    useEffect(() => {
        getCountries()
    }, [])

    useEffect(() => {
        const CoinsRef = ref(db, '/coins');
        onValue(CoinsRef, (snapshot) => {
            let coinList = [];
            snapshot.forEach(childSnapshot => {
                if (Object.values(childSnapshot.val()).includes(currentUser.uid)) {
                    const childKey = childSnapshot.key;
                    const childData = childSnapshot.val();
                    coinList.push({ key: childKey, coin: childData.name });
                }
            });
            setUserCoins(coinList)
            if (coinList.length > 0) {
                setCoin(coinList[0].key);
            }
        }, (error) => console.log(error))
    }, [currentUser]);

    useEffect(() => {
        setSubtotal(currency === "BNB" ? ((date1.length * 0.11) + (date2.length * 0.11) + (date3.length * 0.08)).toFixed(2) : ((date1.length * 0.000046) + (date2.length * 0.000046) + (date3.length * 0.000046)));
        if (date1.length + date2.length + date3.length >= 14) {
            console.log("14");
            setReduction(currency === "BNB" ? ((subtotal / 100) * 40).toFixed(2) : ((subtotal / 100) * 40))
        }
        else if (date1.length + date2.length + date3.length >= 7) {
            console.log("7");
            setReduction(currency === "BNB" ? ((subtotal / 100) * 30).toFixed(2) : ((subtotal / 100) * 30))
        }
        else if (date1.length + date2.length + date3.length >= 3) {
            console.log("3");
            setReduction(currency === "BNB" ? ((subtotal / 100) * 20).toFixed(2) : ((subtotal / 100) * 20))
        }
        setTotal(currency === "BNB" ? (((date1.length * 0.11) + (date2.length * 0.11) + (date3.length * 0.08)).toFixed(2) - reduction).toFixed(2) : (((date1.length * 0.000046) + (date2.length * 0.000046) + (date3.length * 0.000046)) - reduction));

    }, [date1, date2, date3, subtotal, reduction, currency])

    const handleSubmit = () => {
        if (date1.length + date2.length + date3.length <= 0) {
            setErr("You must add at least 1 service to your order to reserve & pay..")
        }
        else if (date2.length > 0 && !bannerImage) {
            setErr("Please add banner Image..")
        }
        else if (date2.length > 0 && link1 === "") {
            setErr("Please add the URL you want people be redirected while clicking on your banner ad..")
        }
        else if (date3.length > 0 && !voteImage) {
            setErr("Please add banner Image..")
        }
        else if (date3.length > 0 && link2 === "") {
            setErr("Please add the URL you want people be redirected while clicking on your banner ad..")
        }
        else if (!terms) {
            setErr("You must accept our T&Cs in order to proceed with your order")
        }
        else if (!terms) {
            setErr("You must accept our T&Cs in order to proceed with your order")
        }
        else {
            setErr("")
            setShowModal(true)
        }

    }

    const handleBilling = () => {
        if (name === "") {
            setError("Enter Name")

        }
        else if (surname === "") {
            setError("Enter surname")

        } else if (street === "") {
            setError("Enter Street Address")

        } else if (city === " ") {
            setError("Enter city")

        } else if (postal === "") {
            setError("Enter Postal Code")

        } else {
            setError("")
            setShowModal(false)
            setPaymentModal(true)
        }
    }

    const handlePay = async () => {
        if (date2.length !== 0) {

            const StorageRef = imageRef(storage, `ads/${bannerFile}`);
            try {
                await uploadBytes(StorageRef, bannerFile);
                console.log('Uploaded banner blob or file!');
                const bannerUrl = await getDownloadURL(StorageRef, bannerFile);
                console.log(`bannerLink: ${bannerUrl}`);
                setBannerLink(bannerUrl);
            } catch (error) {
                console.error(error);
            }
        }

        if (forPay === "") {
            setForPay("yes");
        }

        if (date3.length !== 0) {

            const CoverRef = imageRef(storage, `ads/${voteFile}`);
            try {
                await uploadBytes(CoverRef, voteFile);
                console.log('Uploaded vote blob or file!');
                const voteUrl = await getDownloadURL(CoverRef, voteFile);
                console.log(`voteLink: ${voteUrl}`);
                setVoteLink(voteUrl);
            } catch (error) {
                console.error(error);
            }
        }


        setPaymentModal(false)
    }

    useEffect(() => {
        if (bannerLink || voteLink || forPay !== "") {
            axios.post('https://pinkvote-backend.herokuapp.com/createTransaction', {
                amount: total,
                currency1: currency,
                currency2: "BTC",
                buyer_email: currentUser.email
            })
                .then(function (res) {
                    axios
                        .post('https://pinkvote-backend.herokuapp.com/getPaymentStatus', {
                            transactionId: res.data.result.txn_id
                        })
                        .then(res2 => {
                            Promise.all([bannerLink, voteLink]).then(([bannerUrl, voteUrl]) => {
                                push(ref(db, 'promoted/'), {
                                    coin,
                                    owner: currentUser.displayName,
                                    ownerId: currentUser.uid,
                                    promoted: JSON.stringify(date1),
                                    banner: JSON.stringify(date2),
                                    bannerImage: bannerUrl,
                                    bannerURL: link1,
                                    vote: JSON.stringify(date3),
                                    voteImage: voteUrl,
                                    voteURL: link2,
                                    total: total,
                                    name: name,
                                    surname: surname,
                                    streetAddress: street,
                                    additionalAddress: additionalAddress,
                                    city: city,
                                    postalCode: postal,
                                    country: country,
                                    txnId: res.data.result.txn_id,
                                    status: res2.data.result.status
                                })
                            })
                            setDate1([])
                            setDate2([])
                            setDate3([])
                            window.open(res.data.result.checkout_url, "_blank");
                            navigate("/")
                        })
                        .catch(err => console.error(err));
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }, [bannerLink, voteLink, forPay])

    useEffect(() => {
        const getPromoted = async () => {

            try {
                const promotedRed = ref(db, '/promoted');
                onValue(promotedRed, (snapshot) => {
                    let banner = [];
                    let vote = [];
                    snapshot.forEach(childSnapshot => {
                        const childKey = childSnapshot.key;
                        const childData = childSnapshot.val();
                        //   coinList.push({ key: childKey, coin: childData });
                        banner.push(JSON.parse(childData.banner));
                        vote.push(JSON.parse(childData.vote));
                    });
                    // setCoinsData(coinList);
                    let temp1 = banner.flat();
                    let temp2 = vote.flat();
                    banner = temp1.map(ban => new DateObject(ban));
                    vote = temp2.map(ban => new DateObject(ban));
                    // console.log(vote);
                    setBannerDisabled(banner)
                    setVoteDisabled(vote)
                })
            } catch (err) {
                console.log(err);
            }
        }

        getPromoted()
    }, [currentUser])

    const bannerDisable = ({ date, today }) => {
        let bookedDates = bannerDisabled.some(d => d.year === date.year && d.month.shortName === date.month.shortName && d.day === date.day);
        let result = date.toDays() - today.toDays()
        if (result === 0) return {
            disabled: true,
            style: { color: "#87898b" },
            onClick: () => alert("Cannot Book for today")
        }
        if (bookedDates) return {
            disabled: true,
            style: { color: "#87898b" },
            onClick: () => alert("already booked")
        }
    }

    const promotedDisable = ({ date, today }) => {
        let result = date.toDays() - today.toDays()
        if (result === 0) return {
            disabled: true,
            style: { color: "#87898b" },
            onClick: () => alert("Cannot Book for today")
        }
    }

    const voteDisable = ({ date }) => {
        let bookedDates = voteDisabled.some(d => d.year === date.year && d.month.shortName === date.month.shortName && d.day === date.day);

        if (bookedDates) return {
            disabled: true,
            style: { color: "#87898b" },
            onClick: () => alert("already booked")
        }
    }

    const handleBanner = (event) => {
        const file = event.target.files[0];

        if (!file) {
            setBannerImage(null);
            setBannerErr(null);
            return;
        }

        if (!/\.(gif|jpg|jpeg|png)$/i.test(file.name)) {
            setBannerImage(null);
            setBannerErr('File format is not supported. Only gif, png, jpg, and jpeg formats are allowed.');
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const image = new Image();
            image.src = reader.result;
            image.onload = () => {
                if (image.width > 728 || image.height > 90) {
                    setBannerImage(null);
                    setBannerErr('File size is too large. Maximum size is 728x90 pixels.');
                } else {
                    setBannerFile(file)
                    setBannerImage(reader.result);
                    setBannerErr(null);
                    onChange(file);
                }
            };
        };
        reader.onerror = (error) => {
            setBannerImage(null);
            setBannerErr(error.message);
        };
    };

    const handleVote = (event) => {
        const file = event.target.files[0];

        if (!file) {
            setVoteImage(null);
            setVoteErr(null);
            return;
        }

        if (!/\.(gif|jpg|jpeg|png)$/i.test(file.name)) {
            setVoteImage(null);
            setVoteErr('File format is not supported. Only gif, png, jpg, and jpeg formats are allowed.');
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const image = new Image();
            image.src = reader.result;
            image.onload = () => {
                if (image.width > 450 || image.height > 150) {
                    setVoteImage(null);
                    setVoteErr('File size is too large. Maximum size is 450x150 pixels.');
                } else {
                    setVoteFile(file)
                    setVoteImage(reader.result);
                    setVoteErr(null);
                    onChange(file);
                }
            };
        };
        reader.onerror = (error) => {
            setVoteImage(null);
            setBannerErr(error.message);
        };
    };


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        appendDots: dots => (
            <div
                style={{
                    borderRadius: "10px",
                    padding: "10px",
                    position: 'absolute',
                    zIndex: 2000,
                    bottom: '10px'
                }}
            >
                <ul style={{ margin: "0px", display: 'flex', flexDirection: 'row', columnGap: '10px', justifyContent: 'center' }}>
                    {
                        dots.map((dot, index) => (
                            // console.log(`key: ${dot.key} index: ${index}`)
                            // console.log(dot)
                            <div key={dot.key} className={` ${dot.props.className.includes("slick-active") ? 'bg-white' : ''} max-w-[10px] w-[10px] h-[10px] border border-white rounded-full`}>{dot.props.active}</div>
                        ))
                    }
                </ul>
            </div>
        ),
        customPaging: i => (
            <div
                style={{
                }}
            >
                {i + 1}
            </div>
        )
    };


    return (
        <div className='mt-[120px] items-center flex justify-center w-full flex-col'>
            <div className='md:w-[80%] w-full my-[20px] rounded-[12px] pt-[20px] pb-[30px] px-[5px] bg-primary border-[5px] border-secondary '>
                <div onClick={() => navigate("/")} className='inline-flex cursor-pointer flex-row items-center gap-x-[8px] text-white p-[20px] hover:text-hover'>
                    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4965 18.1877L10.5055 19.1787C10.0859 19.5983 9.40743 19.5983 8.9923 19.1787L0.314697 10.5055C-0.104899 10.0859 -0.104899 9.40743 0.314697 8.9923L8.9923 0.314697C9.4119 -0.104899 10.0904 -0.104899 10.5055 0.314697L11.4965 1.30566C11.9205 1.72972 11.9116 2.4216 11.4786 2.83674L6.09977 7.96117H18.9287C19.5224 7.96117 20 8.43879 20 9.03247V10.4609C20 11.0546 19.5224 11.5322 18.9287 11.5322H6.09977L11.4786 16.6566C11.9161 17.0718 11.925 17.7636 11.4965 18.1877Z" fill="currentColor" /></svg>
                    <p>Go back</p>
                </div>
                <div className='w-full flex flex-row justify-center items-start flex-wrap'>

                    <div className='w-full lg:w-[60%] flex flex-col justify-center items-center bg-secondary rounded-[20px] py-[40px] m-[20px]'>
                        <div className='flex flex-row self-end mr-[28px]'>
                            <div onClick={() => setCurrency(currency === "BNB" ? "BTC" : "BNB")} className='select-none w-[100px] block h-[45px] cursor-pointer relative outline-none rounded-[100px] border-[2px] border-white bg-primary' style={{ transition: 'all 500ms' }}>
                                <p className={` ${currency === "BNB" ? "rounded-l-[50px] rounded-r-[5px]" : "rounded-l-[5px] rounded-r-[50px]"} absolute top-[4px] bottom-[4px] left-[4px] text-center uppercase bg-primary border-[2px] border-white text-white`} style={{ width: "calc(50% - 4px)", lineHeight: '30px', transition: 'left 500ms , right 500ms', transform: `${currency === 'BNB' ? "" : 'translate(100%, 0)'}` }}>
                                    {currency}
                                </p>
                            </div>
                        </div>
                        <h1 className='font-bold text-[2.5rem] mt-[20px] mb-[10px]'>Advertise</h1>

                        <div className='w-[90%] border-[2px] border-gray-300 rounded-[20px] overflow-hidden flex items-center flex-col'>
                            <div className='w-full bg-primary border border-white'>
                                <div onClick={() => setcollapse1(!collapse1)} className='cursor-pointer flex flex-row items-center w-full py-[1rem] px-[1.25rem] text-left text-white border-none ' style={{ transition: "color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, border-radius 0.15s ease" }}>
                                    <h3 className='break-words mt-[20px] mb-[10px] font-medium text-[20px] '>Promoted Section</h3>
                                    <p className='ml-[5px] font-normal mt-[8px] rounded-[10px] min-w-[10px] py-[3px] px-[7px] text-[15px] text-primary text-center whitespace-nowrap align-baseline bg-white'>
                                        {currency === "BNB" ? "~0.11 BNB" : "~0.000046 BTC"}
                                    </p>
                                    <span className='ml-auto font-black text-white'>
                                        <svg width="20" height="17" viewBox="0 0 28 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.728676 1.45065C1.12112 1.08129 1.58283 0.890834 2.11379 0.879291C2.64475 0.867749 3.10646 1.0582 3.49891 1.45065L13.9912 11.9429L24.4834 1.45065C24.8528 1.08129 25.3087 0.885063 25.8512 0.861977C26.3937 0.838892 26.8612 1.02357 27.2536 1.41602C27.6461 1.78539 27.8481 2.24709 27.8596 2.80114C27.8712 3.35518 27.6807 3.81689 27.2883 4.18625L15.1339 16.3753C14.9723 16.5369 14.7934 16.6581 14.5971 16.7389C14.4009 16.8197 14.1989 16.8601 13.9912 16.8601C13.7834 16.8601 13.5814 16.8197 13.3852 16.7389C13.1889 16.6581 13.01 16.5369 12.8484 16.3753L0.694048 4.22088C0.324684 3.85152 0.14 3.39558 0.14 2.85308C0.14 2.31058 0.336226 1.8431 0.728676 1.45065Z" fill="currentColor" /></svg>
                                    </span>
                                </div>

                                <div className={`${collapse1 ? "hidden" : "block"} border-t white bg-primary py-[1rem] px-[1.25rem]`} style={{ transition: "transition: height 0.25s ease" }}>
                                    <p className='break-words text-[#dedede]'>
                                        <b>Summary:</b>
                                        our project will be advertised on our promoted section : live on the website and the mobile application (iOS & Android) among thousands users per day. If your project is not validated yet the promotion will automatically activate it.
                                        <br />
                                        Learn more about this service on our Media Kit available at the end of the page.
                                    </p>
                                    <div className='w-full mb-[5px] text-center flex flex-col items-center justify-center'>
                                        <label className='pt-[10px] font-bold mb-[5px]'>Select your coin</label>
                                        <select
                                            className='cursor-default focus-visible:outline-none w-[60%] rounded-[40px] bg-white text-black border border-gray-400 py-[5p]'
                                            placeholder='Contract or Name'
                                            value={coin}
                                            onChange={(e) => setCoin(e.target.value)}>
                                            {userCoins.map(coin => (
                                                <option key={coin.key} value={coin.key}>
                                                    {coin.coin}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='flex w-full justify-center items-center mt-[30px]'>
                                        <Calendar
                                            multiple
                                            value={date1}
                                            onChange={setDate1}
                                            className={"rmdp-prime blue"}
                                            minDate={new DateObject()}
                                            mapDays={({ date, today }) => promotedDisable({ date, today })}
                                        />
                                    </div>
                                </div>
                            </div>


                            <div className='w-full bg-primary border border-white'>
                                <div onClick={() => setcollapse2(!collapse2)} className='cursor-pointer flex flex-row items-center w-full py-[1rem] px-[1.25rem] text-left text-white border-none ' style={{ transition: "color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, border-radius 0.15s ease" }}>
                                    <h3 className='break-words mt-[20px] mb-[10px] font-medium text-[20px] '>Main Banner Ad</h3>
                                    <p className='ml-[5px] font-normal mt-[8px] rounded-[10px] min-w-[10px] py-[3px] px-[7px] text-[15px] text-primary text-center whitespace-nowrap align-baseline bg-white'>
                                        {currency === "BNB" ? "~0.11 BNB" : "~0.000046 BTC"}
                                    </p>
                                    <span className='ml-auto font-black text-white'>
                                        <svg width="20" height="17" viewBox="0 0 28 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.728676 1.45065C1.12112 1.08129 1.58283 0.890834 2.11379 0.879291C2.64475 0.867749 3.10646 1.0582 3.49891 1.45065L13.9912 11.9429L24.4834 1.45065C24.8528 1.08129 25.3087 0.885063 25.8512 0.861977C26.3937 0.838892 26.8612 1.02357 27.2536 1.41602C27.6461 1.78539 27.8481 2.24709 27.8596 2.80114C27.8712 3.35518 27.6807 3.81689 27.2883 4.18625L15.1339 16.3753C14.9723 16.5369 14.7934 16.6581 14.5971 16.7389C14.4009 16.8197 14.1989 16.8601 13.9912 16.8601C13.7834 16.8601 13.5814 16.8197 13.3852 16.7389C13.1889 16.6581 13.01 16.5369 12.8484 16.3753L0.694048 4.22088C0.324684 3.85152 0.14 3.39558 0.14 2.85308C0.14 2.31058 0.336226 1.8431 0.728676 1.45065Z" fill="currentColor" /></svg>
                                    </span>
                                </div>

                                <div className={`${collapse2 ? "hidden" : "block"} border-t border-t-white bg-primary py-[1rem] px-[1.25rem]`} style={{ transition: "transition: height 0.25s ease" }}>
                                    <p className='break-words text-[#dedede]'>
                                        <b>Summary:</b>
                                        This banner ad will be live on on almost all the pages of our website and our mobile application (iOS & Android) to thousand of users per day. You will also be able to track clicks of your banner.
                                        <br />
                                        Learn more about this service on our Media Kit available at the end of the page.
                                    </p>
                                    <div className='w-full mb-[5px] text-center flex flex-col items-center justify-center'>
                                        <label className='pt-[10px] font-bold mb-[5px]'>Select your coin</label>
                                        <select
                                            className='cursor-default focus-visible:outline-none w-[60%] rounded-[40px] bg-white text-black border border-gray-400 py-[5p]'
                                            placeholder='Contract or Name'
                                            value={coin}
                                            onChange={(e) => setCoin(e.target.value)}>
                                            {userCoins.map(coin => (
                                                <option key={coin.key} value={coin.key}>
                                                    {coin.coin}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className='w-full flex flex-col justify-center items-center mt-[12px]'>
                                        <label
                                            htmlFor="image-input"
                                            className=' hover:bg-white text-white bg-transparent hover:text-primary border-[2px] border-white px-[16px] py-[8px] cursor-pointer rounded-[4px]'
                                        >
                                            {bannerImage ? 'Change Logo' : 'Upload banner'}
                                        </label>
                                        <input
                                            id="image-input"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleBanner}
                                            style={{ display: 'none' }}
                                        />
                                        {bannerImage && (
                                            <img
                                                src={bannerImage}
                                                alt="Uploaded Image"
                                                style={{ width: '728px', height: '90px', objectFit: 'cover', marginTop: '16px' }}
                                            />
                                        )}
                                        {bannerErr && (
                                            <div style={{ color: 'red', marginTop: '8px' }}>{bannerErr}</div>
                                        )}
                                    </div>
                                    <div className='w-full mx-auto inline-flex flex-row px-[8px] justify-center items-center mt-[12px]'>
                                        <span className='w-[30%] bg-white border border-hover text-primary cursor-default select-none py-[6px] px-[15px] rounded-l-[4px] text-center justify-center items-center border-r-0'>URL Redirection</span>
                                        <input value={link1} placeholder="add-url.com" onChange={(e) => setLink1(e.target.value)} type="text" className='w-[50%] bg-white border border-secondary text-black border-l-0 py-[16.6px] px-[15px] focus-visible:outline-none h-[34px] overflow-hidden text-ellipsis' />
                                    </div>
                                    <div className='flex w-full justify-center items-center mt-[30px]'>
                                        <Calendar
                                            multiple
                                            value={date2}
                                            onChange={setDate2}
                                            className={"rmdp-prime blue"}
                                            minDate={new DateObject()}
                                            mapDays={({ date, today }) => bannerDisable({ date, today })}
                                        />
                                    </div>
                                </div>
                            </div>


                            <div className='w-full bg-primary border border-white'>
                                <div onClick={() => setcollapse3(!collapse3)} className='cursor-pointer flex flex-row items-center w-full py-[1rem] px-[1.25rem] text-left text-white border-none ' style={{ transition: "color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, border-radius 0.15s ease" }}>
                                    <h3 className='break-words mt-[20px] mb-[10px] font-medium text-[20px] '>Vote Banner Ad</h3>
                                    <p className='ml-[5px] font-normal mt-[8px] rounded-[10px] min-w-[10px] py-[3px] px-[7px] text-[15px] text-primary bg-white text-center whitespace-nowrap align-baseline'>
                                        {currency === "BNB" ? "~0.08 BNB" : "~0.000046 BTC"}
                                    </p>
                                    <span className='ml-auto font-black text-white'>
                                        <svg width="20" height="17" viewBox="0 0 28 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.728676 1.45065C1.12112 1.08129 1.58283 0.890834 2.11379 0.879291C2.64475 0.867749 3.10646 1.0582 3.49891 1.45065L13.9912 11.9429L24.4834 1.45065C24.8528 1.08129 25.3087 0.885063 25.8512 0.861977C26.3937 0.838892 26.8612 1.02357 27.2536 1.41602C27.6461 1.78539 27.8481 2.24709 27.8596 2.80114C27.8712 3.35518 27.6807 3.81689 27.2883 4.18625L15.1339 16.3753C14.9723 16.5369 14.7934 16.6581 14.5971 16.7389C14.4009 16.8197 14.1989 16.8601 13.9912 16.8601C13.7834 16.8601 13.5814 16.8197 13.3852 16.7389C13.1889 16.6581 13.01 16.5369 12.8484 16.3753L0.694048 4.22088C0.324684 3.85152 0.14 3.39558 0.14 2.85308C0.14 2.31058 0.336226 1.8431 0.728676 1.45065Z" fill="currentColor" /></svg>
                                    </span>
                                </div>

                                <div className={`${collapse3 ? "hidden" : "block"} border-t border-t-white bg-primary py-[1rem] px-[1.25rem]`} style={{ transition: "transition: height 0.25s ease" }}>
                                    <p className='break-words text-[#dedede]'>
                                        <b>Summary:</b>
                                        our project will be advertised on our promoted section : live on the website and the mobile application (iOS & Android) among thousands users per day. If your project is not validated yet the promotion will automatically activate it.
                                        <br />
                                        Learn more about this service on our Media Kit available at the end of the page.
                                    </p>
                                    <div className='w-full mb-[5px] text-center flex flex-col items-center justify-center'>
                                        <label className='pt-[10px] font-bold mb-[5px]'>Select your coin</label>
                                        <select
                                            className='cursor-default focus-visible:outline-none w-[60%] rounded-[40px] bg-white text-black border border-gray-400 py-[5p]'
                                            placeholder='Contract or Name'
                                            value={coin}
                                            onChange={(e) => setCoin(e.target.value)}>
                                            {userCoins.map(coin => (
                                                <option key={coin.key} value={coin.key}>
                                                    {coin.coin}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='w-full flex flex-col justify-center items-center mt-[12px]'>
                                        <label
                                            htmlFor="image-input2"
                                            className='hover:bg-white hover:text-primary bg-transparent text-white border-[2px] border-white px-[16px] py-[8px] cursor-pointer rounded-[4px]'
                                        >
                                            {voteImage ? 'Change Banner' : 'Upload banner'}
                                        </label>
                                        <input
                                            id="image-input2"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleVote}
                                            style={{ display: 'none' }}
                                        />
                                        {voteImage && (
                                            <img
                                                src={voteImage}
                                                alt="Uploaded Image"
                                                style={{ width: '450px', height: '150px', objectFit: 'cover', marginTop: '16px' }}
                                            />
                                        )}
                                        {voteErr && (
                                            <div style={{ color: 'red', marginTop: '8px' }}>{voteErr}</div>
                                        )}
                                    </div>
                                    <div className='w-full mx-auto inline-flex flex-row px-[8px] justify-center items-center mt-[12px]'>
                                        <span className='w-[30%] bg-white border border-primary text-primary py-[6px] px-[15px] rounded-l-[4px] text-center justify-center items-center border-r-0'>URL Redirection</span>
                                        <input value={link2} placeholder="add-url.com" onChange={(e) => setLink2(e.target.value)} type="text" className='w-[50%] bg-white text-black border-l-0 border border-primary py-[16.5px] px-[15px] focus-visible:outline-none h-[34px] overflow-hidden text-ellipsis' />
                                    </div>
                                    <div className='flex w-full justify-center items-center mt-[30px]'>
                                        <Calendar
                                            multiple
                                            value={date3}
                                            onChange={setDate3}
                                            className={"rmdp-prime blue"}
                                            minDate={new DateObject()}
                                            mapDays={({ date }) => voteDisable({ date })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='w-full md:w-[70%] mt-[14px]  text-center flex flex-col justify-center items-center'>
                            <h3 className='text-[20px] mt-[20px] mb-[10px] font-medium'>Bulk Discounts</h3>
                            <p>These discounts are applied directly to your cart and work even if you have selected different kinds of services.</p>
                            <div className='w-full border-[2px] text-black gap-y-3 my-[20px] py-[20px] bg-white text-[20px] border-secondary rounded-[20px] overflow-hidden flex items-center flex-col'>
                                <div className='flex flex-row w-full items-center justify-evenly'>
                                    <p>3+ Days</p>
                                    <p className='text-primary'>20% off</p>
                                </div>
                                <div className='flex flex-row w-full items-center justify-evenly'>
                                    <p>7+ Days</p>
                                    <p className='text-primary'>30% off</p>
                                </div>
                                <div className='flex flex-row w-full items-center justify-evenly'>
                                    <p>14+ Days</p>
                                    <p className='text-primary'>40% off</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='w-full lg:w-[30%] flex flex-col justify-center items-center bg-secondary rounded-[20px] py-[40px] px-[20px] m-[20px]'>
                        <h1 className='font-bold text-[1.5rem] mt-[20px] mb-[10px]'>Your Order</h1>
                        <table className='text-center w-full rounded-t-[10px] overflow-hidden bg-primary text-white border-white border'>
                            <thead className='bg-primary border-white border'>
                                <tr>
                                    <th>Item</th>
                                    <th>Date</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody className='bg-white border border-black text-white'>
                                {
                                    date1.length > 0 ?
                                        date1.map((date, index) => (
                                            <tr key={index} className='hover:bg-primary border-t text-black hover:text-white border-t-black select-none'>
                                                <td className='py-[8px] align-middle'>Promoted Slot</td>
                                                <td className='py-[8px] align-middle'>{`${date.month.shortName}, ${date.day}, ${date.year}`}</td>
                                                <td className='py-[8px] align-middle'>0.11 BNB</td>
                                            </tr>
                                        )) :
                                        null
                                }
                                {
                                    date2.length > 0 ?
                                        date2.map((date, index) => (
                                            <tr key={index} className='hover:bg-primary border-t text-black hover:text-white border-t-black select-none'>
                                                <td className='py-[8px] align-middle'>Banner Slot</td>
                                                <td className='py-[8px] align-middle'>{`${date.month.shortName}, ${date.day}, ${date.year}`}</td>
                                                <td className='py-[8px] align-middle'>0.11 BNB</td>
                                            </tr>
                                        )) :
                                        null
                                }
                                {
                                    date3.length > 0 ?
                                        date3.map((date, index) => (
                                            <tr key={index} className='hover:bg-primary border-t text-black hover:text-white border-t-black select-none'>
                                                <td className='py-[8px] align-middle'>Vote Ad</td>
                                                <td className='py-[8px] align-middle'>{`${date.month.shortName}, ${date.day}, ${date.year}`}</td>
                                                <td className='py-[8px] align-middle'>0.08 BNB</td>
                                            </tr>
                                        )) :
                                        null
                                }
                            </tbody>
                        </table>
                        <div className='text-white w-full rounded-b-[10px] border-t-[2px] border-white'>
                            <div className='w-full flex flex-row justify-between bg-primary py-[5px] px-[10px] '>
                                <p>Subtotal</p>
                                <p>{subtotal} {currency === 'BNB' ? "BNB" : "BTC"}</p>
                            </div>
                            <div className='w-full flex flex-row justify-between bg-primary py-[5px] px-[10px] '>
                                <p>Reduction</p>
                                <p>{reduction} {currency === 'BNB' ? "BNB" : "BTC"}</p>
                            </div>
                            <div className='w-full flex flex-row justify-between bg-primary py-[5px] px-[10px] '>
                                <p>Total</p>
                                <p>{total} {currency === 'BNB' ? "BNB" : "BTC"}</p>
                            </div>
                        </div>

                        <div className='inline-flex items-center text-center justify-center mt-[20px]'>
                            <p><input className='mt-[5px] m-0 p-0' type="checkbox" checked={terms} onChange={() => setTerms(!terms)} /> By checking this box, you acknowledge that you have read and accepted our Terms of Sale.</p>
                        </div>
                        <button onClick={handleSubmit} className='mt-[15px] border border-white py-[6px] px-[50px] bg-primary text-[15px] h-[35px] whitespace-nowrap align-middle rounded-[4px] hover:text-primary hover:bg-white'>
                            Reserve and Pay
                        </button>

                        <p className='text-red-500 mt-[12px] text-[12px] text-center'>{err}</p>

                        <div className='w-full bg-primary border border-white rounded-[8px]'>
                            <div onClick={() => setcollapse4(!collapse4)} className='cursor-pointer flex flex-row items-center w-full py-[1rem] px-[1.25rem] text-left text-white border-none ' style={{ transition: "color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, border-radius 0.15s ease" }}>
                                <h3 className='break-words font-medium text-[20px] '>🎁 Free Bubblemaps</h3>
                                <span className='ml-auto font-black text-white'>
                                    <svg width="20" height="17" viewBox="0 0 28 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.728676 1.45065C1.12112 1.08129 1.58283 0.890834 2.11379 0.879291C2.64475 0.867749 3.10646 1.0582 3.49891 1.45065L13.9912 11.9429L24.4834 1.45065C24.8528 1.08129 25.3087 0.885063 25.8512 0.861977C26.3937 0.838892 26.8612 1.02357 27.2536 1.41602C27.6461 1.78539 27.8481 2.24709 27.8596 2.80114C27.8712 3.35518 27.6807 3.81689 27.2883 4.18625L15.1339 16.3753C14.9723 16.5369 14.7934 16.6581 14.5971 16.7389C14.4009 16.8197 14.1989 16.8601 13.9912 16.8601C13.7834 16.8601 13.5814 16.8197 13.3852 16.7389C13.1889 16.6581 13.01 16.5369 12.8484 16.3753L0.694048 4.22088C0.324684 3.85152 0.14 3.39558 0.14 2.85308C0.14 2.31058 0.336226 1.8431 0.728676 1.45065Z" fill="currentColor" /></svg>
                                </span>
                            </div>

                            <div className={`${collapse4 ? "hidden" : "block"} border-t rounded-b-[8px] white bg-primary py-[1rem] px-[1.25rem]`} style={{ transition: "transition: height 0.25s ease" }}>
                                <p className='break-words text-[#dedede]'>Advertise with our Promoted Slot and show all our visitors the importance and the reliability of your crypto thanks to Bubblemaps services for free <b>(normally charged)</b>.
                                    The <span className='font-semibold text-hover hover:underline cursor-pointer' onClick={() => window.open("https://app.bubblemaps.io/eth/", "_blank")}>Bubblemap</span> is automatically added to your coin page during your promotion.</p>
                                <p className='break-words text-[#dedede]'>The <span className='font-semibold text-hover hover:underline cursor-pointer' onClick={() => window.open("https://app.bubblemaps.io/eth/", "_blank")}>Bubblemap</span> is automatically added to your coin page during your promotion.</p>
                                <br /><p className='break-words text-[#dedede] font-semibold text-hover hover:underline cursor-pointer' onClick={() => window.open("https://app.bubblemaps.io/eth/", "_blank")}>You can also request your listing to acquire your Bubblemap here if you don't want to go through Pink Vote.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className='w-full flex flex-col justify-center items-center flex-wrap'>
                    <h1 className='font-bold text-[2.5rem] mt-[20px] mb-[10px]'>Why Advertise With Us</h1>
                    <div className='border-[5px] border-white rounded-[18px] w-[90%] md:w-[70%]'>
                        <Slider {...settings}>
                            <div>
                                <img className='rounded-[18px]' src="https://coinvote.cc/template/images/press-kit/4.jpg" alt="" />
                            </div>
                            <div>
                                <img className='rounded-[18px]' src="https://coinvote.cc/template/images/press-kit/2.jpg" alt="" />
                            </div>
                            <div>
                                <img className='rounded-[18px]' src="https://coinvote.cc/template/images/press-kit/3.jpg" alt="" />
                            </div>
                            <div>
                                <img className='rounded-[18px]' src="https://coinvote.cc/template/images/press-kit/15.jpg" alt="" />
                            </div>
                            <div>
                                <img className='rounded-[18px]' src="https://coinvote.cc/template/images/press-kit/18.jpg" alt="" />
                            </div>
                            <div>
                                <img className='rounded-[18px]' src="https://coinvote.cc/template/images/press-kit/6.jpg" alt="" />
                            </div>
                            <div>
                                <img className='rounded-[18px]' src="https://coinvote.cc/template/images/press-kit/click.png" alt="" />
                            </div>
                        </Slider>
                    </div>

                    <div className='w-[90%] md:w-[70%] flex flex-col'>
                        <button onClick={() => window.open("https://coinvote.cc/assets/Coinvote%20Sales%20Deck%20-%20Oct%202022.pdf", "_blank")} className='font-medium ml-[5px] mt-[18px] text-secondary text-[14.5px] py-[10px] px-[15px] rounded-[8px]' style={{ lineHeight: '20px', animation: 'shadow-pulse 3s infinite', background: "linear-gradient(180deg,white 0, white" }}>
                            View our Sales Desk
                        </button>
                        <h1 className='font-bold text-[1.5rem] mt-[50px] mb-[10px] self-start'>Want to learn more about Pink Vote?</h1>
                            <button onClick={() => window.open("https://coinvote.cc/assets/Coinvote%20Media%20Kit%20-%20Q3%202022.pdf", "_blank")} className='font-medium ml-[5px] mt-[18px] text-secondary text-[14.5px] py-[10px] px-[15px] rounded-[8px]' style={{ lineHeight: '20px', animation: 'shadow-pulse 3s infinite', background: "linear-gradient(180deg,white 0, white" }}>
                                Also Read our Media Kit
                            </button>
                        </div>
                    </div> */}
                </div>

                {/* MODAL  */}
                {showModal ? (
                    <>
                        <div
                            className="z-[30000000] justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none"
                        >
                            <div className="bg-primary text-white relative my-6 mx-auto w-[50%]">
                                {/*content*/}
                                <div className={` border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none`}>
                                    {/*header*/}
                                    <div className="flex  items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                        <h3 className=" text-2xl font-semibold text-center">
                                            Billing Information
                                        </h3>
                                        <button
                                            className="text-primary p-1 ml-auto bg-transparent border-0 text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => setShowModal(false)}
                                        >
                                            <span className="bg-transparent text-white h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                X
                                            </span>
                                        </button>
                                    </div>
                                    {/*body*/}
                                    <div className="relative p-6 flex w-full flex-col items-center">
                                        <label className='text-[#e2e2e2]'>Country</label>
                                        <select
                                            className={`text-ellipsis focus-visible:outline-none w-full h-[34px] py-[6px] px-[12px] text-[#495057] bg-white border border-[#ced4da] rounded-[0.25rem]`}
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}>
                                            {countries.map(country => (
                                                <option key={country.name} value={country.name}>
                                                    {country.name}
                                                </option>
                                            ))}
                                        </select>
                                        <div className='w-full flex flex-row flex-wrap mt-[19px]'>
                                            <div className='w-[50%] flex flex-col px-[8px] justify-center items-center'>
                                                <label className='text-[#e2e2e2]'>Name</label>
                                                <input value={name} onChange={(e) => setName(e.target.value)} type="text" className='w-[90%] text-[#272727] pl-[10px] mb-[19px] h-[34px] py-[6px] px-[12px] border border-[#ced4da]' />
                                            </div>
                                            <div className='w-[50%] flex flex-col px-[8px] justify-center items-center'>
                                                <label className='text-[#e2e2e2]'>Surname</label>
                                                <input value={surname} onChange={(e) => setSurname(e.target.value)} type="text" className='w-[90%] text-[#272727] pl-[10px] mb-[19px] h-[34px] py-[6px] px-[12px] border border-[#ced4da]' />
                                            </div>
                                            <div className='w-[50%] flex flex-col px-[8px] justify-center items-center'>
                                                <label className='text-[#e2e2e2]'>Street Address</label>
                                                <input value={street} onChange={(e) => setStreet(e.target.value)} type="text" className='w-[90%] text-[#272727] pl-[10px] mb-[19px] h-[34px] py-[6px] px-[12px] border border-[#ced4da]' />
                                            </div>
                                            <div className='w-[50%] flex flex-col px-[8px] justify-center items-center'>
                                                <label className='text-[#e2e2e2]'>Additional Address</label>
                                                <input value={additionalAddress} onChange={(e) => setAdditionalAddress(e.target.value)} type="text" className='w-[90%] text-[#272727] pl-[10px] mb-[19px] h-[34px] py-[6px] px-[12px] border border-[#ced4da]' />
                                            </div>
                                            <div className='w-[50%] flex flex-col px-[8px] justify-center items-center'>
                                                <label className='text-[#e2e2e2]'>City</label>
                                                <input value={city} onChange={(e) => setCity(e.target.value)} type="text" className='w-[90%] text-[#272727] pl-[10px] mb-[19px] h-[34px] py-[6px] px-[12px] border border-[#ced4da]' />
                                            </div>
                                            <div className='w-[50%] flex flex-col px-[8px] justify-center items-center'>
                                                <label className='text-[#e2e2e2]'>Postal Code</label>
                                                <input value={postal} onChange={(e) => setPostal(e.target.value)} type="text" className='w-[90%] text-[#272727] pl-[10px] mb-[19px] h-[34px] py-[6px] px-[12px] border border-[#ced4da]' />
                                            </div>
                                            <p className='mx-auto text-red-500 font-bold mt-[12px] text-[12px] text-center'>{error}</p>
                                        </div>
                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                                        <button onClick={handleBilling} className='border border-white py-[6px] px-[50px] bg-primary text-[15px] h-[35px] whitespace-nowrap align-middle rounded-[4px] hover:text-primary hover:bg-white'>
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}
                {paymentModal ? (
                    <>
                        <div
                            className="z-[30000000] justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none"
                        >
                            <div className="bg-primary text-white relative my-6 mx-auto w-[50%]">
                                {/*content*/}
                                <div className={` border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none`}>
                                    {/*header*/}
                                    <div className="flex  items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                        <h3 className=" text-2xl font-semibold text-center">
                                            Summary of your Order
                                        </h3>
                                        <button
                                            className="text-primary p-1 ml-auto bg-transparent border-0 text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => setPaymentModal(false)}
                                        >
                                            <span className="bg-transparent text-white h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                X
                                            </span>
                                        </button>
                                    </div>
                                    {/*body*/}
                                    <div className="relative p-6 flex justify-center w-full flex-col items-center">
                                        <p>Promoted Slots</p>
                                        <p>{date1.length}</p>
                                        <p className='mt-[12px]'>Banner Ad</p>
                                        <p>{date2.length}</p>
                                        <p className='mt-[12px]'>Vote Ad</p>
                                        <p>{date3.length}</p>
                                        <p className='mt-[12px]'>Amount Due:</p>
                                        <p>{total}</p>
                                        <span>(incl. VAT taxes)</span>
                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                                        <button onClick={handlePay} className='border border-white py-[6px] px-[50px] bg-primary text-[15px] h-[35px] whitespace-nowrap align-middle rounded-[4px] hover:text-primary hover:bg-white'>
                                            Pay
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

            function SampleNextArrow(props) {
    const {className, style, onClick} = props;
            return (
            <div
                className={className}
                style={{ ...style, display: "block", position: 'absolute', right: '50px' }}
                onClick={onClick}
            />
            );
}


            function SamplePrevArrow(props) {
    const {className, style, onClick} = props;
            return (
            <div
                className={className}
                style={{ ...style, display: "block", position: 'absolute', left: '50px', zIndex: 2000 }}
                onClick={onClick}
            />
            );
}

            export default Advertise