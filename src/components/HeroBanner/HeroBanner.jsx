import { Link } from 'react-router-dom';

const HeroBanner = () => {
  return (
    <section className="bg-gray-50 py-12 relative overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row items-center">
        {/* Conteúdo textual */}
        <div className="w-full md:w-1/2 z-10">
          <div className="mb-4">
            <span className="text-yellow-500 font-medium text-sm">Melhores ofertas personalizáveis</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Queima de estoque Nike <span className="text-2xl">🔥</span>
          </h1>
          <p className="text-gray-600 mb-6">
            Consequat culpa exercitation mollit nisi excepteur do do tempor laboris eiusmod irure consectetur.
          </p>
          <Link 
            to="/produtos/nike" 
            className="bg-pink-600 text-white py-3 px-6 rounded-md font-medium inline-block hover:bg-pink-700 transition duration-300"
          >
            Ver Ofertas
          </Link>
        </div>
        
        {/* Imagem do produto */}
        <div className="w-full md:w-1/2 mt-8 md:mt-0 relative">
          <img 
            src="/api/placeholder/500/500" 
            alt="Nike Air Force 1" 
            className="max-w-full h-auto object-contain mx-auto"
          />
          
          {/* Padrão de pontos decorativo */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
            <div className="grid grid-cols-6 gap-2">
              {[...Array(36)].map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-yellow-500"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Indicadores de slide */}
      <div className="flex justify-center mt-8 gap-2">
        <button className="w-2 h-2 rounded-full bg-pink-600"></button>
        <button className="w-2 h-2 rounded-full bg-gray-300"></button>
        <button className="w-2 h-2 rounded-full bg-gray-300"></button>
        <button className="w-2 h-2 rounded-full bg-gray-300"></button>
      </div>
    </section>
  );
};

export default HeroBanner;