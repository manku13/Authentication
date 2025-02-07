"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";



export default function ProfilePage() {
      const router = useRouter(); 
      const [data, setData] = useState("nothing")
      const logout = async () => {
         try {
           await axios.get("/api/users/logout");
           toast.success("Logout Successful");
           router.push("/login");
         } catch (error: any) {
            console.log("Logout failed", error.message);
            toast.error(error.message);
            
         }
      };

      const getUserDetails = async () => {
         const res = await axios.get("/api/users/me");
         console.log(res.data);
         setData(res.data.data._id);
      }
     return (
        <div className="flex flex-col text-white items-center justify-center min-h-screen py-2">
        <h1>Profile</h1>
        <hr/>
        <p>ProfilePage</p> 
        <h2 className="mt-3 pd-3 padding rounded bg-green-500">{data === "nothing" ? "Nothing": <Link href = {`/profile/${data}`}>{data}</Link>}</h2>
        <hr/>
        <button 
        onClick = {logout}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 flex mx-auto mt-4">Logout
        </button>

        <button 
        onClick = {getUserDetails}
        className="bg-purple-900 hover:bg-blue-700 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 flex mx-auto mt-1">Get User Details
        </button>
        </div>
     )
}
