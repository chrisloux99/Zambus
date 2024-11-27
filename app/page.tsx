import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Clock, Shield, CreditCard } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Nationwide Coverage",
      description: "Book tickets for routes across all major cities in Zambia",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Real-time Tracking",
      description: "Track your bus location and get live arrival updates",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Travel Insurance",
      description: "Optional comprehensive travel and goods insurance",
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Secure Payments",
      description: "Multiple payment options including mobile money",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Travel Smarter Across Zambia
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Book intercity bus tickets instantly. Track your journey in real-time.
              Travel with confidence.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/book">Book Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/track">Track Bus</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Why Choose ZamBus?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Experience the future of bus travel in Zambia
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of satisfied travelers using ZamBus daily
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/register">Create Free Account</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}