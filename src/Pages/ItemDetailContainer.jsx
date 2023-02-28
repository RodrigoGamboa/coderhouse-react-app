import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ContextCart } from "../App";
import { serviceAlbums } from "../services/albums";

const ItemDetail = () => {
  const { itemId } = useParams();
  const [album, setAlbum] = useState({});
  const [numItems, setNumItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const { cart } = useContext(ContextCart);
  const { setCart } = useContext(ContextCart);

  useEffect(() => {
    serviceAlbums.getAlbum(itemId).then(album => {
      setAlbum(album);
      setLoading(false);
    });
  }, [itemId]);

  const handleBtn = (state) => {
    if (state === "-") {
      if (numItems >= 1) {
        setNumItems(numItems - 1);
      }
      return;
    }
    if (state === "+") {
      // FIXME: Replace this conditional value when we have a limit (inventory) of numItems for each product
      if (numItems < 10) {
        setNumItems(numItems + 1);
      }
      return;
    }
  };

  const handleBuy = () => {
    if (cart.find(cartAlbum => cartAlbum.id === album.id)) {
      const newArr = [];
      cart.forEach(cartAlbum => {
        const newAlbum = {...cartAlbum};
        if (cartAlbum.id === album.id) {
          newAlbum.quantity += numItems;
        }
        newArr.push(newAlbum);
      });
      setCart(newArr);
    } else {
      setCart([...cart, {...album, quantity: numItems}]);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div>
        <h1>{album.artist}</h1>
        <h2>{album.title}</h2>
        <img src={album.pictureUrl} alt="" />
      </div>
      <div>
        <button onClick={() => handleBtn("-")} disabled={numItems === 0}>
          -
        </button>
        <span>{numItems}</span>
        <button onClick={() => handleBtn("+")}>+</button>
      </div>
      <button onClick={() => handleBuy()} disabled={numItems === 0}>Add to Cart</button>

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
