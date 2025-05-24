import React, { useContext } from "react";
import { assets } from "./../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } =
    useContext(AppContext);

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp"
      );

      if (data.success) {
        navigate("/email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      data.success && setIsLoggedin(false);
      data.success && setUserData(false);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
      <img src={assets.logo} alt="" className="w-28 sm:w-32" />
      {userData ? (
        <div className="relative group flex items-center gap-3">
          <div className="w-10 h-10 flex justify-center items-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xl font-bold shadow-lg border-2 border-white cursor-pointer transition-transform group-hover:scale-105">
            {userData.name[0].toUpperCase()}
          </div>
          {/* Stable dropdown menu on hover/focus */}
          <div className="absolute invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 top-12 right-0 z-20 text-black rounded-lg pt-2 min-w-[180px] shadow-lg bg-white border border-gray-200 transition-all duration-200 animate-fade-in">
            <ul className="list-none m-0 p-2 text-sm">
              {!userData.isAccountVerified && (
                <li
                  onClick={sendVerificationOtp}
                  tabIndex={0}
                  className="py-2 px-4 hover:bg-indigo-50 text-indigo-600 font-medium rounded cursor-pointer transition-colors flex items-center gap-2 focus:bg-indigo-100 outline-none"
                >
                  <svg
                    className="w-4 h-4 text-yellow-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 16h-1v-4h-1m1-4h.01M12 20.5A8.5 8.5 0 103.5 12a8.5 8.5 0 008.5 8.5z"
                    />
                  </svg>
                  Verify email
                </li>
              )}
              <li className="border-t border-gray-200 my-2"></li>
              <li
                onClick={logout}
                tabIndex={0}
                className="py-2 px-4 hover:bg-red-50 text-red-600 font-medium rounded cursor-pointer transition-colors flex items-center gap-2 pr-10 focus:bg-red-100 outline-none"
              >
                <svg
                  className="w-4 h-4 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
                  />
                </svg>
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 border border-indigo-500 rounded-full px-8 py-2 text-indigo-700 bg-white font-semibold shadow hover:bg-indigo-50 transition-all text-base hover:scale-105"
        >
          Login <img src={assets.arrow_icon} alt="" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
