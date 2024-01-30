import React from 'react'
import { useNavigate } from 'react-router-dom'

const TermsConditions = () => {
    const navigate = useNavigate()
    return (
        <div className='mt-[120px] items-center flex justify-center w-full flex-col'>
            <div className='md:w-[80%] w-full my-[20px] rounded-[12px] pt-[20px] pb-[30px] px-[5px] bg-primary border-[5px] border-secondary '>
                <div onClick={() => navigate("/")} className='inline-flex cursor-pointer flex-row items-center gap-x-[8px] text-white p-[20px] hover:text-white'>
                    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4965 18.1877L10.5055 19.1787C10.0859 19.5983 9.40743 19.5983 8.9923 19.1787L0.314697 10.5055C-0.104899 10.0859 -0.104899 9.40743 0.314697 8.9923L8.9923 0.314697C9.4119 -0.104899 10.0904 -0.104899 10.5055 0.314697L11.4965 1.30566C11.9205 1.72972 11.9116 2.4216 11.4786 2.83674L6.09977 7.96117H18.9287C19.5224 7.96117 20 8.43879 20 9.03247V10.4609C20 11.0546 19.5224 11.5322 18.9287 11.5322H6.09977L11.4786 16.6566C11.9161 17.0718 11.925 17.7636 11.4965 18.1877Z" fill="currentColor" /></svg>
                    <p>Go back</p>
                </div>

                <div className='flex justify-center items-center flex-col md:w-[80%] w-full text-center mx-auto px-[5px]'>
                    <h1 className='font-bold text-[2.5rem] mt-[20px] mb-[10px]'>Terms and Conditions of Sale (TOS)</h1>
                    <p className='text-[1rem] break-words'>The present general conditions of sale are concluded between pink-vote and any non-trading individual wishing to make a temporary "Premium" on the website Pink Vote.com</p><br />
                    <p className='text-[1rem] break-words'>he Parties agree that the present General Terms and Conditions of Sale exclusively govern their relationship. pink-vote reserves the right to modify the General Terms and Conditions of Sale from time to time. They will be applicable as soon as they are put online.</p>
                    <p className='text-[1rem] break-words'>General terms and conditions of sale for products sold on the Pink Vote.com website</p>
                    <h1 className='font-bold text-[1.5rem] mt-[20px] mb-[10px]'>JOB</h1>
                    <p className='text-[1rem] break-words'>The General Terms and Conditions of Sale are intended to define the terms and conditions of sale between pink-vote and the User, starting with the act of purchasing a temporary advertising space for a period of time determined by the User on Pink Vote.com</p>
                    <h1 className='font-bold text-[1.5rem] mt-[20px] mb-[10px]'>PRODUCTS</h1>
                    <p className='text-[1rem] break-words'>The products governed by these Terms and Conditions are temporary advertising slots provided to users of Pink Vote.com by displaying on the homepage of their Pink Vote.com/coin for a limited time chosen at the time of purchase.</p>
                    <h1 className='font-bold text-[1.5rem] mt-[20px] mb-[10px]'>RATES</h1>
                    <p className='text-[1rem] break-words'>The prices of our items are displayed on the store at the time of payment. They are indicated including all taxes. Pink Vote.com reserves the right to modify its prices at any time.</p>
                    <h1 className='font-bold text-[1.5rem] mt-[20px] mb-[10px]'>ORDERING</h1>
                    <p className='text-[1rem] break-words'>To place an order, the User does not need to identify himself on the site and therefore to have created an account, he must go through the Registration page, then Login, where he will be able to consult the Premium page indicating the waiting list (potential) of the coins that have purchased a display at the top of the list on Pink Vote.com</p><br />
                    <p className='text-[1rem] break-words'>The order is made by ID provided on the day of registration of the coin, individually, for each coin registered on the site.</p><br />
                    <p className='text-[1rem] break-words'>All orders are considered acceptance of the prices and regulations.</p>
                    <h1 className='font-bold text-[1.5rem] mt-[20px] mb-[10px]'>PAYMENT TERMS</h1>
                    <p className='text-[1rem] break-words'>The User has the choice to pay for his purchase:</p>
                    <p className='text-[1rem] break-words'>- by Paypal</p>
                    <p className='text-[1rem] break-words'>- By credit card (Carte Bleue, e-carte bleue, Visa, Mastercard, American Express.) through the Paypal website</p>
                    <h1 className='font-bold text-[1.5rem] mt-[20px] mb-[10px]'>DELIVERY</h1>
                    <p className='text-[1rem] break-words'>The highlighting is possible only for the coin having carried out the act of purchase beforehand, it is not possible to change coin before or during a highlighting.</p>
                    <h1 className='font-bold text-[1.5rem] mt-[20px] mb-[10px]'>DELAY OF RETRACTATION</h1>
                    <p className='text-[1rem] break-words'>In accordance with the provisions of Article L.121-21 of the Consumer Code, you have a withdrawal period of 14 days from receipt of your products to exercise your right of withdrawal without having to justify reasons or pay a penalty.</p><br />
                    <p className='text-[1rem] break-words'>This right cannot be applied here in the case of the pink-vote company, which provides an immediate service upon purchase.</p>
                    <h1 className='font-bold text-[1.5rem] mt-[20px] mb-[10px]'>EXCEPTIONS TO THE RIGHT OF RETRACTATION</h1>
                    <p className='text-[1rem] break-words'>In accordance with the provisions of Article L.121-21-8 of the Consumer Code, the right of withdrawal does not apply to:
                        The supply of services fully executed before the end of the withdrawal period and whose execution has begun after prior express agreement of the consumer and express waiver of his right of withdrawal.</p><br />
                    <p className='text-[1rem] break-words'>The supply of goods or services whose price depends on fluctuations in the financial market beyond the control of the trader and which may occur during the withdrawal period.</p>
                    <p className='text-[1rem] break-words'>The supply of goods made to the consumer's specifications or clearly personalized.</p>
                    <p className='text-[1rem] break-words'>The supply of goods likely to deteriorate or expire quickly.</p>
                    <p className='text-[1rem] break-words'>The supply of goods which, after delivery and by their nature, are inseparably mixed with other items.</p>
                    <p className='text-[1rem] break-words'>The supply of digital content not provided on a physical medium whose execution has begun after express prior agreement of the consumer and express waiver of his right of withdrawal.</p>
                    <h1 className='font-bold text-[1.5rem] mt-[20px] mb-[10px]'>RESPONSIBILITY</h1>
                    <p className='text-[1rem] break-words'>Pink Vote.com will not be held responsible if a featured coin encounters a problem during the time of its advertising.</p><br />
                    <p className='text-[1rem] break-words'>A featured coin on our site generates a lot of traffic, you should ensure that your coin is able to handle the traffic load before opting for an extended spotlight.</p>
                    <h1 className='font-bold text-[1.5rem] mt-[20px] mb-[10px]'>INDISPONSIBILITY</h1>
                    <p className='text-[1rem] break-words'>Pink Vote.com guarantees 90% availability of your ad. If Pink Vote.com encounters technical problems beyond its control that make it impossible for the advertisement to be displayed on a coin's top listing, you may agree to compensation based on the duration of the interruption:</p><br />
                    <p className='text-[1rem] break-words'>Interruption of less than 10% of the purchased duration: No compensation will be granted.</p><br /><br />
                    <p className='text-[1rem] break-words'>nterruption of less than 70%: A refund will be granted Interruption of less than 70%: A partial refund or a new presentation of the same duration as the interruption will be offered.</p>
                    <p className='text-[1rem] break-words'>More than 70% interruption: A full refund or a new highlight of the same duration will be offered.</p>
                    <h1 className='font-bold text-[1.5rem] mt-[20px] mb-[10px]'>Last Modified: 05/21/2021</h1>

                </div>
            </div>
        </div>
    )
}

export default TermsConditions