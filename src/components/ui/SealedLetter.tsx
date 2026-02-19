import React from 'react';

interface SealedLetterProps {
  isOpen: boolean;
}

const SealedLetter: React.FC<SealedLetterProps> = ({ isOpen }) => {
  return (
    <div className="relative flex items-center justify-center w-full h-screen bg-slate-900 overflow-hidden">
      
      {/* 1. Sprinkling Lights Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1.5 h-1.5 rounded-full bg-yellow-300 shadow-[0_0_8px_2px_rgba(253,224,71,0.8)] ${
              i % 2 === 0 ? 'animate-ping' : 'animate-pulse'
            }`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 2 + 1}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* 2. The Envelope Container */}
      {/* Added perspective so the 3D flip looks realistic */}
      <div className="relative w-80 h-52 mt-20" style={{ perspective: '1000px' }}>
        
        {/* Back of the envelope */}
        <div className="absolute inset-0 bg-red-800 rounded-md shadow-2xl"></div>

        {/* The Letter inside */}
        <div 
          className={`absolute left-4 right-4 bg-white rounded shadow-inner flex flex-col items-center justify-start pt-6 transition-all duration-1000 ease-in-out z-10 ${
            isOpen ? '-translate-y-32 h-64 opacity-100' : 'translate-y-2 h-48 opacity-0'
          }`}
        >
          <div className="text-4xl mb-2">🎉</div>
          <h2 className="text-2xl font-bold text-pink-500">Happy Birthday!</h2>
          <div className="w-3/4 h-px bg-gray-200 my-4"></div>
          <p className="text-gray-500 text-sm">Get ready to blow the candle...</p>
        </div>

        {/* Front Left Flap */}
        <div className="absolute left-0 bottom-0 z-20 w-0 h-0 border-y-[104px] border-l-[160px] border-y-transparent border-l-red-600 rounded-bl-md"></div>
        
        {/* Front Right Flap */}
        <div className="absolute right-0 bottom-0 z-20 w-0 h-0 border-y-[104px] border-r-[160px] border-y-transparent border-r-red-600 rounded-br-md"></div>
        
        {/* Front Bottom Flap */}
        <div className="absolute bottom-0 left-0 z-30 w-0 h-0 border-x-[160px] border-b-[110px] border-x-transparent border-b-red-500 rounded-b-md"></div>

        {/* Top Flap (The part that animates open) */}
        <div 
          className={`absolute top-0 left-0 w-0 h-0 border-x-[160px] border-t-[110px] border-x-transparent border-t-red-700 origin-top transition-transform duration-1000 ease-in-out ${
            isOpen ? '[transform:rotateX(180deg)] z-0' : 'rotate-0 z-40'
          }`}
        ></div>

        {/* Optional: A wax seal that fades out when opened */}
        <div 
          className={`absolute top-[100px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-yellow-500 rounded-full z-50 flex items-center justify-center shadow-lg border-2 border-yellow-600 transition-opacity duration-300 ${
            isOpen ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <span className="text-white text-xl font-serif">✉️</span>
        </div>

      </div>
    </div>
  );
};

export default SealedLetter;