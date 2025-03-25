'use client'
import { AppDispatch, useAppSelector } from "@/redux/store"
import { useDispatch } from "react-redux";
import { removeBooking } from "@/redux/features/bookSlice";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/getUserProfile";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";

const BookingList = () => {
    const bookItems = useAppSelector((state) => state.bookSlice.bookItems);
    const dispatch = useDispatch<AppDispatch>();
    const [session, setSession] = useState<any>(null);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const res = await fetch("/api/auth/session");
                const data = await res.json();
                setSession(data);
            } catch (error) {
                console.error("Failed to fetch session", error);
            }
        };
        fetchSession();
    }, []);

    if (!session || !session.user?.token) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-50 rounded-lg shadow-md p-8">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Please sign in</h1>
                <Link href="/api/auth/signin">
                    <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md 
                                hover:bg-blue-700 transition duration-300">
                        Sign In
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div className="text-gray-900 px-6 py-4">
        {bookItems.length === 0 ? (
            <div className="flex justify-center items-center h-full bg-gray-50 rounded-lg shadow-md p-8">
                <h1 className="text-lg text-gray-500 font-medium">You don't have any Booking</h1>
            </div>
        ) : (
            bookItems.map((bookItem) => (
                <div
                    key={`${bookItem.bookDate}-${bookItem.rest}`}
                    className="bg-white shadow-lg rounded-xl px-6 py-4 my-3 border border-gray-200"
                >
                    <div className="text-sm text-gray-600">{bookItem.bookDate}</div>
                    <div className="text-lg font-medium text-gray-800">{bookItem.rest}</div>
                    <button
                        className="mt-3 w-full rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-4 py-2 text-white font-semibold shadow-md transition-all duration-300"
                        onClick={() => dispatch(removeBooking(bookItem))}
                    >
                        Remove from Booking
                    </button>
                </div>
            ))
        )}
    </div>
    );
}

export default BookingList;
