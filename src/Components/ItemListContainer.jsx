import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Item from './Item';
import data from '../data.json';

const ItemListContainer = props => {
	const delayTimeFetchData = 500;
	const { id } = useParams();
	const [items, setItems] = useState([]);
	
	useEffect(() => {
		// Bringing data. this could be a call to an api
		const fetchData = new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(data);
			}, delayTimeFetchData);
		});
		fetchData.then(res => {
			if (id) {
				const albumsByCategory = res.filter(album => album.genre.toLowerCase() === id);
				setItems(albumsByCategory);
				return;
			}
			setItems(res)
		});
	}, [id]);

	return (
		<>
			{
				id &&
				<h1>{id.toUpperCase()}</h1>
			}
			<div style={{display: 'flex', flexWrap: 'wrap'}}>
				{
					items && items.map(item => (
						<Item {...item} />
					))
				}	
			</div>
		</>
	);
}

export default ItemListContainer;
