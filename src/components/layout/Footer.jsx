import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 px-6">
      <div className="max-w-screen-xl mx-auto">
        {/* Logo and Description Section */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="mr-2 bg-white p-1 rounded">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15.9999V7.9999C20.9996 7.64918 20.9071 7.30471 20.7315 7.00106C20.556 6.69742 20.3037 6.44526 20 6.2699L13 2.2699C12.696 2.09437 12.3511 2.00195 12 2.00195C11.6489 2.00195 11.304 2.09437 11 2.2699L4 6.2699C3.69626 6.44526 3.44398 6.69742 3.26846 7.00106C3.09294 7.30471 3.00036 7.64918 3 7.9999V15.9999C3.00036 16.3506 3.09294 16.6951 3.26846 16.9987C3.44398 17.3024 3.69626 17.5545 4 17.7299L11 21.7299C11.304 21.9054 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9054 13 21.7299L20 17.7299C20.3037 17.5545 20.556 17.3024 20.7315 16.9987C20.9071 16.6951 20.9996 16.3506 21 15.9999Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold">Digital Store</h2>
          </div>
          <p className="text-gray-400 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.
          </p>
          <div className="flex space-x-6 mb-8">
            <a href="#" className="text-white hover:text-gray-300 transition-colors duration-200">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors duration-200">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors duration-200">
              <Twitter size={20} />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-8 mb-8">
          {/* Information Section */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Informação</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Sobre Drip Store</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Segurança</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Wishlist</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Trabalhe conosco</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Meus Pedidos</a></li>
            </ul>
          </div>

          {/* Categories Section */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Informação</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Camisetas</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Calças</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Bonés</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Headphones</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Tênis</a></li>
            </ul>
          </div>
        </div>

        {/* Contact Section - Full width on mobile */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Contato</h3>
          <address className="not-italic text-gray-400">
            <p className="mb-4">Av. Santos Dumont, 1510 - 1 andar - Aldeota, Fortaleza - CE, 60150-161</p>
            <p>(85) 3051-3411</p>
          </address>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mb-6"></div>

        {/* Copyright */}
        <div className="text-center text-gray-500">
          <p>© 2022 Digital College</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;