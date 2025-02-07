"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login Successful");
      router.push("/profile");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Something went wrong");
      toast.error(error.message);
      
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    }
    else {
      setButtonDisabled(true);
    }
  },[user]);
  return (
    <div className="flex flex-col text-white items-center justify-center min-h-screen py-2">
      <div className="w-full max-w-xs">
        <h1 className="text-center text-2xl font-bold mb-4">{loading ? "Processing": "Login"}</h1>
        <hr className="mb-4" />
        
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
          onClick={onLogin}
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 flex mx-auto"
        >
          {buttonDisabled ? "No Login" : "Login"}
        </button>
      </div>
        <Link href="/signup">Visit Signup Page</Link>
    </div>
  );
}
