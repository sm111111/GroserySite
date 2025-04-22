import React from 'react';
import './Contact.css';
import salad from '../assets/img/salad.png';
import { IoPhonePortraitOutline } from "react-icons/io5";
import { RiMessageFill } from "react-icons/ri";
import { SlLocationPin } from "react-icons/sl";

const Contact = () => {
    return (
        <div className='Contact-container'>
            <div className="inside-contact">
                <div className="leftside-Contact">
                    <img src={salad} alt="Salad" />
                </div>

                <div className="rigthside-Contact">
                    <div className="inside-wrapper">
                        <h1>Get In Touch</h1>

                        <div className="input-area">
                            <input type="text" placeholder='Name' required />
                            <input type="email" placeholder='Email' required />
                            <input type="tel" placeholder='Number' required />
                            <input type="text" placeholder='Address' required />
                        </div>

                        <textarea placeholder='Message'></textarea>
                        <button>Send Now</button>
                    </div>

                    <div className="insideBottom-contact">
                        <p><SlLocationPin className='icons-contacts' /> 121 King Street, Australia</p>
                        <p><IoPhonePortraitOutline className='icons-contacts' /> +91 9874564125</p>
                        <p><RiMessageFill className='icons-contacts' /> info@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
