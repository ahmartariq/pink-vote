import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EmailAuthProvider, getAuth, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { GlobalContext } from './GlobalContext';


const ChangePassword = () => {
    const navigate = useNavigate()
    const [old, setOld] = useState('')
    const [newPass, setNewPass] = useState('')
    const [repass, setRepass] = useState('')

    const loggedIn = localStorage.getItem('currentUser');

    useEffect(() => {
        if (!loggedIn) {
            navigate("/login")
        }
    }, [loggedIn])

    const handleChange = () => {
        const auth = getAuth();

        const user = auth.currentUser;
        const userCredential = EmailAuthProvider.credential(
            user.email,
            old
        );
        reauthenticateWithCredential(user, userCredential).then(() => {
            updatePassword(user, newPass).then(() => {
                navigate('/account-settings')
            }).catch((error) => {
            });

        })


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

                <hr className='w-full my-[20px] border-t border-t-[#eeeeee38]' />

                <div className='md:w-[60%] justify-center items-center w-full flex flex-col mx-auto break-words mb-[15px] mt-[20px]'>
                    <label className='cursor-pointer mb-[5px] font-semibold flex flex-col'>
                        Old Password
                    </label>
                    <input
                        className='text-ellipsis focus-visible:outline-none w-full h-[34px] py-[6px] px-[12px] text-[#495057] bg-white border border-[#ced4da] rounded-[0.25rem]'
                        style={{ boxShadow: 'inset 0 1px 1px rgb(0 0 0 / 8%)', transition: "border-color ease-in-out .15s, box-shadow ease-in-out .15s" }}
                        type="password"
                        placeholder=''
                        value={old}
                        onChange={(e) => setOld(e.target.value)}
                    />
                </div>
                <form autoComplete='off' className='md:w-[60%] justify-center items-center w-full flex flex-col mx-auto break-words mb-[15px] mt-[20px]'>
                    <label className='cursor-pointer mb-[5px] font-semibold flex flex-col'>
                        New Password
                    </label>
                    <input
                        className='text-ellipsis focus-visible:outline-none w-full h-[34px] py-[6px] px-[12px] text-[#495057] bg-white border border-[#ced4da] rounded-[0.25rem]'
                        style={{ boxShadow: 'inset 0 1px 1px rgb(0 0 0 / 8%)', transition: "border-color ease-in-out .15s, box-shadow ease-in-out .15s" }}
                        type="password"
                        placeholder=''
                        value={newPass}
                        onChange={(e) => setNewPass(e.target.value)}
                    />
                </form>
                <form className='md:w-[60%] justify-center items-center w-full flex flex-col mx-auto break-words mb-[15px] mt-[20px]'>
                    <label className='cursor-pointer mb-[5px] font-semibold flex flex-col'>
                        Repeat Password
                    </label>
                    <input
                        className='text-ellipsis focus-visible:outline-none w-full h-[34px] py-[6px] px-[12px] text-[#495057] bg-white border border-[#ced4da] rounded-[0.25rem]'
                        style={{ boxShadow: 'inset 0 1px 1px rgb(0 0 0 / 8%)', transition: "border-color ease-in-out .15s, box-shadow ease-in-out .15s" }}
                        type="password"
                        placeholder=''
                        value={repass}
                        onChange={(e) => setRepass(e.target.value)}
                    />
                </form>
                <div className='md:w-[60%] justify-center items-center w-full flex flex-col mx-auto break-words mb-[15px] mt-[20px]'>
                    <button onClick={(handleChange)} className='border border-white py-[6px] px-[50px] bg-primary text-[15px] h-[35px] whitespace-nowrap align-middle rounded-[4px] hover:text-primary hover:bg-white'>
                        Submit
                    </button>
                </div>



            </div>
        </div>
    )
}

export default ChangePassword