import { useRef, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import Webcam from 'react-webcam';
import CandleLogic from './ai_logic/CandleLogic';

// Import CSS
import '../styles/Cake.css';

// Assets
import bgCakeImage from '../assets/background_cake.jpg';
import cakeGif from '../assets/BirthdayCakeTrans.gif';
import cakeOffGif from '../assets/BirthdayCakeOffTrans.gif';
import dancingCat from '../assets/DancingCat.gif';

const MainContent = () => {
    const SHOW_DEBUG = false;
    const FRAME_THRESHOLD = 60;
    const [sign] = useState<string>("CandleLogic");
    const frameCountRef = useRef<number>(0);
    const [shownFrame, setShownFrame] = useState<number>(0);
    const [signDetected, setSignDetected] = useState<boolean>(false);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const webcamRef = useRef<Webcam | null>(null);

    const onCakeButtonClick = () => {
        // This replaces the current page with YouTube
        window.location.href = "https://www.youtube.com/shorts/sWNoQ2YGpvI";
    };

    let arr = Array.from({ length: Math.ceil(FRAME_THRESHOLD / 3) }, (_, i) => i * 3 + 3);
    if (arr[arr.length - 1] !== FRAME_THRESHOLD) arr.push(FRAME_THRESHOLD);

    const increaseFrameCountRef = () => {
        if (!signDetected) {
            frameCountRef.current += 1;
            if (arr.includes(frameCountRef.current)) setShownFrame(frameCountRef.current);
            if (frameCountRef.current >= FRAME_THRESHOLD) setSignDetected(true);
        }
    };
    
    const decreaseFrameCountRef = () => {
        if (!signDetected) {
            frameCountRef.current = (frameCountRef.current > 0) ? frameCountRef.current - 1 : 0;
            if (arr.includes(frameCountRef.current)) setShownFrame(frameCountRef.current);
        }
    };

    useEffect(() => {
        if (!webcamRef.current || !webcamRef.current.video) return;
        const tools = {
            webcam: webcamRef,
            increase: increaseFrameCountRef,
            decrease: decreaseFrameCountRef,
            countRef: frameCountRef,
            frameThreshold: FRAME_THRESHOLD,
            onDetected: (img: string) => {
                setCapturedImage(img);
                setSignDetected(true);
            }
        };
        // const stopAILogic = signFnDict[sign](tools);
        const stopAILogic = CandleLogic(tools);
        return () => {
            frameCountRef.current = 0;
            stopAILogic();
        }
    }, [sign]);

    return (
        <div className="cake-page"> {/* Reusing light blue background from Login.css */}
            <div className="cake-image-wrapper"> {/* Reusing centered image logic */}
                <img src={bgCakeImage} alt="Cake Background" className="bg-cake-image" />
                
                {/* Screen 2 Overlays */}
                <div className="cake-overlay">
                    <div className="instruction-bubble">
                        <h2>Blow the cake!<br/>And wish for what you want!</h2>
                        <div className="bouncing-arrow">↓</div>
                    </div>

                    <img src={!signDetected ? cakeGif : cakeOffGif} alt="Birthday Cake" className="cake-gif" />

                    <div className="progress-container">
                        <div 
                            className="progress-bar" 
                            style={{ width: `${(shownFrame / FRAME_THRESHOLD) * 100}%` }}
                        />
                    </div>

                    {/* Prank Overlay when sign is detected */}
                    {signDetected && capturedImage && (
                        <>
                            <div className="prank-container">
                                <div className="captured-photo-wrapper">
                                    <img 
                                        src={capturedImage} 
                                        alt="Gotcha!" 
                                        className="captured-photo" 
                                    />
                                    <img 
                                        src={dancingCat} 
                                        alt="Dancing Cat" 
                                        className="cat-gif" 
                                    />
                                </div>
                                <div className="cake-btn" onClick={ onCakeButtonClick }>To Last Video</div>
                            </div>
                        </>
                    )}
                </div>

                <Webcam
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={{ width: 640, height: 480, facingMode: "user" }}
                    className="hidden-webcam"
                    // For mobile
                    playsInline
                    muted
                    // For debuging
                    style={{ zIndex: SHOW_DEBUG ? 100 : -999 }}
                />
            </div>
        </div>
    );
}

export default MainContent;