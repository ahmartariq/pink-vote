import React from 'react'
import { useNavigate } from 'react-router-dom'

const Disclaimer = () => {
    const navigate = useNavigate()
    return (
        <div className='mt-[120px] items-center flex justify-center w-full flex-col'>
            <div className='md:w-[60%] w-full my-[20px] rounded-[12px] pt-[20px] pb-[30px] px-[5px] bg-primary border-[5px] border-secondary '>
                <div onClick={() => navigate("/")} className='inline-flex cursor-pointer flex-row items-center gap-x-[8px] text-white p-[20px] hover:text-white'>
                    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4965 18.1877L10.5055 19.1787C10.0859 19.5983 9.40743 19.5983 8.9923 19.1787L0.314697 10.5055C-0.104899 10.0859 -0.104899 9.40743 0.314697 8.9923L8.9923 0.314697C9.4119 -0.104899 10.0904 -0.104899 10.5055 0.314697L11.4965 1.30566C11.9205 1.72972 11.9116 2.4216 11.4786 2.83674L6.09977 7.96117H18.9287C19.5224 7.96117 20 8.43879 20 9.03247V10.4609C20 11.0546 19.5224 11.5322 18.9287 11.5322H6.09977L11.4786 16.6566C11.9161 17.0718 11.925 17.7636 11.4965 18.1877Z" fill="currentColor" /></svg>
                    <p>Go back</p>
                </div>

                <div className='flex justify-center items-center flex-col md:w-[80%] w-full text-center mx-auto px-[5px]'>
                    <h1 className='font-bold text-[2.5rem] mt-[20px] mb-[10px]'>Disclaimer</h1>
                    <p className='text-[1rem] break-words'>All content provided herein our website, hyperlinked sites, associated applications, forums, blogs, social media accounts and other platforms (“Site”) is for your general information only, procured from third party sources.</p>
                    <p className='text-[1rem] break-words'>We make no warranties of any kind in relation to our content, including but not limited to accuracy and updatedness.</p>
                    <p className='text-[1rem] break-words'>No part of the content that we provide constitutes financial advice, legal advice or any other form of advice meant for your specific reliance for any purpose.</p>
                    <p className='text-[1rem] break-words'>Any use or reliance on our content is solely at your own risk and discretion.</p>
                    <p className='text-[1rem] break-words'>You should conduct your own research, review, analyse and verify our content before relying on them. Trading is a highly risky activity that can lead to major losses, please therefore consult your financial advisor before making any decision.</p>
                    <p className='text-[1rem] break-words'>No content on our Site is meant to be a solicitation or offer.</p>
                </div>
            </div>
        </div>
    )
}

export default Disclaimer