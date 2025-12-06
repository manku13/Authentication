"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

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
    setUser(res.data.data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-6">
      <div className="bg-gray-800 shadow-lg rounded-2xl p-10 text-center w-full max-w-md">
        <h1 className="text-3xl font-bold text-white">Welcome 👋</h1>
        <p className="text-gray-400 mt-2">
          {user ? `Hello, ${user.username}` : "Get your details below"}
        </p>

        {user && (
          <div className="mt-6 p-4 bg-purple-700 rounded-xl text-white">
            <p className="font-semibold text-lg">{user.username}</p>
            <p className="text-sm text-gray-200">{user.email}</p>

            <Link
              href={`/profile/${user._id}`}
              className="mt-4 inline-block bg-black px-4 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              View Profile Page →
            </Link>
          </div>
        )}

        <div className="flex flex-col gap-3 mt-8">
          <button
            onClick={getUserDetails}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white transition"
          >
            Get User Details
          </button>

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
