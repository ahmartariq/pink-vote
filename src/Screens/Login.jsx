import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { auth } from '../../Firebase'
import { GlobalContext } from './GlobalContext'

const Login = () => {
    const { currentUser, setUser} = useContext(GlobalContext)
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const loggedIn = localStorage.getItem('currentUser');

    useEffect(() => {
        if (loggedIn) {
            navigate(-1)
        }
    }, [loggedIn])


    const loginHandle = () => {
        if (email === "") {
            setError("Please Enter Email")
        }
        else if (password === "") {
            setError("Please Enter Password")
        }
        else{
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const data = userCredential.user;
                setUser(data)
                localStorage.setItem('currentUser', data.stsTokenManager.accessToken);
                navigate("/")
            })
            .catch((error) => {
                const errorMessage = error.message;

                setError(errorMessage.slice(9))
            });
        }
    }
    
  return (
      <div className='mt-[120px] flex items center justify-center'>
          <div className='lg:w-[50%] md:w-[80%] w-full pt-[20px] pb-[30px] px-[10px] bg-primary border-[5px] border-secondary '>
              <div onClick={() => navigate("/")} className='inline-flex cursor-pointer flex-row items-center gap-x-[8px] text-white p-[20px] hover:text-hover'>
                  <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4965 18.1877L10.5055 19.1787C10.0859 19.5983 9.40743 19.5983 8.9923 19.1787L0.314697 10.5055C-0.104899 10.0859 -0.104899 9.40743 0.314697 8.9923L8.9923 0.314697C9.4119 -0.104899 10.0904 -0.104899 10.5055 0.314697L11.4965 1.30566C11.9205 1.72972 11.9116 2.4216 11.4786 2.83674L6.09977 7.96117H18.9287C19.5224 7.96117 20 8.43879 20 9.03247V10.4609C20 11.0546 19.5224 11.5322 18.9287 11.5322H6.09977L11.4786 16.6566C11.9161 17.0718 11.925 17.7636 11.4965 18.1877Z" fill="currentColor" /></svg>
                  <p>Go back</p>
              </div>
              <h1 className='font-bold text-[2.5rem] text-center'>Login</h1>
              <p className='text-center font-medium text-[1.5rem] break-words text-hover mb-[5px]'>
                  Log in to vote, comment, add a coin or advertise.
              </p>
              <hr />
              <div className='mt-[20px] flex flex-col gap-y-[18px] items-center'>
                  <div className='w-full md:w-[80%] lg:w-[60%] flex flex-col gap-y-1 items-center'>
                      <p className='font-medium text-[14px]'>Email</p>
                      <input
                          className='font-medium text-[14px] focus-visible:outline-none text-center w-full h-[34px] py-[6px] px-[12px] text-[#495057] bg-white border border-[#ced4da] rounded-[0.25rem]'
                          style={{ boxShadow: 'inset 0 1px 1px rgb(0 0 0 / 8%)', transition: 'border-color ease-in-out .15s, box-shadow ease-in-out .15s' }}
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                      />
                  </div>
                  <div className='w-full md:w-[80%] lg:w-[60%] flex flex-col gap-y-1 items-center'>
                      <p className='font-medium text-[14px]'>Password</p>
                      <input
                          className='font-medium text-[14px] focus-visible:outline-none text-center w-full h-[34px] py-[6px] px-[12px] text-[#495057] bg-white border border-[#ced4da] rounded-[0.25rem]'
                          style={{ boxShadow: 'inset 0 1px 1px rgb(0 0 0 / 8%)', transition: 'border-color ease-in-out .15s, box-shadow ease-in-out .15s' }}
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                      />
                  </div>
                  <p onClick={() => navigate('/forget-password')} className='text-white hover:text-hover cursor-pointer'>Forgot Password?</p>
                  <p className='text-red-500 mt-[8px]'>{error}</p>
                  
                  <button onClick={loginHandle} className='border border-white py-[6px] px-[50px] bg-primary text-[15px] h-[35px] whitespace-nowrap align-middle rounded-[4px] hover:text-primary hover:bg-white'>
                      Login
                  </button>
                  <p className=''>
                      Do not have an Account?
                      <span onClick={() => navigate("/register")} className='text-white cursor-pointer ml-[5px] hover:border-b hover:border-b-white pb-[4px]'>
                          Register
                      </span>
                  </p>
              </div>
          </div>
      </div>
  )
}

export default Login