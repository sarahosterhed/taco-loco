import { FormEvent, useState, useContext, useEffect } from "react";
import { ICustomerInput } from "../models/Customer";
import { IBookingResponse, ICreateBooking } from "../models/Booking";
import { BookingContext } from "../context/BookingContext";
import { Button } from "./Button";
import { SwirlElement } from "../assets/SwirlElement";
import { Transition, TransitionChild } from "@headlessui/react";
import { Link, useLocation } from "react-router";

export const BookingForm = () => {
  const restaurantId = import.meta.env.VITE_API_RESTAURANT_ID;
  const [isGdprAccepted, setIsGdprAccepted] = useState<boolean>(false);

  const bookingList = useContext(BookingContext);
  const [bookingPhase, setBookingPhase] = useState<number>(1);

  const [customer, setCustomer] = useState<ICustomerInput>({
    name: "",
    lastname: "",
    email: "",
    phone: "",
  });

  const [booking, setBooking] = useState<ICreateBooking>({
    restaurantId: restaurantId,
    date: "",
    time: "",
    numberOfGuests: 0,
    customer: {
      name: "",
      lastname: "",
      email: "",
      phone: "",
    },
  });

  const [nameError, setNameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");


  const validateCustomer = (): boolean => {
    let isValid = true;

    setNameError("");
    setLastnameError("");
    setEmailError("");
    setPhoneError("");

    if (!customer.name.trim()) {
      setNameError("First name is required");
      isValid = false;
    }
    if (!customer.lastname.trim()) {
      setLastnameError("Last name is required");
      isValid = false;
    }
    if (!customer.email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!customer.email.includes("@")) {
      setEmailError("Enter a valid email address");
      isValid = false;
    }
    if (!customer.phone.trim()) {
      setPhoneError("Phone number is required");
      isValid = false;
    }

    return isValid;

  };


  const createBooking = async () => {
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setBooking({ ...booking, customer: customer });
  };

  const handleConfirmBooking = () => {
    createBooking();
    setOpen(true);
  };

  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (location.pathname === "/booking") {
      setTimeout(() => {
        setOpen(true);
      }, 150);
    }
  }, [location.pathname]);

  return (
    <div className='flex flex-col items-center gap-4 pt-16'>
      <div className='flex gap-2'>
        <SwirlElement className='w-12 rotate-180 fill-blue relative top-2.5 ' />
        <h1 className='text-4xl text-pink'>BOOK YOUR TABLE</h1>
        <SwirlElement className='w-12 fill-blue relative bottom-2.5 ' />
      </div>
      <p className='line-clamp-3 text-center text-base'>
        Reserve your table at TacoLoco and enjoy authentic <br /> Mexican
        flavours in a welcoming and relaxed atmosphere. <br /> We look forward
        to having you
      </p>

      <form
        id='booking-form'
        className='flex flex-col items-center gap-2 mt-6'
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <h2 className='text-center text-9xl font-semibold'>
          {bookingPhase === 1
            ? "Party size"
            : bookingPhase === 2
              ? "Pick your dining time"
              : bookingPhase === 3
                ? "Contact information"
                : bookingPhase === 4
                  ? "Booking Details"
                  : "Booking Confirmed!"
          }
        </h2>
        {bookingPhase === 1 && (
          <Transition show={open} appear={true}>
            <div className='flex flex-col gap-2 animate-slide-in'>
              <label className='flex  items-center gap-2'>
                Number of Guests
                <select
                  className="cursor-pointer"
                  value={booking.numberOfGuests}
                  autoFocus
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
              </label>

              <input
                className='px-2 cursor-pointer'
                type='date'
                onClick={(e) => e.currentTarget.showPicker()}
                onChange={(e) => {
                  setBooking({ ...booking, date: e.target.value });
                }}
              />
              {booking.date && (
                <>
                  <TransitionChild>
                    <div className='flex justify-center mt-4 animate-slide-in'>
                      <Button
                        text='Check availability'
                        onClick={() => {
                          setBookingPhase(2);
                          setOpen(true);
                        }}
                      />
                    </div>
                  </TransitionChild>
                </>
              )}
            </div>
          </Transition>
        )}

        {bookingPhase === 2 && (
          <Transition show={open} appear={true}>
            <div className='flex flex-col gap-2 animate-slide-in'>
              {bookingList.filter(
                (b) => b.date === booking.date && b.time === "18:00"
              ).length < 15 ? (
                <div className='flex gap-2 items-center'>
                  <p>Available times at 18:00</p>

                  <Button
                    text='Choose'
                    onClick={() => {
                      setBooking({ ...booking, time: "18:00" });
                      setBookingPhase(3);
                    }}
                  />
                </div>
              ) : (
                <p>No available times at 18:00</p>
              )}
              {bookingList.filter(
                (b) => b.date === booking.date && b.time === "21:00"
              ).length < 15 ? (
                <div className='flex gap-2 items-center'>
                  <p>Available times at 21:00</p>
                  <Button
                    text='Choose'
                    onClick={() => {
                      setBooking({ ...booking, time: "21:00" });
                      setBookingPhase(3);
                      setOpen(true);
                    }}
                  />
                </div>
              ) : (
                <p>No available times at 21:00</p>
              )}
              <Button
                text='Back'
                onClick={() => {
                  setBookingPhase(1);
                }}
              />
            </div>
          </Transition>
        )}

        {bookingPhase === 3 && (
          <Transition show={open} appear={true}>
            <div className='flex flex-col gap-2 animate-slide-in'>
              <input
                autoFocus
                value={customer.name}
                className='px-2'
                type='text'
                placeholder='First name'
                onChange={(e) => {
                  setCustomer({ ...customer, name: e.target.value });
                }}
              />

              {nameError && <p className="text-red-400 text-sm">{nameError}</p>}


              <input
                value={customer.lastname}
                className='px-2'
                type='text'
                placeholder='Last name'
                onChange={(e) => {
                  setCustomer({ ...customer, lastname: e.target.value });
                }}
              />

              {lastnameError && <p className="text-red-400 text-sm">{lastnameError}</p>}


              <input
                value={customer.email}
                className='px-2'
                type='text'
                placeholder='Email'
                onChange={(e) => {
                  setCustomer({ ...customer, email: e.target.value });
                }}
              />

              {emailError && <p className="text-red-400 text-sm">{emailError}</p>}

              <input
                value={customer.phone}
                className='px-2'
                type='text'
                placeholder='Phone'
                onChange={(e) => {
                  setCustomer({ ...customer, phone: e.target.value });
                }}
              />

              {phoneError && <p className="text-red-400 text-sm">{phoneError}</p>}

              <div className='flex gap-2 mt-6 items-center justify-evenly'>
                <Button text='Back' onClick={() => setBookingPhase(2)} />
                <Button
                  text='Next'
                  onClick={() => {
                    if (!validateCustomer()) return;
                    setBooking({ ...booking, customer: customer });
                    setBookingPhase(4);
                    setOpen(true);
                  }}
                />
              </div>
            </div>
          </Transition>
        )}

        {bookingPhase === 4 && (
          <>
            <Transition show={open} appear={true}>
              <TransitionChild>
                <div className='flex flex-col gap-2 animate-slide-in'>
                  <p>
                    Guests:
                    <span className='font-bold'> {booking.numberOfGuests}</span>
                  </p>
                  <p>
                    Date:<span className='font-bold'> {booking.date}</span>
                  </p>
                  <p>
                    Name:
                    <span className='font-bold'>
                      {" "}
                      {customer.name} {customer.lastname}
                    </span>
                  </p>
                  <p>
                    Email:<span className='font-bold'> {customer.email}</span>
                  </p>
                  <p>
                    Phone:<span className='font-bold'> {customer.phone}</span>
                  </p>
                </div>
              </TransitionChild>
              <TransitionChild>
                <div className='flex flex-col gap-2 items-center justify-evenly animate-slide-in'>
                  <p className='text-rose-500 italic flex gap-2'>
                    Before we can confirm this booking we need your consent to
                    store your information due to the laws of GDPR
                    <input
                      type='checkbox'
                      onChange={(e) => setIsGdprAccepted(e.target.checked)}
                    />
                  </p>
                  <div className='basis-full flex gap-2 items-center justify-evenly'>
                    <Button text='Back' onClick={() => setBookingPhase(3)} />
                    <Button
                      disabled={!isGdprAccepted}
                      text='Confirm Booking'
                      onClick={() => {
                        handleConfirmBooking();
                        setBookingPhase(5);
                      }}
                    />
                  </div>
                </div>
              </TransitionChild>
            </Transition>
          </>
        )}
        {bookingPhase === 5 && (
          <>
            <Transition show={open} appear={true}>
              <div className='flex flex-col items-center gap-2 animate-slide-in'>
                <p className="text-center mb-6">We have reserved a table for you at <span className="font-semibold">{booking.time}</span> on <span className="font-semibold">{booking.date}</span>. <br /> We look forward to seeing you {booking.customer.name}!
                </p>
                <Link to={"/"}>
                  <Button text="Back To Start" />
                </Link>
              </div>
            </Transition>
          </>
        )}
      </form>
    </div>
  );
};

