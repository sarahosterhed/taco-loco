export class Customer {
  constructor(
    public name: string,
    public lastname: string,
    public email: string,
    public phone: string,
    public id: string
  ) {
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.phone = phone;
    this.id = id;
  }
}

export interface ICustomerInput {
  name: string;
  lastname: string;
  email: string;
  phone: string;
}

export type CustomerId = string;

export interface ICustomerResponse {
  id: CustomerId;
  name: string;
  lastname: string;
  email: string;
  phone: string;
}

