import { Link } from 'react-router-dom';

const CategoryIcon = ({ icon, label, slug }) => {
  return (
    <Link to={`/produtos/${slug}`} className="flex flex-col items-center">
      <div className="w-16 h-16 rounded-full border border-gray-200 flex items-center justify-center mb-2">
        <img src={icon} alt={label} className="w-8 h-8" />
      </div>
      <span className="text-sm text-gray-700">{label}</span>
    </Link>
  );
};

const CategoryIcons = () => {
  const categories = [
    {
      id: 1,
      icon: '/api/placeholder/32/32',
      label: 'Camisetas',
      slug: 'camisetas'
    },
    {
      id: 2,
      icon: '/api/placeholder/32/32',
      label: 'Calças',
      slug: 'calcas'
    },
    {
      id: 3,
      icon: '/api/placeholder/32/32',
      label: 'Bonés',
      slug: 'bones'
    },
    {
      id: 4,
      icon: '/api/placeholder/32/32',
      label: 'Headphones',
      slug: 'headphones'
    },
    {
      id: 5,
      icon: '/api/placeholder/32/32',
      label: 'Tênis',
      slug: 'tenis'
    }
  ];

  return (
    <div className="flex justify-between items-center">
      {categories.map(category => (
        <CategoryIcon key={category.id} {...category} />
      ))}
    </div>
  );
};

export default CategoryIcons;