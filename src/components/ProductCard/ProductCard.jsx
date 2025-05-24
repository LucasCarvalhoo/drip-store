// src/components/ProductCard/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ produtos }) => {
  // Se não receber produtos via props, indica loading
  if (!produtos || produtos.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Mostra 4 skeletons durante o loading */}
        {[...Array(4)].map((_, index) => (
          <div key={index} className="p-4 rounded shadow-sm hover:shadow-md transition-shadow bg-white animate-pulse">
            <div className="h-48 bg-gray-200 rounded mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Mapeamento do array de produtos para criar cada card */}
      {produtos.map((produto) => {
        // Calcular desconto se não vier calculado
        const desconto = produto.desconto || 
          (produto.precoOriginal && produto.precoAtual && produto.precoOriginal > produto.precoAtual 
            ? Math.round(((produto.precoOriginal - produto.precoAtual) / produto.precoOriginal) * 100)
            : 0);

        return (
          <div key={produto.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            {/* Container da imagem com altura fixa */}
            <div className="relative aspect-square bg-gray-50 overflow-hidden">
              {/* Badge de desconto */}
              {desconto > 0 && (
                <span className="absolute top-3 left-3 bg-lime-500 text-white text-xs font-semibold px-2 py-1 rounded z-10">
                  {desconto}% OFF
                </span>
              )}
              
              {/* Badge "Novo" */}
              {produto.novo && (
                <span className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded z-10">
                  Novo
                </span>
              )}
              
              {/* Imagem do produto como link */}
              <Link
                to={`/produto/${produto.slug || produto.id}`}
                className="block w-full h-full"
              >
                <img
                  src={produto.imagemUrl || produto.url}
                  alt={produto.nome}
                  className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://mjirmlyyndjerolekeje.supabase.co/storage/v1/object/public/produtos/placeholder.png';
                  }}
                />
              </Link>
            </div>
            
            {/* Informações do produto */}
            <div className="p-4">
              {/* Categoria */}
              <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">
                {produto.categoria}
              </p>
              
              {/* Nome do produto também como link */}
              <Link 
                to={`/produto/${produto.slug || produto.id}`} 
                className="hover:text-pink-600 transition-colors"
              >
                <h3 className="text-sm text-gray-800 font-medium mb-3 line-clamp-2 min-h-[2.5rem]">
                  {produto.nome}
                </h3>
              </Link>
              
              {/* Preços */}
              <div className="flex items-center gap-2">
                {/* Preço original riscado */}
                {produto.precoOriginal && produto.precoAtual && produto.precoOriginal > produto.precoAtual && (
                  <span className="text-xs text-gray-400 line-through">
                    R$ {produto.precoOriginal.toFixed(2).replace('.', ',')}
                  </span>
                )}
                
                {/* Preço atual */}
                <span className="text-base font-bold text-gray-900">
                  R$ {(produto.precoAtual || produto.preco_promocional || produto.preco_original || 0).toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductCard;