import React from 'react'
import './CardOne.css'
import { useNavigate } from 'react-router-dom'
import pinapple from '../assets/img/pinapple.png'

const CardOne = ({ good_id, good_name, good_img, good_price }) => {
    const navigate = useNavigate();

    const redirectTomain = () => {
        console.log("Navigating to:", `/main/${good_id}`);
        navigate(`/main/${good_id}`);
    };

    return (
        <div className='CardOne-container' onClick={redirectTomain}>
            <div className="product-img">
                <img src='https://www.bbassets.com/media/uploads/p/l/1201615_2-fresho-apple-shimla-economy-1kg-mosambi-4pcs-banana-robusta-1kg-pomegranate-2pcs.jpg' alt="Product" />
            </div>

            <div className="product-name-price">
                <p>{good_name}</p>
                <p>{good_price}</p>
            </div>

            <button> Add to Cart</button>
        </div>
    );
};

export default CardOne;
