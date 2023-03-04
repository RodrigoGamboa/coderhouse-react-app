import CartWidget from "./CartWidget";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ContextCart } from "../App";
import Dropdown from "./Dropdown";
import { TruckIcon } from '@heroicons/react/24/solid';
import logo from '../assets/hiddenrecords.png'


const NavBar = () => {
  const { cart } = useContext(ContextCart);
  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6">
      <Link to="/" className="text-white">
        <img src={logo} className="h-20" alt="" />
      </Link>
      <div className="flex items-center gap-2.5">
        <Dropdown />
        <Link to="/tracker">
          <button className='flex bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'>
            <TruckIcon className='h-6 w-6 mr-2 text-blue-500' />
            <span>Tracker</span>
          </button>
        </Link>
        <Link to="/cart">
          <CartWidget itemQ={cart} />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
