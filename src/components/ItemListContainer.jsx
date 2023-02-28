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
    <>
      {categoryId && <h1>{categoryId.toUpperCase()}</h1>}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {
          albums && albums.map(album => (
            <Item key={album.id} {...album} />
          ))
        }
      </div>
    </>
  );
};

export default ItemListContainer;
