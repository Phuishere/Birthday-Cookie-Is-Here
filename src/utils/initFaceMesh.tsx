import { FaceMesh } from "@mediapipe/face_mesh";

let faceMesh: FaceMesh | null = null;

/**
 * Fix thanks to nbjorling's post on this Github issue:
 * https://github.com/google-ai-edge/mediapipe/issues/2963 
*/
export function initiateFaceMesh() {
    if (!faceMesh) {
        console.log("SETUP NEW FACETRACKING");
        faceMesh = new FaceMesh({
            locateFile: (file: any) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
            },
        });

        faceMesh.setOptions({
            maxNumFaces: 1,
            refineLandmarks: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
        });

        faceMesh.initialize().then(() => {
            return faceMesh;
        });
    }
    else return faceMesh;
}