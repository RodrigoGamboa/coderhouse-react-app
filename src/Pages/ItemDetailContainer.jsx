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
  const navigate = useNavigate();

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
        setNumItems(numItems - 1);
      }
      return;
    }
    if (state === "+") {
      if (numItems < album.stock) {
        setNumItems(numItems + 1);
      }
      return;
    }
  };

  const handleBuy = () => {
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
  };

  return (
    <div className="flex justify-center">
      {album.album_data &&
        <div className="w-1/4">
          <h1>{album.album_data.artist}</h1>
          <h2>{album.album_data.title}</h2>
          <img src={album.album_data.picture_url} className="w-96" alt="" />
          <p>{album.album_data.description}</p>
        </div>
      }
      <div className="w-1/4 flex flex-col justify-center align-center">
        {album.stock && <p>{album.stock} items of this product available</p>}
        {!album.stock && <p>This product is currently out of stock!</p>}
        <div>
          <button onClick={() => handleBtn("-")} disabled={numItems === 0}>-</button>
          <span>{numItems}</span>
          <button onClick={() => handleBtn("+")}>+</button>
        </div>
        <button onClick={() => handleBuy()} disabled={numItems === 0}
          className="text-white bg-blue-700 disabled:bg-red-200 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add to Cart
        </button>
      </div>

      {loading && (
        <button type="button" className="bg-black-500 ..." disabled>
          <svg
            className="animate-spin h-5 w-5 mr-3 ..."
            viewBox="0 0 24 24"
          ></svg>
        </button>
      )}
      <style>
        {`
            .animate-spin {
                background: red;
                animation: spin 1s linear infinite;

                @keyframes spin {
                  from {
                    transform: rotate(0deg);
                  }
                  to {
                    transform: rotate(360deg);
                  }
                } 
            }
            .animation-none {
                animation: none;
            }
        `}
      </style>
    </div>
  );
};

export default ItemDetail;
