"use client";

import { formatEventDate, formatEventTime } from "@/app/data/events";

const EventCard = ({ event, onRegister, isNext = false }) => {
  const { title, subtitle, description, location, schedule, details, date } =
    event;

  return (
    <div
      className={`event-card bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 md:p-8 shadow-xl border ${isNext ? "border-blue-500" : "border-slate-700"} transition-all duration-300 hover:shadow-2xl hover:border-blue-400`}
    >
      {isNext && (
        <div className="inline-block bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
          Next Event
        </div>
      )}

      <div className="mb-6">
        <p className="text-blue-400 text-sm font-semibold uppercase tracking-wider mb-2">
          {subtitle}
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          {title}
        </h2>
        <p className="text-slate-300 leading-relaxed">{description}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Date & Time */}
        <div className="flex items-start gap-3">
          <div className="bg-blue-500/20 p-2 rounded-lg">
            <svg
              className="w-6 h-6 text-blue-400"
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
          </div>
          <div>
            <p className="text-white font-semibold">{formatEventDate(date)}</p>
            <p className="text-slate-400">
              {formatEventTime(date)} · {schedule.duration}
            </p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-start gap-3">
          <div className="bg-blue-500/20 p-2 rounded-lg">
            <svg
              className="w-6 h-6 text-blue-400"
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
          </div>
          <div>
            <p className="text-white font-semibold">{location.venue}</p>
            <p className="text-slate-400">
              {location.address}, {location.city}
            </p>
          </div>
        </div>
      </div>

      {/* What's Included */}
      <div className="mb-6">
        <h3 className="text-white font-semibold mb-3">What to expect:</h3>
        <ul className="grid md:grid-cols-2 gap-2">
          {details.includes.map((item, index) => (
            <li key={index} className="flex items-center gap-2 text-slate-300">
              <svg
                className="w-5 h-5 text-green-400 flex-shrink-0"
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
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-700">
        <div className="flex items-center gap-4 text-slate-400">
          <span className="flex items-center gap-1">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {details.capacity} spots
          </span>
          <span className="text-green-400 font-semibold">{details.price}</span>
        </div>

        <button
          onClick={() => onRegister(event)}
          className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
        >
          Register Now
        </button>
      </div>

      {/* Recurring indicator */}
      <div className="mt-4 flex items-center gap-2 text-slate-500 text-sm">
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
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        Recurring: First {schedule.dayOfWeek} of every month
      </div>
    </div>
  );
};

export default EventCard;
