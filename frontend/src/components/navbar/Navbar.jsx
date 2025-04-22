import React, { useState } from 'react';
import './Navbar.css';
import { NavLink, Link } from 'react-router-dom';
import { FiSearch } from "react-icons/fi";
import { IoPersonSharp } from "react-icons/io5";
import { FaHeart, FaCartShopping } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { GoHomeFill } from "react-icons/go";
import { FaInfoCircle } from "react-icons/fa";
import { PiPhoneCallFill } from "react-icons/pi";



const Navbar = () => {
    const [search, setSearch] = useState(true);
    const [nav, setNav] = useState(false);

    const searchOpen = () => setSearch(!search);
    const navbarshow = () => setNav(!nav);

    return (
        <div className='Navbar-container'>
            <div className="navbar-logo">
                <h1>Grosery Store</h1>
            </div>

            <div className='all-navbar-link'>
                <NavLink className='navlink-navbar' to='/home'>home</NavLink>
                <NavLink className='navlink-navbar' to='/about'>about</NavLink>
                <NavLink className='navlink-navbar' to='/fill'>shop</NavLink>
                <NavLink className='navlink-navbar' to='/contact'>contact</NavLink>
            </div>

            <div className={`others-tools ${nav ? "navshow" : ''}`}>
                {search ? (
                    <Link className="outer-layour-icons" onClick={searchOpen}>
                        <FiSearch />
                    </Link>
                ) : (
                    <div className="searchHere">
                        <input type="text" placeholder='Search here...' />
                        <FiSearch onClick={searchOpen} />
                    </div>
                )}

                <Link className="outer-layour-icons" to='/profile'>
                    <IoPersonSharp />
                </Link>
                <Link className="outer-layour-icons">
                    <FaHeart />
                </Link>
                <Link className="outer-layour-icons" to={`/cart/${'default'}`}>
                    <FaCartShopping />
                </Link>

                <div className="showAllphone">
                    <Link className="outer-layour-icons" to='/home'>
                        <GoHomeFill />
                    </Link>
                    <Link className="outer-layour-icons" to='/about'>
                        <FaInfoCircle />
                    </Link>
                    <Link className="outer-layour-icons" to='/contact'>
                        <PiPhoneCallFill />
                    </Link>
                </div>

            </div>

            <div className="phone-view" onClick={navbarshow}>
                <GiHamburgerMenu />
            </div>
        </div>
    );
}

export default Navbar;
