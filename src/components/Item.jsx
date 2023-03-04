import { Link } from "react-router-dom";

const Item = (props) => {
  const { id, album_data } = props;

  return (
    <>
      <Link to={`/item/` + id}>
        <div
          className="relative overflow-hidden shadow-lg cursor-pointer"
          title={`${album_data.artist} - ${album_data.title}`}
        >
          <img
            className="object-cover w-72 h-72 hover:scale-150"
            src={album_data.picture_url}
            alt=""
          />
          <div className="absolute w-full h-full opacity-0 hover:opacity-100 top-0 left-0 flex flex-col justify-center align-center text-center">
            <div className="absolute w-full h-full opacity-20 bg-gray-200"></div>
            <h4 className="mb-3 text-xl font-semibold tracking-tight text-white">
              {album_data.artist}
            </h4>
            <p className="leading-normal text-gray-100">{album_data.title}</p>
          </div>
        </div>
      </Link>
      <style>
        {`
            .img {
                width: 300px;
            } 
        `}
      </style>
    </>
  );
};

export default Item;
