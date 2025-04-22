import React from "react";
import "./Footer.css";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaShoppingCart
} from "react-icons/fa";
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">

                {/* Logo & About */}
                <div className="footer-section about">
                    <h2><FaShoppingCart className="logo-icon" /> Grocery Store</h2>
                    <p>Fresh groceries at your doorstep! Your trusted grocery partner for healthy and organic food.</p>
                </div>

                {/* Quick Links */}
                <div className="footer-section links">
                    <h2>Quick Links</h2>
                    <ul>
                        <li><Link href="#">Home</Link></li>
                        <li><Link href="#">Shop</Link></li>
                        <li><Link href="#">Offers</Link></li>
                        <li><Link href="#">Contact</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="footer-section contact">
                    <h2>Contact Us</h2>
                    <p><FaMapMarkerAlt className="icon" /> 123 Grocery Street, City</p>
                    <p><FaPhone className="icon" /> +123 456 7890</p>
                    <p><FaEnvelope className="icon" /> support@grocery.com</p>
                </div>

                {/* Social Media */}
                <div className="footer-section social">
                    <h2>Follow Us</h2>
                    <div className="social-icons">
                        <FaFacebookF className="social-icon" />
                        <FaInstagram className="social-icon" />
                        <FaTwitter className="social-icon" />
                    </div>
                </div>

            </div>

            {/* Bottom Footer */}
            <div className="footer-bottom">
                <p>© 2025 Grocery Store | Made with love</p>
            </div>
        </footer>
    );
};

export default Footer;
