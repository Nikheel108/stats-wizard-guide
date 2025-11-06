/**
 * Statistical calculation functions
 * All functions return calculated values with proper typing
 */

export const calculateMean = (data: number[]): number => {
  if (data.length === 0) return 0;
  const sum = data.reduce((acc, val) => acc + val, 0);
  return sum / data.length;
};

export const calculateMedian = (data: number[]): number => {
  if (data.length === 0) return 0;
  
  const sorted = [...data].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  
  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }
  
  return sorted[middle];
};

export const calculateMode = (data: number[]): number[] => {
  if (data.length === 0) return [];
  
  const frequency: { [key: number]: number } = {};
  let maxFreq = 0;
  
  // Count frequencies
  data.forEach(val => {
    frequency[val] = (frequency[val] || 0) + 1;
    maxFreq = Math.max(maxFreq, frequency[val]);
  });
  
  // Return all values with max frequency (if > 1)
  if (maxFreq === 1) return []; // No mode if all unique
  
  return Object.keys(frequency)
    .filter(key => frequency[Number(key)] === maxFreq)
    .map(Number);
};

export const calculateVariance = (data: number[]): number => {
  if (data.length === 0) return 0;
  
  const mean = calculateMean(data);
  const squaredDiffs = data.map(val => Math.pow(val - mean, 2));
  return calculateMean(squaredDiffs);
};

export const calculateStandardDeviation = (data: number[]): number => {
  return Math.sqrt(calculateVariance(data));
};

export const calculateCorrelation = (xData: number[], yData: number[]): number => {
  if (xData.length !== yData.length || xData.length === 0) return 0;
  
  const n = xData.length;
  const xMean = calculateMean(xData);
  const yMean = calculateMean(yData);
  
  let numerator = 0;
  let xDenominator = 0;
  let yDenominator = 0;
  
  for (let i = 0; i < n; i++) {
    const xDiff = xData[i] - xMean;
    const yDiff = yData[i] - yMean;
    
    numerator += xDiff * yDiff;
    xDenominator += xDiff * xDiff;
    yDenominator += yDiff * yDiff;
  }
  
  const denominator = Math.sqrt(xDenominator * yDenominator);
  
  if (denominator === 0) return 0;
  
  return numerator / denominator;
};

export const calculateCoefficientOfVariation = (data: number[]): number => {
  const mean = calculateMean(data);
  const sd = calculateStandardDeviation(data);
  
  if (mean === 0) return 0;
  
  return (sd / mean) * 100;
};
