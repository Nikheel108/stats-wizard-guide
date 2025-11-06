import { Link } from "react-router-dom";
import { ArrowLeft, Calculator, TrendingUp, BarChart3, Activity, GitBranch, PieChart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const allTools = [
  {
    id: "central-tendency",
    title: "Measures of Central Tendency",
    description: "Calculate mean, median, and mode with detailed step-by-step explanations",
    icon: Calculator,
    path: "/calculator/central-tendency",
    category: "Basic",
    tags: ["mean", "median", "mode", "average"],
  },
  {
    id: "standard-deviation",
    title: "Standard Deviation",
    description: "Measure data spread and variance with complete calculations",
    icon: Activity,
    path: "/calculator/standard-deviation",
    category: "Basic",
    tags: ["variance", "spread", "deviation"],
  },
  {
    id: "correlation",
    title: "Correlation Analysis",
    description: "Find relationship strength between two variables using Karl Pearson method",
    icon: TrendingUp,
    path: "/calculator/correlation",
    category: "Advanced",
    tags: ["relationship", "pearson", "correlation coefficient"],
  },
  {
    id: "coefficient-variation",
    title: "Coefficient of Variation",
    description: "Compare relative variability between different datasets",
    icon: BarChart3,
    path: "/calculator/coefficient-variation",
    category: "Advanced",
    tags: ["cv", "relative", "variability"],
  },
  {
    id: "moments",
    title: "Moments, Skewness & Kurtosis",
    description: "Analyze distribution shape with moment calculations",
    icon: GitBranch,
    path: "/calculator/moments",
    category: "Advanced",
    tags: ["distribution", "skewness", "kurtosis", "shape"],
  },
  {
    id: "regression",
    title: "Regression Analysis",
    description: "Linear regression with predictions and equation derivation",
    icon: PieChart,
    path: "/calculator/regression",
    category: "Regression",
    tags: ["linear", "prediction", "regression line"],
  },
];

const Tools = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Basic", "Advanced", "Regression"];

  const filteredTools = allTools.filter((tool) => {
    const matchesSearch = 
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

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
                <Calculator className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold">All Tools</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Explore Statistical Tools</h1>
          <p className="text-muted-foreground">
            Find the perfect calculator for your statistics needs
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search for a tool..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filters */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.length > 0 ? (
            filteredTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Card
                  key={tool.id}
                  className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-xs bg-muted px-2 py-1 rounded">{tool.category}</span>
                    </div>
                    <CardTitle className="text-xl">{tool.title}</CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4 flex flex-wrap gap-1">
                      {tool.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-xs bg-primary/5 text-primary px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Button className="w-full" asChild>
                      <Link to={tool.path}>Open Calculator</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No tools found matching your search.</p>
              <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tools;
