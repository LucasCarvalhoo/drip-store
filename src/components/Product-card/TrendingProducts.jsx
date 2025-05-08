import { Link } from 'react-router-dom';

const ProductCard = ({ id, image, category, name, originalPrice, salePrice, discount }) => {
  return (
    <div className="group">
      <div className="relative">
        {discount && (
          <span className="absolute top-2 left-2 bg-green-400 text-xs font-medium text-white py-1 px-2 rounded-sm z-10">
            {discount}% OFF
          </span>
        )}
        <Link to={`/produto/${id}`}>
          <img 
            src={image} 
            alt={name}
            className="w-full h-48 object-contain bg-gray-50 rounded-md mb-3"
          />
        </Link>
      </div>
      <div className="mt-2">
        <span className="text-xs text-gray-500">{category}</span>
        <h3 className="text-sm font-medium">{name}</h3>
        <div className="flex items-center mt-1">
          {originalPrice && (
            <span className="text-gray-400 line-through text-sm mr-2">${originalPrice}</span>
          )}
          <span className="text-base font-medium">${salePrice}</span>
        </div>
      </div>
    </div>
  );
};

const TrendingProducts = () => {
  const products = Array(8).fill().map((_, index) => ({
    id: index + 1,
    image: '/api/placeholder/200/200',
    category: 'Tênis',
    name: 'K-Swiss V8 - Masculino',
    originalPrice: '200',
    salePrice: '100',
    discount: 30
  }));

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {products.map(product => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};

export default TrendingProducts;