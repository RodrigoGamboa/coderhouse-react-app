import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import { BeakerIcon } from '@heroicons/react/24/solid';

const CartWidget = ({ itemQ=0 }) => {

	const shoppingCartHandler = () => {
		console.log('Shopping Cart pressed!');
		alert(`Current products on Shopping Cart: ${itemQ}`);
	};

	return (
		<button className='flex bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow' onClick={shoppingCartHandler}>
			<ShoppingCartIcon className='h-6 w-6 mr-2 text-blue-500' />
			<span>{itemQ}</span>
		</button>
	);
}

export default CartWidget;
