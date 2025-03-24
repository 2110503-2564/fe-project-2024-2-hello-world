'use client'
import { AppDispatch, useAppSelector } from "@/redux/store"
import { useDispatch } from "react-redux";
import { removeBooking } from "@/redux/features/bookSlice";

const BookingList = () => {
    const bookItems = useAppSelector((state) => state.bookSlice.bookItems);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className="text-gray-900 px-6 py-4">
            {bookItems.length === 0 ? (
                <div className="text-center text-lg text-gray-500">No Venue Booking</div>
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
