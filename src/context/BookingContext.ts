import { createContext } from "react";
import { IBooking } from "../models/Booking";

export interface IBookingsContext {
    bookings: IBooking[];
}

export const BookingContext = createContext<IBooking[]>([{
    _id: "",
    restaurantId: "",
    date: "",
    time: "",
    numberOfGuests: 0,
    customerId: "",
}]); 