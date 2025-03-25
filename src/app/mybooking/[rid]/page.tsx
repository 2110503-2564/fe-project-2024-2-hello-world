'use client'

import DateReserve from "@/components/DateReserve";
import { useState } from "react";
import { Dayjs } from "dayjs";
import editBooking from "@/libs/editBooking";
import { Button, TextField, Typography, Box, Snackbar, Alert } from "@mui/material";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function EditBooking({
    params,
  }: {
    params: { rid: string };
  }) {
    const [bookDateTime, setBookDateTime] = useState<Dayjs | null>(null);
    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
    const { data: session } = useSession();
    const searchParams = useSearchParams()
    const restaurantId = searchParams.get('restaurantId')

    if (!restaurantId) {
        return null
      }
  
    const handleSaveChanges = async () => {
      if (!bookDateTime) {
        setErrorMessage("Please select a valid reservation date and time.");
        return;
      }
  
      const token = session?.user?.token || "user_token_here";
      const reservationId = params.rid;
      const reserveDate = bookDateTime.toISOString();


  
      try {
        const updatedBooking = await editBooking(token, reservationId, reserveDate, restaurantId); // Pass restaurantId here
        console.log("Booking updated:", updatedBooking);
        setSuccessMessage(true);
        setErrorMessage(null);
      } catch (error: any) {
        console.error("Error updating booking:", error);
        setErrorMessage("Failed to update booking");
      }
    };
  
    return (
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f4f6f9",
          padding: 2,
        }}
      >
        <Box
          sx={{
            maxWidth: "400px",
            width: "100%",
            backgroundColor: "#fff",
            padding: 3,
            borderRadius: 2,
            boxShadow: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 600, marginBottom: 2 }}>
            Edit Your Reservation
          </Typography>
          
          <div className="w-full items-center">
            <DateReserve onDateChange={(value: Dayjs | null) => setBookDateTime(value)} />
          </div>
          
  
          <Box sx={{ marginTop: 2 }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                padding: "10px",
                fontSize: "16px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#4e6bff",
                },
              }}
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>
          </Box>
  
          <Snackbar
            open={successMessage}
            autoHideDuration={3000}
            onClose={() => setSuccessMessage(false)}
          >
            <Alert severity="success" onClose={() => setSuccessMessage(false)}>
              Reservation updated successfully!
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
        </Box>
      </Box>
    );
  }