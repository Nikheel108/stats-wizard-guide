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

/**
 * Calculate the nth moment about the mean
 * @param data - Array of numbers
 * @param n - The moment order (1 for mean, 2 for variance, etc.)
 * @returns The nth moment
 */
export const calculateMoment = (data: number[], n: number): number => {
  if (data.length === 0) return 0;
  
  const mean = calculateMean(data);
  const deviations = data.map(val => Math.pow(val - mean, n));
  return calculateMean(deviations);
};

/**
 * Calculate skewness - measures asymmetry of distribution
 * Formula: [Σ(x - μ)³ / n] / σ³
 * @param data - Array of numbers
 * @returns Skewness value
 */
export const calculateSkewness = (data: number[]): number => {
  if (data.length === 0) return 0;
  
  const mean = calculateMean(data);
  const sd = calculateStandardDeviation(data);
  
  if (sd === 0) return 0;
  
  const thirdMoment = calculateMoment(data, 3);
  return thirdMoment / Math.pow(sd, 3);
};

/**
 * Calculate kurtosis - measures tailedness of distribution
 * Formula: [Σ(x - μ)⁴ / n] / σ⁴
 * @param data - Array of numbers
 * @returns Kurtosis value
 */
export const calculateKurtosis = (data: number[]): number => {
  if (data.length === 0) return 0;
  
  const mean = calculateMean(data);
  const sd = calculateStandardDeviation(data);
  
  if (sd === 0) return 0;
  
  const fourthMoment = calculateMoment(data, 4);
  return fourthMoment / Math.pow(sd, 4);
};

/**
 * Calculate linear regression parameters
 * Formula: slope m = Σ[(x - x̄)(y - ȳ)] / Σ(x - x̄)²
 *          intercept b = ȳ - m·x̄
 * @param xData - Array of x values
 * @param yData - Array of y values
 * @returns Object with slope, intercept, and equation string
 */
export const calculateRegression = (xData: number[], yData: number[]): {
  slope: number;
  intercept: number;
  equation: string;
} => {
  if (xData.length !== yData.length || xData.length === 0) {
    return { slope: 0, intercept: 0, equation: "y = 0" };
  }
  
  const xMean = calculateMean(xData);
  const yMean = calculateMean(yData);
  
  let numerator = 0;
  let denominator = 0;
  
  for (let i = 0; i < xData.length; i++) {
    const xDiff = xData[i] - xMean;
    const yDiff = yData[i] - yMean;
    numerator += xDiff * yDiff;
    denominator += xDiff * xDiff;
  }
  
  if (denominator === 0) {
    return { slope: 0, intercept: yMean, equation: `y = ${yMean.toFixed(2)}` };
  }
  
  const slope = numerator / denominator;
  const intercept = yMean - slope * xMean;
  
  const sign = intercept >= 0 ? "+" : "";
  const equation = `y = ${slope.toFixed(2)}x ${sign} ${intercept.toFixed(2)}`;
  
  return { slope, intercept, equation };
};
