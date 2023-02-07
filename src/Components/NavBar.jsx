import { useState } from 'react';
import CartWidget from './CartWidget';
import { Link } from 'react-router-dom';

const NavBar = () => {
	const [itemQ, setItemQ] = useState(0);

	const addToCartHandler = () => {
		setItemQ(itemQ + 1);
	}

	return (
		<nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
			<Link to="/">Vinyl Store</Link>
			<ul className="flex">
				<li className="mr-6">
					<Link className="text-black-500 hover:text-blue-800" to="/category/rock">Rock</Link>
				</li>
				<li className="mr-6">
					<Link className="text-black-500 hover:text-blue-800" to="/category/electronic">Electronic</Link>
				</li>
				<li className="mr-6">
					<Link className="text-black-500 hover:text-blue-800" to="/category/folk">Folk</Link>
				</li>
				{/*
				<li className="mr-6">
					<Link className="text-blue-500 hover:text-blue-800" to="/about">About</Link>
				</li>
				*/}
				<li className="mr-6">
					<button onClick={addToCartHandler}>Add to Cart TEST!</button>
				</li>
				<li className="mr-6">
					<CartWidget itemQ={itemQ} />
				</li>
			</ul>
		</nav>
	);
}

export default NavBar;
