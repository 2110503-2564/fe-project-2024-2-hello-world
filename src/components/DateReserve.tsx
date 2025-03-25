"use client"
import { DateTimePicker } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { MobileDateTimePicker } from "@mui/x-date-pickers"; // Correct import for mobile variant

const DateReserve = ({ onDateChange }: { onDateChange: Function }) => {
    const [reserveDate, setReserveDate] = useState<Dayjs | null>(null);

    return (
        <div className="w-full bg-slate-100 rounded-lg space-x-5 space-y-2 px-10 py-5 flex flex-row justify-center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDateTimePicker // Mobile variant of DateTimePicker
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                    value={reserveDate}
                    onChange={(value) => { 
                        setReserveDate(value); 
                        onDateChange(value); 
                    }}
                />
            </LocalizationProvider>
        </div>
    );
}

export default DateReserve;