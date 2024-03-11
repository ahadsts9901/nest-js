import React from 'react'
import Link from "next/link"
import { profilePicture } from '../core'
import Image from 'next/image'

const User = (props: any) => {
    return (
        <Link href={`/chat/${props?._id}`} className='w-full border-b bg-[#fcfcfc] flex items-center gap-4 cursor-pointer p-4'>
            <Image width={48} height={48} src={profilePicture} alt="image" className='w-12 h-12 rounded-full object-cover' />
            <p className='w-full text-[#006655] font-extrabold'>{props?.isMe ? "You" : `${props?.firstName} ${props?.lastName}`}</p>
        </Link>
    )
}

export default User