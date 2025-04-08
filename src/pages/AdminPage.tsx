import { useState, useContext, useEffect, FormEvent } from "react";
import { AdminBooking } from "../components/AdminBooking";
import { BookingContext } from "../context/BookingContext";
import { IBooking, ICreateBooking } from "../models/Booking";
import { createBooking } from "../services/bookingService";
import { EditBooking } from "../components/EditBooking";
import { BeatLoader } from "react-spinners";

export const AdminPage = () => {
  const bookingsFromContext = useContext(BookingContext);
  const [bookings, setBookings] = useState<IBooking[]>(bookingsFromContext);
  const [loading, setLoading] = useState<boolean>(true);

  const [bookingId, setBookingId] = useState<string>("");
  const [bookingToEdit, setBookingToEdit] = useState<IBooking>({
    _id: "",
    restaurantId: "",
    date: "",
    time: "",
    numberOfGuests: 0,
    customerId: "",
  });

  useEffect(() => {
    setBookings(bookingsFromContext);
    setLoading(false);
  }, [bookingsFromContext]);

  const restaurantId = import.meta.env.VITE_API_RESTAURANT_ID;

  const [booking, setBooking] = useState<ICreateBooking>({
    restaurantId: restaurantId,
    date: "",
    time: "18:00",
    numberOfGuests: 0,
    customer: {
      name: "",
      lastname: "",
      email: "",
      phone: "",
    },
  });

  const handleDelete = async (bookingId: string) => {
    try {
      const response = await fetch(
        `https://school-restaurant-api.azurewebsites.net/booking/delete/${bookingId}`,

        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete booking");
      }
      setBookings(bookings.filter((booking) => booking._id !== bookingId));
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Error");
      }
    }
  };

  const handleAddBooking = async (e: FormEvent) => {
    e.preventDefault();
    await createBooking(booking);
    setIsAddBookingOpen(false)
    console.log(booking);
  };

  const [isEditOpen, setIsEditOpen] = useState(false);

  const openEditBooking = (id: string) => {
    setBookingId(id);
    const foundBooking = bookings.find((booking) => booking._id === id)
    if (foundBooking) {
      setBookingToEdit(foundBooking);
    }

    setIsEditOpen(true);
  };

  const closeEditBooking = () => {
    setIsEditOpen(false)
  }

  const [isAddBookingOpen, setIsAddBookingOpen] = useState(false);

  const toggleAddBooking = (e: FormEvent) => {
    e.preventDefault();
    setIsAddBookingOpen(true)
  }

  return (
    <div className="max-w-xl mx-auto flex flex-col py-12">

      {isEditOpen && (
        <EditBooking bookingToEdit={bookingToEdit} bookingId={bookingId} closeEditBooking={closeEditBooking} />
      )}
      {isAddBookingOpen && (
        <form
          id='booking-form'
          className='flex flex-col justify-between items-start gap-2 border border-purple p-5 rounded mb-5'
          onSubmit={(e) => {
            handleAddBooking(e);
          }}
        >
          <h2 className="text-xl font-bold mb-3">Add Booking</h2>
          <div className="w-full flex justify-between items-center">
            <label htmlFor="date" className="font-semibold">Date:</label>
            <input
              id="date"
              className="border border-purple rounded p-1 pl-2 w-34 cursor-pointer"
              type='date'
              defaultValue={bookingToEdit.date}
              onClick={(e) => e.currentTarget.showPicker()}
              onChange={(e) => {
                setBooking({ ...booking, date: e.target.value });
              }}
            />
          </div>
          <div className="w-full flex justify-between items-center">
            <label htmlFor="time" className="font-semibold">Time:</label>
            <select
              id="time"
              className="text-center border border-purple rounded p-1 w-34 cursor-pointer"
              onChange={(e) => {
                setBooking({ ...booking, time: e.target.value });
              }}
            >
              <option defaultValue='18:00'>18:00</option>
              <option value='21:00'>21:00</option>
            </select>
          </div>

          <div className="w-full flex justify-between items-center">
            <label htmlFor="numberOfGuests" className="font-semibold">Number of Guests:</label>
            <select
              id="numberOfGuests"
              value={booking.numberOfGuests}
              autoFocus
              className="text-center border border-purple rounded p-1 w-34 cursor-pointer"
              onChange={(e) => {
                setBooking({ ...booking, numberOfGuests: +e.target.value });
              }}
            >
              {[...Array(6)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full flex justify-between items-center">
            <label htmlFor="name" className="font-semibold">First name:</label>
            <input
              id="name"
              autoFocus
              value={booking.customer.name}
              className="border border-purple rounded p-1 w-34 cursor-text"
              type='text'
              placeholder='First name'
              onChange={(e) => {
                setBooking({
                  ...booking,
                  customer: { ...booking.customer, name: e.target.value },
                });
              }}
            />
          </div>

          <div className="w-full flex justify-between items-center">
            <label htmlFor="lastname" className="font-semibold">Last name:</label>
            <input
              name="lastname"
              value={booking.customer.lastname}
              className="border border-purple rounded p-1 w-34 cursor-text"
              type='text'
              placeholder='Last name'
              onChange={(e) => {
                setBooking({
                  ...booking,
                  customer: { ...booking.customer, lastname: e.target.value },
                });
              }}
            />
          </div>


          <div className="w-full flex justify-between items-center">
            <label htmlFor="email" className="font-semibold">Email:</label>
            <input
              id="email"
              value={booking.customer.email}
              className="border border-purple rounded p-1 w-34 cursor-text"
              type='text'
              placeholder='Email'
              onChange={(e) => {
                setBooking({
                  ...booking,
                  customer: { ...booking.customer, email: e.target.value },
                });
              }}
            />
          </div>

          <div className="w-full flex justify-between items-center">
            <label htmlFor="phone" className="font-semibold">Phone:</label>
            <input
              id="phone"
              value={booking.customer.phone}
              className="border border-purple rounded p-1 w-34 cursor-text"
              type='text'
              placeholder='Phone'
              onChange={(e) => {
                setBooking({
                  ...booking,
                  customer: { ...booking.customer, phone: e.target.value },
                });
              }}
            />
          </div>

          <div className="w-full flex gap-3">
            <button
              className='flex-1 bg-purple text-white font-medium border border-transparent rounded cursor-pointer transition-all duration-150 hover:border hover:bg-white hover:text-purple hover:border-purple px-3 py-2.5 mt-2.5 leading-5'
              onClick={() => { setIsAddBookingOpen(false) }}>
              Cancel
            </button>
            <button
              type="submit"
              className='flex-1 bg-purple text-white font-medium border border-transparent rounded cursor-pointer transition-all duration-150 hover:border hover:bg-white hover:text-purple hover:border-purple px-3 py-2.5 mt-2.5 leading-5'>
              Add Booking
            </button>
          </div>
        </form>
      )}
      {(!isAddBookingOpen) && (
        <div className='pb-6 px-4 sm:px-0'>
          <h2 className='text-xl font-bold mb-4'>Booking Management</h2>
          <button
            className='bg-purple text-white font-medium border border-transparent rounded cursor-pointer transition-all duration-150 hover:border hover:bg-white hover:text-purple hover:border-purple px-3 py-2.5 leading-5'
            onClick={toggleAddBooking}
          >
            Add Booking
          </button>
        </div>
      )}

      {loading && (
        <div className="h-40 flex justify-center items-center">
          <BeatLoader color="#FFBB43" />
        </div>
      )}
      {[...bookings].reverse().map((booking) => (
        <AdminBooking key={booking._id} booking={booking} onDelete={handleDelete} openEditBooking={openEditBooking} />
      ))}
    </div>
  );
};
