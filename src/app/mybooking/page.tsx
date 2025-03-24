import getBookings from "@/libs/getBookings";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export default async function myBooking() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;
    console.log(session.user.token)

    const booking = await getBookings(session.user.token);

    // Ensure booking.data is an array before trying to map
    if (!Array.isArray(booking.data)) {
        return <div>No bookings available.</div>;
    }

    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-lg max-w-3xl mx-auto">
            {booking.data.map((bookingItem: object, index: number) => (
                <div
                    key={index}
                    className="p-4 bg-white rounded-lg mb-4 shadow-md flex flex-col"
                >
                    <div className="flex justify-between text-sm mb-2">
                        <span className="font-semibold text-gray-700">Reserve Date:</span>
                        <span>{bookingItem.reserveDate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="font-semibold text-gray-700">Restaurant:</span>
                        <span>{bookingItem.restaurant}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}