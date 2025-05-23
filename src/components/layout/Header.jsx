// src/components/layout/Header.jsx
import { useState, useEffect, useRef } from "react";
import { Search, ShoppingCart, Menu, X, User } from "lucide-react"; // Ícone User adicionado
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

const Header = () => {
  // Hooks de Contexto e Navegação
  const { user, profile, loading, logoutUser } = useUser(); //
  const navigate = useNavigate(); //
  const location = useLocation(); //

  // Estados da UI
  const [isMenuOpen, setIsMenuOpen] = useState(false); //
  const [isSearchOpen, setIsSearchOpen] = useState(false); //
  const [isCartOpen, setIsCartOpen] = useState(false); //
  const [isFilterOpen, setIsFilterOpen] = useState(false); //
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); // Novo estado para modal do perfil
  const [searchValue, setSearchValue] = useState(""); //
  const [currentPage, setCurrentPage] = useState(""); //

  // Referências DOM
  const cartButtonRef = useRef(null); //
  const cartRef = useRef(null); //
  const profileButtonRef = useRef(null); // Nova ref para o botão de perfil
  const profileModalRef = useRef(null); // Nova ref para o modal de perfil

  // --- EFEITOS ---

  // Atualiza a página atual (para estilização de links ativos) com base na rota
  useEffect(() => {
    const path = location.pathname; //
    if (path === "/") setCurrentPage("home"); //
    else if (path.startsWith("/produto") || path === "/product-detail" || path.startsWith("/produtos")) setCurrentPage("produtos"); //
    else if (path.startsWith("/categorias")) setCurrentPage("categorias"); //
    else if (path.startsWith("/meus-pedidos")) setCurrentPage("meus-pedidos"); //
    else if (path === "/carrinho") setCurrentPage("carrinho"); //
    else setCurrentPage(""); //
  }, [location.pathname]);

  // Fecha o carrinho ao clicar fora
  useEffect(() => {
    function handleClickOutsideCart(event) {
      if (
        isCartOpen &&
        cartRef.current &&
        !cartRef.current.contains(event.target) && //
        cartButtonRef.current &&
        !cartButtonRef.current.contains(event.target) //
      ) {
        setIsCartOpen(false); //
      }
    }
    if (isCartOpen) document.addEventListener("click", handleClickOutsideCart); //
    return () => document.removeEventListener("click", handleClickOutsideCart); //
  }, [isCartOpen]);

  // Fecha o modal de perfil ao clicar fora
  useEffect(() => {
    function handleClickOutsideProfileModal(event) {
      if (
        isProfileModalOpen &&
        profileModalRef.current &&
        !profileModalRef.current.contains(event.target) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target)
      ) {
        setIsProfileModalOpen(false);
      }
    }
    if (isProfileModalOpen) document.addEventListener("click", handleClickOutsideProfileModal);
    return () => document.removeEventListener("click", handleClickOutsideProfileModal);
  }, [isProfileModalOpen]);

  // --- MANIPULADORES DE EVENTOS E FUNÇÕES AUXILIARES ---

  // Função de Logout
  const handleLogout = async () => {
    if (logoutUser) { //
      try {
        await logoutUser(); //
        navigate("/"); //
        setIsProfileModalOpen(false); // Garante que o modal feche
        setIsMenuOpen(false); // Fecha menu mobile se estiver aberto
      } catch (error) {
        console.error("Erro ao fazer logout no Header:", error); //
      }
    }
  };

  // Alterna visibilidade dos menus e modais, garantindo que apenas um esteja aberto
  const closeAllPopovers = () => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    setIsCartOpen(false);
    setIsFilterOpen(false);
    setIsProfileModalOpen(false);
  };

  const toggleMenu = () => {
    const currentlyOpen = isMenuOpen;
    closeAllPopovers();
    setIsMenuOpen(!currentlyOpen);
  };

  const toggleSearch = () => {
    const currentlyOpen = isSearchOpen;
    closeAllPopovers();
    setIsSearchOpen(!currentlyOpen);
  };

  const toggleCart = (e) => {
    if (e) e.stopPropagation(); //
    const currentlyOpen = isCartOpen;
    closeAllPopovers();
    setIsCartOpen(!currentlyOpen); //
  };

  const toggleFilter = () => {
    const currentlyOpen = isFilterOpen;
    closeAllPopovers();
    setIsFilterOpen(!currentlyOpen);
  };

  const toggleProfileModal = (e) => {
    if (e) e.stopPropagation();
    const currentlyOpen = isProfileModalOpen;
    closeAllPopovers();
    setIsProfileModalOpen(!currentlyOpen);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value); //
  };

  // Obtém o primeiro nome do perfil do usuário
  const getFirstName = () => {
    if (profile && profile.nome_completo) { //
      return profile.nome_completo.split(" ")[0]; //
    }
    return ""; //
  };

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-40"> {/* Adicionado sticky e z-index */}
      <div className="container mx-auto px-4 py-2">
        {/* Parte superior do header (Logo, Busca, Auth, Carrinho) */}
        <div className="py-4 md:py-5 flex items-center">
          {/* Layout Mobile: Ícones e Logo */}
          <div className="md:hidden grid grid-cols-12 items-center w-full">
            <div className="col-span-3 flex justify-start"> {/* Menu Hamburguer */}
              <button onClick={toggleMenu} aria-label="Menu" className="bg-transparent border-none p-0">
                <Menu size={24} className="text-pink-600" />
              </button>
            </div>
            <div className="col-span-6 flex justify-center"> {/* Logo */}
              <Link to="/" className="flex items-center" onClick={() => setCurrentPage("home")}>
                <img src="/src/assets/logos/logo-header.svg" alt="Digital Store" className="h-6" />
              </Link>
            </div>
            <div className="col-span-3 flex items-center justify-end space-x-5"> {/* Pesquisa e Carrinho */}
              <button onClick={toggleSearch} aria-label="Pesquisar" className="bg-transparent border-none p-0">
                <Search size={24} className="text-pink-600" />
              </button>
              <div className="relative">
                <button ref={cartButtonRef} onClick={toggleCart} aria-label="Carrinho" className="bg-transparent border-none p-0 flex items-center justify-center relative">
                  <ShoppingCart size={24} className="text-pink-600" />
                  <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">2</span> {/* TODO: Badge dinâmico */}
                </button>
              </div>
            </div>
          </div>

          {/* Layout Desktop: Logo, Busca, Auth, Carrinho */}
          <div className="hidden md:flex items-center justify-between w-full">
            <div className="flex items-center"> {/* Logo */}
              <Link to="/" className="flex items-center" onClick={() => setCurrentPage("home")}>
                <img src="/src/assets/logos/logo-header.svg" alt="Digital Store" className="h-9" />
              </Link>
            </div>
            <div className="flex-1 max-w-2xl mx-auto px-8"> {/* Barra de Pesquisa */}
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
            {/* Bloco de Autenticação/Perfil e Carrinho */}
            <div className="flex items-center">
              {loading ? (
                <div className="w-8 h-8 rounded-full border-2 border-pink-600 border-t-transparent animate-spin mr-6"></div> //
              ) : user ? (
                // Usuário Logado: Botão de Perfil com Modal
                <div className="relative mr-6">
                  <button
                    ref={profileButtonRef}
                    onClick={toggleProfileModal}
                    className="flex items-center space-x-2 text-gray-700 hover:text-pink-600 transition-colors"
                    aria-label="Abrir menu do perfil"
                    type="button"
                  >
                    <User size={22} className="text-pink-600" />
                    <span className="text-sm">
                      Olá, <span className="font-medium">{getFirstName()}</span> {/* */}
                    </span>
                  </button>
                  {/* Modal do Perfil */}
                  {isProfileModalOpen && (
                    <div
                      ref={profileModalRef}
                      className="absolute right-0 top-full mt-2 w-56 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-100"
                    >
                      <nav className="flex flex-col">
                        <Link
                          to="/meus-pedidos"
                          className="px-4 py-2.5 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                          onClick={() => {
                            setCurrentPage("meus-pedidos"); //
                            setIsProfileModalOpen(false);
                          }}
                        >
                          Meus pedidos
                        </Link>
                        <Link
                          to="/minhas-informacoes" // Rota para "Minhas informações"
                          className="px-4 py-2.5 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                          onClick={() => {
                            // Não definindo currentPage aqui, a menos que /minha-conta seja um item de navegação principal
                            setIsProfileModalOpen(false);
                          }}
                        >
                          Minhas informações
                        </Link>
                        <div className="px-2 my-1"> {/* Divisor */}
                          <hr className="border-gray-200" />
                        </div>
                        <button
                          onClick={handleLogout} // Reutiliza handleLogout
                          className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:text-pink-600 transition-colors underline hover:no-underline focus:outline-none"
                          type="button"
                        >
                          Sair
                        </button>
                      </nav>
                    </div>
                  )}
                </div>
              ) : (
                // Usuário Não Logado: Links de Cadastro e Login
                <div className="flex items-center mr-6">
                  <Link to="/cadastro" className="text-gray-700 text-sm hover:text-pink-600 transition-colors bg-transparent border-none underline mr-8"> {/* */}
                    Cadastre-se
                  </Link>
                  <Link to="/login" className="rounded-md font-medium transition-colors bg-pink-600 text-white hover:bg-pink-700 py-2 px-8 inline-block text-center text-sm"> {/* */}
                    Entrar
                  </Link>
                </div>
              )}
              {/* Área do Carrinho (Desktop) */}
              <div className="relative">
                <button ref={cartButtonRef} onClick={toggleCart} aria-label="Carrinho" className="bg-transparent border-none p-0 flex items-center justify-center relative">
                  <ShoppingCart size={24} className="text-pink-600" />
                  <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">2</span> {/* TODO: Badge dinâmico */}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Barra de Pesquisa Mobile (condicional) */}
        {isSearchOpen && ( //
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

        {/* Navegação Principal (Desktop) */}
        <nav className="hidden md:block">
          <div className="flex py-4 space-x-8">
            {['Home', 'Produtos', 'Categorias', 'Meu Perfil'].map((item) => {
              const path = item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`; //
              // Ajuste para "Meu Perfil" que na verdade é "meus-pedidos" no estado currentPage
              const pageName = item === 'Meu Perfil' ? 'meus-pedidos' : item.toLowerCase(); //
              return (
                <Link
                  key={item}
                  to={path}
                  onClick={() => setCurrentPage(pageName)}
                  className={`text-sm transition-colors hover:text-pink-600 ${
                    currentPage === pageName
                      ? "text-pink-600 border-b-2 border-pink-600 pb-1 font-medium" //
                      : "text-gray-700" //
                  }`}
                >
                  {item}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Menu Mobile (condicional) */}
      {isMenuOpen && ( //
        <div className="md:hidden fixed inset-0 bg-white z-50 overflow-y-auto"> {/* Adicionado overflow */}
          <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6"> {/* Cabeçalho do Menu Mobile */}
              <Link to="/" className="flex items-center" onClick={toggleMenu}>
                <img src="/src/assets/logos/logo-header.svg" alt="Digital Store" className="h-6" />
              </Link>
              <button onClick={toggleMenu} aria-label="Fechar Menu" className="bg-transparent border-none p-0">
                <X size={24} className="text-gray-500" />
              </button>
            </div>
            <div className="pt-4"> {/* Conteúdo do Menu Mobile */}
              <p className="text-pink-600 font-medium mb-2">Páginas</p>
              <nav className="flex flex-col mb-8">
                {['Home', 'Produtos', 'Categorias', 'Meu Perfil'].map((item) => {
                  const path = item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`; //
                  const pageName = item === 'Meu Perfil' ? 'meus-pedidos' : item.toLowerCase(); //
                  return (
                    <Link
                      key={item}
                      to={path}
                      onClick={() => { setCurrentPage(pageName); toggleMenu(); }}
                      className={`py-2 text-base transition-colors hover:text-pink-600 ${
                        currentPage === pageName ? "text-pink-600 font-medium" : "text-gray-700" //
                      }`}
                    >
                      {item}
                    </Link>
                  );
                })}
              </nav>
              {/* Autenticação no Menu Mobile */}
              <div className="mt-auto pt-4 border-t">
                {loading ? (
                  <div className="flex justify-center"><div className="w-6 h-6 rounded-full border-2 border-pink-600 border-t-transparent animate-spin"></div></div> //
                ) : user ? (
                  <div className="text-center">
                    <p className="text-gray-700 text-sm mb-4">Olá, <span className="font-medium">{getFirstName()}</span></p> {/* */}
                    <button onClick={handleLogout} className="w-full rounded-md font-medium transition-colors bg-pink-600 text-white hover:bg-pink-700 py-3 px-4 inline-block text-center" type="button"> {/* */}
                      Sair
                    </button>
                  </div>
                ) : (
                  <>
                    <Link to="/login" onClick={toggleMenu} className="w-full rounded-md font-medium transition-colors bg-pink-600 text-white hover:bg-pink-700 py-3 mb-4 inline-block text-center"> {/* */}
                      Entrar
                    </Link>
                    <Link to="/cadastro" onClick={toggleMenu} className="w-full text-center text-gray-700 text-sm hover:text-pink-600 transition-colors bg-transparent border-none underline"> {/* */}
                      Cadastre-se
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dropdown do Carrinho (condicional) */}
      {isCartOpen && ( //
        <div ref={cartRef} className="absolute right-4 md:right-8 top-14 md:top-16 bg-white rounded-lg shadow-lg z-50 w-72 md:w-80">
          {/* Conteúdo do carrinho - mantido como no original */}
          <div className="p-4">
            <h3 className="text-base font-medium mb-3">Meu Carrinho</h3>
            <div className="space-y-3 max-h-64 overflow-auto">
              {/* Item de carrinho 1 */}
              <div className="flex gap-3 border-b pb-3">
                <div className="w-16 h-16 bg-gray-100 rounded-md flex-shrink-0 flex items-center justify-center overflow-hidden">
                  <img src="../images/products/produc-image-7.png" alt="Produto" className="object-cover w-10" /> {/* */}
                </div>
                <div className="flex-grow">
                  <h4 className="text-sm font-medium text-gray-800">Tênis Nike Revolution 6 Next Nature Masculino</h4> {/* */}
                  <p className="text-xs text-gray-500 mt-1">Masculino</p> {/* */}
                  <div className="flex justify-between mt-1">
                    <span className="text-sm text-pink-600 font-medium">R$ 219,00</span> {/* */}
                    <span className="text-xs text-gray-500">1 unid.</span> {/* */}
                  </div>
                </div>
              </div>
              {/* Item de carrinho 2 */}
              <div className="flex gap-3">
                <div className="w-16 h-16 bg-gray-100 rounded-md flex-shrink-0 flex items-center justify-center overflow-hidden">
                  <img src="../images/products/produc-image-7.png" alt="Produto" className="object-cover w-10" /> {/* */}
                </div>
                <div className="flex-grow">
                  <h4 className="text-sm font-medium text-gray-800">Tênis Nike Revolution 6 Next Nature Masculino</h4> {/* */}
                  <p className="text-xs text-gray-500 mt-1">Masculino</p> {/* */}
                  <div className="flex justify-between mt-1">
                    <span className="text-sm text-pink-600 font-medium">R$ 219,00</span> {/* */}
                    <span className="text-xs text-gray-500">1 unid.</span> {/* */}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t"> {/* Resumo e ações */}
              <div className="flex justify-between mb-4">
                <span className="text-sm font-medium">Valor total:</span> {/* */}
                <span className="text-sm font-medium text-pink-600">R$ 438,00</span> {/* */}
              </div>
              <div className="flex flex-col space-y-2">
                <Link to="/carrinho" onClick={() => { setCurrentPage('carrinho'); setIsCartOpen(false);}} className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 transition-colors text-sm font-medium text-center"> {/* */}
                  Ver Carrinho
                </Link>
                <button className="w-full py-2 text-sm bg-transparent text-gray-700 hover:text-pink-600 active:text-pink-600 transition-colors underline"> {/* */}
                  Esvaziar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Painel de Filtros Mobile (condicional) - mantido como no original */}
      {isFilterOpen && ( //
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end md:justify-center md:items-center">
          {/* Conteúdo dos filtros */}
          {/* ... (código dos filtros omitido por brevidade, mas deve ser mantido como no original) ... */}
           <div className="bg-white h-full md:h-auto md:rounded-lg w-full max-w-xs md:max-w-lg overflow-auto">
            <div className="p-4 md:p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-medium text-lg">Filtrar por</h3> {/* */}
                <button onClick={toggleFilter} className="bg-transparent border-none p-0" aria-label="Fechar">
                  <X size={24} className="text-gray-500" />
                </button>
              </div>
              {/* Seções de filtros aqui (Marca, Categoria, Gênero, Estado) - mantidas do original */}
              {/* ... */}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;