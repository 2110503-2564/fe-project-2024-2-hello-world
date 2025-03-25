import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { BookingItem } from "../../../interface";
import getBookings from "@/libs/getBookings";
import deleteBooking from "@/libs/deleteBooking";

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
// Create slice
export const bookSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        addBooking: (state, action: PayloadAction<BookingItem>) => {
            const bookItems = state.bookItems;
            const newBookItem = action.payload;
            let found = false;
            bookItems.forEach((bookItem) => {
                if (bookItem.bookDate === newBookItem.bookDate && bookItem.rest === newBookItem.rest) {
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
        });
    },
});
export const { addBooking} = bookSlice.actions;
export default bookSlice.reducer;