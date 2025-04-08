import { NavLink, Outlet } from "react-router";
import { Logo } from "../assets/Logo";
import { HamburgerMenu } from "../components/HamburgerMenu";
import { RenderFooterInfo } from "../components/RenderFooterInfo";
import { BookingContext } from "../context/BookingContext";
import { useEffect, useState } from "react";
import { IBooking } from "../models/Booking";
import { getBookings } from "../services/bookingService";
import { TiUser } from "react-icons/ti";

export const Layout = () => {
  const [bookings, setBookings] = useState<IBooking[]>([]);


  useEffect(() => {
    if (bookings) {
      const fetchBookings = async () => {
        const data = await getBookings();
        setBookings(data);
      };
      if (bookings.length > 0) return;
      fetchBookings();
    }
  });

  return (
    <BookingContext.Provider value={bookings}>
      <div className='flex flex-col min-h-screen font-rajdhani'>
        <header className='bg-purple h-25 flex'>
          <nav className=' h-full flex items-center justify-between w-full pl-5 pr-5'>
            <NavLink to={"/"}>
              <Logo className='w-33' />
            </NavLink>
            <div className="flex gap-5">
              <NavLink to={"/admin"}>
                <TiUser className="-my-1 w-11.5 h-11.5 text-blue cursor-pointer transition-colors duration-150 ease-in-out hover:text-white" />
              </NavLink>
              <HamburgerMenu></HamburgerMenu>
            </div>
          </nav>
        </header>
        <main className='flex-grow'>
          <Outlet />

        </main>
        <footer className='h-30 bg-purple'>
          <RenderFooterInfo></RenderFooterInfo>
        </footer>
      </div>
    </BookingContext.Provider>
  );
};
