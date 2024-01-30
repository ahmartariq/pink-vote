import React from 'react'
import { useNavigate } from 'react-router-dom'

const TermsOfUse = () => {

    const navigate = useNavigate()
    return (
        <div className='mt-[120px] items-center flex justify-center w-full flex-col'>
            <div className='md:w-[60%] w-full my-[20px] rounded-[12px] pt-[20px] pb-[30px] px-[5px] bg-primary border-[5px] border-secondary '>
                <div onClick={() => navigate("/")} className='inline-flex cursor-pointer flex-row items-center gap-x-[8px] text-white p-[20px] hover:text-white'>
                    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4965 18.1877L10.5055 19.1787C10.0859 19.5983 9.40743 19.5983 8.9923 19.1787L0.314697 10.5055C-0.104899 10.0859 -0.104899 9.40743 0.314697 8.9923L8.9923 0.314697C9.4119 -0.104899 10.0904 -0.104899 10.5055 0.314697L11.4965 1.30566C11.9205 1.72972 11.9116 2.4216 11.4786 2.83674L6.09977 7.96117H18.9287C19.5224 7.96117 20 8.43879 20 9.03247V10.4609C20 11.0546 19.5224 11.5322 18.9287 11.5322H6.09977L11.4786 16.6566C11.9161 17.0718 11.925 17.7636 11.4965 18.1877Z" fill="currentColor" /></svg>
                    <p>Go back</p>
                </div>

                <div className='flex justify-center items-center flex-col md:w-[80%] w-full text-center mx-auto px-[5px]'>
                    <h1 className='font-bold text-[2.5rem] mt-[20px] mb-[10px]'>Terms of Services</h1>
                    <p className='text-[1rem] break-words'>By using Pink Vote.com you agree to the following Terms of Service. The use of "we" on this page refers to the site and company (pink-vote) and the use of the pronoun "you" refers to all visitors and users. If you do not agree to any of these terms please discontinue using Pink Vote.com</p>
                    <br /><p className='text-[1rem] break-words font-bold'>Voting</p>
                    <p className='text-[1rem] break-words'>You may only vote for a particular coin once per hour (every 1 hour).</p>
                    <p className='text-[1rem] break-words'>Voting must be done in person and on this site, not through the use of scripts, bots or automated programs.</p>
                    <p className='text-[1rem] break-words'>It is forbidden for a person to vote several times on the same coin (within 1 hour) using different systems such as proxies, VPN, etc... Trading or selling of votes between different coins is strictly prohibited.</p>
                    <br /><p className='text-[1rem] break-words font-bold'>Coin content</p>
                    <p className='text-[1rem] break-words'>You are only allowed to add a coin to Pink Vote.com if you are the owner of the coin or if you have been given explicit permission by the owner. You can only create one location for the same coin, multiple locations will be deleted. However you have permission to add 3 different coins maximum. To increase this limit, please <span onClick={() => navigate("/contact")} className="text-hover font-bold cursor-pointer">contact us</span></p>
                    <p className='text-[1rem] break-words'>Once a coin has been added, you agree that Pink Vote.com may make regular attempts to collect and store your coin data and display it on our website.
                        As the owner of the coin, you agree not to include pornographic, illegal, racist or hateful content as part of the coin details (banners, name, description etc. ...). If you include content of an illegal nature, you may be liable to be prosecuted for it.
                    </p>
                    <br /><p className='text-[1rem] break-words font-bold'>Coin removal</p>
                    <p className='text-[1rem] break-words'>Pink Vote.com reserves the right to remove any coin at any time with or without notice.
                        A coin may be removed for a number of reasons, including, but not limited to:</p><br />
                    <p className='text-[1rem] break-words'>- Inappropriate coin details (banner, name, description etc...)</p>
                    <p className='text-[1rem] break-words'>- Abuse of the voting system</p>
                    <p className='text-[1rem] break-words'>- Low availability time of the coins ( inactive coin for more than 30 days )</p>
                    <p className='text-[1rem] break-words'>- Put another coin's name in place of yours</p>
                    <br /><p className='text-[1rem] break-words font-bold'>Promoted coins</p>
                    <p className='text-[1rem] break-words'>Payments can be made using PayPal.</p>
                    <p className='text-[1rem] break-words'>A PayPal dispute will result in the permanent removal of your coin (and any other coins you own) from the site.</p>
                    <p className='text-[1rem] break-words'>Promoted coins are non-refundable, in the event of non-availability or disruptions to site traffic, no guarantee can be applied.</p>
                    <br /><p className='text-[1rem] break-words font-bold'>Change of Terms</p>
                    <p className='text-[1rem] break-words'>We reserve the right to change these terms of service at any time with or without notice.</p>
                    <br /><p className='text-[1rem] break-words font-bold'>Last modified: 05/21/2021</p>
                </div>
            </div>
        </div>
    )
}

export default TermsOfUse