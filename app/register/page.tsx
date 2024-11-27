"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bus } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { login } = useAuth();
  const [userType, setUserType] = useState("passenger");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    
    try {
      // Validate required fields based on user type
      const requiredFields = userType === 'passenger' 
        ? ['firstName', 'lastName', 'email', 'phone', 'password']
        : ['companyName', 'businessLicense', 'email', 'phone', 'password'];

      const missingFields = requiredFields.filter(field => !formData.get(field));
      
      if (missingFields.length > 0) {
        throw new Error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      }

      // Validate email format
      const email = formData.get('email') as string;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('Please enter a valid email address');
      }

      // Validate phone number (basic format)
      const phone = formData.get('phone') as string;
      if (!/^\+?\d{10,}$/.test(phone)) {
        throw new Error('Please enter a valid phone number');
      }

      // Validate password strength
      const password = formData.get('password') as string;
      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }

      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        type: userType as 'passenger' | 'company',
        name: userType === 'passenger'
          ? `${formData.get('firstName')} ${formData.get('lastName')}`
          : formData.get('companyName') as string,
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      login(userData);
      toast({
        title: "Registration successful",
        description: "Your account has been created.",
      });

      if (userType === 'company') {
        router.push('/dashboard/company');
      } else {
        router.push('/');
      }
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "An unexpected error occurred during registration. Please try again.";
      
      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive",
      });
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Bus className="h-12 w-12 text-primary mx-auto" />
          </Link>
          <h1 className="text-3xl font-bold mt-6">Create an Account</h1>
          <p className="text-muted-foreground mt-2">Join ZamBus today</p>
        </div>

        <Card className="p-6">
          <Tabs value={userType} onValueChange={setUserType}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="passenger">Passenger</TabsTrigger>
              <TabsTrigger value="company">Bus Company</TabsTrigger>
            </TabsList>

            <TabsContent value="passenger">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" name="firstName" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" name="lastName" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" type="tel" placeholder="+260" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" type="password" required />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="company">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" name="companyName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessLicense">Business License Number</Label>
                  <Input id="businessLicense" name="businessLicense" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Company Email</Label>
                  <Input id="email" name="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Company Phone</Label>
                  <Input id="phone" name="phone" type="tel" placeholder="+260" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" type="password" required />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Register Company"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}