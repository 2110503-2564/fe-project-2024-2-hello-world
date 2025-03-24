"use client";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function DateReserve() {
    return (
        <div className="bg-white rounded-lg shadow-lg w-full max-w-xs p-6 flex flex-col items-center space-y-4">

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker className="w-full" />
            </LocalizationProvider>

        </div>
    );
}