// src/components/ProductCard/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ produtos }) => {
  // Se não receber produtos via props, indica loading
  if (!produtos || produtos.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-4 rounded shadow-sm hover:shadow-md transition-shadow bg-white animate-pulse">
          <div className="h-48 bg-gray-200 rounded mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Mapeamento do array de produtos para criar cada card */}
      {produtos.map((produto) => (
        <div key={produto.id} className="p-4 rounded shadow-sm hover:shadow-md transition-shadow bg-white">
          {/* Badge de desconto */}
          <div className="relative bg-white">
            {produto.desconto > 0 && (
              <span className="absolute top-2 left-2 bg-lime-500 text-white text-xs font-semibold px-2 py-1 rounded z-10">
                {produto.desconto}% OFF
              </span>
            )}
            
            {/* Imagem do produto como link */}
            <Link 
              to={`/produto/${produto.slug || produto.id}`} 
              className="block cursor-pointer"
            >
              <img 
                src={produto.imagemUrl} 
                alt={produto.nome} 
                className="w-full h-48 object-contain mb-3 hover:opacity-90 transition-opacity"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = '/src/assets/icons/icon-category-sneakers.svg';
                }}
              />
            </Link>
          </div>
          
          {/* Informações do produto */}
          <div>
            {/* Categoria */}
            <p className="text-xs text-gray-500 mb-1">{produto.categoria}</p>
            
            {/* Nome do produto também como link */}
            <Link to={`/produto/${produto.slug || produto.id}`} className="hover:text-pink-600 transition-colors">
              <h3 className="text-sm text-gray-800 font-medium mb-2">{produto.nome}</h3>
            </Link>
            
            {/* Preços */}
            <div className="flex items-center">
              {/* Preço original riscado - só mostrar se for maior que o preço atual */}
              {produto.precoOriginal > produto.precoAtual && (
                <span className="text-xs text-gray-500 line-through mr-2">
                  R${produto.precoOriginal.toFixed(2).replace('.', ',')}
                </span>
              )}
              
              {/* Preço atual */}
              <span className="text-base font-bold text-gray-800">
                R${produto.precoAtual.toFixed(2).replace('.', ',')}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;