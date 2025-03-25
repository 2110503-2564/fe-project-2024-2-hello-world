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
        <div className="bg-slate-100 rounded-lg space-x-5 space-y-2 w-fit px-10 py-5 flex flex-row justify-center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDateTimePicker // Mobile variant of DateTimePicker
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