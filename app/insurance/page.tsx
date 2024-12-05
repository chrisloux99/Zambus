"use client";

import { Shield, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function InsurancePage() {
  const plans = [
    {
      name: "Basic Coverage",
      price: "K50",
      features: [
        "Personal accident coverage",
        "Loss of baggage",
        "24/7 emergency assistance",
      ],
      recommended: false,
    },
    {
      name: "Premium Coverage",
      price: "K100",
      features: [
        "All Basic Coverage features",
        "Medical expenses",
        "Trip cancellation",
        "Goods protection up to K5000",
      ],
      recommended: true,
    },
    {
      name: "Business Coverage",
      price: "K200",
      features: [
        "All Premium Coverage features",
        "Higher goods protection limit",
        "Business interruption coverage",
        "Priority claims processing",
      ],
      recommended: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Shield className="h-16 w-16 mx-auto mb-6 text-primary" />
            <h1 className="text-4xl font-bold mb-4">Travel Insurance</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Protect your journey with comprehensive coverage tailored for bus travel across Zambia.
            </p>
          </div>
        </div>
      </section>

      {/* Insurance Plans */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <Card key={plan.name} className={`p-6 ${plan.recommended ? 'border-primary' : ''}`}>
                {plan.recommended && (
                  <div className="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full w-fit mb-4">
                    Recommended
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-3xl font-bold mb-6">{plan.price}<span className="text-sm text-muted-foreground">/trip</span></p>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant={plan.recommended ? "default" : "outline"} asChild>
                  <Link href="/book">Select Plan</Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Why Choose Our Insurance?</h2>
              <ul className="space-y-3">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Instant coverage activation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Simple, paperless claims process</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>24/7 customer support</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Important Information</h2>
              <div className="bg-background p-4 rounded-lg border space-y-2">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-primary" />
                  <span className="text-sm">Coverage begins when you board the bus</span>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-primary" />
                  <span className="text-sm">Claims must be filed within 48 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}