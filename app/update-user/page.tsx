"use client";
import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function UpdateUserInfo() {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.user_metadata?.phone || "",
    username: user?.nickname || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/update-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(
          "Sorry, we were unable to update your account information"
        );
      }

      alert("Account information updated successfully!");
    } catch (error) {
      console.error(error);
      alert(
        "Sorry, an error occurred while updating your account information."
      );
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const res = await fetch('/api/password-reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error sending password reset email');
      }
  
      const data = await res.json();
      console.log('Password reset email sent:', data.message);
    } catch (error: any) {
      console.error('Failed to send password reset:', error.message);
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
            placeholder={user?.name || ''}
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block">Email:</label>
          <input
            type="text"
            name="email"
            placeholder={user?.email || ''}
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block">Phone Number:</label>
          <input
            type="text"
            name="phone"
            placeholder={user?.user_metadata?.phone}
            value={formData.phone}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block">Username:</label>
          <input
            type="text"
            name="username"
            placeholder={user?.nickname || ''}
            value={formData.username}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <button
            type="button"
            className="text-gray-400"
            onClick={() => resetPassword(user?.email||'')}
          >Change Password</button>
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
