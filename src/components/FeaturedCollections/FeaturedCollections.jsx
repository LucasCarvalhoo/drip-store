import { Link } from 'react-router-dom';

const CollectionCard = ({ title, discount, image, slug }) => {
  return (
    <div className="relative bg-blue-50 rounded-lg overflow-hidden">
      <div className="p-6 flex flex-col h-full">
        {discount && (
          <span className="bg-green-400 text-xs font-medium text-white py-1 px-2 rounded-sm mb-2 inline-block w-fit">
            {discount}% OFF
          </span>
        )}
        <h3 className="text-lg font-medium mb-8">{title}</h3>
        <img 
          src={image} 
          alt={title} 
          className="w-full h-32 object-contain mt-auto"
        />
        <Link 
          to={`/produtos/${slug}`}
          className="text-pink-600 text-sm font-medium mt-4 inline-block"
        >
          Comprar
        </Link>
      </div>
    </div>
  );
};

const FeaturedCollections = () => {
  const collections = [
    {
      id: 1,
      title: 'Novo drop Supreme',
      discount: 30,
      image: '/api/placeholder/180/120',
      slug: 'supreme'
    },
    {
      id: 2,
      title: 'Coleção Adidas',
      discount: 30,
      image: '/api/placeholder/180/120',
      slug: 'adidas'
    },
    {
      id: 3,
      title: 'Novo Beats Bass',
      discount: 30,
      image: '/api/placeholder/180/120',
      slug: 'beats'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {collections.map(collection => (
        <CollectionCard key={collection.id} {...collection} />
      ))}
    </div>
  );
};

export default FeaturedCollections;