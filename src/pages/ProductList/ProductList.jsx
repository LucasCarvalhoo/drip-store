// src/pages/ProductList/ProductList.jsx
import { useState, useEffect } from "react";
import { ChevronRight, X, Filter, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./ProductList.module.css";

// Importação de componentes
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import ProductCard from "../../components/ProductCard/ProductCard";

const ProductList = () => {
  // Estados para controle de filtros e produtos
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    colors: [],
    brands: [],
    categories: [],
    price: null,
    gender: [],
    condition: null,
  });
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("relevancia");
  
  // Para mostrar a quantidade correta de produtos
  // Na implementação real, você poderia obter esse valor do backend
  const productCount = 2; // Quantidade padrão do ProductCard

  // Simulando carregamento
  useEffect(() => {
    // Simula um tempo de carregamento
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Função para lidar com a abertura/fechamento do filtro no mobile
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // Função para aplicar um filtro
  const handleFilterChange = (category, value) => {
    setActiveFilters((prev) => {
      const updated = { ...prev };

      // Lidar com arrays (checkboxes)
      if (Array.isArray(updated[category])) {
        if (updated[category].includes(value)) {
          updated[category] = updated[category].filter(
            (item) => item !== value
          );
        } else {
          updated[category] = [...updated[category], value];
        }
      }
      // Lidar com valores únicos (radio buttons)
      else {
        updated[category] = updated[category] === value ? null : value;
      }

      return updated;
    });
  };

  // Função para lidar com a ordenação
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <Link to="/" className="hover:text-pink-600 transition-colors">
              Home
            </Link>
            <ChevronRight size={16} className="mx-2" />
            <span className="text-gray-900 font-medium">Produtos</span>
          </div>

          {/* Título da página com contador de resultados e ordenação */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-xl font-medium">Resultados para "Tênis"</h1>
              <span className="text-sm text-gray-500">
                {productCount} produtos
              </span>
            </div>
            
            {/* Linha de ordenação e filtro mobile (agora na mesma linha) */}
            <div className="flex items-center w-full md:w-auto justify-between">
              {/* Dropdown de ordenação */}
              <div className="relative flex items-center">
                <label htmlFor="sort" className="text-sm text-gray-500 mr-2">
                  Ordenar por:
                </label>
                <div className="relative">
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={handleSortChange}
                    className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500"
                  >
                    <option value="relevancia">Relevância</option>
                    <option value="menor_preco">Menor preço</option>
                    <option value="maior_preco">Maior preço</option>
                    <option value="mais_recente">Mais recente</option>
                    <option value="mais_vendido">Mais vendido</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>
              
              {/* Botão filtro mobile - agora apenas ícone e na cor rosa */}
              <button
                onClick={toggleFilter}
                className="md:hidden bg-pink-600 text-white p-2 rounded-md hover:bg-pink-700 transition-colors"
                aria-label="Filtrar"
              >
                <Filter size={20} />
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar de filtros para desktop */}
            <aside className="hidden md:block w-64 flex-shrink-0">
              <div className="bg-white rounded-md shadow-sm p-4">
                {/* Título com linha divisória abaixo */}
                <h2 className="font-medium mb-4 pb-3 border-b border-gray-200">Filtrar por</h2>

                {/* Filtro por marca */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-3">Marca</h3>
                  <div className="space-y-2">
                    {["Adidas", "Balenciaga", "K-Swiss", "Nike", "Puma"].map(
                      (brand) => (
                        <label
                          key={brand}
                          className={`${styles.checkboxLabel} text-sm`}
                        >
                          <input
                            type="checkbox"
                            className={styles.customCheckbox}
                            checked={activeFilters.brands.includes(brand)}
                            onChange={() => handleFilterChange("brands", brand)}
                          />
                          {brand}
                        </label>
                      )
                    )}
                  </div>
                </div>

                {/* Filtro por categoria */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-3">Categoria</h3>
                  <div className="space-y-2">
                    {["Esporte e lazer", "Casual", "Utilitário", "Corrida"].map(
                      (category) => (
                        <label
                          key={category}
                          className={`${styles.checkboxLabel} text-sm`}
                        >
                          <input
                            type="checkbox"
                            className={styles.customCheckbox}
                            checked={activeFilters.categories.includes(
                              category
                            )}
                            onChange={() =>
                              handleFilterChange("categories", category)
                            }
                          />
                          {category}
                        </label>
                      )
                    )}
                  </div>
                </div>

                {/* Filtro por preço */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-3">Preço</h3>
                  <div className="space-y-2">
                    {[
                      "Até R$50",
                      "R$50 a R$100",
                      "R$100 a R$200",
                      "Acima de R$200",
                    ].map((priceRange) => (
                      <label
                        key={priceRange}
                        className={`${styles.checkboxLabel} text-sm`}
                      >
                        <input
                          type="radio"
                          name="price"
                          className={styles.customRadio}
                          checked={activeFilters.price === priceRange}
                          onChange={() =>
                            handleFilterChange("price", priceRange)
                          }
                        />
                        {priceRange}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Filtro por gênero */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-3">Gênero</h3>
                  <div className="space-y-2">
                    {["Masculino", "Feminino", "Unisex"].map((gender) => (
                      <label key={gender} className={`${styles.checkboxLabel} text-sm`}>
                        <input
                          type="checkbox"
                          className={styles.customCheckbox}
                          checked={activeFilters.gender.includes(gender)}
                          onChange={() => handleFilterChange("gender", gender)}
                        />
                        {gender}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Filtro por estado */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Estado</h3>
                  <div className="space-y-2">
                    {["Novo", "Usado"].map((condition) => (
                      <label
                        key={condition}
                        className={`${styles.checkboxLabel} text-sm`}
                      >
                        <input
                          type="radio"
                          name="condition"
                          className={styles.customRadio}
                          checked={activeFilters.condition === condition}
                          onChange={() =>
                            handleFilterChange("condition", condition)
                          }
                        />
                        {condition}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Área principal com produtos */}
            <div className="flex-grow">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
                  {[...Array(productCount)].map((_, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-md shadow-sm p-4 h-64"
                    ></div>
                  ))}
                </div>
              ) : (
                // Usando apenas um componente ProductCard, que define internamente quantos produtos exibir
                <ProductCard />
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Filtro mobile - aparece abaixo do botão como um dropdown */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={toggleFilter}></div>
          <div className="absolute top-36 left-4 right-4 bg-white rounded-md shadow-lg max-h-[70vh] overflow-y-auto">
            <div className="p-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-medium pb-3 border-b border-gray-200 w-full">Filtrar por</h2>
                <button onClick={toggleFilter} className="text-gray-500 ml-2">
                  <X size={24} />
                </button>
              </div>

              {/* Filtros mobile - mesmo conteúdo que o desktop */}
              {/* Filtro por marca */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Marca</h3>
                <div className="space-y-2">
                  {["Adidas", "Balenciaga", "K-Swiss", "Nike", "Puma"].map(
                    (brand) => (
                      <label key={brand} className={`${styles.checkboxLabel} text-sm`}>
                        <input
                          type="checkbox"
                          className={styles.customCheckbox}
                          checked={activeFilters.brands.includes(brand)}
                          onChange={() => handleFilterChange("brands", brand)}
                        />
                        {brand}
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Categoria */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Categoria</h3>
                <div className="space-y-2">
                  {["Esporte e lazer", "Casual", "Utilitário", "Corrida"].map(
                    (category) => (
                      <label
                        key={category}
                        className={`${styles.checkboxLabel} text-sm`}
                      >
                        <input
                          type="checkbox"
                          className={styles.customCheckbox}
                          checked={activeFilters.categories.includes(category)}
                          onChange={() =>
                            handleFilterChange("categories", category)
                          }
                        />
                        {category}
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Preço */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Preço</h3>
                <div className="space-y-2">
                  {[
                    "Até R$50",
                    "R$50 a R$100",
                    "R$100 a R$200",
                    "Acima de R$200",
                  ].map((priceRange) => (
                    <label
                      key={priceRange}
                      className={`${styles.checkboxLabel} text-sm`}
                    >
                      <input
                        type="radio"
                        name="price-mobile"
                        className={styles.customRadio}
                        checked={activeFilters.price === priceRange}
                        onChange={() => handleFilterChange("price", priceRange)}
                      />
                      {priceRange}
                    </label>
                  ))}
                </div>
              </div>

              {/* Gênero */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Gênero</h3>
                <div className="space-y-2">
                  {["Masculino", "Feminino", "Unisex"].map((gender) => (
                    <label key={gender} className={`${styles.checkboxLabel} text-sm`}>
                      <input
                        type="checkbox"
                        className={styles.customCheckbox}
                        checked={activeFilters.gender.includes(gender)}
                        onChange={() => handleFilterChange("gender", gender)}
                      />
                      {gender}
                    </label>
                  ))}
                </div>
              </div>

              {/* Estado */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Estado</h3>
                <div className="space-y-2">
                  {["Novo", "Usado"].map((condition) => (
                    <label
                      key={condition}
                      className={`${styles.checkboxLabel} text-sm`}
                    >
                      <input
                        type="radio"
                        name="condition-mobile"
                        className={styles.customRadio}
                        checked={activeFilters.condition === condition}
                        onChange={() =>
                          handleFilterChange("condition", condition)
                        }
                      />
                      {condition}
                    </label>
                  ))}
                </div>
              </div>

              {/* Botão para limpar filtros - único botão */}
              <div className="mt-6">
                <button
                  className="w-full py-2 text-sm text-gray-700 hover:text-pink-600 transition-colors underline"
                  onClick={() => {
                    setActiveFilters({
                      colors: [],
                      brands: [],
                      categories: [],
                      price: null,
                      gender: [],
                      condition: null,
                    });
                  }}
                >
                  Limpar Filtros
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProductList;