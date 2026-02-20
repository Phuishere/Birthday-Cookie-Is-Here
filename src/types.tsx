import { FaceMesh } from '@mediapipe/face_mesh';
import Webcam from 'react-webcam';

export interface LoginProps {
    onLogin: (() => void)
}

export interface AITools {
    webcam: React.RefObject<Webcam | null>;
    increase: () => void;
    decrease: () => void;
    countRef: React.RefObject<number>;
    frameThreshold: number;
    onDetected: (img: string) => void;
}

export type AILogicFn = (tools: AITools) => () => void;

export interface AIMetric {
    metricThreshold: number;
    shownName: string;
}
