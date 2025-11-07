import { Link } from "react-router-dom";
import { Calculator, TrendingUp, BarChart3, Activity, GitBranch, PieChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

const tools = [
  {
    id: "central-tendency",
    title: "Central Tendency",
    description: "Calculate mean, median, and mode with detailed steps",
    icon: Calculator,
    path: "/calculator/central-tendency",
  },
  {
    id: "standard-deviation",
    title: "Standard Deviation",
    description: "Measure data spread and variance with explanations",
    icon: Activity,
    path: "/calculator/standard-deviation",
  },
  {
    id: "correlation",
    title: "Correlation",
    description: "Find relationship strength between two variables",
    icon: TrendingUp,
    path: "/calculator/correlation",
  },
  {
    id: "coefficient-variation",
    title: "Coefficient of Variation",
    description: "Compare relative variability between datasets",
    icon: BarChart3,
    path: "/calculator/coefficient-variation",
  },
  {
    id: "moments",
    title: "Moments & Distribution",
    description: "Calculate moments, skewness, and kurtosis",
    icon: GitBranch,
    path: "/calculator/moments",
  },
  {
    id: "regression",
    title: "Regression Analysis",
    description: "Linear regression with prediction capabilities",
    icon: PieChart,
    path: "/calculator/regression",
  },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Calculator className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              StatSolver
            </h1>
          </div>
          <nav className="hidden md:flex gap-4 items-center">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/tools" className="text-sm font-medium hover:text-primary transition-colors">
              Tools
            </Link>
            <Link to="/notes" className="text-sm font-medium hover:text-primary transition-colors">
              Learn
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Your Smart Statistics Companion
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Perform any statistical calculation with full step-by-step explanations, formulas, and visualizations. 
          Perfect for students learning statistics.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" className="shadow-lg" asChild>
            <Link to="/tools">Explore Tools</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/notes">Learn Concepts</Link>
          </Button>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="container mx-auto px-4 pb-16">
        <h3 className="text-2xl font-bold mb-8 text-center">Choose Your Calculator</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Card
                key={tool.id}
                className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{tool.title}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" asChild>
                    <Link to={tool.path}>Open Calculator</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>© 2024 StatSolver. Made for students who love learning statistics.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
