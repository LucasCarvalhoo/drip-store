// Este arquivo deve ser salvo como: src/components/ProdutosEmAlta/ProdutosEmAlta.jsx

import React from 'react';

const ProductCard = () => {
  // Array com os dados dos produtos
  // Em um projeto real, estes dados viriam de uma API ou banco de dados
  const produtos = [
    {
      id: 1,
      nome: 'K-Swiss V8 - Masculino',
      precoOriginal: 200,
      precoAtual: 100,
      desconto: 30,
      categoria: 'Tênis',
      imagemUrl: '../src/assets/img-produtoEmAlta.png', // Ajuste o caminho conforme a localização da sua imagem
    },
    {
      id: 2,
      nome: 'K-Swiss V8 - Masculino',
      precoOriginal: 200,
      precoAtual: 100,
      categoria: 'Tênis',
      imagemUrl: '../src/assets/img-produtoEmAlta.png',
    }
  ];

  return (
    <section className="w-full py-8">
      {/* Cabeçalho da seção com título e link "Ver todos" */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Produtos em alta</h2>
        <a href="#" className="text-pink-600 text-sm flex items-center">
          Ver todos <span className="ml-1">→</span>
        </a>
      </div>

      {/* Grid de produtos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Mapeamento do array de produtos para criar cada card */}
        {produtos.map((produto) => (
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
                {/* Preço original riscado */}
                <span className="text-xs text-gray-500 line-through mr-2">
                  R${produto.precoOriginal}
                </span>
                
                {/* Preço com desconto */}
                <span className="text-base font-bold text-gray-800">
                  R${produto.precoAtual}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductCard;