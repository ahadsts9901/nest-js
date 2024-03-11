"use client"
import { baseUrl, profilePicture } from "@/app/core";
import axios from "axios"
import Image from "next/image";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { IoChevronBackOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { FaClipboard, FaClipboardCheck } from "react-icons/fa6";
import { IoIosChatboxes } from "react-icons/io";
import Link from "next/link";

const Profile = ({ params }: any) => {

    const currentUser = useSelector((state: any) => state.user)

    const router = useRouter()
    const dispatch = useDispatch()

    const [profile, setProfile]: any = useState(null)
    const [shareProfile, setShareProfile]: any = useState("Share Profile")

    useEffect(() => {
        getData(params?._id)
    }, [params?._id])

    const getData = (id: string) => {
        axios.get(`${baseUrl}/api/profile?id=${id}`, { withCredentials: true })
            .then((res) => {
                setProfile(res.data.data)
            }).catch((err) => {
                console.log(err);
            })
    }

    const logout = async () => {
        axios.post(`${baseUrl}/api/auth/logout`,{}, { withCredentials: true })
            .then((res) => {
                router.push("/auth/login")
            }).catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className="w-full h-[100vh] sm:w-[600px] mx-auto border-x flex flex-col gap-4 p-4 text-[#006655]">
            <IoChevronBackOutline className="w-[1.5rem] h-[1.5rem] cursor-pointer" onClick={() => router.back()} />
            <h2 className="w-full text-left font-bold text-xl pl-4">Profile</h2>
            <Image src={profilePicture} alt="picture" width={100} height={100}
                className="w-[100px] h-[100px] rounded-full object-cover"
            />
            <h3 className="font-bold w-full text-left pl-4 text-lg">
                {`${profile?.firstName ? profile?.firstName : ""} `}
                {`${profile?.lastName ? profile?.lastName : ""}`}
            </h3>
            <h3 className="ml-4 mt-4 w-[full text-left cursor-pointer flex items-center gap-2"
                onClick={() => {
                    navigator.clipboard.writeText(window.location.href)
                    setShareProfile("Url Copied")
                    setTimeout(() => {
                        setShareProfile("Share Profile")
                    }, 1000)
                }}
            >
                {shareProfile === "Url Copied" ? <FaClipboardCheck className="w-[1.2rem] h-[1.2rem]" /> : <FaClipboard className="w-[1.2rem] h-[1.2rem]" />}
                <span>{shareProfile}</span>
            </h3>
            {
                profile?._id === currentUser?._id ?
                    <>
                        <h3 className="w-full text-left pl-4 text-lg">
                            {`${profile?.email ? profile?.email : ""}`}
                        </h3>
                        <button className="ml-4 mt-4 w-[200px] font-bold text-white bg-[#006655] p-2 rounded-lg"
                            onClick={logout}
                        >Log out</button>
                    </> :
                    (currentUser && <Link href={`/chat/${profile?._id}`} className="cursor-pointer ml-4 mt-4 w-[200px] font-bold text-white bg-[#006655] p-2 rounded-lg flex items-center">
                        <IoIosChatboxes className="w-[1.2rem] h-[1.2rem] ml-[55px] mr-2" />Chat
                    </Link>)
            }
        </div>
    )
}

export default Profile