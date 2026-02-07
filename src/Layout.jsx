import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Calendar, Instagram} from 'lucide-react';

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const navItems = [
    { name: 'Home', path: '/', icon: <Home size={20} /> },
    { name: 'My Schedule', path: '/schedule', icon: <Calendar size={20} /> },
  ];

  return (
    <div className="flex h-screen overflow-hidden font-bold font-sans bg-[#fdfdfd]">
      
      {/* 1. OVERLAY (Click outside to close) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 2. SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white border-r-4 border-neu-black
        transform transition-transform duration-300 ease-in-out shadow-[10px_0px_20px_rgba(0,0,0,0.1)]
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Sidebar Header */}
        <div className="p-6 border-b-4 border-neu-black bg-neu-yellow flex justify-between items-center">
          <h1 className="text-2xl tracking-tighter">CUFE<span className="text-neu-orange">PRO</span></h1>
          <button 
            onClick={() => setIsOpen(false)} 
            className="p-1 hover:bg-black/10 rounded border-2 border-transparent hover:border-neu-black transition-all"
          >
            <X size={24}/>
          </button>
        </div>
        
        {/* Navigation Links */}
        <nav className="p-4 space-y-4">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`
                flex items-center gap-3 p-4 rounded-xl border-2 border-neu-black
                hover:shadow-neu transition-all active:translate-x-1 active:translate-y-1
                ${location.pathname === item.path ? 'bg-neu-blue' : 'bg-white hover:bg-gray-50'}
              `}
            >
              {item.icon}
              <span className="text-lg">{item.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* 3. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-full w-full relative">
        
        {/* Top Header Bar */}
        <header className="p-4 bg-white border-b-4 border-neu-black flex items-center justify-between z-30 sticky top-0 h-20">
          <div className="flex-1">
             <button 
                onClick={toggleSidebar} 
                className="p-2 bg-neu-yellow border-2 border-neu-black rounded-lg active:shadow-none shadow-neu hover:bg-neu-orange transition-colors"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div className="flex-shrink-0">
            <h1 className="text-3xl font-black tracking-tighter">
                CUFE <span className="text-neu-orange">PRO</span>
            </h1>
          </div>

          <div className="flex-1"></div>
        </header>

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col">
          <div className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
            {children}
          </div>

          {/* 4. GLOBAL FOOTER */}
          <footer className="w-full bg-neu-black text-white p-4 border-t-4 border-neu-black mt-auto">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
                <div className="text-center md:text-left">
                    <h2 className="text-lg font-black text-neu-yellow">Made by Biso.</h2>
                </div>

                <div className="flex gap-3">
                    <SocialIcon url="https://instagram.com/basselalaax"     icon={<Instagram size={18} />} color="hover:text-neu-orange" />
                    <SocialIcon url="https://facebook.com/bassel.alaa.961"  icon={<span className="font-bold text-xl leading-none font-sans">f </span>} color="hover:text-neu-blue" />
                    <SocialIcon url="https://behance.net/bisobrands"        icon={<span className="font-bold text-xl leading-none font-sans">Be</span>} color="hover:text-neu-yellow" /> 
                    <SocialIcon url="https://linkedin.com/in/basselalaax"   icon={<span className="font-bold text-xl leading-none font-sans">in</span>} color="hover:text-purple-400" />
                </div>
            </div>
          </footer>
        </main>

      </div>
    </div>
  );
};
// Helper Component for Social Icons
const SocialIcon = ({ icon, color, url }) => (
    <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`w-10 h-10 flex items-center justify-center bg-[#333] rounded-lg border-2 border-transparent hover:border-white transition-all transform hover:-translate-y-1 ${color}`}
    >
        {icon}
    </a>
);

export default Layout;