import DateReserve from "@/components/DateReserve";
import { TextField ,Button } from "@mui/material";

export default function Booking() {
  return (
    <main className="w-full flex flex-col items-center space-y-4 pt-20">
      <TextField 
        variant="standard" 
        name="Name-Lastname" 
        label="Name-Lastname" 
        className="w-[300px]"
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
        Book Venue
      </Button>
    </main>
  );
}
