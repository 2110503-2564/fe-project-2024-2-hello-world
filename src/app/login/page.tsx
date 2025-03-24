"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const result = await signIn("credentials", {
            email: form.email,
            password: form.password,
            redirect: false,
        });

        if (result?.error) {
            setError("Invalid email or password");
        } else {
            router.push("/dashboard");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80">
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                {error && <p className="text-red-500">{error}</p>}
                <button type="submit" className="bg-blue-500 text-white py-2">Login</button>
            </form>
        </div>
    );
}
