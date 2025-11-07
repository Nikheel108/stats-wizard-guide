import { Link } from "react-router-dom";
import { ArrowLeft, Settings as SettingsIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useSettings } from "@/contexts/SettingsContext";
import { useTheme } from "next-themes";
import { toast } from "sonner";

const Settings = () => {
  const { decimalPrecision, defaultInputMode, setDecimalPrecision, setDefaultInputMode } = useSettings();
  const { theme } = useTheme();

  const handlePrecisionChange = (value: number[]) => {
    setDecimalPrecision(value[0]);
    toast.success(`Decimal precision set to ${value[0]} places`);
  };

  const handleInputModeChange = (value: string) => {
    setDefaultInputMode(value as 'raw' | 'frequency' | 'grouped');
    toast.success(`Default input mode set to ${value}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            <SettingsIcon className="w-8 h-8 text-primary" />
            Settings
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Calculation Settings</CardTitle>
              <CardDescription>
                Customize how calculations are displayed and processed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="precision" className="text-base">
                  Decimal Precision: <span className="font-bold text-primary">{decimalPrecision}</span> places
                </Label>
                <Slider
                  id="precision"
                  min={0}
                  max={10}
                  step={1}
                  value={[decimalPrecision]}
                  onValueChange={handlePrecisionChange}
                  className="w-full"
                />
                <p className="text-sm text-muted-foreground">
                  Controls how many decimal places to show in results (0-10)
                </p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="input-mode" className="text-base">
                  Default Input Mode
                </Label>
                <Select value={defaultInputMode} onValueChange={handleInputModeChange}>
                  <SelectTrigger id="input-mode" className="w-full">
                    <SelectValue placeholder="Select input mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="raw">Raw List</SelectItem>
                    <SelectItem value="frequency">Frequency Table</SelectItem>
                    <SelectItem value="grouped">Grouped Data</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  The default input method when opening a calculator
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize the visual theme of the application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base">Theme Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Current theme: <span className="font-medium capitalize">{theme}</span>
                  </p>
                </div>
                <ThemeToggle />
              </div>
              <p className="text-sm text-muted-foreground">
                Your theme preference is automatically saved
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="w-5 h-5 text-primary" />
                About Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                All your preferences are automatically saved to your browser's local storage.
              </p>
              <p>
                These settings will persist across sessions and be applied to all calculators.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Settings;
