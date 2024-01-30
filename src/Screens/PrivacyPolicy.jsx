import React from 'react'
import { useNavigate } from 'react-router-dom'

const PrivacyPolicy = () => {
    const navigate = useNavigate()

    return (
        <div className='mt-[120px] items-center flex justify-center w-full flex-col'>
            <div className='md:w-[80%] w-full my-[20px] rounded-[12px] pt-[20px] pb-[30px] px-[5px] bg-primary border-[5px] border-secondary '>
                <div onClick={() => navigate("/")} className='inline-flex cursor-pointer flex-row items-center gap-x-[8px] text-white p-[20px] hover:text-white'>
                    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4965 18.1877L10.5055 19.1787C10.0859 19.5983 9.40743 19.5983 8.9923 19.1787L0.314697 10.5055C-0.104899 10.0859 -0.104899 9.40743 0.314697 8.9923L8.9923 0.314697C9.4119 -0.104899 10.0904 -0.104899 10.5055 0.314697L11.4965 1.30566C11.9205 1.72972 11.9116 2.4216 11.4786 2.83674L6.09977 7.96117H18.9287C19.5224 7.96117 20 8.43879 20 9.03247V10.4609C20 11.0546 19.5224 11.5322 18.9287 11.5322H6.09977L11.4786 16.6566C11.9161 17.0718 11.925 17.7636 11.4965 18.1877Z" fill="currentColor" /></svg>
                    <p>Go back</p>
                </div>

                <div className='flex justify-center items-center flex-col md:w-[80%] w-full text-center mx-auto px-[5px]'>
                    <h1 className='font-bold text-[2.5rem] mt-[20px] mb-[10px]'>Privacy Policy (RGPD standard)</h1>
                    <p className='text-[1rem] break-words'>Pink Vote</p>
                    <p className='text-[1rem] break-words'>Société à Responsabilité Limitée au capital de 1000 Euros</p>
                    <p className='text-[1rem] break-words'>Siège social : 1250 Cnty Rd #D Elkhart, Manhattan(KS), 67950</p>
                    <p className='text-[1rem] break-words'>RCS Saintes : B 903 091 023</p>
                    <p className='text-[1rem] break-words'>Tél : +33601719350</p><br />
                    <p className='text-[1rem] break-words'>Numéro TVA Intracommunautaire: FR31903091023</p><br />
                    <p className='text-[1rem] break-words'>Hébergeur: OVH</p><br />
                    <p className='text-[1rem] break-words'>Date de création: 21 Mai 2021</p><br />
                    <h1 className='font-bold text-[1.5rem] mt-[20px] mb-[10px]'>Security and privacy</h1>
                    <h1 className='font-bold text-[1.2rem] mt-[20px] mb-[10px] underline'>Definitions:</h1>
                    <p className='text-[1rem] break-words'><b>The Publisher:</b> The person, natural or legal, who publishes the online public communication services.</p>
                    <p className='text-[1rem] break-words'><b>The Site:</b> All sites, web pages and online services offered by the Publisher.</p>
                    <p className='text-[1rem] break-words'><b>The User:</b> The person using the Site and services.</p><br />
                    <h1 className='font-bold text-[1.5rem] mt-[20px] mb-[10px]'>Nature of the data collected:</h1><br />
                    <p className='text-[1rem] break-words font-bold'>In the course of using the Sites, the Publisher may collect the following categories of data following categories of data about its Users:</p><br />
                    <p className='text-[1rem] break-words'>Data relating to personal life (surname, first name, e-mail, excluding sensitive or dangerous)</p><br />
                    <p className='text-[1rem] break-words'>Connection data (IP addresses, event logs...)</p><br />
                    <h1 className='font-bold text-[1.5rem] mt-[20px] mb-[10px]'>Communication of personal data to third parties:</h1><br />
                    <p className='text-[1rem] break-words font-semibold'>No disclosure to third parties</p>
                    <p className='text-[1rem] break-words'>Your data will not be communicated to third parties. However, you are informed that they be disclosed in application of a law, a regulation or by virtue of a decision of a competent regulatory or judicial authority. or judicial authority.</p><br />
                    <h1 className='font-bold text-[1.5rem] mt-[20px] mb-[10px]'>Preliminary information for the communication of personal data to third parties in in the event of a merger / absorption</h1><br />
                    <p className='text-[1rem] break-words font-semibold'>Preliminary Information and Opt-Out Opportunity Before and After the Merger/Acquisition</p>
                    <p className='text-[1rem] break-words'>In the event that we become involved in a merger, acquisition or other form of disposition of assets, we are committed to maintaining the confidentiality of your personal data and to informing you We will inform you before your personal information is transferred or subjected to new privacy rules.</p><br />
                    <h1 className='font-bold text-[1.5rem] mt-[20px] mb-[10px]'>Finality of reuse of personal data collected</h1><br />
                    <p className='text-[1rem] break-words font-semibold'>The development of business statistics</p><br />
                    <p className='text-[1rem] break-words font-semibold'>The management of requests for access, rectification and opposition rights</p><br />
                    <p className='text-[1.2rem] break-words font-bold'>Data aggregation</p><br />
                    <p className='text-[1rem] break-words font-semibold'>Aggregation with non-personal data</p>
                    <p className='text-[1rem] break-words'>We may publish, disclose and use aggregated information (information about all of our Users or to specific groups or categories of Users that we combine in a manner that individual User can no longer be identified or referred to) and non-personal information for the purposes of industry and market analysis, demographic profiling, promotional and advertising purposes, and other promotional, advertising and other business purposes.</p>
                    <p className='text-[1rem] break-words font-semibold'>Aggregation with personal data available on User's social accounts</p>
                    <p className='text-[1rem] break-words'>If you connect your account to an account of another service in order to cross-post, such service service may share with us your profile information, login information, and any other information you have you have authorized to be disclosed. We may aggregate information about all of our other We may aggregate information about all of our other Users, groups, accounts, and personal data available to the User.</p>
                    <h1 className='font-bold text-[1.5rem] mt-[20px] mb-[10px]'>Collection of Identity Data</h1><br />
                    <p className='text-[1.2rem] break-words font-bold'>Use of a pseudonym</p><br />
                    <p className='text-[1rem] break-words'>Use of the Site requires registration without prior identification. It can be done without you communicating any personal data about yourself (name, first name, address, etc.). You can use the pseudonym of your choice. pseudonym of your choice.</p><br />
                    <h1 className='font-bold text-[1.5rem] mt-[20px] mb-[10px]'>Collection of identifying data</h1><br />
                    <p className='text-[1.2rem] break-words font-bold'>Use of user ID for matchmaking proposal and commercial offers</p>
                    <p className='text-[1rem] break-words'>We use your email IDs to search for existing relationships by login, by email address or by service. We may use your contact information to allow others to find your account, including We may use your contact information to enable others to find your account, including through third-party services and client applications. You may upload your address book so that we can help you find people you know on our network or on our network or to allow other Users on our network to find you. We may make suggestions to you you and other network Users with suggestions from the contacts imported from your address book.</p>
                    <p className='text-[1rem] break-words'>We may partner with companies that offer incentive offers. To support these types of promotions and incentives, we may share your email ID.</p>
                    <p className='text-[1rem] break-words'>share your electronic ID.</p><br />
                    <h1 className='font-bold text-[1.5rem] mt-[20px] mb-[10px]'>Collection of terminal data</h1><br />
                    <p className='text-[1.2rem] break-words font-bold'>No collection of technical data</p>
                    <p className='text-[1rem] break-words'>We do not collect or store any technical data from your device (IP address, internet service provider Internet service provider...).</p><br />
                    <h1 className='font-bold text-[1.5rem] mt-[20px] mb-[10px]'>Cookies</h1><br />
                    <p className='text-[1.2rem] break-words font-bold'>Cookie retention period</p>
                    <p className='text-[1rem] break-words'>In accordance with the recommendations of the CNIL, the maximum duration of conservation of cookies is 13 months at the most after their first deposit in the User's terminal, as well as the duration of the validity of the User's consent to the use of these cookies. The lifetime of cookies is not extended each visit. The User's consent must therefore be renewed at the end of this period.</p><br />
                    <p className='text-[1.2rem] break-words font-bold'>Cookie purpose</p>
                    <p className='text-[1rem] break-words'>Cookies may be used for statistical purposes, in particular to optimize the services rendered to the User, from the processing of information concerning the frequency of access, the personalization of the pages as well as the operations carried out and the information consulted. You are informed that the Publisher may place cookies on your terminal. The cookie records information relating to navigation on the service (the pages you have consulted, the date and time of the consultation of the consultation...) that we will be able to read during your subsequent visits.</p><br />
                    <p className='text-[1.2rem] break-words font-bold'>The User's right to refuse cookies, deactivation resulting in a degraded functioning of the service</p>
                    <p className='text-[1rem] break-words'>You acknowledge that you have been informed that the Publisher may use cookies, and authorize it to do so. If you do not If you do not want cookies to be used on your device, most browsers allow you to disable disable cookies through the settings options. However, please be aware that some services may not function properly.</p><br />
                    <p className='text-[1.2rem] break-words font-bold'>Possible association of cookies with personal data to enable the operation of the service</p>
                    <p className='text-[1rem] break-words'>he Publisher may collect navigational information through the use of cookies.</p><br />
                    <p className='text-[1.2rem] break-words font-bold'>Technical Data Retention</p><br />
                    <p className='text-[1.2rem] break-words font-bold'>How long technical data is retained</p>
                    <p className='text-[1rem] break-words'>Technical data is kept for the time strictly necessary to achieve the purposes mentioned above. referred to above.</p><br />
                    <p className='text-[1.2rem] break-words font-bold'>Personal data retention and anonymization period</p><br />
                    <p className='text-[1.2rem] break-words font-bold'>No data retention</p>
                    <p className='text-[1rem] break-words'>We do not retain any personal data beyond the time you are connected to the service for the purposes described in these TOS.</p><br />
                    <p className='text-[1.2rem] break-words font-bold'>Deletion of data after account deletion</p>
                    <p className='text-[1rem] break-words'>Means of data purging are put in place to provide for the effective deletion of data once the necessary for the fulfillment of the determined or imposed purposes is reached. In accordance with the law n°78-17 of January 6, 1978 relating to data processing, the files and freedoms, you also have a right to delete your data that you can exercise at any time by contacting at any time by contacting the Editor.</p>
                    <p className='text-[1.2rem] break-words font-bold'>Deletion of data after 3 years of inactivity</p>
                    <p className='text-[1rem] break-words'>For security reasons, if you have not authenticated to the Site for a period of three years, you will receive an e-mail inviting you to log in as soon as possible, otherwise your data will be otherwise your data will be deleted from our databases.</p>
                    <h1 className='font-bold text-[1.5rem] mt-[20px] mb-[10px]'>Account deletion</h1><br />
                    <p className='text-[1.2rem] break-words font-bold'>Deleting the account on demand</p>
                    <p className='text-[1rem] break-words'>User may delete his or her Account at any time by simply requesting the Publisher OR by using the Account deletion menu in the Account settings if applicable. the Account deletion menu in the Account settings, if applicable.</p>
                    <p className='text-[1.2rem] break-words font-bold'>Account deletion in the event of a violation of the TOS</p>
                    <p className='text-[1rem] break-words'>In the event of a breach of one or more provisions of the TOU or any other document incorporated herein herein by reference, Publisher reserves the right to terminate or restrict without prior notice and at its notice and at its sole discretion, your use of and access to the Services, your account and all Sites.</p>
                    <h1 className='font-bold text-[1.5rem] mt-[20px] mb-[10px]'>Indications in the event of a security breach detected by the Publisher</h1><br />
                    <p className='text-[1.2rem] break-words font-bold'>Information to the User in the event of a security breach</p>
                    <p className='text-[1rem] break-words'>We undertake to implement all appropriate technical and organizational measures to guarantee a level of security adapted to the risks of accidental, unauthorized or illegal access, disclosure, alteration, loss or destruction of your personal data. In the event that we become aware of any unlawful access to your personal data stored on our or our stored on our or our service providers' premises, or unauthorized access resulting in the risks identified above, we - Notify you of the incident as soon as possible - To take reasonable steps to mitigate the adverse effects and damages that may result from the incident to mitigate any adverse effects and damages that may result from such incident.</p>
                    <p className='text-[1.2rem] break-words font-bold'>Limitation of Liability</p>
                    <p className='text-[1rem] break-words'>In no event shall the commitments set forth in the above point regarding notification in the event of a security breach be construed as any admission of fault or liability for the occurrence of the incident in question. of the incident in question.</p>
                    <h1 className='font-bold text-[1.5rem] mt-[20px] mb-[10px]'>Transfer of personal data abroad</h1><br />
                    <p className='text-[1.2rem] break-words font-bold'>No transfer outside the European Union</p>
                    <p className='text-[1rem] break-words'>The Publisher undertakes not to transfer the personal data of its Users outside the European Union. European Union.</p>
                    <h1 className='font-bold text-[1.5rem] mt-[20px] mb-[10px]'>Changes to the TOS and Privacy Policy</h1><br />
                    <p className='text-[1rem] break-words font-semibold'>In the event of a change to these TOS, commitment not to lower the level of privacy in any substantially without prior information to the persons concerned</p>
                    <p className='text-[1rem] break-words'>We undertake to inform you in the event of substantial modification of the present TOS, and not to lower the level of confidentiality of your data substantially without informing you and obtaining your consent. your consent.</p>
                    <h1 className='font-bold text-[1.5rem] mt-[20px] mb-[10px]'>Applicable Law and Terms of Appeal</h1><br />
                    <p className='text-[1rem] break-words font-semibold'>Arbitration Clause</p>
                    <p className='text-[1rem] break-words'>You expressly agree that any dispute that may arise as a result of these TOU, including its interpretation or performance, shall be subject to arbitration proceedings under the rules of the You expressly agree that any dispute arising out of these TOU, including its interpretation or performance, shall be referred to arbitration subject to the rules of the mutually agreed upon arbitration platform, to which you shall unconditionally adhere.</p>
                    <h1 className='font-bold text-[1.5rem] mt-[20px] mb-[10px]'>Data Portability</h1><br />
                    <p className='text-[1rem] break-words font-semibold'>Data Portability</p>
                    <p className='text-[1rem] break-words'>The Publisher undertakes to offer you the possibility of having all your data returned to you upon request. The User is thus guaranteed a better control of his data, and keeps the the possibility to reuse them. This data must be provided in an open and easily reusable format.</p>

                </div>
            </div>
        </div>
    )
}

export default PrivacyPolicy