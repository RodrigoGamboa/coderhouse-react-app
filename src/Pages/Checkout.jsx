import { useState, useEffect, useContext } from "react";
import { ContextCart } from "../App";
import { serviceAlbums } from "../services/albums";
import { serviceOrders } from "../services/orders";

const Checkout = () => {
  const { cart } = useContext(ContextCart);
  const { setCart } = useContext(ContextCart);
  const [totalPrice, setTotalPrice] = useState(0);
  
  const [orderFeedbackInfo, setOrderFeedbackInfo] = useState({
    status: 'unfulfilled',
    id: null,
    date: null,
  });
  
  const [buyer, setBuyer] = useState({
    name: "",
    phone: "",
    email: "",
    confirmEmail: ""
  });
  
  useEffect(() => {
    setTotalPrice(cart.reduce((a, c) => a + c.total, 0));
  }, [cart]);

  useEffect(() => {
    if (orderFeedbackInfo.status === 'pending') {
        setCart([]);
        setBuyer({
            name: "",
            phone: "",
            email: "",
            confirmEmail: ""
        })
    }
  }, [orderFeedbackInfo, setCart]);

  const sendOrder = event => {
    event.preventDefault();
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const todayUTC = today.toUTCString();
    const order = {
      buyer,
      items: cart,
      total: totalPrice,
      date: todayUTC
    };
    checkInventory(order.items);
  }



    const checkInventory = orderItems => {
        serviceAlbums.checkInventory(orderItems).then(inventoryResult => {
            console.log(inventoryResult);
            if (inventoryResult.notAvailable.length > 0) {
                console.log('Hay artículos no disponibles :c');
            } else {
                console.log('Todos están disponibles :)');
                //addOrder(orderItems);
            }
        });
    }
    /*
    serviceAlbums.checkInventory(order.items).then(availableResult => {
        console.log(availableResult.itemsNotAvailable)
        if (availableResult.itemsNotAvailable === 0) {
            //addOrder(order);
        }
    });
    */
    /*
    const result = await order.items.filter(item => {
    serviceAlbums.checkInventory(item.id, item.quantity).then(availability => {
        if (availability) {
            //addOrder(order);
            //console.log('availability: ', order.items.find(album => album.id === item.id));
            //setAvailabilityItems(oldArray => [...oldArray, order.items.find(album => album.id === item.id)]);
            console.log(item)
            return item;
        } 
    });
   });
   console.log(result);
*/

  const addOrder = order => {
    serviceOrders.addOrder(order).then(orderId => {
        setOrderFeedbackInfo({ status: 'pending', id: orderId, date: order.todayUTC });
    });
  }

  const copyOrderId = () => {
    navigator.clipboard.writeText(orderFeedbackInfo.id).then(
        () => {
            // FIXME: Add toaster msg that the id was copied!
        },
        () => {
            /* clipboard write failed */
        }
    );
  };

  return (
    <div className="flex justify-center">
        <div className="w-1/3">
            {cart && cart.map((albumToBuy) => (
                <div key={albumToBuy.id}>
                    <div className="flex">
                        <img src={albumToBuy.album_data.picture_url} alt="" className="w-28" /> 
                        <p>{albumToBuy.album_data.artist} - {albumToBuy.album_data.title} x {albumToBuy.quantity} x {albumToBuy.price} ={" "} {albumToBuy.total}
                        </p>
                    </div>
                    
                </div>
            ))}
            <p>Total: {totalPrice}</p>
            {cart.length === 0 && <p>You don't have items in your cart yet!</p>}
        </div>
        <form className="w-1/3">
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg disabled:bg-red-200 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg disabled:bg-red-200 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={buyer.email}
                        onChange={(e) => setBuyer({ ...buyer, email: e.target.value })}
                        placeholder="john@doe@company.com"
                        disabled={cart.length === 0}
                        required
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg disabled:bg-red-200 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="confirm-email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >
                        Confirm Email
                    </label>
                    <input
                        type="email"
                        id="confirm-email"
                        value={buyer.confirmEmail}
                        onChange={(e) => setBuyer({ ...buyer, confirmEmail: e.target.value })}
                        placeholder="john@doe@company.com"
                        disabled={!buyer.email || cart.length === 0}
                        required
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg disabled:bg-red-200 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
            </div>
            <button
                type="submit" onClick={sendOrder}
                className="text-white bg-blue-700 disabled:bg-red-200 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                //disabled={!buyer.name || !buyer.phone || !buyer.email || buyer.confirmEmail !== buyer.email}
            >
                Send Order!
            </button>
        </form>
        <div className={`w-1/3 ${(orderFeedbackInfo.status === 'pending') ? 'bg-green-300' : 'bg-zinc-200'}`}>
            <p>Name: {buyer.name}</p>
            <p>Phone: {buyer.phone}</p>
            <p>Email: {buyer.email}</p>
            <p>Your order id is: {orderFeedbackInfo.id}</p>
            <button onClick={copyOrderId}>Copy to clipboard!</button>
            <p>Your order was placed on: {orderFeedbackInfo.date}</p>
        </div>
    </div>
  );
};

export default Checkout;
