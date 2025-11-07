import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calculator as CalcIcon, ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/ThemeToggle";
import { calculateMean, calculateMedian, calculateMode, calculateStandardDeviation, calculateCorrelation } from "@/lib/statistics";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ScatterChart, Scatter } from "recharts";

const toolConfigs = {
  "central-tendency": {
    title: "Measures of Central Tendency",
    description: "Calculate mean, median, and mode from your data",
    inputLabel: "Enter numbers (comma or space separated)",
    placeholder: "12, 14, 18, 20, 22, 24",
  },
  "standard-deviation": {
    title: "Standard Deviation Calculator",
    description: "Measure how spread out your data is",
    inputLabel: "Enter numbers (comma or space separated)",
    placeholder: "5, 10, 15, 20, 25, 30",
  },
  "correlation": {
    title: "Correlation Calculator",
    description: "Find the relationship between two variables",
    inputLabel: "Enter X values (comma separated)",
    secondInputLabel: "Enter Y values (comma separated)",
    placeholder: "1, 2, 3, 4, 5",
    secondPlaceholder: "2, 4, 5, 4, 5",
  },
};

const Calculator = () => {
  const { toolId } = useParams();
  const config = toolConfigs[toolId as keyof typeof toolConfigs];
  const [input, setInput] = useState("");
  const [secondInput, setSecondInput] = useState("");
  const [result, setResult] = useState<any>(null);

  const parseInput = (text: string): number[] => {
    return text
      .split(/[,\s]+/)
      .map((n) => parseFloat(n.trim()))
      .filter((n) => !isNaN(n));
  };

  const handleCalculate = () => {
    const data = parseInput(input);
    
    if (data.length === 0) {
      alert("Please enter valid numbers");
      return;
    }

    let calculationResult: any = {};

    if (toolId === "central-tendency") {
      const mean = calculateMean(data);
      const median = calculateMedian(data);
      const mode = calculateMode(data);
      calculationResult = { mean, median, mode, data };
    } else if (toolId === "standard-deviation") {
      const mean = calculateMean(data);
      const sd = calculateStandardDeviation(data);
      calculationResult = { mean, standardDeviation: sd, data };
    } else if (toolId === "correlation") {
      const xData = parseInput(input);
      const yData = parseInput(secondInput);
      
      if (xData.length !== yData.length) {
        alert("X and Y must have the same number of values");
        return;
      }
      
      const correlation = calculateCorrelation(xData, yData);
      calculationResult = { correlation, xData, yData };
    }

    setResult(calculationResult);
  };

  const renderResult = () => {
    if (!result) return null;

    if (toolId === "central-tendency") {
      const chartData = result.data.map((value: number, index: number) => ({
        name: `Value ${index + 1}`,
        value,
      }));

      return (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Step 1: Understanding the Data</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Your dataset: <span className="font-mono font-semibold">{result.data.join(", ")}</span>
              </p>
              <p className="text-sm">Number of values (n) = {result.data.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Step 2: Calculate Mean</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm font-semibold">Formula: Mean = Sum of all values / Number of values</p>
              <p className="text-sm text-muted-foreground">
                Mean = ({result.data.join(" + ")}) / {result.data.length}
              </p>
              <p className="text-sm text-muted-foreground">
                Mean = {result.data.reduce((a: number, b: number) => a + b, 0)} / {result.data.length}
              </p>
              <div className="bg-primary/10 p-4 rounded-lg mt-4">
                <p className="text-lg font-bold text-primary">Mean = {result.mean.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Step 3: Calculate Median</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm font-semibold">The middle value when data is sorted</p>
              <p className="text-sm text-muted-foreground">
                Sorted data: {[...result.data].sort((a: number, b: number) => a - b).join(", ")}
              </p>
              <div className="bg-secondary/10 p-4 rounded-lg mt-4">
                <p className="text-lg font-bold text-secondary">Median = {result.median.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Step 4: Calculate Mode</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm font-semibold">The most frequently occurring value</p>
              <div className="bg-accent/10 p-4 rounded-lg mt-4">
                <p className="text-lg font-bold text-accent">
                  Mode = {result.mode.length > 0 ? result.mode.join(", ") : "No mode (all values unique)"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Visualization</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      );
    }

    if (toolId === "standard-deviation") {
      const variance = result.standardDeviation ** 2;
      const chartData = result.data.map((value: number, index: number) => ({
        name: `Value ${index + 1}`,
        value,
        mean: result.mean,
      }));

      return (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Step 1: Calculate Mean</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-semibold">Mean = Sum / Count</p>
              <div className="bg-primary/10 p-4 rounded-lg mt-4">
                <p className="text-lg font-bold text-primary">Mean (μ) = {result.mean.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Step 2: Calculate Variance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm font-semibold">Variance = Σ(x - μ)² / n</p>
              <p className="text-sm text-muted-foreground">
                For each value, subtract the mean, square the result, then average all squared differences.
              </p>
              <div className="bg-secondary/10 p-4 rounded-lg mt-4">
                <p className="text-lg font-bold text-secondary">Variance (σ²) = {variance.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Step 3: Calculate Standard Deviation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm font-semibold">Standard Deviation = √Variance</p>
              <p className="text-sm text-muted-foreground">σ = √{variance.toFixed(2)}</p>
              <div className="bg-accent/10 p-4 rounded-lg mt-4">
                <p className="text-lg font-bold text-accent">
                  Standard Deviation (σ) = {result.standardDeviation.toFixed(2)}
                </p>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                <strong>Interpretation:</strong> The data typically varies by ±{result.standardDeviation.toFixed(2)} from the mean.
                {result.standardDeviation < result.mean * 0.3 && " This shows relatively low spread."}
                {result.standardDeviation > result.mean * 0.5 && " This shows relatively high spread."}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} />
                  <Line type="monotone" dataKey="mean" stroke="hsl(var(--secondary))" strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      );
    }

    if (toolId === "correlation") {
      const scatterData = result.xData.map((x: number, i: number) => ({
        x,
        y: result.yData[i],
      }));

      const correlationType = 
        Math.abs(result.correlation) > 0.7 ? "Strong" :
        Math.abs(result.correlation) > 0.4 ? "Moderate" : "Weak";
      
      const correlationDirection = result.correlation > 0 ? "Positive" : "Negative";

      return (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Step 1: Understanding Correlation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Correlation measures how strongly two variables are related. 
                It ranges from -1 (perfect negative) to +1 (perfect positive).
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Step 2: Calculate Correlation Coefficient (r)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm font-semibold">Using Karl Pearson's formula</p>
              <p className="text-sm text-muted-foreground">
                r = Σ[(x - x̄)(y - ȳ)] / √[Σ(x - x̄)² × Σ(y - ȳ)²]
              </p>
              <div className="bg-primary/10 p-4 rounded-lg mt-4">
                <p className="text-lg font-bold text-primary">
                  Correlation (r) = {result.correlation.toFixed(4)}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Step 3: Interpretation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="bg-accent/10 p-4 rounded-lg">
                <p className="font-semibold text-accent">
                  {correlationType} {correlationDirection} Correlation
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {result.correlation > 0 
                    ? "When X increases, Y tends to increase." 
                    : "When X increases, Y tends to decrease."}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Scatter Plot</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="x" name="X" />
                  <YAxis dataKey="y" name="Y" />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                  <Scatter data={scatterData} fill="hsl(var(--primary))" />
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      );
    }
  };

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Tool not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <CalcIcon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold">StatSolver</h1>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Tool Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{config.title}</h1>
          <p className="text-muted-foreground">{config.description}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Input Data</CardTitle>
                <CardDescription>Enter your values to calculate</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="input">{config.inputLabel}</Label>
                  <Textarea
                    id="input"
                    placeholder={config.placeholder}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    rows={4}
                  />
                </div>
                
                {"secondInputLabel" in config && config.secondInputLabel && (
                  <div className="space-y-2">
                    <Label htmlFor="secondInput">{config.secondInputLabel}</Label>
                    <Textarea
                      id="secondInput"
                      placeholder={"secondPlaceholder" in config ? config.secondPlaceholder : ""}
                      value={secondInput}
                      onChange={(e) => setSecondInput(e.target.value)}
                      rows={4}
                    />
                  </div>
                )}

                <Button onClick={handleCalculate} className="w-full" size="lg">
                  <CalcIcon className="w-4 h-4 mr-2" />
                  Calculate
                </Button>
              </CardContent>
            </Card>

            {result && (
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Export PDF
                  </Button>
                  <Button variant="outline" onClick={() => setResult(null)}>
                    Clear Results
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Results Section */}
          <div>
            {result ? (
              renderResult()
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center text-muted-foreground">
                  <CalcIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Enter your data and click Calculate to see step-by-step results</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
