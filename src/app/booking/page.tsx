'use client'
import DateReserve from "@/components/DateReserve";
import { useEffect, useState } from "react";
import { Button, Snackbar, Alert } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { BookingItem } from "../../../interface";
import { AppDispatch } from "@/redux/store";
import { addBookingAsync } from "@/redux/features/bookSlice";
import { useSearchParams } from "next/navigation"; 
import { CalendarMonth, Restaurant } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import getUserProfile from "@/libs/getUserProfile";
import getBookings from "@/libs/getBookings";

export default function Booking() {
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();
  const restaurantId = searchParams.get("id");
  const restaurantName = searchParams.get("restaurant");

  const [rest, setRest] = useState<string | null>(restaurantId);
  const [bookDateTime, setBookDateTime] = useState<Dayjs | null>(null);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [bookings, setBookings] = useState<any>(null);

  // Use useSession hook for client-side session management
  const { data: session, status } = useSession(); 

  useEffect(() => {
    if (session?.user?.token) {
      const fetchProfile = async () => {
        const userProfile = await getUserProfile(session.user.token);
        setProfile(userProfile);
      };
      fetchProfile();
    }
  }, [session]);

  useEffect(() => {
    if (session?.user?.token) {
      const fetchBooking = async () => {
        const userBookings = await getBookings(session.user.token);
        setBookings(userBookings); // Store fetched bookings
      };
      fetchBooking();
    }
  }, []);

  useEffect(() => {
    if (restaurantId) {
      setRest(restaurantId);
    }
  }, [restaurantId]);

  const makeReservation = async () => {
    if (!rest) {
      setErrorMessage("Restaurant ID is missing!");
      return;
    }
  
    if (!bookDateTime || !(bookDateTime instanceof dayjs)) {
      setErrorMessage("Please select a valid reservation date and time.");
      return;
    }
  
    if (!session?.user?.token) {
      setErrorMessage("You must be logged in to book.");
      return;
    }

    if (profile.data.role !== "admin" && bookings.count >= 3) {
      setErrorMessage("You can only have up to 3 active reservations.");
      return;
    }


  
    const isoDate = bookDateTime.toISOString(); // Only call toISOString if it's a valid Dayjs object
  
    try {
      console.log("📤 Sending reservation request:", {
        token: session.user.token,
        restaurantId: rest,
        reserveDate: isoDate,
      });
  
      await dispatch(
        addBookingAsync({
          token: session.user.token,
          restaurantId: rest,
          reserveDate: isoDate, // Send ISO string
        })
      )
      const updatedBookings = await getBookings(session.user.token);
      setBookings(updatedBookings);
  
      setSuccessMessage(true);
    } catch (error: any) {
      console.error("❌ Booking error:", error.message);
      setSuccessMessage(false);
      setErrorMessage(error.message || "Failed to make reservation");
    }
  }; 

  return (
    <main className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white shadow-xl rounded-lg p-8 w-[320px] text-center border border-gray-100">
        <h1 className="text-xl font-semibold text-gray-900 flex items-center justify-center space-x-2 mb-4">
          <Restaurant className="text-indigo-600" />
          <span className="text-gray-700">{restaurantName}</span>
        </h1>

        <div className="mt-4 flex flex-col space-y-4 text-left mb-5">
          <span className="text-gray-600 flex items-center space-x-2">
            <CalendarMonth className="text-indigo-600" />
            <span>Select Date and Time</span>
          </span>
          <DateReserve onDateChange={(value: Dayjs | null) => setBookDateTime(value)} />
        </div>

        <Button 
          variant="contained" 
          sx={{ 
            backgroundColor: "#333", 
            color: "#fff", 
            "&:hover": { backgroundColor: "#555" } 
          }}
          fullWidth
          onClick={makeReservation}
          className="mt-12"
        >
          Book Reservation
        </Button>

        <Snackbar
          open={successMessage}
          autoHideDuration={3000}
          onClose={() => setSuccessMessage(false)}
        >
          <Alert severity="success" onClose={() => setSuccessMessage(false)}>
            Reservation Successful!
          </Alert>
        </Snackbar>

        <Snackbar
          open={!!errorMessage}
          autoHideDuration={3000}
          onClose={() => setErrorMessage(null)}
        >
          <Alert severity="error" onClose={() => setErrorMessage(null)}>
            {errorMessage}
          </Alert>
        </Snackbar>
      </div>
    </main>
  );
}