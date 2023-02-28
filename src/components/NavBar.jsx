import CartWidget from "./CartWidget";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ContextCart } from "../App";

const NavBar = () => {
  const { cart } = useContext(ContextCart);
  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
      <Link to="/">Vinyl Store</Link>
      <ul className="flex">
        <li className="mr-6">
          <Link
            className="text-black-500 hover:text-blue-800"
            to="/category/rock"
          >
            Rock
          </Link>
        </li>
        <li className="mr-6">
          <Link
            className="text-black-500 hover:text-blue-800"
            to="/category/electronic"
          >
            Electronic
          </Link>
        </li>
        <li className="mr-6">
          <Link
            className="text-black-500 hover:text-blue-800"
            to="/category/folk"
          >
            Folk
          </Link>
        </li>
        <li className="mr-6">
          <Link to="/cart">
            <CartWidget itemQ={cart} />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
