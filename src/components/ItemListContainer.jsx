import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Item from "./Item";
import { serviceAlbums } from "../services/albums";

const ItemListContainer = () => {
  const { categoryId } = useParams();
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    serviceAlbums.getAlbums(categoryId).then(albums => {
      setAlbums(albums);
    });
  }, [categoryId]);

  return (
    <div>
      {categoryId && <h1>{categoryId.toUpperCase()}</h1>}
      <div className="flex flex-wrap justify-center">
        {
          albums && albums.map(album => (
            <Item key={album.id} {...album} />
          ))
        }
      </div>
    </div>
  );
};

export default ItemListContainer;
