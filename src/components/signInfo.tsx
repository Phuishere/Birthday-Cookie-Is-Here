import Webcam from 'react-webcam';
import CandleLogic from './ai_logic/CandleLogic';
import { AILogicFn } from '../types';

/**
 * AI Logic's metrics
 */
import { candleMetrics } from './ai_logic/CandleLogic'

/**
 * General Dictionaries
 */ 
export const signFnDict: Record<string, AILogicFn> = {
    "CandleLogic": CandleLogic,
}

/**
 * Sign Metrics dictionary
 */
export const signMetricsDict = {
    "CandleLogic": candleMetrics,
}