import React, { useState } from 'react'
import avatarGif from '../../asset/login-animation.gif'
import { BiShow, BiHide } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'


interface login {
    email: string,
    password: string
}

export default function Login() {

    const [showPassword, setShowPassword] = useState<Boolean>(false)

    const [data, setData] = useState<login>({
        email: "",
        password: ""
    })

    const validateEmailRegex = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleLogin = () => {
        if (data.email && data.password) {
            if (validateEmailRegex(data.email)) {
                axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}login`, { data })
                    .then((res) => {
                        const { token } = res.data
                        if (token) {
                            toast('Login success.')
                            sessionStorage.setItem('user', JSON.stringify(res.data))
                            setTimeout(() => {
                                window.location.href = '/'
                            }, 1000)
                        }
                        else {
                            toast('Email or password is invalid')
                        }
                    })
            }
            else {
                toast('Invalid email format')
            }
        }
        else {
            toast("Please enter required fields");
        }
    }



    return (
        <div className='p-4'>
            <div className='w-full max-w-sm bg-white m-auto flex items-center flex-col p-4 rounded-lg'>
                <div className='w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative'>
                    <img className='w-full' src={avatarGif} alt='' />
                </div>

                <div className="w-full py-3 flex flex-col">

                    <label htmlFor="email">Email</label>
                    <input
                        type={"email"}
                        id="email"
                        name="email"
                        className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
                        value={data.email}
                        onChange={handleOnchange}
                    />

                    <label htmlFor="password">Password</label>
                    <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            className=" w-full bg-slate-200 border-none outline-none "
                            value={data.password}
                            onChange={handleOnchange}
                        />
                        <span
                            className="flex text-xl cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <BiShow /> : <BiHide />}
                        </span>
                    </div>


                    <button onClick={handleLogin} className="w-full max-w-[150px] m-auto  bg-red-500 hover:bg-red-600 cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full mt-4">
                        Login
                    </button>

                    <p className="text-left text-sm mt-3">
                        Don't have account ?{" "}
                        <Link to={"/signup"} className="text-red-500 underline">
                            Sign up
                        </Link>
                    </p>


                </div>
            </div>
        </div>
    )
}
