import React, { useState } from 'react';
import bgImage from './assets/background_login.jpg';
import bgVideo from './assets/background_login_video.mp4';

import './styles/Login.css';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [playVideo, setPlayVideo] = useState<boolean>(false);

  const handlePlayClick = () => {
    // setPlayVideo(true);
    onLogin();
  };

  return (
    <div className="login-page">
      <div className="image-wrapper">
        {!playVideo ? (
          <img src={bgImage} alt="Login Background" className="bg-image" />
        ) : (
          <video
            src={bgVideo}
            className="bg-image" 
            autoPlay 
            playsInline
            onEnded={onLogin} /* Triggers onLogin EXACTLY when the video finishes */
          />
        )}
        
        {/* Fixed JSX conditional rendering and wired it to handlePlayClick */}
        {!playVideo && (
          <button onClick={handlePlayClick} className="login-btn">
            Open
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;