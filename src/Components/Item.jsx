import { useEffect } from "react";
import { Link } from "react-router-dom";

const Item = (props) => {
    const { id, title, artist, description, price, pictureUrl } = props;

    return (
        <>
            <Link to={`/item/` + id}>
                <div className='img'>
                    <img src={pictureUrl} alt="" />
                    <h1>{artist}</h1>
                    <h2>{title}</h2>
                </div>
            </Link>
            <style>{`
                .img {
                    width: 300px;
                } 
            `}
            </style>
        </>
    );
}

export default Item;