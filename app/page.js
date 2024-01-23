"use client";
import Head from "next/head";
import { useState } from "react";
import EventSignup from "./eventSignup";

export default function Home() {
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    document.title = "Performates";
  }, []);

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center py-2">
      <Head>
        <title>Performates</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!showSignup && (
        <main className="flex flex-col items-center justify-center w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-4">Welcome to Performates!</h1>
            <p className="text-lg">Join us for our next event.</p>
          </div>
          <div className="w-full max-w-md">
            <button
              onClick={() => setShowSignup(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Register
            </button>
          </div>
        </main>
      )}

      {showSignup && <EventSignup onClose={() => setShowSignup(false)} />}
    </div>
  );
}
