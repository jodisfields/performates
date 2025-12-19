// Event data for Melbourne Performance Marketing Meetups
export const recurringEvent = {
  id: "melbourne-performates-meetup",
  title: "Melbourne Performance Marketing Meetup",
  subtitle: "Performates Social",
  description:
    "Join fellow performance marketing professionals in Melbourne for networking, knowledge sharing, and industry insights. Whether you're into paid media, SEO, analytics, or growth marketing - this is your tribe.",
  location: {
    venue: "The Commons",
    address: "Level 2, 388 Bourke Street",
    city: "Melbourne",
    state: "VIC",
    postcode: "3000",
    country: "Australia",
  },
  schedule: {
    frequency: "monthly",
    dayOfWeek: "Thursday",
    weekOfMonth: "first", // first Thursday of every month
    time: "6:00 PM",
    duration: "3 hours",
  },
  details: {
    capacity: 50,
    price: "Free",
    includes: [
      "Networking with local performance marketers",
      "Industry talks and discussions",
      "Complimentary drinks and nibbles",
      "Q&A sessions with experts",
    ],
  },
  tags: [
    "Performance Marketing",
    "Digital Marketing",
    "Networking",
    "Melbourne",
    "PPC",
    "SEO",
    "Analytics",
    "Growth",
  ],
  organizer: {
    name: "Performates",
    email: "hello@performates.com",
  },
};

// Helper to get the next occurrence of the recurring event
export function getNextEventDate() {
  const now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth();

  // Find first Thursday of current month
  let firstThursday = getFirstThursdayOfMonth(year, month);

  // If we've passed this month's first Thursday, get next month's
  if (now > firstThursday) {
    month++;
    if (month > 11) {
      month = 0;
      year++;
    }
    firstThursday = getFirstThursdayOfMonth(year, month);
  }

  return firstThursday;
}

function getFirstThursdayOfMonth(year, month) {
  const firstDay = new Date(year, month, 1);
  const dayOfWeek = firstDay.getDay();
  // Thursday is day 4
  const daysUntilThursday = (4 - dayOfWeek + 7) % 7;
  const firstThursday = new Date(year, month, 1 + daysUntilThursday);
  // Set time to 6:00 PM AEST
  firstThursday.setHours(18, 0, 0, 0);
  return firstThursday;
}

// Get upcoming events (next 3 occurrences)
export function getUpcomingEvents(count = 3) {
  const events = [];
  let currentDate = getNextEventDate();

  for (let i = 0; i < count; i++) {
    events.push({
      ...recurringEvent,
      date: new Date(currentDate),
      instanceId: `${recurringEvent.id}-${currentDate.toISOString().split("T")[0]}`,
    });

    // Move to next month's first Thursday
    let nextMonth = currentDate.getMonth() + 1;
    let nextYear = currentDate.getFullYear();
    if (nextMonth > 11) {
      nextMonth = 0;
      nextYear++;
    }
    currentDate = getFirstThursdayOfMonth(nextYear, nextMonth);
  }

  return events;
}

// Format date for display
export function formatEventDate(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-AU", options);
}

export function formatEventTime(date) {
  return date.toLocaleTimeString("en-AU", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
