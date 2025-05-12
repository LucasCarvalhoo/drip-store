// src/components/ProductCard/ProductCard.jsx
import React from 'react';

const ProductCard = ({ produtos }) => {
  // Se não receber produtos via props, usa os mockados internamente
  const produtosParaExibir = produtos || [
    {
      id: 1,
      nome: 'K-Swiss V8 - Masculino',
      precoOriginal: 200,
      precoAtual: 100,
      desconto: 30,
      categoria: 'Tênis',
      imagemUrl: '../images/products/produc-image-0.png', // Ajuste o caminho conforme a localização da sua imagem
    },
    {
      id: 2,
      nome: 'K-Swiss V8 - Masculino',
      precoOriginal: 200,
      precoAtual: 100,
      categoria: 'Tênis',
      imagemUrl: '../images/products/produc-image-0.png',
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Mapeamento do array de produtos para criar cada card */}
      {produtosParaExibir.map((produto) => (
        <div key={produto.id} className="p-4 rounded shadow-sm hover:shadow-md transition-shadow">
          {/* Badge de desconto */}
          <div className="relative bg-white">
            {produto.desconto > 0 && (
              <span className="absolute top-2 left-2 bg-lime-500 text-white text-xs font-semibold px-2 py-1 rounded">
                {produto.desconto}% OFF
              </span>
            )}
            
            {/* Imagem do produto */}
            <img 
              src={produto.imagemUrl} 
              alt={produto.nome} 
              className="w-full h-48 object-contain mb-3"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = '';
              }}
            />
          </div>
          
          {/* Informações do produto */}
          <div>
            {/* Categoria */}
            <p className="text-xs text-gray-500 mb-1">{produto.categoria}</p>
            
            {/* Nome do produto */}
            <h3 className="text-sm text-gray-800 font-medium mb-2">{produto.nome}</h3>
            
            {/* Preços */}
            <div className="flex items-center">
              {/* Preço original riscado - só mostrar se for maior que o preço atual */}
              {produto.precoOriginal > produto.precoAtual && (
                <span className="text-xs text-gray-500 line-through mr-2">
                  R${produto.precoOriginal}
                </span>
              )}
              
              {/* Preço atual */}
              <span className="text-base font-bold text-gray-800">
                R${produto.precoAtual}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;