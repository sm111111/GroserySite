import React, { useEffect, useState } from 'react';
import './Main.css';
import salad from '../assets/img/salad.png';
import { FaPlus, FaMinus } from "react-icons/fa";
import CardOne from '../cardone/CardOne';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Main = () => {
    const [getMain, setGetMain] = useState(null);
    const [count, setCount] = useState(1);
    const [mainInfo, setMaininfo] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Received ID from useParams:", id);
        fetchProductData();
    }, [id]);

    const fetchProductData = async () => {
        try {
            if (!id) return;
            const res = await axios.get(`https://groserysite.onrender.com/api/mains/${id}`);

            if (res.status === 200 || res.status === 201) {
                setGetMain(res.data.data || res.data);
            }
        } catch (error) {
            console.error("Server Side Error:", error);
            toast.error("Failed to fetch product details.");
        }
    };

    const sendDataToCart = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error("You need to log in first.");
                return;
            }

            if (!id || !getMain) {
                toast.error("Invalid product details.");
                return;
            }

            console.log("🟢 Sending request with:", {
                productId: id,
                name: getMain?.product_name,
                price: getMain?.product_price,
                quantity: count
            });

            const res = await axios.post(
                `https://groserysite.onrender.com/cart/select`,
                {
                    productId: id,
                    name: getMain?.product_name,
                    price: getMain?.product_price,
                    quantity: count
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log("✅ Response:", res.data);
            if (res.status === 200 || res.status === 201) {
                toast.success('Added to cart!');
                setTimeout(() => navigate(`/cart/${id}`), 500);
            }
        } catch (error) {
            console.error("❌ Error:", error.response?.data || error.message);
            toast.error('Failed to add product to cart.');
        }
    };

    const datafetch = async () => {
        try {
            const res = await axios.get('https://groserysite.onrender.com/api/allproduct');
            console.log("Received data:", res.data);
            if (res.status === 200 || res.status === 201) {
                setMaininfo(res.data.data);
            }
        } catch (error) {
            console.error('Internal Server Error', error);
        }
    };

    useEffect(() => {
        datafetch();
    }, []);



    return (
        <div className='Main-container'>
            <ToastContainer />
            <div className="inside-Main-container">
                <div className="leftside-main">
                    <img src={salad} alt="Product" />
                </div>

                <div className="rightside-main">
                    <div className="rightside-main-details">
                        <h1>{getMain?.product_name || "Loading..."}</h1>
                        <span>${getMain?.product_price || "N/A"}</span>

                        <div className="quantity">
                            <span onClick={() => setCount(count + 1)}><FaPlus className='quantity-icons' /></span>
                            <h2>{count}</h2>
                            <span onClick={() => setCount(Math.max(1, count - 1))}><FaMinus className='quantity-icons' /></span>
                        </div>

                        <span>Overview:</span>
                        <p>{getMain?.product_overview || "No description available"}</p>
                        <button onClick={sendDataToCart}>Add To Cart</button>
                    </div>
                </div>
            </div>

            <div className="other-cardShowHere">
                {
                    mainInfo.length > 0 ? (
                        mainInfo.map((item) => (
                            <CardOne
                                key={item._id}
                                good_id={item._id}
                                good_name={item.product_name}
                                good_price={item.product_price}
                            />
                        ))
                    ) : (
                        <span>Data not found</span>
                    )
                }
            </div>
        </div>
    );
};

export default Main;
