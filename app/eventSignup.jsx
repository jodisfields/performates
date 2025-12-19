import { useState } from "react";
import { db } from "@/app/firebase/config";
import { collection, addDoc } from "firebase/firestore";

const EventSignup = ({ onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "attendees"), {
        name,
        email,
      });
      setMessage("Thank you for registering!");
    } catch (err) {
      console.error(err);
      setMessage("Error registering. Please try again.");
    }
  };

  const handleClose = () => {
    setMessage("");
    setName("");
    setEmail("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={handleClose}
    >
      <div
        className="event-signup relative bg-white rounded-lg p-8 shadow-md transform transition-all duration-300 ease-in-out"
        style={{
          opacity: 1,
          scale: 1,
          translate: "0 0",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-0 right-0 mt-4 mr-4 text-gray-400 hover:text-gray-300 focus:outline-none focus:shadow-outline"
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
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
            Register for our event
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-800 font-bold mb-2">Name</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-800 font-bold mb-2">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-full">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              >
                Register
              </button>
            </div>
          </form>
          {message && (
            <div className="mt-4">
              <p className="text-sm text-gray-700">{message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventSignup;
