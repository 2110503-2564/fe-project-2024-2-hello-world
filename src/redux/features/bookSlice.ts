import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { BookingItem } from "../../../interface";
import getBookings from "@/libs/getBookings";
import deleteBooking from "@/libs/deleteBooking";
import addBooking from "@/libs/addBooking";

// Define your state structure
type BookState = {
    bookItems: BookingItem[];
    loading: boolean;
    error: string | null;
};

// Define initial state
const initialState: BookState = {
    bookItems: [],
    loading: false,
    error: null,
};

// Create async thunk for fetching bookings
export const fetchBookings = createAsyncThunk(
    "booking/fetchBookings",
    async (token: string, { rejectWithValue }) => {
        try {
            const data = await getBookings(token); // Assuming getBookings returns a JSON object
            console.log("Fetched bookings:", data.data); // Log the data for inspection

            // Check if data has a 'bookings' property that is an array
            if (!data) {
                return rejectWithValue("Data is not in the correct format");
            }

            return data.data; // Return the bookings array
        } catch (error: any) {
            return rejectWithValue(error.message || "Failed to fetch bookings");
        }
    }
);

export const removeBooking = createAsyncThunk(
    "booking/removeBooking",
    async ({ token, bookingId }: { token: string; bookingId: string }, { rejectWithValue }) => {
        try {
            const response = await deleteBooking(token, bookingId); // Delete from backend
            console.log("Delete response:", response); // Add logging to inspect the response

            return bookingId; // Return the booking ID to update Redux state
        } catch (error: any) {
            return rejectWithValue(error.message || "Failed to remove booking");
        }
    }
);

export interface AddBookingPayload {
    token: string;
    restaurantId: string;
    reserveDate: string;
  }
  
  // Update the async action to accept reserveDate
  export const addBookingAsync = createAsyncThunk(
    "booking/addBooking",
    async ({ token, restaurantId, reserveDate }: AddBookingPayload) => {
      const requestBody = {
        reserveDate: reserveDate,
      };
  
      console.log("Sending reservation request:", requestBody); // 🔥 Debugging log
  
      const response = await addBooking(token, restaurantId, reserveDate)
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Reservation request failed:", errorText); 
      }
  
      return await response.json();
    }
  );

// Create slice
export const bookSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        addBookingToState: (state, action: PayloadAction<BookingItem>) => {
            const newBookItem = action.payload;
            let found = false;
            state.bookItems.forEach((bookItem) => {
                if (bookItem.reserveDate === newBookItem.reserveDate && bookItem.restaurant?.name === newBookItem.restaurant?.name) {
                    found = true;
                }
            });
            if (!found) {
                state.bookItems.push(newBookItem);
            }
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchBookings.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchBookings.fulfilled, (state, action) => {
            state.loading = false;
            state.bookItems = action.payload; // Assuming payload contains the list of bookings
        })
        .addCase(fetchBookings.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        .addCase(removeBooking.fulfilled, (state, action) => {
            // Ensure action.payload contains the bookingId
            state.bookItems = state.bookItems.filter(
                (bookItem) => bookItem._id !== action.payload // Use _id or the correct field
            );
        })
        .addCase(removeBooking.rejected, (state, action) => {
            state.error = action.payload as string;
        })
        .addCase(addBookingAsync.fulfilled, (state, action) => {
            // The booking was successfully added via the API, update state
            state.bookItems.push(action.payload); // Assuming response contains the new booking data
        })
        .addCase(addBookingAsync.rejected, (state, action) => {
            state.error = action.payload as string;
        });
    },
});

export const { addBookingToState } = bookSlice.actions;
export default bookSlice.reducer;