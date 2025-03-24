import DateReserve from "@/components/DateReserve";
import { TextField ,Button } from "@mui/material";
import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { useState } from "react";

export default function Booking() {




  return (
    <main className="w-full h-screen flex flex-col items-center justify-center space-y-4">
      <TextField
        variant="standard" 
        name="Name-Lastname" 
        label="Name-Lastname" 
        className="w-[300px] m-3"
      />
      <TextField 
        variant="standard" 
        name="Contact-Number" 
        label="Contact-Number" 
        className="w-[300px]"
      />
      <DateReserve/>
      <Button 
        variant="contained" 
        name="Book Venue" 
        className="mt-4"
      >
        Book Restaurant
      </Button>
    </main>
  );
}
