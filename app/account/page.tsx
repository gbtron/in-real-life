"use client";
import { Banner } from "../ui/Banner";
import { Footer } from "../ui/Footer";
import { mockUser } from "../lib/data";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";

export default function Account() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      {/* Make banner conditionally display log out button if a user is logged in */}
      <Banner />
      <div className="px-4 md:flex">
        <div className="my-3 p-5 bg-gray-100 rounded-md md:flex-grow mx-3">
          {/* Add custom font */}
          <h1 className={`mb-4 text-xl md:text-2x1`}>Account Info</h1>
          <div className="divide-y divide-gray-300">
            {/* Loop through user info and display on grid */}
            <div className="py-2 grid grid-cols-2">
              <div>Account Type</div>
              <div className="text-right">{mockUser[0].type}</div>
            </div>
            <div className="py-2 grid grid-cols-2">
              <div>Name</div>
              <div className="text-right">Jane Applert</div>
            </div>
            <div className="py-2 grid grid-cols-2">
              <div>Email</div>
              <div className="text-right">jappler@email.com</div>
            </div>
            <div className="py-2 grid grid-cols-2">
              <div>Phone Number</div>
              <div className="text-right">305-114-2349</div>
            </div>
            <div className="py-2 grid grid-cols-2">
              <div>User Name</div>
              <div className="text-right">ottoPilot</div>
            </div>
            <div className="py-2 grid grid-cols-2">
              <div>Password</div>
              {/* display hidden password Use eye icon button to show password */}
              <div className="text-right">
                {passwordVisible ? mockUser[0].password : "**********"}

                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="ml-2"
                >
                  {passwordVisible ? (
                    <EyeSlashIcon className="h-5 w-5 text-slate-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-slate-400" />
                  )}
                </button>
              </div>
            </div>
          </div>
          {/* Link to form to change account info */}
          <div className="text-right">
            <button className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
              Edit account info
            </button>
          </div>
        </div>

        <div className="my-3 p-5 bg-gray-100 rounded-md md:flex-grow mx-3 md:relative">
          {/* Add custom font */}
          <h1 className={`mb-4 text-xl md:text-2x1`}>Membership</h1>
          <div className="divide-y divide-gray-300">
            <div className="py-2 grid grid-cols-2">
              <div>Member Since</div>
              <div className="text-right">
                9/2/2024<></>
              </div>
            </div>
            <div className="py-2 grid grid-cols-2">
              <div>Next Payment</div>
              <div className="text-right">10/2/2024</div>
            </div>
            <div className="py-2 grid grid-cols-2">
              <div>Payment Method</div>
              <div className="text-right">Card Icon and last 4 digits</div>
            </div>
          </div>

          <div className="text-right md:absolute bottom-4 right-4">
            <button className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
              Manage Membership
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
