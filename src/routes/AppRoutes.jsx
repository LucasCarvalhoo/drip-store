// src/routes/AppRoutes.jsx atualizado com rota de checkout
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import your existing page components with correct paths
import Home from '../pages/Home/Home.jsx'; // Note the .jsx extension
import ProductDetail from '../pages/ProductDetail/ProductDetail.jsx';
import Cart from '../pages/Cart/Cart.jsx';
import Checkout from '../pages/Checkout/Checkout.jsx'; // Nova importação

// Simple NotFound component
const NotFound = () => (
  <div className="container mx-auto px-4 py-16 text-center text-black">
    <h1 className="text-3xl font-bold mb-4 text-black">404 - Página não encontrada</h1>
    <p className="mb-8">A página que você está procurando não existe ou foi movida.</p>
    <a href="/" className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700">
      Voltar para a página inicial
    </a>
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* Main pages */}
      <Route path="/" element={<Home />} />
      
      {/* Temporarily comment out ProductList until it's done */}
      {/* <Route path="/produtos" element={<ProductList />} /> */}
      
      <Route path="/produto/:id" element={<ProductDetail />} />
      
      {/* Carrinho e Checkout */}
      <Route path="/carrinho" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      
      {/* Direct access to ProductDetail for development */}
      <Route path="/product-detail" element={<ProductDetail />} />
      
      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;