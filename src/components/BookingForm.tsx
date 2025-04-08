import { FormEvent, useState, useContext, useEffect } from "react";
import { ICustomerInput } from "../models/Customer";
import { IBookingResponse, ICreateBooking } from "../models/Booking";
import { BookingContext } from "../context/BookingContext";
import { Button } from "./Button";
import { SwirlElement } from "../assets/SwirlElement";
import { Transition, TransitionChild } from "@headlessui/react";
import { Link, useLocation } from "react-router";
import classNames from "classnames";

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
        <h2 className='pb-2 text-center text-9xl font-medium'>
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
              <label htmlFor="number-of-guests" className='flex items-center gap-2 mb-8'>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5, 6].map((number) => (
                    <label key={number}>
                      <input
                        type="radio"
                        name="number-of-guests"
                        value={number}
                        checked={booking.numberOfGuests === number}
                        onChange={() => setBooking({ ...booking, numberOfGuests: number })}
                        className="hidden"
                      />
                      <div className={classNames(
                        'w-11 h-11 flex justify-center items-center rounded border-2 font-bold text-pink border-pink cursor-pointer select-none scale-100 box-border transition duration-200 ease-in-out',
                        {
                          'bg-pink text-yellow': booking.numberOfGuests === number,
                          'transition duration-200 ease-in-out hover:scale-105 hover:bg-pink hover:text-yellow': booking.numberOfGuests !== number,
                        }
                      )}>
                        {number}
                      </div>
                    </label>
                  ))}

                </div>
              </label>

              <label htmlFor="date-picker" className="flex flex-col justify-center mb-4">
                <h2 className="pb-2 text-center text-9xl font-medium">When would you like to visit?</h2>
                <input
                  className='px-3 py-2 cursor-pointer rounded border-2  border-pink'
                  name="date-picker"
                  type='date'
                  onClick={(e) => e.currentTarget.showPicker()}
                  onChange={(e) => {
                    setBooking({ ...booking, date: e.target.value });
                  }}
                />
              </label>
              {booking.date && (
                <>
                  <TransitionChild>
                    <div className='flex justify-center mt-2 animate-slide-in'>
                      <Button
                        text='Check availability'
                        onClick={() => {
                          setBookingPhase(2);
                          setOpen(true);
                        }}
                        addTailwindClasses="w-46"
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
            <div className='w-60 flex flex-col gap-4 animate-slide-in'>
              {bookingList.filter(
                (b) => b.date === booking.date && b.time === "18:00"
              ).length < 15 ? (
                <div className='flex px-2 gap-4 items-center justify-between'>
                  <Button
                    text='18:00'
                    onClick={() => {
                      setBooking({ ...booking, time: "18:00" });
                    }}
                    addTailwindClasses={classNames(
                      'w-18 rounded border-2 font-bold border-pink cursor-pointer select-none scale-100 box-border transition duration-200 ease-in-out',
                      {
                        'bg-pink text-yellow': booking.time === "18:00",
                        'bg-white hover:scale-105 hover:bg-pink hover:text-yellow': booking.time !== "18:00",
                      }
                    )}
                    textColor="text-pink"
                  />
                  <p>Available tables</p>

                </div>
              ) : (
                <p>No available tables</p>
              )}
              {bookingList.filter(
                (b) => b.date === booking.date && b.time === "21:00"
              ).length < 15 ? (
                <div className='flex px-2 gap-4 items-center justify-between'>
                  <Button
                    text='21:00'
                    onClick={() => {
                      setBooking({ ...booking, time: "21:00" });
                    }}
                    addTailwindClasses={classNames(
                      'w-18 rounded border-2 font-bold border-pink cursor-pointer select-none scale-100 box-border transition duration-200 ease-in-out',
                      {
                        'bg-pink text-yellow': booking.time === "21:00",
                        'bg-white hover:scale-105 hover:bg-pink hover:text-yellow': booking.time !== "21:00",
                      }
                    )}
                    textColor="text-pink"
                  />
                  <p>Available tables</p>
                </div>
              ) : (
                <p>No available tables</p>
              )}
              <div className="flex gap-2 justify-center mt-4">
                <Button
                  text='Back'
                  onClick={() => {
                    setBookingPhase(1);
                  }}
                  addTailwindClasses="flex-auto"
                />
                <Button
                  text='Next'
                  onClick={() => {
                    setBookingPhase(3);
                    setOpen(true);
                  }}
                  addTailwindClasses="flex-auto"
                />
              </div>
            </div>
          </Transition>
        )}

        {bookingPhase === 3 && (
          <Transition show={open} appear={true}>
            <div className='grid grid-cols-2 gap-2 animate-slide-in'>
              <div>
                <input
                  autoFocus
                  value={customer.name}
                  className='px-2 w-full rounded border-2 border-pink focus:border-orange focus:outline-none focus:ring-0'
                  type='text'
                  placeholder='First name'
                  onChange={(e) => {
                    setCustomer({ ...customer, name: e.target.value });
                  }}
                />

                {nameError && <p className="pl-0.75 text-purple text-sm">{nameError}</p>}
              </div>

              <div>
                <input
                  value={customer.lastname}
                  className='px-2 w-full rounded border-2 border-pink focus:border-orange focus:outline-none focus:ring-0'
                  type='text'
                  placeholder='Last name'
                  onChange={(e) => {
                    setCustomer({ ...customer, lastname: e.target.value });
                  }}
                />

                {lastnameError && <p className="pl-0.75 text-purple text-sm">{lastnameError}</p>}
              </div>

              <div>
                <input
                  value={customer.email}
                  className='px-2 w-full rounded border-2 border-pink focus:border-orange focus:outline-none focus:ring-0'
                  type='text'
                  placeholder='Email'
                  onChange={(e) => {
                    setCustomer({ ...customer, email: e.target.value });
                  }}
                />

                {emailError && <p className="pl-0.75 text-purple text-sm">{emailError}</p>}
              </div>

              <div>
                <input
                  value={customer.phone}
                  className='px-2 w-full rounded border-2 border-pink focus:border-orange focus:outline-none focus:ring-0'
                  type='text'
                  placeholder='Phone'
                  onChange={(e) => {
                    setCustomer({ ...customer, phone: e.target.value });
                  }}
                />

                {phoneError && <p className="pl-0.75 text-purple text-sm">{phoneError}</p>}
              </div>

              <Button
                text='Back'
                onClick={() => setBookingPhase(2)}
                addTailwindClasses="w-full mt-4"
              />
              <Button
                text='Next'
                onClick={() => {
                  if (!validateCustomer()) return;
                  setBooking({ ...booking, customer: customer });
                  setBookingPhase(4);
                  setOpen(true);
                }}
                addTailwindClasses="w-full mt-4"
              />
            </div>
          </Transition>
        )}

        {bookingPhase === 4 && (
          <>
            <Transition show={open} appear={true}>
              <TransitionChild>
                <div className='w-80 flex flex-col gap-2 animate-slide-in'>
                  <p className="flex justify-between font-semibold">
                    Date:<span className="font-light"> {booking.date}</span>
                  </p>
                  <p className="flex justify-between font-semibold">
                    Guests:
                    <span className="font-light"> {booking.numberOfGuests}</span>
                  </p>
                  <p className="flex justify-between font-semibold">
                    Name:
                    <span className="font-light">
                      {" "}
                      {customer.name} {customer.lastname}
                    </span>
                  </p>
                  <p className="flex justify-between font-semibold">
                    Email:<span className="font-light"> {customer.email}</span>
                  </p>
                  <p className="flex justify-between font-semibold">
                    Phone:<span className="font-light"> {customer.phone}</span>
                  </p>
                </div>
              </TransitionChild>
              <TransitionChild>
                <div className='flex flex-col gap-2 items-center justify-evenly animate-slide-in'>
                  <div className="w-80 flex gap-2 items-start">
                    <input
                      type='checkbox'
                      onChange={(e) => setIsGdprAccepted(e.target.checked)}
                      className="mt-0.5 accent-pink"
                    />
                    <p className="text-pink text-sm/tight italic">
                      Before we can confirm this booking we need your consent to
                      store your information due to the laws of GDPR
                    </p>
                  </div>
                  <div className='w-full flex gap-2 items-center mt-4'>
                    <Button
                      text='Back'
                      onClick={() => setBookingPhase(3)}
                      addTailwindClasses="flex-auto"
                    />
                    <Button
                      disabled={!isGdprAccepted}
                      text='Confirm Booking'
                      onClick={() => {
                        handleConfirmBooking();
                        setBookingPhase(5);
                      }}
                      addTailwindClasses="flex-auto"
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
                <p className="text-center mb-6">We have reserved a table for you at <span className="font-semibold text-pink">{booking.time}</span> on <span className="font-semibold text-pink">{booking.date}</span>. <br /> We look forward to seeing you {booking.customer.name}!
                </p>
                <Link to={"/"}>
                  <Button text="Back To Start" addTailwindClasses="w-48" />
                </Link>
              </div>
            </Transition>
          </>
        )}
      </form>
    </div >
  );
};

