import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getDownloadURL, ref as imageRef, uploadBytes } from "firebase/storage";
import { db, storage } from '../../Firebase'
import { push, ref } from 'firebase/database'


const options = ['Listing', 'Audit', 'Marketing', 'Launchpad', 'News', 'dApp', 'Other']

const AddPartner = () => {
    const [type, setType] = useState([])
    const [paid, setPaid] = useState(false)
    const [name, setName] = useState("")
    const [link, setLink] = useState("")
    const [description, setDescription] = useState("")
    const [shortDescription, setShortDescription] = useState("")
    const [descCount, setDescCount] = useState(0)
    const [shortDescCount, setShortDescCount] = useState(0)
    const [serviceCount, setServiceCount] = useState(0)
    const [deliveryDuration, setDeliveryDuration] = useState("")
    const [discount, setDiscount] = useState('')
    const [points, setPoints] = useState([""])
    const [services, setServices] = useState("")
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const [logoFile, setLogoFile] = useState("")
    const [logoLink, setLogoLink] = useState("")
    const [checkErr, setCheckErr] = useState("")



    const navigate = useNavigate()
    const loggedIn = localStorage.getItem('currentUser');


    useEffect(() => {
        if (!loggedIn) {
            navigate("/login")
        }
    }, [loggedIn])

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

    const handleAddClick = () => {
        setPoints(prevPoints => [...prevPoints, '']);
    };

    const handleRemoveClick = index => {
        setPoints(prevPoints => {
            const newPoints = [...prevPoints];
            newPoints.splice(index, 1);
            return newPoints;
        });
    };

    const handlePointChange = (index, value) => {
        setPoints(prevPoints => {
            const newPoints = [...prevPoints];
            newPoints[index] = value;
            return newPoints;
        });
    };

    useEffect(() => {
        setDescCount(description.length)
    }, [description])

    useEffect(() => {
        setShortDescCount(shortDescription.length)
    }, [shortDescription])

    useEffect(() => {
        setServiceCount(services.length)
    }, [services])

    const handleSubmit = async () => {
        if (name === '') {
            setCheckErr('Please enter Partner Name');
        } else if (link === '') {
            setCheckErr('Please enter Partner Link');
        }
        else if (type.length === 0) {
            setCheckErr('Please select atleast 1 type');
        }
        else if (description === '') {
            setCheckErr(`Please add partners description`);
        }
        else if (shortDescription === '') {
            setCheckErr(`Please add partners short description`);
        }
        else if (services === '') {
            setCheckErr('Please enter Partner Services');
        }
        else if (points[0] === '') {
            setCheckErr('Please add Points');
        }
        else if (deliveryDuration === '') {
            setCheckErr('Please enter Delivery Duration');
        }
        else {
            setCheckErr('');
            const StorageRef = imageRef(storage, `partners/${name}/${logoFile.name}-logo`);
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
                push(ref(db, 'partners/'), {
                    name,
                    link,
                    type,
                    paid,
                    description,
                    shortDescription,
                    services,
                    deliveryDuration,
                    discount,
                    points,
                    Logo: logoUrl,
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
                    <h1 className='font-bold text-[2.5rem] mt-[20px] mb-[10px]'>Add Partners & Tools</h1>
                    <p className='font-medium text-[1.5rem] '> Add your Partners and toold.</p>
                </div>

                <div className='w-full flex flex-col px-[18px]'>
                    <h2 className='text-[20px] mt-[20px] mb-[10px] font-medium'>Partners Information</h2>

                    <div className='break-words mb-[15px] mt-[20px]'>
                        <label className='cursor-pointer mb-[5px] font-semibold flex flex-col'>
                            Partner Name
                        </label>
                        <input
                            className='text-ellipsis focus-visible:outline-none w-full h-[34px] py-[6px] px-[12px] text-[#495057] bg-white border border-[#ced4da] rounded-[0.25rem]'
                            style={{ boxShadow: 'inset 0 1px 1px rgb(0 0 0 / 8%)', transition: "border-color ease-in-out .15s, box-shadow ease-in-out .15s" }}
                            type="text"
                            placeholder='Partner Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className='break-words mb-[15px]'>
                        <label className='cursor-pointer mb-[5px] font-semibold flex flex-col'>
                            Partner Link
                        </label>
                        <input
                            className='text-ellipsis focus-visible:outline-none w-full h-[34px] py-[6px] px-[12px] text-[#495057] bg-white border border-[#ced4da] rounded-[0.25rem]'
                            style={{ boxShadow: 'inset 0 1px 1px rgb(0 0 0 / 8%)', transition: "border-color ease-in-out .15s, box-shadow ease-in-out .15s" }}
                            type="text"
                            placeholder='Link of Partner Website'
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                        />
                    </div>

                    <div className='break-words mb-[15px]'>
                        <label className='cursor-pointer mb-[5px] font-semibold flex flex-col'>
                            Type of Partner
                        </label>
                        <ul className='flex flex-row gap-x-3'>
                            {
                                options.map(option => (
                                    <li onClick={() => setType(type.includes(option) ? type.filter(item => item !== option) : [...type, option])}
                                        className={`${type.includes(option) ? "bg-white text-primary" : "text-white bg-primary"} border-[2px] py-[10px] px-[30px] border-white  hover:border-hover hover:text-hover cursor-pointer`}>{option}</li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className='flex flex-row items-center align-middle mb-[15px]'>
                        <input type="checkbox" checked={paid} onClick={() => setPaid(!paid)} />
                        <label onClick={() => setPaid(!paid)} className='select-none ml-[4px] cursor-pointer font-medium text-[16px] flex flex-col'>
                            Paid Services
                        </label>
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

                    <div className='break-words mb-[15px]'>
                        <label className='cursor-pointer mb-[5px] font-semibold flex flex-col'>
                            Services
                        </label>
                        <textarea
                            className='text-ellipsis focus-visible:outline-none w-full py-[6px] px-[12px] text-[#495057] bg-white border border-[#ced4da] rounded-[0.25rem]'
                            style={{ boxShadow: 'inset 0 1px 1px rgb(0 0 0 / 8%)', transition: "border-color ease-in-out .15s, box-shadow ease-in-out .15s" }}
                            type="text"
                            placeholder='Describe your project, include links, emojis, be concise and efficient to increase your attractiveness'
                            rows={4}
                            value={services}
                            maxLength={400}
                            onChange={e => setServices(e.target.value)}
                        ></textarea>
                        <p className='text-white font-semibold text-[14px]'>{serviceCount}/400 characters (max)</p>

                    </div>

                    <div className='break-words mb-[15px] mt-[20px]'>
                        <label className='cursor-pointer mb-[5px] font-semibold flex flex-col'>
                            Delivery Duration
                        </label>
                        <input
                            className='text-ellipsis focus-visible:outline-none w-full h-[34px] py-[6px] px-[12px] text-[#495057] bg-white border border-[#ced4da] rounded-[0.25rem]'
                            style={{ boxShadow: 'inset 0 1px 1px rgb(0 0 0 / 8%)', transition: "border-color ease-in-out .15s, box-shadow ease-in-out .15s" }}
                            type="text"
                            placeholder='ex: 48'
                            value={deliveryDuration}
                            onChange={(e) => setDeliveryDuration(e.target.value)}
                        />
                    </div>

                    <div className='break-words mb-[15px] mt-[20px]'>
                        <label className='cursor-pointer mb-[5px] font-semibold flex flex-col'>
                            Discount
                        </label>
                        <input
                            className='text-ellipsis focus-visible:outline-none w-full h-[34px] py-[6px] px-[12px] text-[#495057] bg-white border border-[#ced4da] rounded-[0.25rem]'
                            style={{ boxShadow: 'inset 0 1px 1px rgb(0 0 0 / 8%)', transition: "border-color ease-in-out .15s, box-shadow ease-in-out .15s" }}
                            type="text"
                            placeholder='ex: 15%'
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                        />
                    </div>

                    <div className='break-words mb-[15px]'>
                        <label className='cursor-pointer mb-[5px] font-semibold flex flex-col'>
                            Points
                        </label>
                        {points.map((point, index) => (
                            <div key={index} className='gap-x-2 flex items-center align-middle mb-[2px]'>
                                <input
                                    className='border text-ellipsis focus-visible:outline-none w-[75%] h-[34px] py-[6px] px-[12px] text-[#495057] bg-white rounded-[0.25rem]'
                                    type="text"
                                    placeholder='Enter your point Here'
                                    value={point}
                                    onChange={event => handlePointChange(index, event.target.value)}
                                />
                                {index > 0 && (
                                    <button className='border py-[6px] px-[15px] border-white  hover:bg-white hover:text-primary cursor-pointer' type="button" onClick={() => handleRemoveClick(index)}>Remove</button>
                                )}
                                {index === points.length - 1 && (
                                    <button className='border py-[6px] px-[15px] border-white  hover:bg-white hover:text-primary cursor-pointer' type="button" onClick={handleAddClick}>Add new</button>
                                )}
                            </div>
                        ))}
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

export default AddPartner