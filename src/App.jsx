// src/App.jsx
import React from "react";
import "./App.css";
import ProductCard from "./components/ProductCard/ProductCard";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Layout>
      <div className="container mx-auto px-4">
        <ProductCard />
      </div>
    </Layout>
  );
}

export default App;
