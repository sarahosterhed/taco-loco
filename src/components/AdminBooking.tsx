import { IBooking } from "../models/Booking";

interface IAdminBookingProps {
  booking: IBooking;
  onDelete: (bookingId: string) => void;
  openEditBooking: (id: string) => void;
}

export const AdminBooking = ({
  booking,
  onDelete,
  openEditBooking,
}: IAdminBookingProps) => {
  return (
    <div className='border p-5 rounded mb-5 flex justify-between items-center'>
      <div>
        <p>Customer: {booking.customerId}</p>
        <p>ID: {booking._id}</p>
        <p>Date: {booking.date}</p>
        <p>Time: {booking.time}</p>

        <p>Number of guests: {booking.numberOfGuests}</p>
      </div>
      <div className='flex flex-col gap-3'>
        <button
          className="bg-purple text-white font-medium border border-transparent rounded cursor-pointer transition-all duration-150 hover:border hover:bg-white hover:text-purple hover:border-purple px-3 py-2.5 leading-5"
          onClick={() => {
            openEditBooking(booking._id);
          }}
        >
          Edit
        </button>
        <button
          className="bg-purple text-white font-medium border border-transparent rounded cursor-pointer transition-all duration-150 hover:border hover:bg-white hover:text-purple hover:border-purple px-3 py-2.5 leading-5"
          onClick={() => onDelete(booking._id)}>Delete Booking</button>
      </div>
    </div>
  );
};
