"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {toast} from "react-hot-toast"

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("api/users/signup", user);

      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);
      toast.error(error.message);
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    }
    else {
      setButtonDisabled(true);
    }
  },[user]);


  return (
    <div className="flex flex-col text-white items-center justify-center min-h-screen py-2">
      <div className="w-full max-w-xs">
        <h1 className="text-center text-2xl font-bold mb-4">{loading ? "Processing" : "Signup"}</h1>
        <hr className="mb-4" />
        <label
          htmlFor="username"
          className="block text-sm font-medium text-center text-white  "
        >
          Username
        </label>
        <input
          className="border border-gray-400 p-2 w-full mb-4 rounded-lg text-black"
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="username"
        />
        <label
          htmlFor="email"
          className="block text-sm font-medium text-center text-white  "
        >
          email
        </label>
        <input
          className="border border-gray-400 p-2 w-full mb-4 rounded-lg text-black"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />
        <label
          htmlFor="password"
          className="block text-sm font-medium text-center text-white  "
        >
          password
        </label>
        <input
          className="border border-gray-400 p-2 w-full mb-4 rounded-lg text-black"
          id="password"
          type="text"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />
        <button
          onClick={onSignup}
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 flex mx-auto"
        >
          {buttonDisabled ? "No Signup" : "Signup"}
        </button>
      </div>
        <Link href="/login">Visit Login Page</Link>
    </div>
  );
}
