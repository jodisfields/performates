"use client";

import { getUpcomingEvents, formatEventDate } from "@/app/data/events";

const UpcomingEvents = ({ onSelectEvent }) => {
  const upcomingEvents = getUpcomingEvents(4);
  const nextEvent = upcomingEvents[0];
  const futureEvents = upcomingEvents.slice(1);

  return (
    <div className="upcoming-events bg-slate-800/50 rounded-xl p-6 border border-slate-700">
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
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        Upcoming Dates
      </h3>

      <div className="space-y-3">
        {upcomingEvents.map((event, index) => (
          <button
            key={event.instanceId}
            onClick={() => onSelectEvent(event)}
            className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center justify-between group ${
              index === 0
                ? "bg-blue-500/20 border border-blue-500/50 hover:bg-blue-500/30"
                : "bg-slate-700/50 hover:bg-slate-700 border border-transparent"
            }`}
          >
            <div>
              <p
                className={`font-semibold ${index === 0 ? "text-blue-400" : "text-white"}`}
              >
                {formatEventDate(event.date)}
              </p>
              <p className="text-slate-400 text-sm">
                {event.schedule.time} · {event.location.venue}
              </p>
            </div>
            {index === 0 && (
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                Next
              </span>
            )}
            <svg
              className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-700">
        <p className="text-slate-500 text-sm flex items-center gap-2">
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
          Events repeat on the first Thursday of each month
        </p>
      </div>
    </div>
  );
};

export default UpcomingEvents;
