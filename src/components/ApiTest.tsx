interface IRestaurantData {
  _id: string;
  name: string;
  address: string;
  zip: string;
  city: string;
}

export const ApiTest = () => {
  const restaurantId = import.meta.env.VITE_API_RESTAURANT_ID;
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  console.log(baseUrl + "/restaurant/" + restaurantId);

  const restaurantData = async () => {
    const response = await fetch(`${baseUrl}/restaurant/${restaurantId}`);
    const data: IRestaurantData = await response.json();
    return data;
  };

  const createBooking = async () => {
    const response = await fetch(`${baseUrl}/booking/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        restaurantId: restaurantId,
        date: "2021-12-24",
        time: "18:00",
        numberOfGuests: 4,
        customer: {
          name: "Test",
          lastname: "Testsson",
          email: "",
          phone: "",
        },
      }),
    });
    const data = await response.json();
    console.log(data);
  };

  const createCustomer = async () => {
    const response = await fetch(`${baseUrl}/customer/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Kalle",
        lastname: "Testar",
        email: "dsfsdf",
        phone: "0735 976622",
      }),
    });
    const data = await response.json();
    console.log(data);
  };

  const updateCustomer = async () => {
    const response = await fetch(
      `${baseUrl}/customer/update/67af20612a39aaeaf3b41481`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: "67af20612a39aaeaf3b41481",
          name: "Kalle (updated)",
          lastname: "Testar(updated)",
          email: "dsfsdf",
          phone: "0735 976622",
        }),
      }
    );
    const data = await response.json();
    console.log(data);
  };

  const updateBooking = async () => {
    const response = await fetch(
      `${baseUrl}/booking/update/67af20612a39aaeaf3b41481`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: "67b6f1217f87f3aaec6c9ad1",
          restaurantId: restaurantId,
          date: "2022-01-01",
          time: "18:00",
          numberOfGuests: 4,
          customerId: "67af0add229f96846a942dd6"
        }),
      }
    );
    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <h3>ApiTest</h3>
      <p>restaurantId: {restaurantId}</p>
      <button className='bg-pink' onClick={restaurantData}>
        Get Restaurant Data
      </button>

      <button onClick={() => createBooking()}>Create booking</button>
      <button className='bg-green-100' onClick={() => createCustomer()}>
        Create customer
      </button>
      <button className='bg-blue-100' onClick={() => updateCustomer()}>
        Update customer
      </button>
      <button className='bg-blue-400' onClick={() => updateBooking()}>
        Update booking
      </button>
    </div>
  );
};
