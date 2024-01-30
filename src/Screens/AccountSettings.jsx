import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from './GlobalContext'
import { ref, onValue, child, push, update } from "firebase/database";
import { db, storage } from '../../Firebase';
import { getAuth, updateEmail, updateProfile } from 'firebase/auth';
import { getDownloadURL, ref as imageRef, uploadBytes } from "firebase/storage";


const AccountSettings = () => {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [website, setWebsite] = useState("")
    const [location, setLocation] = useState("")
    const [about, setAbout] = useState("")
    const [facebook, setFacebook] = useState("")
    const [twitter, setTwitter] = useState("")
    const { currentUser } = useContext(GlobalContext)
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const [privacy, setPrivacy] = useState("")
    const [dbUser, setDbUser] = useState([])
    const [updated, setUpdated] = useState("")


    const loggedIn = localStorage.getItem('currentUser');

    useEffect(() => {
        if (!loggedIn) {
            navigate("/login")
        }
    }, [loggedIn])


    useEffect(() => {
        setImage(currentUser.photoURL)
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
        if (dbUser.length != 0) {
            setName(dbUser.displayName)
            setEmail(dbUser.email)
            setWebsite(dbUser.website)
            setLocation(dbUser.location)
            setAbout(dbUser.about)
            setFacebook(dbUser.facebook)
            setTwitter(dbUser.twitter)
            setPrivacy(dbUser.privacy)
        }
    }, [dbUser, currentUser])

    useEffect(() => {
        setTimeout(() => {
            setUpdated("")
        }, 7000)
    }, [updated])

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
        const StorageRef = imageRef(storage, `profiles/${file}`);
        const auth = getAuth();
        uploadBytes(StorageRef, file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            getDownloadURL(StorageRef).then(url => {
                updateProfile(auth.currentUser, {
                    photoURL: url
                }).then(() => {
                    setImage(url)

                }).catch((error) => {
                    // An error occurred
                    // ...
                });
            });
        });

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

    const handleSubmit = () => {
        const auth = getAuth();
        updateEmail(auth.currentUser, email).then(() => {
            update(ref(db, `/users/${currentUser.uid}`), {
                email: email,
                website: website,
                location: location,
                about: about,
                facebook: facebook,
                twitter: twitter,
                profileImage: image == null ? "" : image,
                privacy: privacy,
                displayName: name,
            })
        }).catch((error) => {
            // An error occurred
            console.log(error);
            // ...
        });

        navigate("/")
    }

    return (
        <div className='mt-[120px] items-center flex justify-center w-full flex-col'>
            <div className='md:w-[80%] w-full my-[20px] rounded-[12px] pt-[20px] pb-[30px] px-[5px] bg-primary border-[5px] border-secondary '>
                <div onClick={() => navigate("/")} className='inline-flex cursor-pointer flex-row items-center gap-x-[8px] text-white p-[20px] hover:text-hover'>
                    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4965 18.1877L10.5055 19.1787C10.0859 19.5983 9.40743 19.5983 8.9923 19.1787L0.314697 10.5055C-0.104899 10.0859 -0.104899 9.40743 0.314697 8.9923L8.9923 0.314697C9.4119 -0.104899 10.0904 -0.104899 10.5055 0.314697L11.4965 1.30566C11.9205 1.72972 11.9116 2.4216 11.4786 2.83674L6.09977 7.96117H18.9287C19.5224 7.96117 20 8.43879 20 9.03247V10.4609C20 11.0546 19.5224 11.5322 18.9287 11.5322H6.09977L11.4786 16.6566C11.9161 17.0718 11.925 17.7636 11.4965 18.1877Z" fill="currentColor" /></svg>
                    <p>Go back</p>
                </div>

                <div className='flex justify-center items-center flex-col md:w-[80%] w-full text-center mx-auto px-[5px]'>
                    <h1 className='font-bold text-[2.5rem] mt-[20px] mb-[10px]'>Edit your profile</h1>
                    <p className='font-medium text-[1.2rem] '>Let people know who they are dealing with. And who knows, maybe this will be useful for new features</p>
                </div>

                <div className='w-full px-[30px] flex flex-row flex-wrap gap-x-6'>
                    <div className='md:w-[49%] w-full flex flex-col '>
                        <h2 className='text-[20px] mt-[20px] mb-[10px] font-medium'>Coin Information</h2>

                        <div className='break-words mb-[15px] mt-[20px]'>
                            <label className='cursor-pointer mb-[5px] font-semibold flex flex-col'>
                                Display Name
                            </label>
                            <input
                                className='text-ellipsis focus-visible:outline-none w-full h-[34px] py-[6px] px-[12px] text-[#495057] bg-white border border-[#ced4da] rounded-[0.25rem]'
                                style={{ boxShadow: 'inset 0 1px 1px rgb(0 0 0 / 8%)', transition: "border-color ease-in-out .15s, box-shadow ease-in-out .15s" }}
                                type="text"
                                placeholder=''
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className='break-words mb-[15px] mt-[20px]'>
                            <label className='cursor-pointer mb-[5px] font-semibold flex flex-col'>
                                Email
                            </label>
                            <input
                                className='text-ellipsis focus-visible:outline-none w-full h-[34px] py-[6px] px-[12px] text-[#495057] bg-white border border-[#ced4da] rounded-[0.25rem]'
                                style={{ boxShadow: 'inset 0 1px 1px rgb(0 0 0 / 8%)', transition: "border-color ease-in-out .15s, box-shadow ease-in-out .15s" }}
                                type="text"
                                placeholder=''
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                    </div>

                    <div className='md:w-[49%] w-full flex flex-col mt-[60px]'>
                        <div className='break-words mb-[15px] mt-[20px]'>
                            <label className='cursor-pointer mb-[5px] font-semibold flex flex-col'>
                                Website
                            </label>
                            <input
                                className='text-ellipsis focus-visible:outline-none w-full h-[34px] py-[6px] px-[12px] text-[#495057] bg-white border border-[#ced4da] rounded-[0.25rem]'
                                style={{ boxShadow: 'inset 0 1px 1px rgb(0 0 0 / 8%)', transition: "border-color ease-in-out .15s, box-shadow ease-in-out .15s" }}
                                type="text"
                                placeholder=''
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)}
                            />
                        </div>

                        <div className='break-words mb-[15px] mt-[20px]'>
                            <label className='cursor-pointer mb-[5px] font-semibold flex flex-col'>
                                Location
                            </label>
                            <input
                                className='text-ellipsis focus-visible:outline-none w-full h-[34px] py-[6px] px-[12px] text-[#495057] bg-white border border-[#ced4da] rounded-[0.25rem]'
                                style={{ boxShadow: 'inset 0 1px 1px rgb(0 0 0 / 8%)', transition: "border-color ease-in-out .15s, box-shadow ease-in-out .15s" }}
                                type="text"
                                placeholder=''
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='md:w-[60%] w-full flex flex-col mx-auto break-words mb-[15px] mt-[20px]'>
                        <label className='cursor-pointer mb-[5px] font-semibold flex flex-col'>
                            About
                        </label>
                        <input
                            className='text-ellipsis focus-visible:outline-none w-full h-[34px] py-[6px] px-[12px] text-[#495057] bg-white border border-[#ced4da] rounded-[0.25rem]'
                            style={{ boxShadow: 'inset 0 1px 1px rgb(0 0 0 / 8%)', transition: "border-color ease-in-out .15s, box-shadow ease-in-out .15s" }}
                            type="text"
                            placeholder=''
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                        />
                    </div>


                    <div className='w-full px-[30px] flex flex-row flex-wrap gap-x-6 mt-[20px]'>
                        <div className='md:w-[49%] w-full flex flex-col '>
                            <h1 className='font-semibold text-[16px] mt-[20px] mb-[15px]'>Socials Networks</h1>
                            <div className='break-words mb-[15px] mt-[20px]'>
                                <label className='cursor-pointer mb-[5px] font-semibold flex flex-col'>
                                    Facebook
                                </label>
                                <input
                                    className='text-ellipsis focus-visible:outline-none w-full h-[34px] py-[6px] px-[12px] text-[#495057] bg-white border border-[#ced4da] rounded-[0.25rem]'
                                    style={{ boxShadow: 'inset 0 1px 1px rgb(0 0 0 / 8%)', transition: "border-color ease-in-out .15s, box-shadow ease-in-out .15s" }}
                                    type="text"
                                    placeholder='Facebook Link'
                                    value={facebook}
                                    onChange={(e) => setFacebook(e.target.value)}
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
                                    placeholder='Twitter Link'
                                    value={twitter}
                                    onChange={(e) => setTwitter(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='w-full px-[30px] flex flex-row flex-wrap gap-x-6 mt-[20px]'>
                        <h1 className='font-semibold text-[16px] mt-[20px] mb-[15px]'>Profile Picture</h1>
                        <div className='w-full flex-row mt-[12px]'>
                            <label
                                htmlFor="image-input"
                                className=' hover:bg-primary bg-transparent text-white border-[2px] border-primary px-[16px] py-[8px] cursor-pointer rounded-[4px]'
                            >
                                {image ? 'Change Picture' : 'Upload Picture'}
                            </label>
                            <label
                                className='block text-primary mt-[12px] cursor-pointer'
                            >
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
                                    style={{ width: '126px', height: '126px', objectFit: 'cover', marginTop: '16px' }}
                                />
                            )}
                            {error && (
                                <div style={{ color: 'red', marginTop: '8px' }}>{error}</div>
                            )}
                        </div>
                    </div>

                    <hr className='w-full my-[20px] border-t border-t-[#eeeeee38]' />

                    <div className='w-full justify-between flex px-[12px]'>
                        <div className='flex flex-col gap-y-1'>
                            <h3 className='text-[16px] font-semibold'>Password</h3>
                            <p>Set a unique password to protect your personal account.</p>
                        </div>
                        <button onClick={() => navigate("/password")} className='border border-white py-[6px] px-[50px] bg-primary text-[15px] h-[35px] whitespace-nowrap align-middle rounded-[4px] hover:text-primary hover:bg-white'>
                            Change Password
                        </button>
                    </div>

                    <hr className='w-full my-[20px] border-t border-t-[#eeeeee38]' />

                    <div className='w-full flex flex-row items-center justify-center align-middle mb-[15px]'>
                        <input type="checkbox" checked={privacy} onClick={() => setPrivacy(!privacy)} />
                        <label onClick={() => setPrivacy(!privacy)} className='select-none ml-[4px] cursor-pointer font-medium text-[13px] flex flex-col'>
                            Private Profile
                        </label>
                    </div>
                    <div className='w-full flex flex-col items-center justify-center align-middle mb-[15px]'>
                        <button onClick={handleSubmit} className='border border-white py-[6px] px-[130px] bg-primary text-[15px] h-[35px] whitespace-nowrap align-middle rounded-[4px] hover:text-primary hover:bg-white'>
                            Submit
                        </button>
                        <p className='mt-[8px] text-primary'>{updated}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountSettings