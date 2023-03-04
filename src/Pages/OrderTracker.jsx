import { useState } from "react";
import { serviceOrders } from "../services/orders";

const OrderTracker = () => {
  const [inputOrder, setInputOrder] = useState("");
  const [order, setOrder] = useState({});

  const searchOrder = (event) => {
    event.preventDefault();
    serviceOrders
      .getOrder(inputOrder)
      .then((order) => {
        setOrder(order);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col justify-center w-1/3 m-auto mt-5">
      <form action="">
        <div>
          <label
            htmlFor="order-id"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Order Id
          </label>
          <input
            type="text"
            id="order-id"
            value={inputOrder}
            onChange={(e) => setInputOrder(e.target.value)}
            placeholder="order id"
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg disabled:bg-red-200 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          onClick={searchOrder}
          disabled={!inputOrder}
          className="mt-5 text-white bg-gray-700 disabled:bg-gray-200 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search order
        </button>
      </form>
      <div className="mt-10 bg-gray-200 rounded-lg p-10">
        <h1>Order id: {inputOrder}</h1>
        <h2>The order was placed on: {order.date}</h2>
        <h2>Total: ${order.total}</h2>
        {order.items &&
          order.items.map((item) => (
            <div key={item.id}>
              <div className="flex items-center">
                <img
                  src={item.album_data.picture_url}
                  alt=""
                  className="w-28 h-28"
                />
                <div className="grid grid-cols-4 gap-4 align-items-center">
                  <p className="m-auto">
                    {item.album_data.artist} - {item.album_data.title}
                  </p>
                  <p className="m-auto">{item.quantity} items</p>
                  <p className="m-auto">${item.price}</p>
                  <p className="m-auto">${item.total}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default OrderTracker;
