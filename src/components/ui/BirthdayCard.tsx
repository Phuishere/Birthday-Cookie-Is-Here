import React, { CSSProperties } from 'react';

import cakeLit from '../../assets/BirthdayCakeTrans.gif';
import cakeOff from '../../assets/BirthdayCakeOffTrans.gif';
import catMeme from '../../assets/CatLaughing.gif';

interface BirthdayCardProps {
  isLit: boolean;
  onReset: (() => void);
  userPhoto: string | null;
}

const BirthdayCard = (
  { isLit, onReset, userPhoto }: BirthdayCardProps
) => {
  // --- STYLES ---
  const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    position: 'relative',
    overflow: 'hidden'
  };

  const memeContainerStyle: CSSProperties = {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    width: '300px',
    height: 'auto',
    animation: 'popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)', // Bouncy entrance
    zIndex: 100
  };

  const polaroidStyle: CSSProperties = {
    backgroundColor: 'white',
    padding: '10px 10px 40px 10px', // Extra bottom padding for "Polaroid" look
    boxShadow: '5px 5px 15px rgba(0,0,0,0.3)',
    transform: 'rotate(-5deg)',
    width: '200px',
  };

  const catStyle: CSSProperties = {
    position: 'absolute',
    bottom: '-10px',
    left: '-80px', // Position the cat to the left of the photo
    width: '150px',
    transform: 'scaleX(-1)', // Flip cat to point right (at the photo)
    filter: 'drop-shadow(2px 2px 0px white)' // Outline to make it pop
  };

  return (
    <div style={containerStyle}>
      
      {/* 1. THE MAIN MESSAGE */}
      <h1 style={{ fontSize: '3rem', zIndex: 10, textAlign: 'center' }}>
        {isLit ? "Blow the candle!" : "GOTCHA! 📸"}
      </h1>

      {/* 2. THE CAKE GIFS */}
      <div onClick={onReset} style={{ cursor: 'pointer', margin: '30px' }}>
        {isLit ? (
            // Replace with your actual GIF path
            <img src={cakeLit} alt="Lit Cake" width="300" />
        ) : (
            <img src={cakeOff} alt="Off Cake" width="300" />
        )}
      </div>

      {/* 3. THE MEME TRAP (Only shows when unlit) */}
      {!isLit && userPhoto && (
        <div style={memeContainerStyle}>
          
          {/* The Cat Pointing */}
          <img 
            src={catMeme} // Placeholder for Laughing Cat
            alt="Laughing Cat" 
            style={catStyle} 
          />

          {/* The User's Face in a Polaroid */}
          <div style={polaroidStyle}>
            <img 
              src={userPhoto} 
              alt="You Blowing" 
              style={{ width: '100%', height: 'auto', display: 'block', filter: 'grayscale(100%) contrast(1.2)' }} 
            />
            <div style={{ color: 'black', fontFamily: 'Comic Sans MS, cursive', marginTop: '10px', textAlign: 'center' }}>
                Look at this dude
            </div>
          </div>

        </div>
      )}

      {/* 4. RESET BUTTON */}
      {!isLit && (
        <button onClick={onReset} style={{ marginTop: '20px', padding: '10px 20px' }}>
          Again?
        </button>
      )}

      {/* CSS Animation Keyframes for the Pop-in */}
      <style>{`
        @keyframes popIn {
          0% { transform: scale(0) rotate(180deg); opacity: 0; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default BirthdayCard;