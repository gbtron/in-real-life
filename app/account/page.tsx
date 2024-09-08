'use client'
import { Banner } from "../ui/Banner";
import { Footer } from "../ui/Footer";
import { mockUser } from "../lib/data";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Account() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { user, error, isLoading } = useUser();
  if (!user) {
    return (<>
      <Banner/>
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">You must log in to see this page</h1>
          <a href="/api/auth/login" className="text-burntOrange-700 underline">
            Log in
          </a>
        </div>
      </div>
      <Footer />
      </>
    );
  }
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const acctInfo = [
    "Account Type",
    "First Name",
    "Last Name",
    "Email",
    "Phone Number",
    "Username",
  ];
  const currentUser = [
    "Member",
    "Jane",
    "Doe",
    "jdoe@email.com",
    "305-305-3055",
    "ottoPilot",
  ];
  
  return (
    <>
      {/* Make banner conditionally display log out button if a user is logged in */}
      <Banner />
      { user &&
      <div className="px-4 md:flex">
        <div className="my-3 p-5 bg-gray-100 rounded-md md:flex-grow mx-3">
          {/* Add custom font */}
          <h1 className={`mb-4 text-xl md:text-2x1`}>Account Info</h1>
          <div className="divide-y divide-gray-300">
            {acctInfo.map((map, i) => (
              <div className="py-2 grid grid-cols-2" key={i}>
                <div>{acctInfo[i]}</div>
                <div className="text-right">{currentUser[i]}</div>
              </div>
            ))}
            <div className="py-2 grid grid-cols-2">
              <div>Password</div>
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
            <button className="bg-transparent hover:bg-burntOrange-700 text-burntOrange-700 font-semibold hover:text-white py-2 px-4 border border-burntOrange-700 hover:border-transparent rounded">
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
                9/2/2024
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
            <button className="bg-transparent hover:bg-burntOrange-700 text-burntOrange-700 font-semibold hover:text-white py-2 px-4 border border-burntOrange-700 hover:border-transparent rounded">
              Manage Membership
            </button>
          </div>
        </div>
      </div>}
      
      <Footer />
    </>
  );
}
