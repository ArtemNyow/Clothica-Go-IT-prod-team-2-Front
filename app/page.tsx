"use client";

import ReviewsList from "@/components/ReviewsList/ReviewsList";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-3xl font-bold">Auth Test Page</h1>

        <Link
          href="/auth/register"
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
        >
          Go to Register
        </Link>

        <Link
          href="/auth/login"
          className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white"
        >
          Go to Login
        </Link>
        <ReviewsList/>
      </div>
    </main>
  );
}
