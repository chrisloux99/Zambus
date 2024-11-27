import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Bus } from "lucide-react";
import Link from "next/link";

export default function CompaniesPage() {
  const companies = [
    {
      name: "Power Tools Bus Services",
      rating: 4.5,
      routes: ["Lusaka - Livingstone", "Lusaka - Kitwe", "Ndola - Chipata"],
      description: "Premium bus service with modern fleet and professional drivers.",
    },
    {
      name: "Mazhandu Family Bus",
      rating: 4.3,
      routes: ["Lusaka - Ndola", "Kitwe - Solwezi", "Lusaka - Chipata"],
      description: "Reliable intercity transport with competitive prices.",
    },
    {
      name: "Shalom Bus Services",
      rating: 4.4,
      routes: ["Lusaka - Kabwe", "Ndola - Kasama", "Kitwe - Livingstone"],
      description: "Comfortable travel with excellent customer service.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Our Partner Companies</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose from our verified bus companies offering safe and reliable transport across Zambia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {companies.map((company) => (
            <Card key={company.name} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Bus className="h-6 w-6 text-primary" />
                  <h3 className="font-semibold">{company.name}</h3>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm">{company.rating}</span>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                {company.description}
              </p>

              <div className="space-y-2 mb-6">
                <h4 className="text-sm font-medium flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Popular Routes
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {company.routes.map((route) => (
                    <li key={route}>{route}</li>
                  ))}
                </ul>
              </div>

              <div className="flex space-x-3">
                <Button variant="outline" className="flex-1" asChild>
                  <Link href="/book">Book Now</Link>
                </Button>
                <Button variant="outline" className="flex-1">View Details</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}