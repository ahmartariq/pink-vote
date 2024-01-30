import React from 'react'
import { useNavigate } from 'react-router-dom'

const Contact = () => {
    const navigate = useNavigate()
  return (
    <div className='mt-[120px] items-center flex justify-center w-full flex-col'>
    <div className='md:w-[60%] w-full my-[20px] rounded-[12px] pt-[20px] pb-[30px] px-[5px] bg-primary border-[5px] border-secondary '>
        <div onClick={() => navigate("/")} className='inline-flex cursor-pointer flex-row items-center gap-x-[8px] text-white p-[20px] hover:text-white'>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4965 18.1877L10.5055 19.1787C10.0859 19.5983 9.40743 19.5983 8.9923 19.1787L0.314697 10.5055C-0.104899 10.0859 -0.104899 9.40743 0.314697 8.9923L8.9923 0.314697C9.4119 -0.104899 10.0904 -0.104899 10.5055 0.314697L11.4965 1.30566C11.9205 1.72972 11.9116 2.4216 11.4786 2.83674L6.09977 7.96117H18.9287C19.5224 7.96117 20 8.43879 20 9.03247V10.4609C20 11.0546 19.5224 11.5322 18.9287 11.5322H6.09977L11.4786 16.6566C11.9161 17.0718 11.925 17.7636 11.4965 18.1877Z" fill="currentColor" /></svg>
            <p>Go back</p>
        </div>

        <div className='flex justify-center items-center flex-col md:w-[80%] w-full text-center mx-auto px-[5px]'>
            <h1 className='font-bold text-[2.5rem] mt-[20px] mb-[10px]'>Contact</h1>
            <p className='break-words text-[1.5rem] font-semibold]'>Advertising/Support</p>
            <p className='text-[1rem] break-words'>Want to promote your project? We offer Promoted coin slots & banner ads. Prices and <span className='text-hover font-medium cursor-pointer' onClick={()=> navigate('/advertise')}>here</span>, any questions :</p>
            <p className='text-[1rem] break-words text-blue-600 font-medium cursor-pointer'><a href="mailto:Support@pink-vote.com" type='email'>support@pink-vote.com</a></p>
            <p className='break-words text-[1.5rem] font-semibold] my-[10px]'>Questions/Suggestions</p>
            <p className='text-[1rem] break-words'>For technical/important questions or suggestions, feel free to contact us there:</p>
            <p className='text-[1rem] break-words text-blue-600 font-medium cursor-pointer'><a href="mailto:contact@pink-vote.com">contact@pink-vote.com</a></p>
        </div>
    </div>
</div>
  )
}

export default Contact