// src/components/layout/Header.jsx
import { useState, useEffect, useRef } from "react";
import { Search, ShoppingCart, Menu, X, Filter } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

const Header = () => {
  // Obtém o contexto do usuário
  const { user, profile, loading } = useUser();
  
  // Estados para elementos interativos
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // Referências DOM
  const cartButtonRef = useRef(null);
  const cartRef = useRef(null);

  // Localização para item de menu ativo
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState("");

  // Atualiza a página atual com base na rota
  useEffect(() => {
    const path = location.pathname;

    if (path === "/") {
      setCurrentPage("home");
    } else if (
      path.startsWith("/produto") ||
      path === "/product-detail" ||
      path.startsWith("/produtos")
    ) {
      setCurrentPage("produtos");
    } else if (path.startsWith("/categorias")) {
      setCurrentPage("categorias");
    } else if (path.startsWith("/meus-pedidos")) {
      setCurrentPage("meus-pedidos");
    } else if (path === "/carrinho") {
      setCurrentPage("carrinho");
    } else {
      setCurrentPage("");
    }
  }, [location.pathname]);

  // Funções para alternar elementos da UI
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsSearchOpen(false);
    setIsCartOpen(false);
    setIsFilterOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setIsMenuOpen(false);
    setIsCartOpen(false);
    setIsFilterOpen(false);
  };

  const toggleCart = (e) => {
    if (e) e.stopPropagation();
    
    setIsCartOpen(!isCartOpen);
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    setIsFilterOpen(false);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    setIsCartOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  // Fecha o carrinho ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        cartRef.current && 
        !cartRef.current.contains(event.target) && 
        cartButtonRef.current && 
        !cartButtonRef.current.contains(event.target) && 
        isCartOpen
      ) {
        setIsCartOpen(false);
      }
    }

    if (isCartOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartOpen]);

  // Obtém o primeiro nome do nome completo
  const getFirstName = () => {
    if (profile && profile.nome_completo) {
      return profile.nome_completo.split(' ')[0];
    }
    return "Usuário";
  };

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-2">
        {/* Parte superior do header */}
        <div className="py-4 md:py-5 flex items-center">
          {/* Layout mobile */}
          <div className="md:hidden grid grid-cols-12 items-center w-full">
            {/* Esquerda - botão menu */}
            <div className="col-span-3 flex justify-start">
              <button
                className="bg-transparent border-none p-0"
                onClick={toggleMenu}
                aria-label="Menu"
              >
                <Menu size={24} className="text-pink-600" />
              </button>
            </div>

            {/* Centro - logo */}
            <div className="col-span-6 flex justify-center">
              <Link to="/" className="flex items-center">
                <img
                  src="/src/assets/logos/logo-header.svg"
                  alt="Digital Store"
                  className="h-6"
                />
              </Link>
            </div>

            {/* Direita - ícones de pesquisa e carrinho */}
            <div className="col-span-3 flex items-center justify-end space-x-5">
              <button
                className="bg-transparent border-none p-0"
                onClick={toggleSearch}
                aria-label="Pesquisar"
              >
                <Search size={24} className="text-pink-600" />
              </button>

              <div className="relative flex items-center">
                <button
                  ref={cartButtonRef}
                  className="bg-transparent border-none p-0 flex items-center justify-center relative"
                  onClick={toggleCart}
                  aria-label="Carrinho"
                >
                  <ShoppingCart size={24} className="text-pink-600" />
                  <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    2
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Layout desktop */}
          <div className="hidden md:flex items-center justify-between w-full">
            {/* Esquerda - logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img
                  src="/src/assets/logos/logo-header.svg"
                  alt="Digital Store"
                  className="h-9"
                />
              </Link>
            </div>

            {/* Centro - barra de pesquisa */}
            <div className="flex-1 max-w-2xl mx-auto px-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Pesquisar produto..."
                  value={searchValue}
                  onChange={handleSearchChange}
                  className="w-full pl-4 pr-10 py-2.5 rounded-md bg-gray-100 focus:outline-none text-gray-800 focus:placeholder-transparent"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <Search className="text-gray-400 cursor-pointer" size={20} />
                </div>
              </div>
            </div>

            {/* Direita - autenticação ou informações do usuário */}
            <div className="flex items-center">
              {/* Renderização condicional baseada no estado de autenticação */}
              {loading ? (
                <div className="w-8 h-8 rounded-full border-2 border-pink-600 border-t-transparent animate-spin mr-8"></div>
              ) : user ? (
                <div className="flex items-center mr-8">
                  <span className="text-gray-700 font-medium">
                    Olá {getFirstName()}
                  </span>
                </div>
              ) : (
                <div className="flex items-center mr-8">
                  <Link 
                    to="/cadastro"
                    className="text-gray-700 text-sm hover:text-pink-600 transition-colors bg-transparent border-none underline mr-8"
                  >
                    Cadastre-se
                  </Link>
                  
                  <Link
                    to="/login"
                    className="rounded-md font-medium transition-colors bg-pink-600 text-white hover:bg-pink-700 py-2 px-8 inline-block text-center"
                  >
                    Entrar
                  </Link>
                </div>
              )}

              {/* Ícone do carrinho */}
              <div className="relative flex items-center">
                <button
                  ref={cartButtonRef}
                  className="bg-transparent border-none p-0 flex items-center justify-center relative"
                  onClick={toggleCart}
                  aria-label="Carrinho"
                >
                  <ShoppingCart size={24} className="text-pink-600" />
                  <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    2
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Barra de pesquisa mobile - visível apenas quando isSearchOpen é true */}
        {isSearchOpen && (
          <div className="md:hidden py-3 pb-5">
            <div className="relative">
              <input
                type="text"
                placeholder="Pesquisar produto..."
                value={searchValue}
                onChange={handleSearchChange}
                className="w-full pl-4 pr-10 py-2.5 rounded-md bg-gray-100 focus:outline-none text-gray-800 focus:placeholder-transparent"
                autoFocus
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <button className="bg-transparent border-none p-1">
                  <Search className="text-gray-400" size={20} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Navegação desktop */}
        <nav className="hidden md:block">
          <div className="flex py-4 space-x-8">
            <Link
              to="/"
              className={`text-sm transition-colors hover:text-pink-600 ${
                currentPage === "home"
                  ? "text-pink-600 border-b-2 border-pink-600 pb-1 font-medium"
                  : "text-gray-700"
              }`}
            >
              Home
            </Link>
            <Link
              to="/produtos"
              className={`text-sm transition-colors hover:text-pink-600 ${
                currentPage === "produtos"
                  ? "text-pink-600 border-b-2 border-pink-600 pb-1 font-medium"
                  : "text-gray-700"
              }`}
            >
              Produtos
            </Link>
            <Link
              to="/categorias"
              className={`text-sm transition-colors hover:text-pink-600 ${
                currentPage === "categorias"
                  ? "text-pink-600 border-b-2 border-pink-600 pb-1 font-medium"
                  : "text-gray-700"
              }`}
            >
              Categorias
            </Link>
            <Link
              to="/meus-pedidos"
              className={`text-sm transition-colors hover:text-pink-600 ${
                currentPage === "meus-pedidos"
                  ? "text-pink-600 border-b-2 border-pink-600 pb-1 font-medium"
                  : "text-gray-700"
              }`}
            >
              Meus Pedidos
            </Link>
          </div>
        </nav>
      </div>

      {/* Menu mobile - visível apenas quando isMenuOpen é true */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-50">
          <div className="container mx-auto p-4">
            {/* Cabeçalho do menu com botão de fechar */}
            <div className="flex justify-between items-center mb-6">
              <Link to="/" className="flex items-center">
                <img
                  src="/src/assets/logos/logo-header.svg"
                  alt="Digital Store"
                  className="h-6"
                />
              </Link>
              <button
                onClick={toggleMenu}
                className="bg-transparent border-none p-0"
                aria-label="Fechar"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            <div className="pt-4">
              <p className="text-pink-600 font-medium mb-2">Páginas</p>
              <nav className="flex flex-col mb-8">
                <Link
                  to="/"
                  className={`py-2 text-base transition-colors hover:text-pink-600 ${
                    currentPage === "home"
                      ? "text-pink-600 font-medium"
                      : "text-gray-700"
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/produtos"
                  className={`py-2 text-base transition-colors hover:text-pink-600 ${
                    currentPage === "produtos"
                      ? "text-pink-600 font-medium"
                      : "text-gray-700"
                  }`}
                >
                  Produtos
                </Link>
                <Link
                  to="/categorias"
                  className={`py-2 text-base transition-colors hover:text-pink-600 ${
                    currentPage === "categorias"
                      ? "text-pink-600 font-medium"
                      : "text-gray-700"
                  }`}
                >
                  Categorias
                </Link>
                <Link
                  to="/meus-pedidos"
                  className={`py-2 text-base transition-colors hover:text-pink-600 ${
                    currentPage === "meus-pedidos"
                      ? "text-pink-600 font-medium"
                      : "text-gray-700"
                  }`}
                >
                  Meus Pedidos
                </Link>
              </nav>

              {/* Renderização condicional para botões de autenticação no menu mobile */}
              <div className="mt-auto pt-4 border-t">
                {user ? (
                  <div className="text-center mb-4">
                    <p className="text-gray-700 font-medium mb-4">
                      Olá, {getFirstName()}
                    </p>
                    <Link
                      to="/perfil"
                      className="bg-pink-600 text-white py-3 px-8 rounded-md font-medium inline-block hover:bg-pink-700 transition-colors w-full"
                    >
                      Meu Perfil
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="w-full rounded-md font-medium transition-colors 
                        bg-pink-600 text-white hover:bg-pink-700 py-3 px-8 mb-4 inline-block text-center"
                    >
                      Entrar
                    </Link>

                    <Link 
                      to="/cadastro"
                      className="w-full text-center text-gray-700 text-sm hover:text-pink-600 transition-colors bg-transparent border-none underline"
                    >
                      Cadastre-se
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dropdown do carrinho - visível apenas quando isCartOpen é true */}
      {isCartOpen && (
        <div
          ref={cartRef}
          className="absolute right-4 md:right-8 top-14 md:top-16 bg-white rounded-lg shadow-lg z-50 w-72 md:w-80"
        >
          <div className="p-4">
            <h3 className="text-base font-medium mb-3">Meu Carrinho</h3>
            <div className="space-y-3 max-h-64 overflow-auto">
              {/* Itens do carrinho */}
              <div className="flex gap-3 border-b pb-3">
                <div className="w-16 h-16 bg-gray-100 rounded-md flex-shrink-0 flex items-center justify-center overflow-hidden">
                  <img
                    src="../images/products/produc-image-7.png"
                    alt="Produto"
                    className="object-cover w-10"
                  />
                </div>
                <div className="flex-grow">
                  <h4 className="text-sm font-medium text-gray-800">
                    Tênis Nike Revolution 6 Next Nature Masculino
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">Masculino</p>
                  <div className="flex justify-between mt-1">
                    <span className="text-sm text-pink-600 font-small">
                      R$ 219,00
                    </span>
                    <span className="text-xs text-gray-500">1 unid.</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-16 h-16 bg-gray-100 rounded-md flex-shrink-0 flex items-center justify-center overflow-hidden">
                  <img
                    src="../images/products/produc-image-7.png"
                    alt="Produto"
                    className="object-cover w-10/12"
                  />
                </div>
                <div className="flex-grow">
                  <h4 className="text-sm font-medium text-gray-800">
                    Tênis Nike Revolution 6 Next Nature Masculino
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">Masculino</p>
                  <div className="flex justify-between mt-1">
                    <span className="text-sm text-pink-600 font-small">
                      R$ 219,00
                    </span>
                    <span className="text-xs text-gray-500">1 unid.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Resumo e ações do carrinho */}
            <div className="mt-4 pt-3 border-t">
              <div className="flex justify-between mb-4">
                <span className="text-sm font-medium">Valor total:</span>
                <span className="text-sm font-medium text-pink-600">
                  R$ 438,00
                </span>
              </div>
              <div className="flex flex-col space-y-2">
                <Link
                  to="/carrinho"
                  className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 transition-colors text-sm font-medium text-center"
                >
                  Ver Carrinho
                </Link>
                <button className="w-full py-2 text-sm bg-transparent text-gray-700 hover:text-pink-600 active:text-pink-600 transition-colors underline">
                  Esvaziar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Painel de Filtros - visível apenas quando isFilterOpen é true */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end md:justify-center md:items-center">
          <div className="bg-white h-full md:h-auto md:rounded-lg w-full max-w-xs md:max-w-lg overflow-auto">
            <div className="p-4 md:p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-medium text-lg">Filtrar por</h3>
                <button
                  onClick={toggleFilter}
                  className="bg-transparent border-none p-0"
                  aria-label="Fechar"
                >
                  <X size={24} className="text-gray-500" />
                </button>
              </div>

              {/* Seções de filtros */}
              <div className="space-y-6">
                {/* Filtro de marca */}
                <div>
                  <h4 className="text-sm font-medium mb-3">Marca</h4>
                  <div className="space-y-2">
                    <label className="flex items-center text-sm">
                      <input
                        type="checkbox"
                        className="mr-2 rounded text-pink-600"
                        checked
                      />
                      Adidas
                    </label>
                    <label className="flex items-center text-sm">
                      <input
                        type="checkbox"
                        className="mr-2 rounded text-pink-600"
                      />
                      Balenciaga
                    </label>
                    <label className="flex items-center text-sm">
                      <input
                        type="checkbox"
                        className="mr-2 rounded text-pink-600"
                        checked
                      />
                      K-Swiss
                    </label>
                    <label className="flex items-center text-sm">
                      <input
                        type="checkbox"
                        className="mr-2 rounded text-pink-600"
                      />
                      Nike
                    </label>
                    <label className="flex items-center text-sm">
                      <input
                        type="checkbox"
                        className="mr-2 rounded text-pink-600"
                      />
                      Puma
                    </label>
                  </div>
                </div>

                {/* Filtro de categoria */}
                <div>
                  <h4 className="text-sm font-medium mb-3">Categoria</h4>
                  <div className="space-y-2">
                    <label className="flex items-center text-sm">
                      <input
                        type="checkbox"
                        className="mr-2 rounded text-pink-600"
                        checked
                      />
                      Esporte e lazer
                    </label>
                    <label className="flex items-center text-sm">
                      <input
                        type="checkbox"
                        className="mr-2 rounded text-pink-600"
                      />
                      Casual
                    </label>
                    <label className="flex items-center text-sm">
                      <input
                        type="checkbox"
                        className="mr-2 rounded text-pink-600"
                      />
                      Utilitário
                    </label>
                    <label className="flex items-center text-sm">
                      <input
                        type="checkbox"
                        className="mr-2 rounded text-pink-600"
                      />
                      Corrida
                    </label>
                  </div>
                </div>

                {/* Filtro de gênero */}
                <div>
                  <h4 className="text-sm font-medium mb-3">Gênero</h4>
                  <div className="space-y-2">
                    <label className="flex items-center text-sm">
                      <input
                        type="checkbox"
                        className="mr-2 rounded text-pink-600"
                        checked
                      />
                      Masculino
                    </label>
                    <label className="flex items-center text-sm">
                      <input
                        type="checkbox"
                        className="mr-2 rounded text-pink-600"
                        checked
                      />
                      Feminino
                    </label>
                    <label className="flex items-center text-sm">
                      <input
                        type="checkbox"
                        className="mr-2 rounded text-pink-600"
                      />
                      Unisex
                    </label>
                  </div>
                </div>

                {/* Filtro de estado */}
                <div>
                  <h4 className="text-sm font-medium mb-3">Estado</h4>
                  <div className="space-y-2">
                    <label className="flex items-center text-sm">
                      <input
                        type="radio"
                        name="condition"
                        className="mr-2 text-pink-600"
                        checked
                      />
                      Novo
                    </label>
                    <label className="flex items-center text-sm">
                      <input
                        type="radio"
                        name="condition"
                        className="mr-2 text-pink-600"
                      />
                      Usado
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;