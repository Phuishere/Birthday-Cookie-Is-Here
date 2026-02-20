import {
    Results,
    NormalizedLandmarkList,
} from '@mediapipe/face_mesh';

import { Camera } from '@mediapipe/camera_utils';
import { AILogicFn } from '../../types';
import { initiateFaceMesh } from '../../utils/initFaceMesh';

export const candleMetrics = {
    "metricThreshold": 1.3,
    "shownName": "Blowing Candle",
}

const CandleLogic: AILogicFn = (
    { webcam, increase, decrease, countRef, frameThreshold, onDetected }
) => {
    // Metric threshold
    const METRIC_THRESHOLD = candleMetrics["metricThreshold"];

    // Safeguard when the sign is detected yayy
    let isFinished = false;

    // Face Mesh's onResults function
    const onResults: ((Results) => void) = (results: Results) => {
        // Log to console so you can see if it's running (Press F12 in browser)
        // console.log("Face found:", results.multiFaceLandmarks.length); 

        if (
            results.multiFaceLandmarks &&
            results.multiFaceLandmarks.length > 0 &&
            results.multiFaceLandmarks[0]
        ) {
            const landmarks: NormalizedLandmarkList = results.multiFaceLandmarks[0];
    
            const rightCorner = landmarks[61];
            const leftCorner = landmarks[291];
            const upperLip = landmarks[0];
            const lowerLip = landmarks[17];

            // Null check
            if (!rightCorner || !leftCorner || !upperLip || !lowerLip) return;
    
            const width = Math.hypot(rightCorner.x - leftCorner.x, rightCorner.y - leftCorner.y);
            const height = Math.hypot(upperLip.x - lowerLip.x, upperLip.y - lowerLip.y);
    
            let ratio = 0;
            if (height > 0) ratio = width / height;

            // If width is lower than height (0 mouth)
            if (ratio < METRIC_THRESHOLD) {
                increase();
                
                if (countRef.current >= frameThreshold) {
                    const imageSrc = webcam.current?.getScreenshot();
                    if (imageSrc)
                    {
                        isFinished = true;
                        onDetected(imageSrc);
                    }
                }
            } else {
                decrease();
            }
        } else decrease(); // No face found
    };

    // Downloading Face Mesh from online source
    // And logic to not double-initiate it (see the utils/initiateFaceMesh)
    const faceMesh = initiateFaceMesh();
    if (!faceMesh) return () => {};;

    faceMesh.onResults(onResults);

    const camera = new Camera(webcam.current!.video!, {
        onFrame: async () => {
            if (
                !(isFinished) &&
                webcam.current &&
                webcam.current.video
            ) await faceMesh.send({ image: webcam.current.video });
        },
        width: 640,
        height: 480,
    });

    // A camera function to start
    const startCamera = () => {
        if (webcam.current && webcam.current.video && webcam.current.video.readyState === 4) camera.start();
        else setTimeout(startCamera, 100);
    };
    startCamera();

    // Cleanup function for dis React useEffect
    return () => {
        faceMesh.close();
        camera.stop();
    };
};

export default CandleLogic;