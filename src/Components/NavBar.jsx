import { useState } from 'react';
import CartWidget from './CartWidget';

const NavBar = () => {
	const [itemQ, setItemQ] = useState(0);

	const addToCartHandler = () => {
		setItemQ(itemQ + 1);
	}

	return (
		<nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
			<button>Tufting Store</button>
			<ul className="flex">
				<li className="mr-6">
					<a className="text-blue-500 hover:text-blue-800" href="#">Products</a>	
				</li>
				<li className="mr-6">
					<a className="text-blue-500 hover:text-blue-800" href="#">About</a>
				</li>
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
