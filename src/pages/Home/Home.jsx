// src/pages/Home/Home.jsx
import React from 'react';
import Layout from '../../components/layout/Layout';
import HeroBanner from '../../components/HeroBanner/HeroBanner';
import CollectionCards from '../../components/CollectionCards/CollectionCards';
import CategoryNavigation from '../../components/CategoryNavigation/CategoryNavigation';
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts'; // Importando o novo componente
import SpecialOffer from '../../components/SpecialOffer/SpecialOffer';

const customSlides = [];
const Home = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 w-full overflow-hidden">
        {/* Banner Principal */}
        <section className="mb-12">
          <HeroBanner slides={customSlides} />
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
            <h2 className="text-2xl font-bold text-gray-800">Navegue por categoria</h2>
          </div>
          <CategoryNavigation />
        </section>

        {/* Produtos em Alta - Usando nosso novo componente conectado ao Supabase */}
        <FeaturedProducts limit={4} />

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