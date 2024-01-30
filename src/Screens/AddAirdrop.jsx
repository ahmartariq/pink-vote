import { getDownloadURL, ref as imageRef, uploadBytes } from "firebase/storage";
import React, { useContext, useEffect, useState } from 'react'
import { db, storage } from '../../Firebase'
import { push, ref } from 'firebase/database'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from './GlobalContext'




const AddAirdrop = () => {
    const [name, setName] = useState("")
    const [link, setLink] = useState("")
    const [rewards, setRewards] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [description, setDescription] = useState("")
    const [shortDescription, setShortDescription] = useState("")
    const [descCount, setDescCount] = useState(0)
    const [shortDescCount, setShortDescCount] = useState(0)
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const [logoFile, setLogoFile] = useState("")
    const [logoLink, setLogoLink] = useState("")
    const [website, setWebsite] = useState("")
    const [youtube, setYoutube] = useState("")
    const [telegram, setTelegram] = useState("")
    const [discord, setDiscord] = useState("")
    const [twitter, setTwitter] = useState("")
    const [facebook, setFacebook] = useState("")
    const [reddit, setReddit] = useState("")
    const [isYoutube, setIsYoutube] = useState(false)
    const [isTelegram, setIsTelegram] = useState(false)
    const [isDiscord, setIsDiscord] = useState(false)
    const [isTwitter, setIsTwitter] = useState(false)
    const [isFacebook, setIsFacebook] = useState(false)
    const [isReddit, setIsReddit] = useState(false)
    const [isCheck, setIsCheck] = useState(false)
    const [checkErr, setCheckErr] = useState("")


    const loggedIn = localStorage.getItem('currentUser');
    const { currentUser } = useContext(GlobalContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!loggedIn) {
            navigate("/login")
        }
    }, [loggedIn])

    useEffect(() => {
        setDescCount(description.length)
    }, [description])

    useEffect(() => {
        setShortDescCount(shortDescription.length)
    }, [shortDescription])


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

    const handleSubmit = async () => {
        if (!isCheck) {
            setCheckErr('You must agree to our terms of use.');
        }
        else if (name === '') {
            setCheckErr('Please enter airdrop name');
        } else if (link === '') {
            setCheckErr('Please enter airdrop link');
        } else if (rewards === '') {
            setCheckErr('Please enter airdrop reward');
        } else if (startDate === '') {
            setCheckErr('Please enter start date of airdrop');
        }
        else if (endDate === '') {
            setCheckErr('Please enter end date of airdrop');
        }
        else if (description === '') {
            setCheckErr(`Please add airdrop's description`);
        }
        else if (shortDescription === '') {
            setCheckErr(`Please add airdrop's short description`);
        }
        else {
            setCheckErr('');
            const StorageRef = imageRef(storage, `airdrops/${name}/${logoFile.name}-logo`);
            try {
                await uploadBytes(StorageRef, logoFile);
                console.log('Uploaded logo blob or file!');
                const logoUrl = await getDownloadURL(StorageRef, logoFile);
                console.log(`LogoLink: ${logoUrl}`);
                setLogoLink(logoUrl);
            } catch (error) {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        if (logoLink) {
            Promise.all([logoLink]).then(([logoUrl]) => {
                push(ref(db, 'airdrops/'), {
                    name,
                    link,
                    rewards,
                    startDate,
                    endDate,
                    description,
                    shortDescription,
                    Logo: logoUrl,
                    website,
                    youtube,
                    telegram,
                    discord,
                    twitter,
                    facebook,
                    reddit,
                    isTwitter,
                    isFacebook,
                    isReddit,
                    isTelegram,
                    isYoutube,
                    isDiscord,
                    owner: currentUser.displayName,
                    ownerId: currentUser.uid,
                    rank: 0,
                    votes: 0,
                });
                navigate('/');
            });
        }
    }, [logoLink]);


    return (
        <div className='mt-[120px] items-center flex justify-center w-full flex-col'>
            <div className='md:w-[80%] w-full my-[20px] rounded-[12px] pt-[20px] pb-[30px] px-[5px] bg-primary border-[5px] border-secondary '>
                <div onClick={() => navigate("/")} className='inline-flex cursor-pointer flex-row items-center gap-x-[8px] text-white p-[20px] hover:text-white'>
                    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4965 18.1877L10.5055 19.1787C10.0859 19.5983 9.40743 19.5983 8.9923 19.1787L0.314697 10.5055C-0.104899 10.0859 -0.104899 9.40743 0.314697 8.9923L8.9923 0.314697C9.4119 -0.104899 10.0904 -0.104899 10.5055 0.314697L11.4965 1.30566C11.9205 1.72972 11.9116 2.4216 11.4786 2.83674L6.09977 7.96117H18.9287C19.5224 7.96117 20 8.43879 20 9.03247V10.4609C20 11.0546 19.5224 11.5322 18.9287 11.5322H6.09977L11.4786 16.6566C11.9161 17.0718 11.925 17.7636 11.4965 18.1877Z" fill="currentColor" /></svg>
                    <p>Go back</p>
                </div>

                <div className='flex justify-center items-center flex-col md:w-[80%] w-full text-center mx-auto px-[5px]'>
                    <h1 className='font-bold text-[2.5rem] mt-[20px] mb-[10px]'>Add an airdrop</h1>
                    <p className='font-medium text-[1.5rem] '> Add your airdrop to Pink Vote ! You will be able to vote for it and see it on Airdrops.</p>
                </div>

                <div className='w-full flex flex-col px-[18px]'>
                    <h2 className='text-[20px] mt-[20px] mb-[10px] font-medium'>Airdrop Information</h2>

                    <div className='break-words mb-[15px] mt-[20px]'>
                        <label className='cursor-pointer mb-[5px] font-semibold flex flex-col'>
                            Airdrop Name
                        </label>
                        <input
                            className='text-ellipsis focus-visible:outline-none w-full h-[34px] py-[6px] px-[12px] text-[#495057] bg-white border border-[#ced4da] rounded-[0.25rem]'
                            style={{ boxShadow: 'inset 0 1px 1px rgb(0 0 0 / 8%)', transition: "border-color ease-in-out .15s, box-shadow ease-in-out .15s" }}
                            type="text"
                            placeholder='Airdrop Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className='break-words mb-[15px]'>
                        <label className='cursor-pointer mb-[5px] font-semibold flex flex-col'>
                            Airdrop Link
                        </label>
                        <input
                            className='text-ellipsis focus-visible:outline-none w-full h-[34px] py-[6px] px-[12px] text-[#495057] bg-white border border-[#ced4da] rounded-[0.25rem]'
                            style={{ boxShadow: 'inset 0 1px 1px rgb(0 0 0 / 8%)', transition: "border-color ease-in-out .15s, box-shadow ease-in-out .15s" }}
                            type="text"
                            placeholder='Link to the airdrop'
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                        />
                    </div>

                    <div className='break-words mb-[15px]'>
                        <label className='cursor-pointer mb-[5px] font-semibold flex flex-col'>
                            Rewards
                        </label>
                        <input
                            className='text-ellipsis focus-visible:outline-none w-full h-[34px] py-[6px] px-[12px] text-[#495057] bg-white border border-[#ced4da] rounded-[0.25rem]'
                            style={{ boxShadow: 'inset 0 1px 1px rgb(0 0 0 / 8%)', transition: "border-color ease-in-out .15s, box-shadow ease-in-out .15s" }}
                            type="text"
                            placeholder='ex: 10 BNB'
                            value={rewards}
                            onChange={(e) => setRewards(e.target.value)}
                        />
                    </div>

                    <div className='break-words mb-[15px]'>
                        <label className='cursor-pointer mb-[5px] font-semibold flex flex-col'>
                            Start Date
                        </label>
                        <input
                            className='text-ellipsis focus-visible:outline-none w-full h-[34px] py-[6px] px-[12px] text-[#495057] bg-white border border-[#ced4da] rounded-[0.25rem]'
                            style={{ boxShadow: 'inset 0 1px 1px rgb(0 0 0 / 8%)', transition: "border-color ease-in-out .15s, box-shadow ease-in-out .15s" }}
                            type="date"
                            placeholder='yyyy-mm-dd'
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className='break-words mb-[15px]'>
                        <label className='cursor-pointer mb-[5px] font-semibold flex flex-col'>
                            End Date
                        </label>
                        <input
                            className='text-ellipsis focus-visible:outline-none w-full h-[34px] py-[6px] px-[12px] text-[#495057] bg-white border border-[#ced4da] rounded-[0.25rem]'
                            style={{ boxShadow: 'inset 0 1px 1px rgb(0 0 0 / 8%)', transition: "border-color ease-in-out .15s, box-shadow ease-in-out .15s" }}
                            type="date"
                            placeholder='yyyy-mm-dd'
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
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
                            maxLength={2000}
                            onChange={e => setDescription(e.target.value)}
                        ></textarea>
                        <p className='text-white font-semibold text-[14px]'>{descCount}/2000 characters (max)</p>

                    </div>
                    <div className='break-words mb-[15px]'>
                        <label className='cursor-pointer mb-[5px] font-semibold flex flex-col'>
                            Short Description
                        </label>
                        <textarea
                            className='text-ellipsis focus-visible:outline-none w-full py-[6px] px-[12px] text-[#495057] bg-white border border-[#ced4da] rounded-[0.25rem]'
                            style={{ boxShadow: 'inset 0 1px 1px rgb(0 0 0 / 8%)', transition: "border-color ease-in-out .15s, box-shadow ease-in-out .15s" }}
                            type="text"
                            placeholder='Describe your project, include links, emojis, be concise and efficient to increase your attractiveness'
                            rows={4}
                            value={shortDescription}
                            maxLength={400}
                            onChange={e => setShortDescription(e.target.value)}
                        ></textarea>
                        <p className='text-white font-semibold text-[14px]'>{shortDescCount}/400 characters (max)</p>
                    </div>

                    <div className='w-full flex-row '>
                        <h1 className='font-semibold text-[16px] mt-[20px] mb-[15px]'>Airdrop Images</h1>
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

                <div className='w-full px-[30px] flex flex-row flex-wrap gap-x-6 mt-[20px]'>
                    <div className='md:w-[49%] w-full flex flex-col '>
                        <h1 className='font-semibold text-[16px] mt-[20px] mb-[15px]'>Airdrops Socials</h1>

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
                                Facebook
                            </label>
                            <input
                                className='text-ellipsis focus-visible:outline-none w-full h-[34px] py-[6px] px-[12px] text-[#495057] bg-white border border-[#ced4da] rounded-[0.25rem]'
                                style={{ boxShadow: 'inset 0 1px 1px rgb(0 0 0 / 8%)', transition: "border-color ease-in-out .15s, box-shadow ease-in-out .15s" }}
                                type="text"
                                placeholder='instagram link'
                                value={facebook}
                                onChange={(e) => setFacebook(e.target.value)}
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
                        <h1 className='font-semibold text-[16px] mt-[20px] mb-[15px]'>Airdrop Requirements</h1>

                        <div className='flex flex-row items-center align-middle mb-[15px]'>
                            <input type="checkbox" checked={isTwitter} onClick={() => setIsTwitter(!isTwitter)} />
                            <label onClick={() => setIsTwitter(!isTwitter)} className='select-none ml-[4px] cursor-pointer font-medium text-[13px] flex flex-col'>
                                Twitter
                            </label>
                        </div>

                        <div className='flex flex-row items-center align-middle mb-[15px]'>
                            <input type="checkbox" checked={isFacebook} onClick={() => setIsFacebook(!isFacebook)} />
                            <label onClick={() => setIsFacebook(!isFacebook)} className='select-none ml-[4px] cursor-pointer font-medium text-[13px] flex flex-col'>
                                Fcebook
                            </label>
                        </div>

                        <div className='flex flex-row items-center align-middle mb-[15px]'>
                            <input type="checkbox" checked={isReddit} onClick={() => setIsReddit(!isReddit)} />
                            <label onClick={() => setIsReddit(!isReddit)} className='select-none ml-[4px] cursor-pointer font-medium text-[13px] flex flex-col'>
                                Reddit
                            </label>
                        </div>
                    </div>

                    <div className='md:w-[49%] w-full flex flex-col md:mt-[60px]'>
                        <div className='flex flex-row items-center align-middle mb-[15px]'>
                            <input type="checkbox" checked={isTelegram} onClick={() => setIsTelegram(!isTelegram)} />
                            <label onClick={() => setIsTelegram(!isTelegram)} className='select-none ml-[4px] cursor-pointer font-medium text-[13px] flex flex-col'>
                                Telegram
                            </label>
                        </div>

                        <div className='flex flex-row items-center align-middle mb-[15px]'>
                            <input type="checkbox" checked={isYoutube} onClick={() => setIsYoutube(!isYoutube)} />
                            <label onClick={() => setIsYoutube(!isYoutube)} className='select-none ml-[4px] cursor-pointer font-medium text-[13px] flex flex-col'>
                                Youtube
                            </label>
                        </div>

                        <div className='flex flex-row items-center align-middle mb-[15px]'>
                            <input type="checkbox" checked={isDiscord} onClick={() => setIsDiscord(!isDiscord)} />
                            <label onClick={() => setIsDiscord(!isDiscord)} className='select-none ml-[4px] cursor-pointer font-medium text-[13px] flex flex-col'>
                                Discord
                            </label>
                        </div>
                    </div>
                </div>

                <div className='w-full flex flex-col justify-center items-center mt-[20px]'>
                    <div className='flex flex-row items-center align-middle mb-[15px]'>
                        <input type="checkbox" checked={isCheck} onClick={() => setIsCheck(!isCheck)} />
                        <label onClick={() => setIsCheck(!isCheck)} className='select-none ml-[4px] cursor-pointer font-medium text-[13px] flex flex-col'>
                            By checking this box, you acknowledge having read and accepted our ToS.
                        </label>
                    </div>
                    <button onClick={handleSubmit} className='border border-white py-[6px] px-[50px] bg-primary text-[15px] h-[35px] whitespace-nowrap align-middle rounded-[4px] hover:text-primary hover:bg-white'>
                        Submit
                    </button>
                    <p className='text-red-500 mt-[12px]'>{checkErr}</p>
                </div>
            </div>
        </div>
    )
}

export default AddAirdrop