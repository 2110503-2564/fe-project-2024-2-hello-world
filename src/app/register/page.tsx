"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import userRegister from "@/libs/userRegister";

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({ name: "", phone: "", email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            await userRegister(form.name, form.phone, form.email, form.password);
            alert("Register success! You can now log in.");
            router.push("/login");
        } catch (err) {
            setError("Registration failed. Please try again.");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="bg-white p-8 shadow-md rounded-lg w-96">
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Register</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                    </div>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition"
                    >
                        Register
                    </button>
                    <p className="text-gray-600 text-center text-sm mt-3">
                        Already have an account?{" "}
                        <button 
                            onClick={() => router.push("/login")} 
                            className="text-gray-800 font-semibold hover:underline"
                        >
                            Sign In
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
}
