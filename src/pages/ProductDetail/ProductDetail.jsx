// pages/ProductDetail/ProductDetail.jsx
import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import ProductGallery from '../../components/ProductGallery/ProductGallery';
import ProductRating from '../../components/ProductRating/ProductRating';
import ProductPrice from '../../components/ProductPrice/ProductPrice';
import SizeSelector from '../../components/SizeSelector/SizeSelector';
import ColorSelector from '../../components/ColorSelector/ColorSelector';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './ProductDetail.module.css';

const ProductDetail = () => {
  // Sample product data (in a real app, this would come from an API)
  const product = {
    id: 'REF:3846711',
    name: 'Tênis Nike Revolution 6 Next Nature Masculino',
    brand: 'Nike',
    category: 'Casual',
    price: 219.00,
    originalPrice: 319.00,
    rating: 4.7,
    reviewCount: 90,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
    sizes: ['39', '40', '41', '42', '43'],
    colors: ['#40E0D0', '#FF6347', '#556B2F', '#4B0082'],
    images: [
      { 
        id: 1, 
        src: '../public/images/products/produc-image-0.png', 
        alt: 'Tênis Nike Revolution 6 frente' 
      },
      { 
        id: 2, 
        src: '../public/images/products/produc-image-0.png', 
        alt: 'Tênis Nike Revolution 6 lado' 
      },
      { 
        id: 3, 
        src: '../public/images/products/produc-image-0.png', 
        alt: 'Tênis Nike Revolution 6 costas' 
      },
      { 
        id: 4, 
        src: '../public/images/products/produc-image-0.png', 
        alt: 'Tênis Nike Revolution 6 sola' 
      },
      { 
        id: 5, 
        src: '../public/images/products/produc-image-0.png', 
        alt: 'Tênis Nike Revolution 6 detalhe' 
      }
    ]
  };

  // Breadcrumb data
  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Produtos', path: '/produtos' },
    { label: 'Tênis', path: '/produtos/tenis' },
    { label: 'Nike', path: '/produtos/tenis/nike' },
    { label: product.name, path: '#' }
  ];

  // State for selected options
  const [selectedSize, setSelectedSize] = useState('41');
  const [selectedColor, setSelectedColor] = useState('#FF6347');

  // Handler for adding to cart
  const handleAddToCart = () => {
    console.log('Adding to cart:', {
      product: product.name,
      size: selectedSize,
      color: selectedColor,
      price: product.price
    });
    // In a real app, this would add the item to the cart
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className={styles.breadcrumbContainer}>
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* Product Detail Content */}
      <div className="container mx-auto px-4 py-8">
        <div className={styles.productContainer}>
          {/* Left: Product Gallery */}
          <div className={styles.galleryContainer}>
            <ProductGallery images={product.images} />
          </div>

          {/* Right: Product Info */}
          <div className={styles.infoContainer}>
            {/* Product Title */}
            <h1 className={styles.productTitle}>{product.name}</h1>

            {/* Product Meta */}
            <div className={styles.productMeta}>
              <span>{product.category}</span>
              <span className={styles.divider}>|</span>
              <span>{product.brand}</span>
              <span className={styles.divider}>|</span>
              <span>{product.id}</span>
            </div>

            {/* Product Rating */}
            <ProductRating rating={product.rating} reviewCount={product.reviewCount} />

            {/* Product Price */}
            <ProductPrice currentPrice={product.price} originalPrice={product.originalPrice} />

            {/* Product Description */}
            <div className={styles.descriptionContainer}>
              <h2 className={styles.sectionTitle}>Descrição do produto</h2>
              <p className={styles.descriptionText}>{product.description}</p>
            </div>

            {/* Size Selector */}
            <SizeSelector 
              sizes={product.sizes} 
              selectedSize={selectedSize} 
              onSizeSelect={setSelectedSize} 
            />

            {/* Color Selector */}
            <ColorSelector 
              colors={product.colors} 
              selectedColor={selectedColor} 
              onColorSelect={setSelectedColor} 
            />

            {/* Add to Cart Button */}
            <button 
              className={styles.buyButton}
              onClick={handleAddToCart}
            >
              COMPRAR
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="container mx-auto px-4 mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Produtos Relacionados</h2>
          <a href="#" className="text-pink-600 text-sm flex items-center">
            Ver todos <span className="ml-1">→</span>
          </a>
        </div>
        <ProductCard produtos={[
          {
            id: 1,
            nome: 'K-Swiss V8 - Masculino',
            precoOriginal: 200,
            precoAtual: 100,
            desconto: 30,
            categoria: 'Tênis',
            imagemUrl: '../public/images/products/produc-image-0.png',
          },
          {
            id: 2,
            nome: 'K-Swiss V8 - Masculino',
            precoOriginal: 200,
            precoAtual: 100,
            desconto: 30,
            categoria: 'Tênis',
            imagemUrl: '../public/images/products/produc-image-0.png',
          },
          {
            id: 3,
            nome: 'K-Swiss V8 - Masculino',
            precoOriginal: 200,
            precoAtual: 100,
            desconto: 0,
            categoria: 'Tênis',
            imagemUrl: '../public/images/products/produc-image-0.png',
          },
          {
            id: 4,
            nome: 'K-Swiss V8 - Masculino',
            precoOriginal: 200,
            precoAtual: 100,
            desconto: 0,
            categoria: 'Tênis',
            imagemUrl: '../public/images/products/produc-image-0.png',
          }
        ]} />
      </div>
    </Layout>
  );
};

export default ProductDetail;