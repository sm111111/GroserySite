import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Profile from './components/profile/Profile';
import CardOne from './components/cardone/CardOne';
import BigCard from './components/bigcard/BigCard';
import SmallCard from './components/smallcard/SmallCard';
import Contact from './components/contact/Contact';
import Layout from './Layout';
import Filter from './components/filter/Filter';
import Main from './components/main/Main';
import Cart from './components/cart/Cart';
import About from './components/about/About'
import Home from './components/home/Home'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      <Route element={<Layout />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/fill" element={<Filter />} />
        <Route path="/main/:id" element={<Main />} />
        <Route path="/cart/:id" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
