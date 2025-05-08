import { Link } from 'react-router-dom';

const SpecialOffer = () => {
  return (
    <div className="bg-purple-50 rounded-lg overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 p-6 flex items-center justify-center">
          <img 
            src="/api/placeholder/300/300" 
            alt="Air Jordan Edição de Colecionador" 
            className="max-w-full h-auto object-contain"
          />
        </div>
        <div className="w-full md:w-2/3 p-8 flex flex-col justify-center">
          <div className="mb-2">
            <span className="text-pink-600 text-sm font-medium">Oferta especial</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Air Jordan edição de colecionador
          </h2>
          <p className="text-gray-600 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
            irure dolor in reprehenderit voluptas velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
          <Link 
            to="/produto/air-jordan-collector" 
            className="bg-pink-600 text-white py-2 px-6 rounded-md font-medium inline-block hover:bg-pink-700 transition duration-300 w-fit"
          >
            Ver Oferta
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SpecialOffer;