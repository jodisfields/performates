"use client";

import Head from "next/head";
import { useState } from "react";
import EventSignup from "./eventSignup";
import EventCard from "./components/EventCard";
import UpcomingEvents from "./components/UpcomingEvents";
import { getUpcomingEvents, recurringEvent } from "./data/events";

export default function Home() {
  const [showSignup, setShowSignup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const upcomingEvents = getUpcomingEvents(1);
  const nextEvent = upcomingEvents[0];

  const handleRegister = (event) => {
    setSelectedEvent(event);
    setShowSignup(true);
  };

  const handleClose = () => {
    setShowSignup(false);
    setSelectedEvent(null);
  };

  return (
    <div className="page bg-slate-900 text-white min-h-screen">
      <Head>
        <title>Performates - Melbourne Performance Marketing Meetup</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-slate-900 to-purple-600/20"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-blue-300 text-sm font-medium">
                Monthly Recurring Event
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
              Performates
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-2">
              Melbourne Performance Marketing Meetup
            </p>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Connect with fellow performance marketers, share insights, and
              grow your network at Melbourne&apos;s premier monthly gathering
              for digital marketing professionals.
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {recurringEvent.tags.slice(0, 6).map((tag) => (
              <span
                key={tag}
                className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-sm border border-slate-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Event Card */}
          <div className="lg:col-span-2">
            <EventCard
              event={nextEvent}
              onRegister={handleRegister}
              isNext={true}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <UpcomingEvents onSelectEvent={handleRegister} />

            {/* Community Stats */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h3 className="text-white font-bold text-lg mb-4">
                Join Our Community
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-400">500+</p>
                  <p className="text-slate-400 text-sm">Members</p>
                </div>
                <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                  <p className="text-2xl font-bold text-green-400">Monthly</p>
                  <p className="text-slate-400 text-sm">Events</p>
                </div>
              </div>
            </div>

            {/* Location Map Placeholder */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Location
              </h3>
              <div className="text-slate-300">
                <p className="font-semibold">{nextEvent.location.venue}</p>
                <p className="text-slate-400">{nextEvent.location.address}</p>
                <p className="text-slate-400">
                  {nextEvent.location.city}, {nextEvent.location.state}{" "}
                  {nextEvent.location.postcode}
                </p>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${nextEvent.location.address}, ${nextEvent.location.city}, ${nextEvent.location.state}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mt-4 text-sm"
              >
                View on Google Maps
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-slate-400 text-sm">
              &copy; {new Date().getFullYear()} Performates. All rights
              reserved.
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <span>Melbourne, Australia</span>
              <span>|</span>
              <a
                href={`mailto:${recurringEvent.organizer.email}`}
                className="hover:text-blue-400 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Signup Modal */}
      {showSignup && (
        <EventSignup event={selectedEvent} onClose={handleClose} />
      )}
    </div>
  );
}
