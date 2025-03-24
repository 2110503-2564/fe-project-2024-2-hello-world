"use client";
import DateReserve from "@/components/DateReserve";
import { TextField, Button } from "@mui/material";
import { useState } from "react";

export default function Booking() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center space-y-6 bg-gray-50">
      <h1 className="text-3xl font-semibold text-gray-900">Book a Table here</h1>

      <div className="w-[90%] max-w-[400px]">
        {/* Name and Lastname Input */}
        <TextField
          variant="outlined"
          name="Name-Lastname"
          label="Name - Lastname"
          className="w-full mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />

        {/* Contact Number Input */}
        <TextField
          variant="outlined"
          name="Contact-Number"
          label="Contact Number"
          className="w-full mb-4"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          fullWidth
        />
        
        {/* Date Reserve with Full Width */}
        <div className="w-full item-center">
          <DateReserve />
        </div>

        {/* Book Button */}
        <Button 
          variant="contained" 
          className="w-full py-2 mt-4 text-white bg-sky-600 hover:bg-sky-700 transition-all"
          onClick={() => console.log("Booking Confirmed")}
        >
          Book Restaurant
        </Button>
      </div>
    </main>
  );
}