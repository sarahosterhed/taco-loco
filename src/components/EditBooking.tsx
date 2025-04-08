import { useState, FormEvent } from "react";
import { IBooking, IUpdateBooking } from "../models/Booking";

interface IEditBookingProps {
  bookingId: string;
  bookingToEdit: IBooking;
  closeEditBooking: () => void;
}

export const EditBooking = ({
  bookingId,
  bookingToEdit,
  closeEditBooking
}: IEditBookingProps) => {
  const restaurantId = import.meta.env.VITE_API_RESTAURANT_ID;
  const [updatedBooking, setUpdatedBooking] = useState<IUpdateBooking>({
    id: bookingId,
    restaurantId: restaurantId,
    date: bookingToEdit.date,
    time: bookingToEdit.time,
    numberOfGuests: bookingToEdit.numberOfGuests,
    customerId: bookingToEdit.customerId,
  });

  const updateBooking = async () => {
    const response = await fetch(
      `https://school-restaurant-api.azurewebsites.net/booking/update/${bookingId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: bookingId,
          restaurantId: restaurantId,
          date: updatedBooking.date,
          time: updatedBooking.time,
          numberOfGuests: updatedBooking.numberOfGuests,
          customerId: updatedBooking.customerId,
        }),
      }
    );
    const data = response;
    console.log(data);
  };

  const handleUpdate = (e: FormEvent) => {
    e.preventDefault();
    console.log("Update booking state", updatedBooking);
    updateBooking();
    closeEditBooking();
  };

  return (
    <>
      <form className='flex flex-col justify-between items-start gap-2 border border-purple p-5 rounded mb-5'>
        <h2 className="text-xl font-bold mb-3">Update Booking</h2>
        <div className="w-full flex justify-between items-center">
          <label htmlFor="date" className="font-semibold">Date:</label>
          <input
            id="date"
            defaultValue={bookingToEdit.date}
            className="border border-purple rounded p-1 pl-2 w-34 cursor-pointer"
            type='date'
            onClick={(e) => e.currentTarget.showPicker()}
            onChange={(e) => {
              setUpdatedBooking({ ...updatedBooking, date: e.target.value });
            }}
          />
        </div>


        <div className="w-full flex justify-between items-center">
          <label htmlFor="time" className="font-semibold">Time:</label>
          <select
            id="time"
            defaultValue={bookingToEdit.time}
            className="text-center border border-purple rounded p-1 w-34 cursor-pointer"
            onChange={(e) => {
              setUpdatedBooking({ ...updatedBooking, time: e.target.value });
            }}
          >
            <option value='18:00'>18:00</option>
            <option value='21:00'>21:00</option>
          </select>
        </div>

        <div className="w-full flex justify-between items-center">
          <label htmlFor="numberOfGuests" className="font-semibold">Number of Guests:</label>
          <select
            id="numberOfGuests"
            defaultValue={bookingToEdit.numberOfGuests}
            autoFocus
            className="text-center border border-purple rounded p-1 w-34 cursor-pointer"
            onChange={(e) => {
              setUpdatedBooking({
                ...updatedBooking,
                numberOfGuests: +e.target.value,
              });
            }}
          >
            {[...Array(6)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full flex gap-3 justify-center">
          <button
            className="flex-1 bg-purple text-white font-medium border border-transparent rounded py-2.5 mt-2.5 leading-5 self-end cursor-pointer transition-all duration-150 hover:border hover:bg-white hover:text-purple hover:border-purple px-3"
            onClick={closeEditBooking}
          >
            Cancel
          </button>
          <button
            className="flex-1 bg-purple text-white font-medium border border-transparent rounded py-2.5 mt-2.5 leading-5 self-end cursor-pointer transition-all duration-150 hover:border hover:bg-white hover:text-purple hover:border-purple px-3"
            onClick={(e) => {
              handleUpdate(e);
            }}
          >
            Update Booking
          </button>
        </div>
      </form >
    </>
  );
};
