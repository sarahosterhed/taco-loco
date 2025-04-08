
import { IBooking, IBookingResponse, ICreateBooking } from "../models/Booking";

export const getBookings = async () => {
    const response = await fetch(`https://school-restaurant-api.azurewebsites.net/booking/restaurant/67ac719a21ba0a444fe1f576`);
    const data: IBooking[] = await response.json();
    return data
}


export const createBooking = async (booking: ICreateBooking) => {
    const response = await fetch(
        "https://school-restaurant-api.azurewebsites.net/booking/create",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(booking),
        }
    );
    const data: IBookingResponse = await response.json();
    const bookingId = data.insertedId;
    return bookingId;
};

