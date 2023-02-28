import { useContext } from "react";
import { ContextCart } from "../App";

const Checkout = () => {
    const { cart } = useContext(ContextCart);

    return (
        <>
        {
            cart && cart.map(albumToBuy => (
                <div>
                    <h1>{albumToBuy.title} x {albumToBuy.quantity}</h1>
                </div>
            ))
        }
        </>
    )
};

export default Checkout;