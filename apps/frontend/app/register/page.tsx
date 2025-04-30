"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    if (res.ok) {
      router.push("/login");
    } else {
      const error = await res.json();
      alert(error.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen text-black flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl  font-bold text-center">Register</h2>

        <input
          name="name"
          onChange={handleChange}
          value={form.name}
          placeholder="Full Name"
          className="input input-bordered w-full"
          required
        />
        <input
          name="email"
          onChange={handleChange}
          value={form.email}
          placeholder="Email"
          className="input input-bordered w-full"
          required
        />

        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={form.password}
          placeholder="Password"
          className="input input-bordered w-full"
          required
        />

        <button type="submit" className="btn btn-primary w-full">
          Register
        </button>
      </form>
    </div>
  );
}
