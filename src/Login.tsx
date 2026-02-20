import React, { useState } from 'react';
import bgImage from './assets/background_login.jpg';
import bgVideo from './assets/background_login_video.mp4';

import './styles/Login.css';

const DEBUG_MODE = true;

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [playVideo, setPlayVideo] = useState<boolean>(false);

  const handlePlayClick = () => {
    if (DEBUG_MODE) setPlayVideo(true);
    else setPlayVideo(true);
  };

  return (
    <div className="login-page">
      <div className="image-wrapper">
        {!playVideo ? (
          <img src={bgImage} alt="Login Background" className="bg-image" />
        ) : (
          <div className="video-responsive">
            <iframe
              className="bg-image"
              src={`https://www.youtube.com/shorts/8B1RmfQMok8`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          </div>
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