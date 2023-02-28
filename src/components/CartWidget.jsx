import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';

const CartWidget = ({ itemQ }) => {
	const [totalQuantityCart, setTotalQuantityCart] = useState(0);

	useEffect(() => {
		setTotalQuantityCart(itemQ.reduce((a, c) => a + c.quantity, 0));
	}, [itemQ])

	return (
		<button className='flex bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'>
			<ShoppingCartIcon className='h-6 w-6 mr-2 text-blue-500' />
			<span>{totalQuantityCart}</span>
		</button>
	);
}

export default CartWidget;
