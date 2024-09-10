"use client";
import { Banner } from "../ui/Banner";
import { Footer } from "../ui/Footer";
import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Spinner } from "@/app/ui/Spinner";

const UserInfoRow = ({ label, value }) => (
  <div className="py-2 grid grid-cols-2">
    <div>{label}</div>
    <div className="text-right overflow-x-auto">{value}</div>
  </div>
);

export default function Account() {
  const { user, error, isLoading } = useUser();
  if (!user) {
    return (
      <>
        <Banner />
        {isLoading && <Spinner />}
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-4">
              You must log in to see this page
            </h1>
            <a
              href="/api/auth/login"
              className="text-burntOrange-700 underline"
            >
              Log in
            </a>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const app_metadata = user.app_metadata || {};
  const user_metadata = user.user_metadata || {};

  return (
    <>
      <Banner />
      {user && (
        <div className="px-4 md:flex">
          <div className="my-3 p-5 bg-gray-100 rounded-md dark:bg-gray-500 md:flex-grow mx-3">
            {/* Add custom font */}
            <h1 className={`mb-4 text-xl md:text-2x1`}>Account Info</h1>
            <div className="divide-y divide-gray-300">
              <UserInfoRow
                label="Account Type"
                value={app_metadata.account_type || "N/A"}
              />
              <UserInfoRow label="Name" value={user.name} />
              <UserInfoRow label="Email" value={user.email} />
              <UserInfoRow
                label="Phone Number"
                value={user_metadata.phone || "N/A"}
              />
              <UserInfoRow label="Username" value={user.nickname} />
              <UserInfoRow label="Password" value="*********" />
            </div>
            {/* Link to form to change account info */}
            <div className="text-right">
              <button className="bg-transparent hover:bg-burntOrange-700 text-burntOrange-700 font-semibold hover:text-white py-2 px-4 border border-burntOrange-700 hover:border-transparent rounded dark:text-white dark:border-white">
                Edit account info
              </button>
            </div>
          </div>

          <div className="my-3 p-5 bg-gray-100 rounded-md dark:bg-gray-500 md:flex-grow mx-3 md:relative">
            {/* Add custom font */}
            <h1 className={`mb-4 text-xl md:text-2x1`}>Membership</h1>
            <div className="divide-y divide-gray-300">
              <UserInfoRow label="Member Since" value="Use app_metadata here" />
              <UserInfoRow label="Next Payment" value="Use app_metadata here" />
              <UserInfoRow
                label="Payment Method"
                value="Display card icon and last 4 digits of card here"
              />
            </div>

            <div className="text-right md:absolute bottom-4 right-4">
              <button className="bg-transparent hover:bg-burntOrange-700 text-burntOrange-700 font-semibold hover:text-white py-2 px-4 border border-burntOrange-700 hover:border-transparent rounded dark:text-white dark:border-white">
                Manage Membership
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
