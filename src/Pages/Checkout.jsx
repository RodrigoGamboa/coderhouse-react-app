import { useState, useEffect, useContext } from "react";
import { ContextCart } from "../App";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const Checkout = () => {
    const { cart } = useContext(ContextCart);
    const [orderFeedbackInfo, setOrderFeedbackInfo] = useState({
        id: null, 
        date: null
    });
    const [buyer, setBuyer] = useState({
        name: '',
        phone: '',
        email: '' 
    })
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        setTotalPrice(cart.reduce((a, c) => a + c.total, 0));
    }, [cart]);

    

    const sendOrder = () => {
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        const todayUTC = today.toUTCString();
        const order = {
            buyer,
            items: cart,
            total: 100,
            date: today.toUTCString()
        }
        const db = getFirestore();
        const ordersCollection = collection(db, 'orders');
        addDoc(ordersCollection, order).then(({id}) => {
            setOrderFeedbackInfo({id: id, date: todayUTC});
        });
    };

    return (
        <>
        {
            cart && cart.map(albumToBuy => (
                <div key={albumToBuy.id}>
                    <h1>{albumToBuy.title} x {albumToBuy.quantity} x {albumToBuy.price} = {albumToBuy.total}</h1>
                </div>
            ))
        }
        <p>Total: {totalPrice}</p>
        <form>
            <label>
                Name:
                <input type="text" required value={buyer.name} onChange={e => setBuyer({...buyer, name: e.target.value})} />
            </label>
            <label>
                Phone:
                <input type="tel" required value={buyer.phone} onChange={e => setBuyer({...buyer, phone: e.target.value})} />
            </label>
            <label>
                Email:
                <input type="email" required value={buyer.email} onChange={e => setBuyer({...buyer, email: e.target.value})} />
            </label>
        </form>
        <button onClick={() => sendOrder()} disabled={!buyer.name || !buyer.phone || !buyer.email}>Send Order!</button>
        <p>Your order is: {orderFeedbackInfo.id}</p>
        <p>Your order was placed on: {orderFeedbackInfo.date}</p>

        <p>Name: {buyer.name}</p>
        <p>Phone: {buyer.phone}</p>
        <p>Email: {buyer.email}</p>
        </>
    )
};

export default Checkout;