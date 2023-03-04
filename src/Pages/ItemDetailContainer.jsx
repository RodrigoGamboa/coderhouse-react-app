import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ContextCart } from "../App";
import { serviceAlbums } from "../services/albums";

const ItemDetail = () => {
  const { itemId } = useParams();
  const [album, setAlbum] = useState({});
  const [numItems, setNumItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const { cart } = useContext(ContextCart);
  const { setCart } = useContext(ContextCart);
  const [currentNumItemsCart, setCurrentNumItemsCart] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    cart.forEach(cartItem => {
      if (cartItem.id === itemId) {
        setCurrentNumItemsCart(cartItem.quantity);
      }
    })
  }, [cart, itemId])

  useEffect(() => {
    serviceAlbums.getAlbum(itemId).then(album => {
      if (Object.keys(album).length === 0) {
        navigate("/404")
      }
      setAlbum(album);
      setLoading(false);
    });
  }, [itemId, navigate]);

  const handleBtn = (state) => {
    if (state === "-") {
      if (numItems >= 1) {
        setNumItems(() => numItems - 1);
      }
      return;
    }
    if (state === "+") {
      if (numItems < album.stock && currentNumItemsCart + numItems < album.stock) {
        setNumItems(() => numItems + 1);
      }
      return;
    }
  };

  const handleBuy = () => {
    if (currentNumItemsCart >= album.stock) {
      return;
    }
    if (cart.find(cartAlbum => cartAlbum.id === album.id)) {
      const newArr = [];
      cart.forEach(cartAlbum => {
        const {stock, ...newAlbum} = {...cartAlbum};
        if (cartAlbum.id === album.id) {
          newAlbum.quantity += numItems;
          newAlbum.total = newAlbum.quantity * newAlbum.price;
        }
        newArr.push(newAlbum);
      });
      setCart(newArr);
    } else {
      setCart([...cart, {...album, quantity: numItems, total: numItems * album.price}]);
    }
    setNumItems(0);
  };

  return (
    <div className="flex justify-center mt-10 gap-10">
      {loading &&
        <div className="w-1/4">
          <div className="w-full aspect-square bg-gray-100"></div>
          <h2 className="text-2xl mt-3">Title</h2>
          <h1>Artist</h1>
          <p className="text-sm mt-5">Description</p>
        </div>
      }
      {!loading && album.album_data &&
        <div className="w-1/4">
          <img src={album.album_data.picture_url} className="w-100" alt="" />
          <h2 className="text-2xl mt-3">{album.album_data.title}</h2>
          <h1>{album.album_data.artist}</h1>
          <p>${album.price}.00</p>
          <p className="text-sm mt-5">{album.album_data.description}</p>
        </div>
      }
      <div className="w-1/4 flex flex-col">
        {album.stock !== 0 && <p>{album.stock} items of this product available</p>}
        {!album.stock && <p>This product is currently out of stock!</p>}
        {currentNumItemsCart > 0 && <p>You currently have {currentNumItemsCart} items of this product in your cart</p>}
        <div>
          <button onClick={() => handleBtn("-")} disabled={numItems === 0}>-</button>
          <span>{numItems}</span>
          <button onClick={() => handleBtn("+")}>+</button>
        </div>
        <button onClick={() => handleBuy()} disabled={numItems === 0 || currentNumItemsCart >= album.stock}
          className="text-white bg-blue-700 disabled:bg-gray-200 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ItemDetail;
