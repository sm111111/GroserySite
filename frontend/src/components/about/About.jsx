import React from "react";
import "./About.css";
import { FaShoppingCart, FaLeaf, FaTruck, FaBuilding } from "react-icons/fa";
import salad from '../assets/img/salad.png';

const About = () => {
    return (
        <div className="about-container">
            <div className="about-header">
                <h1>About Our Grocery Store</h1>
                <p>Fresh, quality products delivered to your doorstep!</p>
            </div>

            <div className="about-content">
                <div className="about-image">
                    <img src={salad} alt="Grocery Store" />
                </div>

                <div className="about-text">
                    <h2>Why Choose Us?</h2>
                    <ul>
                        <li><FaShoppingCart className="icon" /> Wide variety of fresh groceries</li>
                        <li><FaLeaf className="icon" /> 100% organic and sustainable products</li>
                        <li><FaTruck className="icon" /> Fast and reliable delivery services</li>
                        <li><FaBuilding className="icon" /> Serving customers for over a decade</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default About;
