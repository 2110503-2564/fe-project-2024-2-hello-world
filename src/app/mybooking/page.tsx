import getBookings from "@/libs/getBookings";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import Link from "next/link";

export default async function myBooking() {
    const session = await getServerSession(authOptions);
    if(!session){
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md w-full">
                    <h2 className="text-xl font-semibold text-gray-600">Please Sign in</h2>
                    <Link href="/api/auth/signin">
                        <button className="font-semibold p-3 mt-3 bg-gray-600 rounded-lg hover:shadow-lg hover:bg-gray-900 text-white">Sign-in</button>
                    </Link>
                </div>
            </div>
        );
    }
    if (!session || !session.user.token) return null;
    console.log(session.user.token)

    const booking = await getBookings(session.user.token);

    // Ensure booking.data is an array before trying to map
    if (!Array.isArray(booking.data) || !booking) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md w-full">
                    <h2 className="text-xl font-semibold text-gray-600">No bookings available</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-center items-center p-6 rounded-lg shadow-lg w-full mx-auto">
            {booking.data.map((bookingItem: object, index: number) => (
                <div
                    key={index}
                    className="p-4 bg-white rounded-lg mb-4 shadow-md flex flex-col w-[75%] item-center"
                >
                    <div className="flex justify-between text-sm mb-2">
                        <span className="font-semibold text-gray-700">Reserved By Id:</span>
                        <span>{bookingItem._id}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="font-semibold text-gray-700">Reserve Date:</span>
                        <span>{bookingItem.reserveDate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="font-semibold text-gray-700">Restaurant:</span>
                        <span>{bookingItem.restaurant}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <button className="text-white font-semibold mt-2 bg-blue-500 p-2 rounded-lg hover:bg-blue-700 hover:shadow-md">Delete Reservation</button>
                    </div>
                </div>
            ))}
        </div>
    );
}