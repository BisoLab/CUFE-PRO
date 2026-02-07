import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Star } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center max-w-4xl mx-auto space-y-12">
      
      {/* Hero Section */}
      <div className="bg-white p-8 md:p-12 border-4 border-neu-black rounded-3xl shadow-neu text-center relative overflow-hidden w-full">
        {/* Decorative Circles */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-neu-yellow rounded-full border-4 border-neu-black z-0"></div>
        <div className="absolute top-20 -left-10 w-16 h-16 bg-neu-blue rounded-full border-4 border-neu-black z-0"></div>

        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase leading-tight">
            Organize <br/> Your <span className="text-neu-orange">Chaos</span>
          </h1>
          <p className="text-xl font-medium mb-8 max-w-lg mx-auto text-gray-700">
            Welcome to your new favorite academic companion. Paste your messy schedule text from your official CUFE website and watch the magic happen.
          </p>

          <Link to="/schedule">
            <button className="bg-neu-yellow text-neu-black px-8 py-4 text-xl font-black border-4 border-neu-black rounded-xl shadow-neu hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-3 mx-auto">
              Open My Schedule <ArrowRight strokeWidth={3} />
            </button>
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <div className="bg-neu-blue p-6 border-4 border-neu-black rounded-2xl shadow-neu flex items-center gap-4">
          <div className="bg-white p-3 border-2 border-neu-black rounded-lg">
            <Zap size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold">Instant Parse</h3>
            <p className="text-sm font-medium opacity-80">Text to Table in seconds</p>
          </div>
        </div>

        <div className="bg-neu-orange p-6 border-4 border-neu-black rounded-2xl shadow-neu flex items-center gap-4">
          <div className="bg-white p-3 border-2 border-neu-black rounded-lg">
            <Star size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold">PDF Export</h3>
            <p className="text-sm font-medium opacity-80">Save and share easily</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;