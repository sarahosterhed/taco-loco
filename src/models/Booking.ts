import { ICustomerInput } from "./Customer";

export class Booking {
  constructor(
    public id: string,
    public restaurantId: string,
    public date: string,
    public time: string,
    public numberOfGuests: number,
    public customerId: string
  ) {
    this.id = id;
    this.restaurantId = restaurantId;
    this.date = date;
    this.time = time;
    this.numberOfGuests = numberOfGuests;
    this.customerId = customerId;
  }
}

export interface ICreateBooking {
  restaurantId: string;
  date: string;
  time: string;
  numberOfGuests: number;
  customer: ICustomerInput;
}

export interface IBookingResponse {
  aknowledged: boolean;
  insertedId: string;
}

export interface IBooking {
  _id: string;
  restaurantId: string;
  date: string;
  time: string;
  numberOfGuests: number;
  customerId: string;
}
export interface IUpdateBooking {
  id: string;
  restaurantId: string;
  date: string;
  time: string;
  numberOfGuests: number;
  customerId: string;
}
