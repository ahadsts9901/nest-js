import React from 'react'
import { profilePicture } from '../core'
import Link from 'next/link'
import { IoChevronBackOutline } from "react-icons/io5";
import Image from 'next/image';

const ChatNav = (props: any) => {

    return (
        <div className='w-full bg-[#fcfcfc] text-[#006655] p-2 sticky top-0 z-50 border-b shadow-sm flex items-center gap-2'>
            <Link href="/"><IoChevronBackOutline className='w-[1.5rem] h-[1.5rem]' /></Link>
            <div className='flex items-center gap-4'>
                <Link href={`/profile/${props?._id}`}>
                    <Image src={profilePicture} alt="image" width={48} height={48} className='w-12 h-12 rounded-full object-fit' />
                </Link>
                <Link href={`/profile/${props?._id}`}>
                    <p className='font-bold'>
                        {
                            props?.isMe ? "You" : <>{props.firstName ? `${props?.firstName} ` : ""} {props.lastName ? props?.lastName : ""}</>
                        }
                    </p>
                </Link>
            </div>
        </div>
    )
}

export default ChatNav