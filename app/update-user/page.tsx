"use client";
import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

interface CustomUser {
  sub: string;
  name: string;
  email: string;
  nickname: string;
}

export default function UpdateUserInfo() {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    sub: (user as CustomUser).sub, 
    name: (user as CustomUser)?.name || "",
    email: (user as CustomUser)?.email || "",
    nickname: (user as CustomUser)?.nickname || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    try {
      const update = await fetch("/api/update-user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!update.ok) {
        const errorDetails = await update.text();
        console.error("Error details:", errorDetails);
        throw new Error(
          "Sorry, we were unable to update your account information"
        );
      }

      const updatedUser = await update.json();
      console.log("Updated user:", updatedUser);
      alert("Account information updated successfully!");
      //Redirect back to account page once successful
    } catch (error: any) {
      console.error(error.message);
      alert(
        "Sorry, an error occurred while updating your account information."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="relative p-9 bg-gray-100 rounded-md dark:bg-gray-500"
      >
        <div className="absolute top-4 right-7">
          <button
            type="button"
            className="text-gray-400"
            onClick={() => (window.location.href = "/account")}
          >
            X
          </button>
        </div>
        <h2 className="text-2x1 font-bold mb-4">Update Account Information</h2>
        <div className="mb-4">
          <label className="block">Name:</label>
          <input
            type="text"
            name="name"
            placeholder={user?.name || ""}
            defaultValue={formData.name}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block">Email:</label>
          <input
            type="text"
            name="email"
            placeholder={user?.email || ""}
            defaultValue={formData.email}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block">Username:</label>
          <input
            type="text"
            name="nickname"
            placeholder={user?.nickname || ""}
            defaultValue={formData.nickname}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-transparent hover:bg-burntOrange-700 text-burntOrange-700 font-semibold hover:text-white py-2 px-4 border border-burntOrange-700 hover:border-transparent rounded dark:text-white dark:border-white"
        >
          Save
        </button>
      </form>
    </div>
  );
}
