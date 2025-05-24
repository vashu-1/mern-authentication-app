import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../Context/AppContext";

const Header = () => {
  const { userData } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center justify-center mt-20 px-4 text-center text-gray-800">
      <img
        src={assets.header_img}
        className="w-36 h-36 mb-6 rounded-full shadow-lg border-4 border-indigo-200 bg-white object-cover"
        alt="Profile"
      />
      <h1 className="flex items-center gap-2 text-2xl sm:text-4xl font-bold mb-2 text-indigo-700">
        Hey {userData ? userData.name : "Developer"}!
        <img
          className="w-8 aspect-square animate-bounce"
          src={assets.hand_wave}
          alt="wave"
        />
      </h1>
      <h2 className="text-3xl sm:text-5xl font-semibold mb-4 text-indigo-900">
        Welcome to our app
      </h2>
      <p className="mb-8 max-w-md text-gray-600 text-base sm:text-lg">
        Let's start with a quick product tour and we will have you up and
        running in no time!
      </p>
      <button className="border border-indigo-500 rounded-full px-10 py-3 bg-indigo-500 text-white font-semibold shadow-md hover:bg-indigo-600 hover:scale-105 transition-all text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400">
        Get Started
      </button>
    </div>
  );
};

export default Header;
