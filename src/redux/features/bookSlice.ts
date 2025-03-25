import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookingItem } from "../../../interface";

type BookState = {
    bookItems: BookingItem[]
}

const initialState:BookState = { bookItems: [] };

export const bookSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        addBooking: (state, action:PayloadAction<BookingItem>) => {
            const bookItems = state.bookItems;
            const newBookItem = action.payload;
            let found = false;
            bookItems.forEach((bookItem) => {
                if(bookItem.bookDate == newBookItem.bookDate && bookItem.rest == newBookItem.rest){
                    found = true;
                }
            })
            if(!found){
                state.bookItems.push(newBookItem);
            }
        },
        removeBooking: (state, action:PayloadAction<BookingItem>) => {
            const remainItem = state.bookItems.filter(obj => {
                return ( 
                         (obj.rest !== action.payload.rest) ||
                         (obj.bookDate !== action.payload.bookDate) ) 
                         
                })
            state.bookItems = remainItem
        }
    }
})

export const { addBooking, removeBooking } = bookSlice.actions
export default bookSlice.reducer