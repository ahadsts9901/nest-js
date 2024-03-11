"use client"

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import axios from "axios"
import User from "./components/User";
import { useSelector } from 'react-redux';
import { baseUrl } from "./core";

export default function Home() {

  const currentUser = useSelector((state: any) => state.user)

  const [users, setUsers]: any = useState(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const resp = await axios.get(`${baseUrl}/api/auth/users`, { withCredentials: true })
      setUsers(resp.data.data)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col w-full sm:w-[600px] mx-auto h-full text-[#006655]">
        {
          users ?
            users.map((user: any, index: number) => (
              <User key={index}
                firstName={user?.firstName} lastName={user?.lastName}
                isMe={currentUser?._id === user?._id}
                _id={user?._id} />
            ))
            : <div className="w-full h-full flex justify-center items-center mt-[12rem]">
              <span className="load"></span>
            </div>
        }
      </div>
    </>
  );
}