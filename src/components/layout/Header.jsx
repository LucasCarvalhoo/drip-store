"use client"

// src/components/layout/Header.jsx
import { useState } from "react"
import { Search, ShoppingCart, Menu, X } from "lucide-react"

const Header = () => {
  // Estados para controlar os menus mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  // Estado atual da página (simulado, seria controlado por rotas)
  const currentPage = "produtos" // Isso seria dinâmico com React Router

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    setIsSearchOpen(false)
    setIsCartOpen(false)
    setIsFilterOpen(false)
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
    setIsMenuOpen(false)
    setIsCartOpen(false)
    setIsFilterOpen(false)
  }

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
    setIsMenuOpen(false)
    setIsSearchOpen(false)
    setIsFilterOpen(false)
  }

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen)
    setIsMenuOpen(false)
    setIsSearchOpen(false)
    setIsCartOpen(false)
  }

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value)
  }

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-2">
        {/* Parte superior do header */}
        <div className="py-4 md:py-5 flex items-center">
          {/* Mobile layout */}
          <div className="md:hidden grid grid-cols-12 items-center w-full">
            {/* Área esquerda - menu sanduíche (3 colunas) */}
            <div className="col-span-3 flex justify-start">
              <button className="bg-transparent border-none p-0" onClick={toggleMenu} aria-label="Menu">
                <Menu size={24} className="text-pink-600" />
              </button>
            </div>

            {/* Área central - logo centralizada (6 colunas) */}
            <div className="col-span-6 flex justify-center">
              <a href="/" className="flex items-center">
                <img src="/src/assets/logos/logo-header.svg" alt="Digital Store" className="h-6" />
              </a>
            </div>

            {/* Área direita - ícones de pesquisa e carrinho (3 colunas) */}
            <div className="col-span-3 flex items-center justify-end space-x-5">
              <button className="bg-transparent border-none p-0" onClick={toggleSearch} aria-label="Pesquisar">
                <Search size={24} className="text-pink-600" />
              </button>

              <div className="relative flex items-center">
                <button
                  className="bg-transparent border-none p-0 flex items-center justify-center"
                  onClick={toggleCart}
                  aria-label="Carrinho"
                >
                  <ShoppingCart size={24} className="text-pink-600" />
                </button>
                {/* Badge do carrinho no mobile */}
                <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  2
                </span>
              </div>
            </div>
          </div>

          {/* Desktop layout */}
          <div className="hidden md:flex items-center justify-between w-full">
            {/* Lado esquerdo com logo */}
            <div className="flex items-center">
              <a href="/" className="flex items-center">
                <img src="/src/assets/logos/logo-header.svg" alt="Digital Store" className="h-9" />
              </a>
            </div>

            {/* Barra de pesquisa centralizada */}
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

            {/* Lado direito com autenticação e carrinho */}
            <div className="flex items-center">
              <div className="flex items-center mr-8">
                <button className="text-gray-700 text-sm hover:text-pink-600 transition-colors bg-transparent border-none underline mr-8">
                  Cadastre-se
                </button>

                <button
                  className="rounded-md font-medium transition-colors 
                    bg-pink-600 text-white hover:bg-pink-700 py-2 px-8"
                >
                  Entrar
                </button>
              </div>

              {/* Área do carrinho */}
              <div className="relative flex items-center">
                <button
                  className="bg-transparent border-none p-0 flex items-center justify-center"
                  onClick={toggleCart}
                  aria-label="Carrinho"
                >
                  <ShoppingCart size={24} className="text-pink-600" />
                </button>
                {/* Badge do carrinho no desktop */}
                <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  2
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Barra de pesquisa mobile */}
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
            <a
              href="/"
              className={`text-sm transition-colors hover:text-pink-600 ${
                currentPage === "home" ? "text-pink-600 border-b-2 border-pink-600 pb-1 font-medium" : "text-gray-700"
              }`}
            >
              Home
            </a>
            <a
              href="/produtos"
              className={`text-sm transition-colors hover:text-pink-600 ${
                currentPage === "produtos"
                  ? "text-pink-600 border-b-2 border-pink-600 pb-1 font-medium"
                  : "text-gray-700"
              }`}
            >
              Produtos
            </a>
            <a
              href="/categorias"
              className={`text-sm transition-colors hover:text-pink-600 ${
                currentPage === "categorias"
                  ? "text-pink-600 border-b-2 border-pink-600 pb-1 font-medium"
                  : "text-gray-700"
              }`}
            >
              Categorias
            </a>
            <a
              href="/meus-pedidos"
              className={`text-sm transition-colors hover:text-pink-600 ${
                currentPage === "meus-pedidos"
                  ? "text-pink-600 border-b-2 border-pink-600 pb-1 font-medium"
                  : "text-gray-700"
              }`}
            >
              Meus Pedidos
            </a>
          </div>
        </nav>
      </div>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-50">
          <div className="container mx-auto p-4">
            {/* Cabeçalho do menu com botão de fechar */}
            <div className="flex justify-between items-center mb-6">
              <a href="/" className="flex items-center">
                <img src="/src/assets/logos/logo-header.svg" alt="Digital Store" className="h-6" />
              </a>
              <button onClick={toggleMenu} className="bg-transparent border-none p-0" aria-label="Fechar">
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            <div className="pt-4">
              <p className="text-pink-600 font-medium mb-2">Páginas</p>
              <nav className="flex flex-col mb-8">
                <a
                  href="/"
                  className={`py-2 text-base transition-colors hover:text-pink-600 ${
                    currentPage === "home" ? "text-pink-600 font-medium" : "text-gray-700"
                  }`}
                >
                  Home
                </a>
                <a
                  href="/produtos"
                  className={`py-2 text-base transition-colors hover:text-pink-600 ${
                    currentPage === "produtos" ? "text-pink-600 font-medium" : "text-gray-700"
                  }`}
                >
                  Produtos
                </a>
                <a
                  href="/categorias"
                  className={`py-2 text-base transition-colors hover:text-pink-600 ${
                    currentPage === "categorias" ? "text-pink-600 font-medium" : "text-gray-700"
                  }`}
                >
                  Categorias
                </a>
                <a
                  href="/meus-pedidos"
                  className={`py-2 text-base transition-colors hover:text-pink-600 ${
                    currentPage === "meus-pedidos" ? "text-pink-600 font-medium" : "text-gray-700"
                  }`}
                >
                  Meus Pedidos
                </a>
              </nav>

              <div className="mt-auto pt-4 border-t">
                <button
                  className="w-full rounded-md font-medium transition-colors 
                    bg-pink-600 text-white hover:bg-pink-700 py-3 mb-4"
                >
                  Entrar
                </button>

                <button className="w-full text-center text-gray-700 text-sm hover:text-pink-600 transition-colors bg-transparent border-none underline">
                  Cadastre-se
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Carrinho dropdown */}
      {isCartOpen && (
        <div className="absolute right-4 md:right-8 top-16 md:top-20 bg-white rounded-md shadow-lg z-50 w-80">
          <div className="p-4">
            <h3 className="text-lg font-medium mb-3">Meu Carrinho (2)</h3>
            <div className="space-y-3 max-h-64 overflow-auto">
              {/* Item de carrinho 1 */}
              <div className="flex gap-3 border-b pb-3">
                <div className="w-16 h-16 bg-gray-100 rounded-md flex-shrink-0 flex items-center justify-center">
                  <img src="/src/assets/products/product-thumb.jpg" alt="Produto" className="max-h-14" />
                </div>
                <div className="flex-grow">
                  <h4 className="text-sm font-medium">Tênis Nike Air Force</h4>
                  <p className="text-xs text-gray-500">Tamanho: 42</p>
                  <div className="flex justify-between mt-1">
                    <span className="text-sm text-pink-600 font-medium">R$ 499,99</span>
                    <span className="text-xs">Qtd: 1</span>
                  </div>
                </div>
              </div>

              {/* Item de carrinho 2 */}
              <div className="flex gap-3">
                <div className="w-16 h-16 bg-gray-100 rounded-md flex-shrink-0 flex items-center justify-center">
                  <img src="/src/assets/products/product-thumb2.jpg" alt="Produto" className="max-h-14" />
                </div>
                <div className="flex-grow">
                  <h4 className="text-sm font-medium">Camiseta Adidas Originals</h4>
                  <p className="text-xs text-gray-500">Tamanho: M</p>
                  <div className="flex justify-between mt-1">
                    <span className="text-sm text-pink-600 font-medium">R$ 149,90</span>
                    <span className="text-xs">Qtd: 1</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t">
              <div className="flex justify-between mb-4">
                <span className="text-sm">Subtotal:</span>
                <span className="text-sm font-medium">R$ 649,89</span>
              </div>
              <button className="w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700 transition-colors">
                Finalizar Compra
              </button>

              <button className="w-full py-2 mt-2 text-sm bg-transparent border-none text-pink-600 hover:text-pink-700 transition-colors">
                Ver Carrinho Completo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Painel de Filtros Mobile */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end md:justify-center md:items-center">
          <div className="bg-white h-full md:h-auto md:rounded-lg w-full max-w-xs md:max-w-lg overflow-auto">
            <div className="p-4 md:p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-medium text-lg">Filtrar por</h3>
                <button onClick={toggleFilter} className="bg-transparent border-none p-0" aria-label="Fechar">
                  <X size={24} className="text-gray-500" />
                </button>
              </div>

              {/* Filtros */}
              <div className="space-y-6">
                {/* Filtro de marca */}
                <div>
                  <h4 className="text-sm font-medium mb-3">Marca</h4>
                  <div className="space-y-2">
                    <label className="flex items-center text-sm">
                      <input type="checkbox" className="mr-2 rounded text-pink-600" checked />
                      Adidas
                    </label>
                    <label className="flex items-center text-sm">
                      <input type="checkbox" className="mr-2 rounded text-pink-600" />
                      Balenciaga
                    </label>
                    <label className="flex items-center text-sm">
                      <input type="checkbox" className="mr-2 rounded text-pink-600" checked />
                      K-Swiss
                    </label>
                    <label className="flex items-center text-sm">
                      <input type="checkbox" className="mr-2 rounded text-pink-600" />
                      Nike
                    </label>
                    <label className="flex items-center text-sm">
                      <input type="checkbox" className="mr-2 rounded text-pink-600" />
                      Puma
                    </label>
                  </div>
                </div>

                {/* Filtro de categoria */}
                <div>
                  <h4 className="text-sm font-medium mb-3">Categoria</h4>
                  <div className="space-y-2">
                    <label className="flex items-center text-sm">
                      <input type="checkbox" className="mr-2 rounded text-pink-600" checked />
                      Esporte e lazer
                    </label>
                    <label className="flex items-center text-sm">
                      <input type="checkbox" className="mr-2 rounded text-pink-600" />
                      Casual
                    </label>
                    <label className="flex items-center text-sm">
                      <input type="checkbox" className="mr-2 rounded text-pink-600" />
                      Utilitário
                    </label>
                    <label className="flex items-center text-sm">
                      <input type="checkbox" className="mr-2 rounded text-pink-600" />
                      Corrida
                    </label>
                  </div>
                </div>

                {/* Filtro de gênero */}
                <div>
                  <h4 className="text-sm font-medium mb-3">Gênero</h4>
                  <div className="space-y-2">
                    <label className="flex items-center text-sm">
                      <input type="checkbox" className="mr-2 rounded text-pink-600" checked />
                      Masculino
                    </label>
                    <label className="flex items-center text-sm">
                      <input type="checkbox" className="mr-2 rounded text-pink-600" checked />
                      Feminino
                    </label>
                    <label className="flex items-center text-sm">
                      <input type="checkbox" className="mr-2 rounded text-pink-600" />
                      Unisex
                    </label>
                  </div>
                </div>

                {/* Filtro de estado */}
                <div>
                  <h4 className="text-sm font-medium mb-3">Estado</h4>
                  <div className="space-y-2">
                    <label className="flex items-center text-sm">
                      <input type="radio" name="condition" className="mr-2 text-pink-600" checked />
                      Novo
                    </label>
                    <label className="flex items-center text-sm">
                      <input type="radio" name="condition" className="mr-2 text-pink-600" />
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
  )
}

export default Header
