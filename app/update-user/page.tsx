'use client'
import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function UpdateUserInfo() {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.user_metadata?.phone || "",
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

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2x1 font-bold mb-4">Update Account Information</h2>
        <div className="mb-4">
          <label className="block">Name:</label>
          <input
            type="text"
            name="name"
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
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block">Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
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
