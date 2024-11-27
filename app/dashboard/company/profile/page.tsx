"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/auth";

export default function CompanyProfilePage() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [companyDetails, setCompanyDetails] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    description: "",
    license: "",
    operatingRegions: "",
    insurancePartners: "",
    discountPrograms: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate required fields
      const requiredFields = ['name', 'email', 'phone', 'address', 'license'] as const;
      const missingFields = requiredFields.filter(field => !companyDetails[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      }

      // Validate email format
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(companyDetails.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Validate phone number (basic format)
      if (!/^\+?\d{10,}$/.test(companyDetails.phone)) {
        throw new Error('Please enter a valid phone number');
      }

      // Validate license number format (example: alphanumeric with minimum length)
      if (!/^[A-Za-z0-9-]{5,}$/.test(companyDetails.license)) {
        throw new Error('Please enter a valid license number');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Profile updated",
        description: "Your company profile has been updated successfully.",
      });
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "An unexpected error occurred while updating your profile. Please try again.";
      
      toast({
        title: "Update failed",
        description: errorMessage,
        variant: "destructive",
      });
      console.error("Profile update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCompanyDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Company Profile</h1>

      <div className="grid gap-6">
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Company Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={companyDetails.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Business Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={companyDetails.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Contact Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+260"
                  value={companyDetails.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Business Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  placeholder="Enter your business address"
                  value={companyDetails.address}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Company Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Tell customers about your company"
                  value={companyDetails.description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="license">Business License Number</Label>
                <Input
                  id="license"
                  name="license"
                  placeholder="Enter your business license number"
                  value={companyDetails.license}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="operatingRegions">Operating Regions</Label>
                <Input
                  id="operatingRegions"
                  name="operatingRegions"
                  placeholder="e.g., Lusaka, Copperbelt, Southern Province"
                  value={companyDetails.operatingRegions}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="insurancePartners">Insurance Partners</Label>
                <Input
                  id="insurancePartners"
                  name="insurancePartners"
                  placeholder="List your insurance partners"
                  value={companyDetails.insurancePartners}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="discountPrograms">Discount Programs</Label>
                <Textarea
                  id="discountPrograms"
                  name="discountPrograms"
                  placeholder="Describe your discount programs"
                  value={companyDetails.discountPrograms}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}