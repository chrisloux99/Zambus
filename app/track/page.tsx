"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Clock, Bus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function TrackPage() {
  const { toast } = useToast();
  const [trackingId, setTrackingId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [trackingResult, setTrackingResult] = useState<{
    status: string;
    location?: string;
    eta?: string;
    nextStop?: string;
  } | null>(null);

  const handleTrackBus = async () => {
    if (!trackingId.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a booking reference number",
        variant: "destructive",
      });
      return;
    }

    // Validate tracking ID format (example: alphanumeric with specific length)
    if (!/^[A-Z0-9]{6,10}$/.test(trackingId.trim())) {
      toast({
        title: "Invalid Format",
        description: "Booking reference should be 6-10 characters long and contain only letters and numbers",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulate different tracking scenarios
      const random = Math.random();
      if (random < 0.1) {
        throw new Error("Booking reference not found");
      }

      // Mock tracking result
      const mockResult = {
        status: "In Transit",
        location: "20km from Kafue",
        eta: "2 hours 30 minutes",
        nextStop: "Kafue Bus Station",
      };

      setTrackingResult(mockResult);
      toast({
        title: "Bus Located",
        description: "Successfully retrieved bus location",
      });
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "An unexpected error occurred while tracking the bus. Please try again.";
      
      setTrackingResult(null);
      toast({
        title: "Tracking Failed",
        description: errorMessage,
        variant: "destructive",
      });
      console.error("Bus tracking error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Track Your Bus</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Enter your booking reference number to track your bus in real-time
          </p>
        </div>

        <Card className="max-w-xl mx-auto p-6">
          <div className="flex space-x-4">
            <Input
              placeholder="Enter booking reference"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
              disabled={isLoading}
            />
            <Button onClick={handleTrackBus} disabled={isLoading}>
              {isLoading ? "Tracking..." : "Track Now"}
            </Button>
          </div>

          {trackingResult && (
            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">Status</h3>
                  <p className="text-muted-foreground">{trackingResult.status}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Current Location</h3>
                  <p className="text-muted-foreground">{trackingResult.location}</p>
                </div>
                <div>
                  <h3 className="font-semibold">ETA</h3>
                  <p className="text-muted-foreground">{trackingResult.eta}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Next Stop</h3>
                  <p className="text-muted-foreground">{trackingResult.nextStop}</p>
                </div>
              </div>
            </div>
          )}
        </Card>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Bus className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Live Updates</h3>
                <p className="text-sm text-muted-foreground">Track in real-time</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Get instant updates about your bus location and estimated arrival time
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Route Information</h3>
                <p className="text-sm text-muted-foreground">View journey details</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              See detailed route information and upcoming stops along your journey
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">ETA Updates</h3>
                <p className="text-sm text-muted-foreground">Accurate timing</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Get precise estimated arrival times based on current traffic conditions
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}