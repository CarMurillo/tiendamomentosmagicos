// Carlos David Murillo Moreno
// Camilo Andres Pacheco Gomez
// Maria Fernanda Ortega Macias

import React, { useState } from 'react';
import Header from './components/Header';
import Login from './components/Login';
import Banner from './components/Banner';
import Registro from './components/Registro';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [filters, setFilters] = useState({
    peluche: false,
    chocolate: false,
    licor: false,
    taza: false,
  });

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCart = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCart);
    } else {
      setCartItems((prevCart) => [
        ...prevCart,
        { ...product, quantity: 1 },
      ]);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Router>
      <div>
        <Header cartItemCount={cartItemCount} />
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Registro" element={<Registro />} />
          <Route
            path="/Cart"
            element={<Cart cartItems={cartItems} setCartItems={setCartItems} />}
          />
          <Route
            path="/"
            element={
              <HomePage
                addToCart={addToCart}
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

const HomePage = ({ addToCart, filters }) => {
  
  return (
    <>
      <div>
        <Banner />
      </div>
      <div>
        <ProductList addToCart={addToCart} filters={filters} />
      </div>
      <div>
        <Footer/>
      </div>
    </>
  );
};

export default App;
