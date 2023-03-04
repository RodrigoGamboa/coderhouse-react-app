import { useState, useEffect, useContext } from "react";
import { ContextCart } from "../App";
import { serviceAlbums } from "../services/albums";
import { serviceOrders } from "../services/orders";
import { ClipboardDocumentIcon } from "@heroicons/react/24/solid";

const Checkout = () => {
  const { cart } = useContext(ContextCart);
  const { setCart } = useContext(ContextCart);
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemsNotAvailable, setItemsNotAvailable] = useState([]);

  const [orderFeedbackInfo, setOrderFeedbackInfo] = useState({
    status: "unfulfilled",
    id: null,
    date: null,
  });

  const [buyer, setBuyer] = useState({
    name: "",
    phone: "",
    email: "",
    confirmEmail: "",
  });

  useEffect(() => {
    setTotalPrice(cart.reduce((a, c) => a + c.total, 0));
  }, [cart]);

  useEffect(() => {
    if (orderFeedbackInfo.status === "pending") {
      setCart([]);
      setBuyer({
        name: "",
        phone: "",
        email: "",
        confirmEmail: "",
      });
    }
  }, [orderFeedbackInfo, setCart]);

  const sendOrder = async (event) => {
    event.preventDefault();
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const todayUTC = today.toUTCString();
    const order = {
      buyer,
      items: cart,
      total: totalPrice,
      date: todayUTC,
    };
    const inventoryResult = await checkInventory(order.items);
    if (
      Object.keys(inventoryResult.available).length > 0 &&
      Object.keys(inventoryResult.notAvailable).length === 0
    ) {
      addOrder(order);
      updateInventory(order.items);
      setItemsNotAvailable([]);
    } else {
      // FIXME: Add toaster msg to inform the user for the next steps
      const newCart = [...cart];
      const resultItemsAvailable = newCart.filter(
        (cartItem) => inventoryResult.available[cartItem.id]
      );
      const resultItemsNotAvailable = newCart.filter(
        (cartItem) => inventoryResult.notAvailable[cartItem.id]
      );
      setItemsNotAvailable(resultItemsNotAvailable);
      setCart(resultItemsAvailable);
      alert(`Sorry! It looks like some items from your cart are no longer available.\nWe updated you cart with the ones that are available in case you still want to buy them.`);
    }
  };

  const checkInventory = async (orderItems) => {
    let result = await serviceAlbums.checkInventory(orderItems);
    return result;
  };

  const addOrder = (order) => {
    serviceOrders.addOrder(order).then((orderId) => {
      setOrderFeedbackInfo({
        status: "pending",
        id: orderId,
        date: order.todayUTC,
      });
    });
  };

  const updateInventory = (orderItems) => {
    orderItems.forEach((item) => {
      serviceAlbums.updateInventory(item.id, item.quantity);
    });
  };

  const copyOrderId = () => {
    navigator.clipboard.writeText(orderFeedbackInfo.id).then(
      () => {
        // FIXME: Add toaster msg that the id was copied!
        alert('Order id copied!')
      },
      () => {
        /* clipboard write failed */
      }
    );
  };

  return (
    <div className="flex justify-center mt-10 mx-5">
      <div className="w-1/3 p-10">
        {cart &&
          cart.map((albumToBuy) => (
            <div key={albumToBuy.id}>
              <div className="flex items-center">
                <img
                  src={albumToBuy.album_data.picture_url}
                  alt=""
                  className="w-28 h-28"
                />
                <div className="grid grid-cols-4 gap-4 align-items-center">
                  <p className="m-auto">
                    {albumToBuy.album_data.artist} -{" "}
                    {albumToBuy.album_data.title}
                  </p>
                  <p className="m-auto">{albumToBuy.quantity} items</p>
                  <p className="m-auto">${albumToBuy.price}</p>
                  <p className="m-auto">${albumToBuy.total}</p>
                </div>
              </div>
            </div>
          ))}
        {cart.length !== 0 && (
          <p className="text-right text-2xl">Total: ${totalPrice}</p>
        )}
        {cart.length !== 0 && itemsNotAvailable.length !== 0 && (
          <h1 className="mt-10 border-t">Items not available:</h1>
        )}
        {itemsNotAvailable &&
          itemsNotAvailable.map((albumToBuy) => (
            <div key={albumToBuy.id} className="bg-gray-200 rounded-lg p-3 mt-5">
              <div className="flex items-center">
                <img
                  src={albumToBuy.album_data.picture_url}
                  alt=""
                  className="w-28 h-28"
                />
                <div className="grid grid-cols-4 gap-4 align-items-center">
                  <p className="m-auto">
                    {albumToBuy.album_data.artist} -{" "}
                    {albumToBuy.album_data.title}
                  </p>
                  <p className="m-auto">{albumToBuy.quantity} items</p>
                  <p className="m-auto">${albumToBuy.price}</p>
                  <p className="m-auto">${albumToBuy.total}</p>
                </div>
              </div>
            </div>
          ))}
        {cart.length === 0 && (
          <p>You don't have items available in your cart yet!</p>
        )}
      </div>
      <form className="w-1/3 p-10">
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={buyer.name}
              onChange={(e) => setBuyer({ ...buyer, name: e.target.value })}
              placeholder="Wendy Carlos"
              disabled={cart.length === 0}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg disabled:bg-gray-200 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              value={buyer.phone}
              onChange={(e) => setBuyer({ ...buyer, phone: e.target.value })}
              placeholder="99999999"
              disabled={cart.length === 0}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg disabled:bg-gray-200 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={buyer.email}
              onChange={(e) => setBuyer({ ...buyer, email: e.target.value })}
              placeholder="wendycarlos@synth.com"
              disabled={cart.length === 0}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg disabled:bg-gray-200 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="confirm-email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm Email
            </label>
            <input
              type="email"
              id="confirm-email"
              value={buyer.confirmEmail}
              onChange={(e) =>
                setBuyer({ ...buyer, confirmEmail: e.target.value })
              }
              placeholder="wendycarlos@synth.com"
              disabled={!buyer.email || cart.length === 0}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg disabled:bg-gray-200 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
        <button
          type="submit"
          onClick={sendOrder}
          className="text-white bg-blue-700 disabled:bg-gray-200 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          disabled={
            !buyer.name ||
            !buyer.phone ||
            !buyer.email ||
            buyer.confirmEmail !== buyer.email ||
            cart.length === 0
          }
        >
          Buy
        </button>
      </form>
      <div
        className={`w-1/3 p-10 rounded-lg ${
          orderFeedbackInfo.status === "pending"
            ? "bg-green-300"
            : "bg-zinc-200"
        }`}
      >
      {
        orderFeedbackInfo.status === "unfulfilled" &&
        <div>
          <h1 className="text-2xl mb-3">Preview of your order info</h1>
          <p>Name: {buyer.name}</p>
          <p>Phone: {buyer.phone}</p>
          <p>Email: {buyer.email}</p>
        </div>
      }

      {
        orderFeedbackInfo.status === "pending" &&
        <div>
          <h1 className="text-2xl mb-3">Your order id is ready</h1>
          <p className="text-2xl">
            {orderFeedbackInfo.id}
            {orderFeedbackInfo.id && (
              <span>
                <button onClick={copyOrderId}>
                  <ClipboardDocumentIcon className="ml-5 h-6 w-6 mr-2 text-black-500" />
                </button>
              </span>
            )}
          </p>
        </div>
      }
      </div>
    </div>
  );
};

export default Checkout;
