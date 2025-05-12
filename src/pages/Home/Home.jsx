// src/pages/Home/Home.jsx
import React from 'react';
import Layout from '../../components/layout/Layout';
import HeroBanner from '../../components/HeroBanner/HeroBanner';
import CollectionCards from '../../components/CollectionCards/CollectionCards';
import CategoryNavigation from '../../components/CategoryNavigation/CategoryNavigation';
import ProductCard from '../../components/ProductCard/ProductCard';
import SpecialOffer from '../../components/SpecialOffer/SpecialOffer';

const Home = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 w-full overflow-hidden">
        {/* Banner Principal */}
        <section className="mb-12">
          <HeroBanner />
        </section>

        {/* Coleções em Destaque */}
        <section className="container mx-auto px-4 mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Coleções em destaque</h2>
          </div>
          <CollectionCards />
        </section>

        {/* Navegação por Categorias */}
        <section className="container mx-auto px-4 mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Coleções em destaque</h2>
          </div>
          <CategoryNavigation />
        </section>

        {/* Produtos em Alta */}
        <section className="container mx-auto px-4 mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Produtos em alta</h2>
            <a href="/produtos" className="text-pink-600 font-medium flex items-center">
              Ver todos
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
          <ProductCard />
        </section>

        {/* Oferta Especial */}
        <section className="container mx-auto px-4 mb-16 max-w-full">
          <div className="w-full">
            <SpecialOffer />
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;