import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const notes = [
  {
    id: "mean",
    title: "Mean (Average)",
    definition: "The mean is the sum of all values divided by the number of values. It represents the central point of the data.",
    formula: "Mean (μ) = Σx / n",
    example: "For data: 10, 20, 30, 40, 50\nMean = (10+20+30+40+50) / 5 = 150 / 5 = 30",
    interpretation: "The mean gives you a single value that represents the typical value in your dataset.",
    calculatorPath: "/calculator/central-tendency",
  },
  {
    id: "median",
    title: "Median (Middle Value)",
    definition: "The median is the middle value when data is arranged in order. It's less affected by extreme values than the mean.",
    formula: "For odd n: Middle value\nFor even n: Average of two middle values",
    example: "For data: 10, 20, 30, 40, 50\nSorted: 10, 20, 30, 40, 50\nMedian = 30 (middle value)",
    interpretation: "The median divides your data into two equal halves - 50% of values are below it, 50% above.",
    calculatorPath: "/calculator/central-tendency",
  },
  {
    id: "mode",
    title: "Mode (Most Frequent)",
    definition: "The mode is the value that appears most frequently in your dataset.",
    formula: "The value with the highest frequency",
    example: "For data: 10, 20, 20, 30, 40\nMode = 20 (appears twice)",
    interpretation: "A dataset can have one mode, multiple modes, or no mode at all if all values are unique.",
    calculatorPath: "/calculator/central-tendency",
  },
  {
    id: "standard-deviation",
    title: "Standard Deviation",
    definition: "Standard deviation measures how spread out the values are from the mean. A higher standard deviation means more spread.",
    formula: "σ = √[Σ(x - μ)² / n]",
    example: "For data: 10, 20, 30, 40, 50\nMean = 30\nVariance = [(10-30)² + (20-30)² + (30-30)² + (40-30)² + (50-30)²] / 5 = 200\nSD = √200 ≈ 14.14",
    interpretation: "About 68% of values typically fall within 1 standard deviation of the mean.",
    calculatorPath: "/calculator/standard-deviation",
  },
  {
    id: "correlation",
    title: "Correlation",
    definition: "Correlation measures the strength and direction of the linear relationship between two variables.",
    formula: "r = Σ[(x - x̄)(y - ȳ)] / √[Σ(x - x̄)² × Σ(y - ȳ)²]",
    example: "If height and weight have r = 0.8, this means taller people tend to weigh more (strong positive correlation).",
    interpretation: "r = 1: Perfect positive correlation\nr = 0: No correlation\nr = -1: Perfect negative correlation",
    calculatorPath: "/calculator/correlation",
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

        {/* Notes Accordion */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {notes.map((note) => (
              <Card key={note.id}>
                <AccordionItem value={note.id} className="border-none">
                  <CardHeader>
                    <AccordionTrigger className="hover:no-underline">
                      <CardTitle className="text-left">{note.title}</CardTitle>
                    </AccordionTrigger>
                  </CardHeader>
                  <AccordionContent>
                    <CardContent className="space-y-6 pt-0">
                      {/* Definition */}
                      <div>
                        <h4 className="font-semibold mb-2 text-primary">Definition</h4>
                        <p className="text-sm text-muted-foreground">{note.definition}</p>
                      </div>

                      {/* Formula */}
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 text-secondary">Formula</h4>
                        <pre className="text-sm font-mono">{note.formula}</pre>
                      </div>

                      {/* Example */}
                      <div>
                        <h4 className="font-semibold mb-2 text-accent">Example</h4>
                        <pre className="text-sm text-muted-foreground whitespace-pre-wrap">{note.example}</pre>
                      </div>

                      {/* Interpretation */}
                      <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                        <h4 className="font-semibold mb-2">💡 Key Insight</h4>
                        <p className="text-sm">{note.interpretation}</p>
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
                    </CardContent>
                  </AccordionContent>
                </AccordionItem>
              </Card>
            ))}
          </Accordion>
        </div>

        {/* Practice Section */}
        <Card className="max-w-4xl mx-auto mt-8">
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
