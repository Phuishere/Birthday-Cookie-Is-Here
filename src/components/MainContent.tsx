import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import BirthdayCard from './ui/BirthdayCard';
import { signFnDict } from './signInfo';

// Import CSS
import '../styles/Cake.css';

// Assets
import bgCakeImage from '../assets/background_cake_1.jpg'; 
import cakeGif from '../assets/BirthdayCakeTrans.gif'; 
import CandleLogic from './ai_logic/CandleLogic';

const MainContent = () => {
    const SHOW_DEBUG = false;
    const FRAME_THRESHOLD = 60;
    const [sign] = useState<string>("CandleLogic");
    const frameCountRef = useRef<number>(0);
    const [shownFrame, setShownFrame] = useState<number>(0);
    const [signDetected, setSignDetected] = useState<boolean>(false);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const webcamRef = useRef<Webcam | null>(null);

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
                <img src={bgCakeImage} alt="Cake Background" className="cake-image" />
                
                {/* Screen 2 Overlays */}
                <div className="cake-overlay">
                    <div className="instruction-bubble">
                        <h2>Blow the cake!<br/>And wish for what you want!</h2>
                        <div className="bouncing-arrow">↓</div>
                    </div>

                    <img src={cakeGif} alt="Birthday Cake" className="cake-gif" />

                    <div className="progress-container">
                        <div 
                            className="progress-bar" 
                            style={{ width: `${(shownFrame / FRAME_THRESHOLD) * 100}%` }}
                        />
                    </div>
                </div>

                <Webcam
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={{ width: 640, height: 480, facingMode: "user" }}
                    className="hidden-webcam"
                    style={{ opacity: SHOW_DEBUG ? 0.5 : 0 }}
                />
            </div>
        </div>
    );
}

export default MainContent;