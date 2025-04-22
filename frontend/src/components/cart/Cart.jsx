import React, { useEffect, useState } from 'react';
import './Cart.css';
import { AiFillDelete } from "react-icons/ai";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetchCartData();
    }, []);

    const fetchCartData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error("You need to log in first.");
                return;
            }

            const res = await axios.get('http://localhost:5000/cart/getallcart', {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.status === 200) {
                setCart(res.data.items || []);
            }
        } catch (error) {
            console.log("Failed To Fetch Data", error);
            toast.error("Server Side Error");
        }
    };

    const deleteItem = async (productId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error("You need to log in first.");
                return;
            }

            const res = await axios.delete(`http://localhost:5000/cart/cartD/${productId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.status === 200) {
                toast.success("Item removed from cart");
                fetchCartData();
            }
        } catch (error) {
            console.log("Failed to delete item", error);
            toast.error("Server Side Error");
        }
    };


    return (
        <div className='Cart-container'>
            <ToastContainer />
            <div className="inside-cart">
                <div className="checkout">
                    <p>Total Amount: ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p>
                    <button>CheckOut</button>
                </div>

                {cart.length > 0 ? cart.map((item) => (
                    <div key={item.productId} className="carts-all">
                        <div className="img-name">
                            <div className="carts-img">
                                <img src={item.image || 'default.png'} alt='' />
                            </div>
                            <p>{item.name}</p>
                        </div>

                        <div className="price-edit">
                            <p>${item.price} x {item.quantity}</p>
                            <p onClick={() => deleteItem(item.productId)}><AiFillDelete /></p>
                        </div>
                    </div>
                )) : <p>Your cart is empty.</p>}
            </div>
        </div>
    );
};

export default Cart;
