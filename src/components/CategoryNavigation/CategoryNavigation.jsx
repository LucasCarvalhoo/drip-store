// src/components/CategoryNavigation/CategoryNavigation.jsx
import React, { useState } from 'react';
import './CategoryNavigation.css';

// Importe diretamente do src (Vite processa automaticamente)
import iconTshirt from '../../assets/icons/icon-category-tshirt.svg';
import iconPants from '../../assets/icons/icon-category-pants.svg';
import iconCap from '../../assets/icons/icon-category-cap.svg';
import iconHeadphones from '../../assets/icons/icon-category-headphones.svg';
import iconSneakers from '../../assets/icons/icon-category-sneakers.svg';

const CategoryIcon = ({ name, normalIcon, hoverIcon, link = "#" }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={link}
      className="category-item flex flex-col items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`category-circle w-20 h-20 rounded-full bg-white border border-gray-100 ${
          isHovered ? 'shadow-md' : ''
        } flex items-center justify-center mb-3 transition-all`}
      >
        <img
          src={isHovered && hoverIcon ? hoverIcon : normalIcon}
          alt={name}
          className="w-10 h-10"
          onError={(e) => {
            console.error(`Erro ao carregar ícone: ${e.target.src}`);
            e.target.onerror = null;
            // Fallback para um ícone genérico
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iOCIgZmlsbD0iI0Y5RkFGQiIvPgo8cGF0aCBkPSJNMjAgMTBWMzBNMTAgMjBIMzAiIHN0cm9rZT0iIzZCNzI4MCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+';
          }}
        />
      </div>
      <span
        className={`text-base font-medium ${
          isHovered ? 'text-pink-600' : 'text-gray-600'
        } transition-colors duration-200`}
      >
        {name}
      </span>
    </a>
  );
};

const CategoryNavigation = ({ categories = [] }) => {
  // Categorias padrão com ícones importados corretamente
  const defaultCategories = [
    {
      id: 1,
      name: "Camisetas",
      normalIcon: iconTshirt,
      hoverIcon: iconTshirt, // Use o mesmo ícone se não tiver versão hover
      link: "/categorias/camisetas"
    },
    {
      id: 2,
      name: "Calças",
      normalIcon: iconPants,
      hoverIcon: iconPants,
      link: "/categorias/calcas"
    },
    {
      id: 3,
      name: "Bonés",
      normalIcon: iconCap,
      hoverIcon: iconCap,
      link: "/categorias/bones"
    },
    {
      id: 4,
      name: "Headphones",
      normalIcon: iconHeadphones,
      hoverIcon: iconHeadphones,
      link: "/categorias/headphones"
    },
    {
      id: 5,
      name: "Tênis",
      normalIcon: iconSneakers,
      hoverIcon: iconSneakers,
      link: "/categorias/tenis"
    }
  ];

  const categoriesToRender = categories.length > 0 ? categories : defaultCategories;

  return (
    <div className="flex justify-center gap-20 flex-wrap py-10">
      {categoriesToRender.map(category => (
        <CategoryIcon
          key={category.id}
          name={category.name}
          normalIcon={category.normalIcon}
          hoverIcon={category.hoverIcon}
          link={category.link}
        />
      ))}
    </div>
  );
};

export default CategoryNavigation;