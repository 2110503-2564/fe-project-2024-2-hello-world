"use client"
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { TextField } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";

interface DateReserveProps {
  onDateChange: (value: Dayjs | null) => void;
  initialDate?: Dayjs | null;
}

const DateReserve = ({ onDateChange, initialDate = null }: DateReserveProps) => {
  const [reserveDate, setReserveDate] = useState<Dayjs | null>(initialDate);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDateTimePicker
        value={reserveDate}
        onChange={(value) => {
          setReserveDate(value);
          onDateChange(value);
        }}
        minDateTime={dayjs().add(1, 'hour')}
        maxDateTime={dayjs().add(3, 'month')}
        disablePast
        slotProps={{
          textField: {
            fullWidth: true,
            sx: {
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'rgba(0, 0, 0, 0.23)' },
                '&:hover fieldset': { borderColor: '#4e6bff' },
                '&.Mui-focused fieldset': {
                  borderColor: '#4e6bff',
                  borderWidth: '1px'
                }
              }
            }
          }
        }}
      />
    </LocalizationProvider>
  );
};

export default DateReserve;