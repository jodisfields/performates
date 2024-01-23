"use client";
import Head from "next/head";
import EventSignup from "./eventSignup.jsx";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Performates</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-6xl font-bold">Welcome to Performates!</h1>
        <p className="mt-3 text-2xl">Join us for our next event.</p>
        <EventSignup />
      </main>
    </div>
  );
}
