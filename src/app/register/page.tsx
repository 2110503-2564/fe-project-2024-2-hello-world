"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import userRegister from "@/libs/userRegister";

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        password: ""
    });
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
            router.push("/api/auth/signin");
        } catch (err) {
            console.error("Register error:", err);
            setError(err instanceof Error ? err.message : "Registration failed. Please try again.");
        }
    };
    

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Register</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80">
                <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
                <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                {error && <p className="text-red-500">{error}</p>}
                <button type="submit" className="bg-blue-500 text-white py-2">Register</button>
            </form>
        </div>
    );
}
