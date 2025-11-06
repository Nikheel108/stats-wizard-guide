import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const notes = [
  {
    id: "mean",
    title: "Mean (Average)",
    definition: "The mean is the sum of all values divided by the number of values. It represents the central point of the data.",
    formula: "Mean (μ) = Σx / n",
    example: "For data: 10, 20, 30, 40, 50\nMean = (10+20+30+40+50) / 5 = 150 / 5 = 30",
    interpretation: "The mean gives you a single value that represents the typical value in your dataset.",
    calculatorPath: "/calculator/central-tendency",
    color: "primary",
  },
  {
    id: "median",
    title: "Median (Middle Value)",
    definition: "The median is the middle value when data is arranged in order. It's less affected by extreme values than the mean.",
    formula: "For odd n: Middle value\nFor even n: Average of two middle values",
    example: "For data: 10, 20, 30, 40, 50\nSorted: 10, 20, 30, 40, 50\nMedian = 30 (middle value)",
    interpretation: "The median divides your data into two equal halves - 50% of values are below it, 50% above.",
    calculatorPath: "/calculator/central-tendency",
    color: "secondary",
  },
  {
    id: "mode",
    title: "Mode (Most Frequent)",
    definition: "The mode is the value that appears most frequently in your dataset.",
    formula: "The value with the highest frequency",
    example: "For data: 10, 20, 20, 30, 40\nMode = 20 (appears twice)",
    interpretation: "A dataset can have one mode, multiple modes, or no mode at all if all values are unique.",
    calculatorPath: "/calculator/central-tendency",
    color: "accent",
  },
  {
    id: "variance",
    title: "Variance",
    definition: "Variance measures the average squared deviation from the mean. It shows how far each number in the dataset is from the mean.",
    formula: "Variance (σ²) = Σ(x - μ)² / n",
    example: "For data: 10, 20, 30, 40, 50\nMean = 30\nVariance = [(10-30)² + (20-30)² + (30-30)² + (40-30)² + (50-30)²] / 5\nVariance = [400 + 100 + 0 + 100 + 400] / 5 = 200",
    interpretation: "Variance is always positive. A higher variance means data points are more spread out from the mean.",
    calculatorPath: "/calculator/standard-deviation",
    color: "primary",
  },
  {
    id: "standard-deviation",
    title: "Standard Deviation",
    definition: "Standard deviation measures how spread out the values are from the mean. It's the square root of variance and uses the same units as your data.",
    formula: "σ = √[Σ(x - μ)² / n]",
    example: "For data: 10, 20, 30, 40, 50\nMean = 30\nVariance = 200\nSD = √200 ≈ 14.14",
    interpretation: "About 68% of values typically fall within 1 standard deviation of the mean in a normal distribution.",
    calculatorPath: "/calculator/standard-deviation",
    color: "secondary",
  },
  {
    id: "coefficient-variation",
    title: "Coefficient of Variation",
    definition: "The coefficient of variation (CV) expresses the standard deviation as a percentage of the mean. It's useful for comparing variability between datasets with different units or scales.",
    formula: "CV = (σ / μ) × 100%",
    example: "Dataset A: Mean = 50, SD = 10\nCV = (10/50) × 100 = 20%\n\nDataset B: Mean = 100, SD = 15\nCV = (15/100) × 100 = 15%\n\nDataset B is relatively less variable.",
    interpretation: "A lower CV means less variability relative to the mean. CV is dimensionless, making it perfect for comparing different datasets.",
    calculatorPath: "/calculator/coefficient-variation",
    color: "accent",
  },
  {
    id: "moments",
    title: "Moments",
    definition: "Moments are quantitative measures of the shape of a distribution. The first moment is the mean, the second is variance, and higher moments describe shape characteristics.",
    formula: "nth moment = Σ(x - μ)ⁿ / n",
    example: "First moment (mean): Describes center\nSecond moment (variance): Describes spread\nThird moment: Related to skewness\nFourth moment: Related to kurtosis",
    interpretation: "Moments provide a complete mathematical description of a probability distribution's shape.",
    calculatorPath: "/calculator/moments",
    color: "primary",
  },
  {
    id: "skewness",
    title: "Skewness",
    definition: "Skewness measures the asymmetry of a distribution. It tells you whether data is concentrated on the left or right side of the mean.",
    formula: "Skewness = [Σ(x - μ)³ / n] / σ³",
    example: "Skewness = 0: Symmetric (normal distribution)\nSkewness > 0: Right-skewed (tail on right)\nSkewness < 0: Left-skewed (tail on left)\n\nIncome data is typically right-skewed.",
    interpretation: "Positive skewness means most values are concentrated on the left with a long right tail. Negative skewness is the opposite.",
    calculatorPath: "/calculator/moments",
    color: "secondary",
  },
  {
    id: "kurtosis",
    title: "Kurtosis",
    definition: "Kurtosis measures the 'tailedness' of a distribution - how much of the data is in the tails versus the center.",
    formula: "Kurtosis = [Σ(x - μ)⁴ / n] / σ⁴",
    example: "Kurtosis = 3: Normal distribution (mesokurtic)\nKurtosis > 3: Heavy tails (leptokurtic)\nKurtosis < 3: Light tails (platykurtic)\n\nStock returns often show high kurtosis.",
    interpretation: "High kurtosis means more data in the tails and peak, indicating potential outliers and extreme values.",
    calculatorPath: "/calculator/moments",
    color: "accent",
  },
  {
    id: "correlation",
    title: "Correlation (Pearson)",
    definition: "Correlation measures the strength and direction of the linear relationship between two variables. Karl Pearson's correlation coefficient is the most common measure.",
    formula: "r = Σ[(x - x̄)(y - ȳ)] / √[Σ(x - x̄)² × Σ(y - ȳ)²]",
    example: "Height vs Weight: r = 0.8 (strong positive)\nTemperature vs Ice Cream Sales: r = 0.7 (positive)\nPrice vs Demand: r = -0.6 (negative)\nShoe size vs IQ: r ≈ 0 (no correlation)",
    interpretation: "r = 1: Perfect positive\nr = 0: No linear relationship\nr = -1: Perfect negative\n|r| > 0.7 is typically considered strong.",
    calculatorPath: "/calculator/correlation",
    color: "primary",
  },
  {
    id: "regression",
    title: "Linear Regression",
    definition: "Regression analysis finds the best-fit line through data points, allowing you to predict one variable from another. It quantifies the relationship between variables.",
    formula: "y = mx + b\nwhere m = slope, b = y-intercept\n\nm = Σ[(x - x̄)(y - ȳ)] / Σ(x - x̄)²\nb = ȳ - m·x̄",
    example: "Studying hours (x) vs Exam score (y)\nIf regression line: y = 5x + 40\n\nPrediction: 6 hours of study\ny = 5(6) + 40 = 70 points",
    interpretation: "The regression line minimizes the sum of squared distances from all points. The slope tells you how much y changes per unit change in x.",
    calculatorPath: "/calculator/regression",
    color: "secondary",
  },
];

