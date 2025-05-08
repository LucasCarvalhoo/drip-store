// src/components/layout/Layout.jsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';

/**
 * Main layout component that wraps all pages
 * Includes consistent header and footer across the application
 */
const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;