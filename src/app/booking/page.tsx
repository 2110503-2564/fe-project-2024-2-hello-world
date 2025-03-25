'use client'
import DateReserve from "@/components/DateReserve";
import { Button, Snackbar, Alert } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { BookingItem } from "../../../interface";
import { AppDispatch } from "@/redux/store";
import { addBooking } from "@/redux/features/bookSlice";
import { useSearchParams } from "next/navigation";
import { CalendarMonth, Restaurant } from "@mui/icons-material";

export default function Booking() {
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();
  const restaurantName = searchParams.get("restaurant");
  
  const [rest, setRest] = useState<string | null>(restaurantName);
  const [bookDate, setBookDate] = useState<Dayjs | null>(null);
  const [successMessage, setSuccessMessage] = useState(false);

  const makeReservation = () => {
    if (rest && bookDate) {
      const item: BookingItem = {
        rest: rest,
        bookDate: dayjs(bookDate).format("YYYY/MM/DD"),
      };
      console.log("Booking Item:", item);
      dispatch(addBooking(item));
      setSuccessMessage(true);
    }
  };

  return (
    <main className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-[350px] text-center">
        <h1 className="text-xl font-semibold text-gray-800 flex items-center justify-center space-x-2">
          <Restaurant className="text-indigo-600" /> 
          <span>{rest}</span>
        </h1>
        
        <div className="mt-4 flex flex-col space-y-2 text-left">
          <span className="text-gray-600 flex items-center space-x-2">
            <CalendarMonth className="text-indigo-600" />
            <span>Select Date</span>
          </span>
          <DateReserve onDateChange={(value: Dayjs) => setBookDate(value)} />
        </div>

        <Button 
          variant="contained" 
          sx={{ 
            backgroundColor: "black", 
            "&:hover": { backgroundColor: "gray.800" } 
          }}
          fullWidth
          onClick={makeReservation}
        >
          Book Reservation
        </Button>

        <Snackbar
          open={successMessage}
          autoHideDuration={3000}
          onClose={() => setSuccessMessage(false)}
        >
          <Alert severity="success" onClose={() => setSuccessMessage(false)}>
            Success!
          </Alert>
        </Snackbar>
      </div>
    </main>
  );
}
