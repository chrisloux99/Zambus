"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Clock, Bus } from "lucide-react";

export default function TrackPage() {
  const [trackingId, setTrackingId] = useState("");

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
              onChange={(e) => setTrackingId(e.target.value)}
            />
            <Button>Track Now</Button>
          </div>
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