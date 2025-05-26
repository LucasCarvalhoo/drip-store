// pages/ProductDetail/ProductDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import ProductGallery from '../../components/ProductGallery/ProductGallery';
import ProductRating from '../../components/ProductRating/ProductRating';
import ProductPrice from '../../components/ProductPrice/ProductPrice';
import SizeSelector from '../../components/SizeSelector/SizeSelector';
import ColorSelector from '../../components/ColorSelector/ColorSelector';
import ProductCard from '../../components/ProductCard/ProductCard';
import { getProductBySlug, getRelatedProducts } from '../../services/productService';
import { useUser } from '../../contexts/UserContext';
import styles from './ProductDetail.module.css';

const ProductDetail = () => {
  const { id: productSlug } = useParams(); // Get slug from URL
  const navigate = useNavigate();
  const { user } = useUser(); // Add user context
  
  // State management
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  // Load product data
  useEffect(() => {
    const loadProductData = async () => {
      if (!productSlug) {
        setError('Produto não encontrado.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Load main product data
        const productData = await getProductBySlug(productSlug);
        
        if (!productData) {
          setError('Produto não encontrado.');
          setLoading(false);
          return;
        }

        setProduct(productData);

        // Set default selections
        if (productData.sizes && productData.sizes.length > 0) {
          setSelectedSize(productData.sizes[0]);
        }
        if (productData.colors && productData.colors.length > 0) {
          setSelectedColor(productData.colors[0]);
        }

        // Debug logging to check what data we're getting
        console.log('Product loaded:', {
          name: productData.name,
          category: productData.category,
          sizes: productData.sizes,
          colors: productData.colors,
          variations: productData.variations
        });

        // Load related products
        try {
          const related = await getRelatedProducts(productData.id, 4);
          setRelatedProducts(related);
        } catch (relatedError) {
          console.error('Error loading related products:', relatedError);
          // Don't show error for related products, just continue without them
        }

      } catch (err) {
        console.error('Error loading product:', err);
        if (err.message?.includes('not found')) {
          setError('Produto não encontrado.');
        } else {
          setError('Erro ao carregar produto. Tente novamente mais tarde.');
        }
      } finally {
        setLoading(false);
      }
    };

    loadProductData();
  }, [productSlug]);

  // Generate breadcrumb based on product data
  const getBreadcrumbItems = () => {
    if (!product) return [];
    
    return [
      { label: 'Home', path: '/' },
      { label: 'Produtos', path: '/produtos' },
      ...(product.category ? [{ label: product.category, path: `/produtos?categoria=${product.category.toLowerCase()}` }] : []),
      ...(product.brand ? [{ label: product.brand, path: `/produtos?marca=${product.brand.toLowerCase()}` }] : []),
      { label: product.name, path: '#' }
    ];
  };

  // Handler for adding to cart
  const handleAddToCart = async () => {
    // Only require size selection for products that have sizes
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert('Por favor, selecione um tamanho.');
      return;
    }
    
    // Only require color selection for products that have colors
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      alert('Por favor, selecione uma cor.');
      return;
    }

    try {
      setLoading(true);
      
      // Import cart service functions
      const { getCart, addToCart } = await import('../../services/cartService');
      
      // Get or create cart
      const cartId = await getCart(user?.id);
      
      // For now, we'll use a default variation ID since the product might not have real variations
      // In a real implementation, you'd match selectedSize and selectedColor to actual variation IDs
      const defaultVariationId = product.variations && product.variations.length > 0 
        ? product.variations[0].id 
        : null;
      
      // Add to cart
      await addToCart(cartId, product.id, defaultVariationId, 1);
      
      // Show success message
      alert(`✅ Produto adicionado ao carrinho!\n\nProduto: ${product.name}${selectedSize ? `\nTamanho: ${selectedSize}` : ''}${selectedColor ? `\nCor: ${selectedColor}` : ''}\nPreço: R$ ${product.currentPrice.toFixed(2).replace('.', ',')}`);
      
      // Trigger cart update in header (we'll add this context later)
      window.dispatchEvent(new CustomEvent('cartUpdated'));
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Erro ao adicionar produto ao carrinho. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <Layout>
        {/* Breadcrumb skeleton */}
        <div className={styles.breadcrumbContainer}>
          <div className="container mx-auto px-4">
            <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
          </div>
        </div>

        {/* Product detail skeleton */}
        <div className="container mx-auto px-4 py-8">
          <div className={styles.productContainer}>
            {/* Gallery skeleton */}
            <div className={styles.galleryContainer}>
              <div className="w-full h-96 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="flex gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-20 h-20 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            </div>

            {/* Info skeleton */}
            <div className={styles.infoContainer}>
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-6 animate-pulse"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Error state
  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="text-6xl mb-4">😔</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{error}</h1>
            <p className="text-gray-600 mb-6">
              {error.includes('não encontrado') 
                ? 'O produto que você está procurando não existe ou foi removido.'
                : 'Houve um problema ao carregar o produto.'
              }
            </p>
            <div className="space-x-4">
              <button
                onClick={() => navigate('/produtos')}
                className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 transition-colors"
              >
                Ver Todos os Produtos
              </button>
              <button
                onClick={() => window.location.reload()}
                className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                Tentar Novamente
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // No product found
  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Produto não encontrado</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className={styles.breadcrumbContainer}>
        <div className="container mx-auto px-4">
          <Breadcrumb items={getBreadcrumbItems()} />
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
              {product.category && <span>{product.category}</span>}
              {product.category && product.brand && <span className={styles.divider}>|</span>}
              {product.brand && <span>{product.brand}</span>}
              {(product.category || product.brand) && product.ref && <span className={styles.divider}>|</span>}
              {product.ref && <span>{product.ref}</span>}
            </div>

            {/* Product Rating */}
            {product.rating && (
              <ProductRating 
                rating={product.rating} 
                reviewCount={product.reviewCount} 
              />
            )}

            {/* Product Price */}
            <ProductPrice 
              currentPrice={product.currentPrice} 
              originalPrice={product.originalPrice} 
            />

            {/* Product Description */}
            {product.description && (
              <div className={styles.descriptionContainer}>
                <h2 className={styles.sectionTitle}>Descrição do produto</h2>
                <p className={styles.descriptionText}>{product.description}</p>
              </div>
            )}

            {/* Size Selector - Always show for relevant categories */}
            {product.sizes && product.sizes.length > 0 && (
              <SizeSelector 
                sizes={product.sizes} 
                selectedSize={selectedSize} 
                onSizeSelect={setSelectedSize} 
              />
            )}

            {/* Color Selector - Always show if colors are available */}
            {product.colors && product.colors.length > 0 && (
              <ColorSelector 
                colors={product.colors} 
                selectedColor={selectedColor} 
                onColorSelect={setSelectedColor} 
              />
            )}

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
      {relatedProducts.length > 0 && (
        <div className="container mx-auto px-4 mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Produtos Relacionados</h2>
            <button 
              onClick={() => navigate('/produtos')}
              className="text-pink-600 text-sm flex items-center hover:underline"
            >
              Ver todos <span className="ml-1">→</span>
            </button>
          </div>
          <ProductCard produtos={relatedProducts} />
        </div>
      )}
    </Layout>
  );
};

export default ProductDetail;