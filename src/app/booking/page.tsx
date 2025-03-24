import DateReserve from "@/components/DateReserve";
import { TextField ,Button } from "@mui/material";

export default function Booking() {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center space-y-4">
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
        Book Restaurant
      </Button>
    </main>
  );
}
