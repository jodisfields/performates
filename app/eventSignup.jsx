"use client";
import { useState } from "react";
import { db } from "@/app/firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { formatEventDate } from "@/app/data/events";

const EventSignup = ({ event, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "attendees"), {
        name,
        email,
        company,
        role,
        eventId: event?.instanceId || "general",
        eventDate: event?.date ? Timestamp.fromDate(event.date) : null,
        eventTitle: event?.title || "Melbourne Performance Marketing Meetup",
        registeredAt: Timestamp.now(),
      });
      setIsSuccess(true);
      setMessage("You're registered! We'll send confirmation details to your email.");
    } catch (err) {
      console.error(err);
      setMessage("Error registering. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setMessage("");
    setName("");
    setEmail("");
    setCompany("");
    setRole("");
    setIsSuccess(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-sm p-4"
      onClick={handleClose}
    >
      <div
        className="event-signup relative bg-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl max-w-md w-full border border-slate-700 transform transition-all duration-300 ease-in-out"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white focus:outline-none transition-colors"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {!isSuccess ? (
          <>
            {/* Event Info Header */}
            {event && (
              <div className="mb-6 pb-6 border-b border-slate-700">
                <p className="text-blue-400 text-sm font-semibold uppercase tracking-wider mb-1">
                  Register for
                </p>
                <h2 className="text-xl font-bold text-white mb-2">
                  {event.title}
                </h2>
                <div className="flex items-center gap-4 text-slate-400 text-sm">
                  <span className="flex items-center gap-1">
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
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {formatEventDate(event.date)}
                  </span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-slate-300 font-medium mb-2">
                  Name *
                </label>
                <input
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-2">
                  Email *
                </label>
                <input
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-2">
                  Company
                </label>
                <input
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  type="text"
                  placeholder="Where do you work?"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-2">
                  Role
                </label>
                <select
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Select your role</option>
                  <option value="performance-marketer">Performance Marketer</option>
                  <option value="paid-media">Paid Media Specialist</option>
                  <option value="seo">SEO Specialist</option>
                  <option value="analytics">Analytics / Data</option>
                  <option value="growth">Growth Marketing</option>
                  <option value="agency">Agency Professional</option>
                  <option value="brand">Brand Side Marketer</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Registering...
                  </span>
                ) : (
                  "Register for Event"
                )}
              </button>

              {message && !isSuccess && (
                <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                  <p className="text-sm text-red-400">{message}</p>
                </div>
              )}
            </form>
          </>
        ) : (
          /* Success State */
          <div className="text-center py-8">
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                You&apos;re In!
              </h3>
              <p className="text-slate-400">{message}</p>
            </div>

            {event && (
              <div className="bg-slate-700/50 rounded-lg p-4 mb-6 text-left">
                <p className="text-slate-400 text-sm mb-1">Event Details</p>
                <p className="text-white font-semibold">{event.title}</p>
                <p className="text-slate-400 text-sm">
                  {formatEventDate(event.date)} at {event.schedule.time}
                </p>
                <p className="text-slate-400 text-sm">
                  {event.location.venue}, {event.location.city}
                </p>
              </div>
            )}

            <button
              onClick={handleClose}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventSignup;
