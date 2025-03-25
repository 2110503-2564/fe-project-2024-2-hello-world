import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { BookingItem } from "../../../interface";
import getBookings from "@/libs/getBookings";

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
        removeBooking: (state, action: PayloadAction<BookingItem>) => {
            const remainItem = state.bookItems.filter((obj) => {
                return obj.rest !== action.payload.rest || obj.bookDate !== action.payload.bookDate;
            });
            state.bookItems = remainItem;
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
            });
    },
});

export const { addBooking, removeBooking } = bookSlice.actions;
export default bookSlice.reducer;