const Notes = () => {
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
                <BookOpen className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold">Learn Statistics</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Statistical Concepts</h1>
          <p className="text-muted-foreground">
            Master the fundamentals with clear explanations and examples
          </p>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <Dialog key={note.id}>
              <DialogTrigger asChild>
                <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 cursor-pointer">
                  <CardHeader>
                    <div className={`w-12 h-12 bg-gradient-to-br from-${note.color}/10 to-${note.color}/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <BookOpen className={`w-6 h-6 text-${note.color}`} />
                    </div>
                    <CardTitle className="text-xl">{note.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{note.definition}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl">{note.title}</DialogTitle>
                  <DialogDescription>
                    Master this concept with detailed explanations and examples
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  {/* Definition */}
                  <div>
                    <h4 className="font-semibold mb-2 text-primary">Definition</h4>
                    <p className="text-sm text-muted-foreground">{note.definition}</p>
                  </div>

                  {/* Formula */}
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-secondary">Formula</h4>
                    <pre className="text-sm font-mono whitespace-pre-wrap">{note.formula}</pre>
                  </div>

                  {/* Example */}
                  <div>
                    <h4 className="font-semibold mb-2 text-accent">Example</h4>
                    <pre className="text-sm text-muted-foreground whitespace-pre-wrap">{note.example}</pre>
                  </div>

                  {/* Interpretation */}
                  <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                    <h4 className="font-semibold mb-2">💡 Key Insight</h4>
                    <p className="text-sm whitespace-pre-wrap">{note.interpretation}</p>
                  </div>

                  {/* Try Calculator */}
                  <div className="pt-4 border-t">
                    <Button asChild className="w-full">
                      <Link to={note.calculatorPath}>
                        <Calculator className="w-4 h-4 mr-2" />
                        Try This in Calculator
                      </Link>
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        {/* Practice Section */}
        <Card className="mt-12 border-2">
          <CardHeader>
            <CardTitle>Ready to Practice?</CardTitle>
            <CardDescription>
              Apply what you've learned with our interactive calculators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Button asChild className="flex-1">
                <Link to="/">Go to Dashboard</Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link to="/tools">Browse All Tools</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Notes;
