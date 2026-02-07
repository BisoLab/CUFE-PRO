import React, { useState } from 'react';
import { PlusCircle, X } from 'lucide-react';
import ScheduleComponent from './ScheduleComponent';

const SchedulePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasSchedule, setHasSchedule] = useState(false);
  
  // State for the inputs
  const [name, setName] = useState('');
  const [rawText, setRawText] = useState('');

  // Final Data passed to component
  const [finalData, setFinalData] = useState({ name: '', text: '' });

  const handleSubmit = () => {
    if(!name || !rawText) return alert("Please fill in both fields");
    setFinalData({ name, text: rawText });
    setHasSchedule(true);
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto">
      
      {!hasSchedule ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6">
            <div className="w-24 h-24 bg-neu-yellow border-4 border-neu-black rounded-full flex items-center justify-center shadow-neu mb-4">
                <PlusCircle size={48} />
            </div>
            <h2 className="text-3xl font-black">No Schedule Found</h2>
            <p className="text-gray-600 max-w-md">You haven't imported your schedule yet. Click the button below to paste your data.</p>
            
            <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-neu-blue text-neu-black text-lg px-8 py-3 font-bold border-4 border-neu-black rounded-xl shadow-neu hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
                Enter Your Schedule
            </button>
        </div>
      ) : (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="text-sm font-bold underline hover:text-neu-orange"
                >
                    Edit / Re-upload Data
                </button>
            </div>
            <ScheduleComponent rawScheduleData={finalData.text} studentName={finalData.name} />
        </div>
      )}

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white w-full max-w-lg border-4 border-neu-black rounded-2xl shadow-[8px_8px_0px_0px_rgba(255,222,89,1)] relative animate-in fade-in zoom-in duration-300">
                <button 
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-lg"
                >
                    <X size={24} />
                </button>

                <div className="p-8 space-y-6">
                    <h3 className="text-2xl font-black uppercase border-b-4 border-neu-yellow inline-block pr-8">Import Schedule</h3>
                    
                    <div>
                        <label className="block text-sm font-bold mb-2">Your Name</label>
                        <input 
                            type="text" 
                            className="w-full bg-gray-50 border-2 border-neu-black rounded-lg p-3 focus:outline-none focus:ring-4 ring-neu-yellow/50 transition-all font-bold"
                            placeholder="ex. Biso"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2">Paste Schedule Text</label>
                        <textarea 
                            className="w-full h-40 bg-gray-50 border-2 border-neu-black rounded-lg p-3 focus:outline-none focus:ring-4 ring-neu-yellow/50 transition-all font-mono text-xs"
                            placeholder="Paste the raw text here..."
                            value={rawText}
                            onChange={(e) => setRawText(e.target.value)}
                        />
                        <p className="text-xs text-gray-500 mt-2">Make sure to copy the full text block starting with the day.</p>
                    </div>

                    <button 
                        onClick={handleSubmit}
                        className="w-full bg-neu-black text-white py-4 font-bold rounded-xl text-lg hover:bg-neu-orange hover:text-black border-2 border-transparent hover:border-black transition-all"
                    >
                        OK, Render It!
                    </button>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

export default SchedulePage;