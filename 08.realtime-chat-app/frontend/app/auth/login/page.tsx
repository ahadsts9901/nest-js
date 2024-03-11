"use client"

import React, { useRef, useState } from 'react'
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from "next/navigation"
import { baseUrl } from '@/app/core';

const Login = () => {

    const router = useRouter()

    const [passwordField1, setPasswordField1] = useState(true)
    const [instructions, setInstructions]: any = useState(null)
    const [success, setSuccess]: any = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const emailRef: any = useRef()
    const password: any = useRef()

    const submitHandler = async (e: any) => {

        e.preventDefault()

        if (!emailRef.current.value) {
            setInstructions("Email is required")
            setTimeout(() => {
                setInstructions(null)
            }, 1500);
            return;
        }

        if (!password.current.value) {
            setInstructions("Password is required")
            setTimeout(() => {
                setInstructions(null)
            }, 1500);
            return;
        }

        const data = {
            email: emailRef.current.value,
            password: password.current.value,
        }

        try {

            setIsLoading(true)
            const resp = await axios.post(`${baseUrl}/api/auth/login`, data, { withCredentials: true })
            e.target.reset()
            setSuccess(resp.data.message)
            setTimeout(() => {
                setSuccess(null)
            }, 1500);
            setIsLoading(false)
            router.push("/")

        } catch (error: any) {
            console.log(error);
            setInstructions(error.response.data.message)
            setTimeout(() => {
                setInstructions(null)
            }, 1500);
            setIsLoading(false)
        }

    }

    return (
        <div className='w-full h-[100vh] flex justify-center items-center'>
            <form onSubmit={submitHandler} className='m-auto flex flex-col gap-4 p-4 py-8 sm:border sm:shadow-md rounded-xl text-[#006655]'>
                <h3 className='font-bold text-2xl w-full text-center'>Login</h3>
                <input type="email" ref={emailRef} placeholder='Email' className='w-full p-2 px-4 border rounded-lg ' />
                <div className='w-full p-2 px-4 border rounded-lg flex justify-between items-center'>
                    <input minLength={8} maxLength={16} ref={password} placeholder='Password' type={`${passwordField1 ? "password" : "text"}`} />
                    {
                        passwordField1 ? <IoIosEyeOff className='cursor-pointer' onClick={() => setPasswordField1(!passwordField1)} /> : <IoIosEye className='cursor-pointer' onClick={() => setPasswordField1(!passwordField1)} />
                    }
                </div>
                <Link href="/auth/signup" className='text-[0.8rem] mt-2 pr-2 w-full text-right'>Dont have an account? Signup</Link>
                <p className='w-full text-center text-sm font-bold text-red-500 capitalize'>{instructions}</p>
                <p className='w-full text-center text-sm font-bold text-green-600 capitalize'>{success}</p>
                <button className={`w-full font-bold text-white ${isLoading ? "bg-zinc-500" : "bg-[#006655]"} p-2 rounded-lg ${isLoading ? "pointer-events-none" : "pointer-events-auto"}`}>
                    {
                        isLoading && <span className="loader mr-4"></span>
                    }
                    {isLoading ? "Processing..." : "Login"}
                </button>
            </form>
        </div>
    )
}

export default Login