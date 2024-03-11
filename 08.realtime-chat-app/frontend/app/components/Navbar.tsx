import React from 'react'
import Link from "next/link"
import { TbBrandNextjs } from "react-icons/tb";
import { useSelector } from "react-redux"
import { profilePicture } from '../core';
import Image from 'next/image';

const Navbar = () => {

    const currentUser = useSelector((state: any) => state.user)

    return (
        <div className='w-full text-[#006655] bg-[#fcfcfc] px-4 py-2 sticky top-0 z-50 border-b shadow-sm flex justify-between items-center gap-4'>
            <Link href="/" className='w-fit text-left text-xl font-extrabold flex items-center'>
                <TbBrandNextjs className='w-[2rem] h-[2rem]' />
                <p>ext Chat</p>
            </Link>
            <Link href={`/profile/${currentUser?._id}`}>
                <Image src={profilePicture} width={48} height={48} alt="image" className='w-12 h-12 rounded-full object-cover cursor-pointer' />
            </Link>
        </div>
    )
}

export default Navbar