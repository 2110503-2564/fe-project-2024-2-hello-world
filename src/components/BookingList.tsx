'use client'
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { removeBooking } from "@/redux/features/bookSlice";
import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchBookings } from "@/redux/features/bookSlice";

const BookingList = () => {
    const bookItems = useAppSelector((state) => state.bookSlice.bookItems);
    const dispatch = useDispatch<AppDispatch>();
    const [session, setSession] = useState<any>(null);
    const loading = useAppSelector((state) => state.bookSlice.loading);
    const error = useAppSelector((state) => state.bookSlice.error);

    useEffect(() => {
        const fetchSessionAndBookings = async () => {
            try {
                // Fetch session data
                const res = await fetch("/api/auth/session");
                if (!res.ok) {
                    throw new Error("Failed to fetch session");
                }
                const sessionData = await res.json();
                setSession(sessionData);

                // If session is available and user has a token, fetch bookings
                if (sessionData?.user?.token) {
                    dispatch(fetchBookings(sessionData.user.token)); // Dispatch action to fetch bookings
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchSessionAndBookings();
    }, [dispatch]); // Re-run this effect when dispatch or session changes

    // Log bookItems to check its format
    useEffect(() => {
        console.log("bookItems:", bookItems); // Log bookItems for debugging
    }, [bookItems]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-50 rounded-lg shadow-md p-8">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Loading your bookings...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-50 rounded-lg shadow-md p-8">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Error: {error}</h1>
            </div>
        );
    }

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

    // Check if bookItems is an array before calling .map
    if (!Array.isArray(bookItems)) {
        return <div>Error: Bookings are not in the correct format</div>;
    }
    return (
        <div className="text-gray-900 px-6 py-4">
            {bookItems.length === 0 ? (
                <div className="flex justify-center items-center h-full bg-gray-50 rounded-lg shadow-md p-8">
                    <h1 className="text-lg text-gray-500 font-medium">You don't have any bookings.</h1>
                </div>
            ) : (
                bookItems.map((bookItem) => (
                    <div
                        key={`${bookItem.reserveDate}-${bookItem.restaurant ? bookItem.restaurant._id : 'No restaurant'}`}
                        className="bg-white shadow-lg rounded-xl px-6 py-4 my-3 border border-gray-200"
                    >   
                        <div className="text-lg font-medium text-gray-800">
                            {bookItem.user ? (
                                <>
                                    <p>Reserved By: {bookItem.user}</p>
                                </>
                            ) : (
                                'null'
                            )}
                        </div>
                        {/* Display reserveDate in a readable format */}
                        <div className="text-lg font-medium text-gray-800">
                            Date: {new Date(bookItem.reserveDate).toLocaleString()} {/* Convert reserveDate to local time */}
                        </div>
    
                        {/* Display restaurant details or fallback message */}
                        <div className="text-lg font-medium text-gray-800">
                            {bookItem.restaurant ? (
                                <>
                                    <p>Name: {bookItem.restaurant.name}</p>
                                    <p>Address: {bookItem.restaurant.address}</p>
                                    <p>Phone: {bookItem.restaurant.phone}</p>
                                </>
                            ) : (
                                'No restaurant specified'
                            )}
                        </div>
    
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
};

export default BookingList;