import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import bgImage from './assets/background_login.jpg';
import bgVideo from './assets/background_login_video.mp4';

import './styles/Login.css';

const DEBUG_MODE = false;

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [playVideo, setPlayVideo] = useState<boolean>(false);

  const handlePlayClick = () => {
    if (DEBUG_MODE) onLogin();
    else setPlayVideo(true);
  };

  return (
    <div className="login-page">
        {!playVideo ? (
          <div className="login-wrapper">
            <img src={bgImage} alt="Login Background" className="bg-image" />

            <button onClick={handlePlayClick} className="login-btn">
              Open
            </button>
          </div>
        ) : (
          <div className="login-video-wrapper">
            <ReactPlayer
              height="100%"
              width="100%"
              onEnded={() => {
                onLogin();
              }}
              src={`https://www.youtube.com/shorts/8B1RmfQMok8`}
            />
          </div>
        )}
    </div>
  );
};

export default Login;