"use client";
import Link from "next/link";

export default function UserProfile({ params }: any) {
  const { id } = params;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-6">
      <div className="bg-gray-800 shadow-xl rounded-2xl px-10 py-12 text-center">
        <h1 className="text-4xl font-bold text-white">User Profile</h1>
        <p className="text-gray-300 mt-3">This is your unique profile ID</p>

        <span className="inline-block mt-6 bg-purple-700 text-white px-6 py-3 rounded-xl font-mono break-all">
          {id}
        </span>

        <Link
          href="/profile"
          className="mt-8 inline-block bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white transition"
        >
          ← Back to Profile
        </Link>
      </div>
    </div>
  );
}
