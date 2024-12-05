"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Bus, Phone, Mail, FileText, ChevronRight } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";

interface Company {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessLicense: string;
  description: string;
  rating: number;
  routes: string[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCompanies = async () => {
      setIsLoading(true);
      try {
        // Load companies from localStorage
        const storedCompanies = JSON.parse(localStorage.getItem('zambus-companies') || '[]');
        
        // Combine with default companies if needed
        const defaultCompanies = [
          {
            id: "default1",
            name: "Power Tools Bus Services",
            email: "info@powertools.com",
            phone: "+260976543210",
            businessLicense: "PTB123456",
            rating: 4.5,
            routes: ["Lusaka - Livingstone", "Lusaka - Kitwe", "Ndola - Chipata"],
            description: "Premium bus service with modern fleet and professional drivers.",
          },
          {
            id: "default2",
            name: "Mazhandu Family Bus",
            email: "info@mazhandu.com",
            phone: "+260976543211",
            businessLicense: "MFB123457",
            rating: 4.3,
            routes: ["Lusaka - Ndola", "Kitwe - Solwezi", "Lusaka - Chipata"],
            description: "Reliable intercity transport with competitive prices.",
          },
        ];

        const allCompanies = [...defaultCompanies, ...storedCompanies];
        setCompanies(allCompanies);
      } catch (error) {
        console.error('Error loading companies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCompanies();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="loading-dots">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background page-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 text-gradient">Our Partner Companies</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Choose from our verified bus companies offering safe and reliable transport across Zambia
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {companies.map((company) => (
            <motion.div key={company.id} variants={item}>
              <Card className="p-6 card-3d hover:border-primary/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Bus className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg">{company.name}</h3>
                  </div>
                  <div className="flex items-center bg-secondary/10 px-2 py-1 rounded-full">
                    <Star className="h-4 w-4 text-secondary fill-current" />
                    <span className="ml-1 text-sm font-medium">{company.rating}</span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">
                  {company.description}
                </p>

                <div className="space-y-2 mb-6">
                  <h4 className="text-sm font-medium flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-accent" />
                    Popular Routes
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1 pl-6">
                    {company.routes.slice(0, 3).map((route) => (
                      <li key={route} className="flex items-center">
                        <ChevronRight className="h-3 w-3 mr-1 text-primary/50" />
                        {route}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex space-x-3">
                  <Button className="flex-1 btn-gradient" asChild>
                    <Link href="/book">Book Now</Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 hover:bg-primary/5 transition-colors"
                    onClick={() => setSelectedCompany(company)}
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Dialog open={!!selectedCompany} onOpenChange={() => setSelectedCompany(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gradient">
              {selectedCompany?.name}
            </DialogTitle>
          </DialogHeader>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 py-4"
          >
            <div className="flex items-center space-x-2 p-2 rounded-lg bg-muted">
              <Mail className="h-4 w-4 text-primary" />
              <span>{selectedCompany?.email}</span>
            </div>
            <div className="flex items-center space-x-2 p-2 rounded-lg bg-muted">
              <Phone className="h-4 w-4 text-secondary" />
              <span>{selectedCompany?.phone}</span>
            </div>
            <div className="flex items-center space-x-2 p-2 rounded-lg bg-muted">
              <FileText className="h-4 w-4 text-accent" />
              <span>License: {selectedCompany?.businessLicense}</span>
            </div>
            <div className="flex items-center space-x-2 p-2 rounded-lg bg-muted">
              <Star className="h-4 w-4 text-secondary fill-current" />
              <span>Rating: {selectedCompany?.rating}</span>
            </div>
            <div className="space-y-2 p-2 rounded-lg bg-muted">
              <h4 className="font-medium text-primary">Description</h4>
              <p className="text-sm text-muted-foreground">{selectedCompany?.description}</p>
            </div>
            <div className="space-y-2 p-2 rounded-lg bg-muted">
              <h4 className="font-medium text-primary">Routes</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {selectedCompany?.routes.map((route) => (
                  <li key={route} className="flex items-center">
                    <ChevronRight className="h-3 w-3 mr-1 text-accent/50" />
                    {route}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </div>
  );
}