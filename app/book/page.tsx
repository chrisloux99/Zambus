"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { MapPin, Calendar as CalendarIcon, Bus, Star, Clock, Shield } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface BusRoute {
  id: string;
  companyName: string;
  from: string;
  to: string;
  price: string;
  departureTime: string;
  duration: string;
  rating: number;
  seatsAvailable: number;
}

interface Insurance {
  id: string;
  name: string;
  description: string;
  coverage: string;
  price: number;
}

const insuranceOptions: Insurance[] = [
  {
    id: "1",
    name: "Madison Insurance",
    description: "Basic travel protection",
    coverage: "Up to K5,000",
    price: 50,
  },
  {
    id: "2",
    name: "Professional Insurance",
    description: "Premium coverage with medical benefits",
    coverage: "Up to K15,000",
    price: 100,
  },
  {
    id: "3",
    name: "ZSIC Insurance",
    description: "Comprehensive travel insurance",
    coverage: "Up to K25,000",
    price: 150,
  }
];

export default function BookingPage() {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>();
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [passengers, setPassengers] = useState<string>("1");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<BusRoute[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedBus, setSelectedBus] = useState<BusRoute | null>(null);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [selectedInsurance, setSelectedInsurance] = useState<string>("");
  const [isBooking, setIsBooking] = useState(false);

  const cities = [
    "Lusaka",
    "Kitwe",
    "Ndola",
    "Kabwe",
    "Livingstone",
    "Chipata",
    "Solwezi",
    "Kasama",
  ];

  const handleSearch = async () => {
    // Validate inputs
    if (!from) {
      toast({
        title: "Error",
        description: "Please select a departure city",
        variant: "destructive",
      });
      return;
    }
    if (!to) {
      toast({
        title: "Error",
        description: "Please select a destination city",
        variant: "destructive",
      });
      return;
    }
    if (!date) {
      toast({
        title: "Error",
        description: "Please select a travel date",
        variant: "destructive",
      });
      return;
    }
    if (from === to) {
      toast({
        title: "Error",
        description: "Departure and destination cities cannot be the same",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    setHasSearched(true);

    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Get companies from localStorage
      const companies = JSON.parse(localStorage.getItem('zambus-companies') || '[]');
      
      // Generate mock search results
      const mockResults: BusRoute[] = [
        {
          id: '1',
          companyName: 'Power Tools Bus Services',
          from,
          to,
          price: `K${Math.floor(Math.random() * 200) + 250}`,
          departureTime: '08:00 AM',
          duration: '4h 30m',
          rating: 4.5,
          seatsAvailable: Math.floor(Math.random() * 30) + 10,
        },
        {
          id: '2',
          companyName: 'Mazhandu Family Bus',
          from,
          to,
          price: `K${Math.floor(Math.random() * 200) + 250}`,
          departureTime: '09:30 AM',
          duration: '5h',
          rating: 4.3,
          seatsAvailable: Math.floor(Math.random() * 30) + 10,
        },
        ...companies.map((company: any, index: number) => ({
          id: `${index + 3}`,
          companyName: company.name,
          from,
          to,
          price: `K${Math.floor(Math.random() * 200) + 250}`,
          departureTime: '10:00 AM',
          duration: '4h',
          rating: company.rating || 4.0,
          seatsAvailable: Math.floor(Math.random() * 30) + 10,
        })),
      ];

      setSearchResults(mockResults);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to search for buses. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleBookNow = (bus: BusRoute) => {
    setSelectedBus(bus);
    setShowBookingDialog(true);
  };

  const handleConfirmBooking = async () => {
    if (!selectedBus) return;

    setIsBooking(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      const insurance = selectedInsurance 
        ? insuranceOptions.find(i => i.id === selectedInsurance)
        : null;

      const booking = {
        busId: selectedBus.id,
        companyName: selectedBus.companyName,
        from: selectedBus.from,
        to: selectedBus.to,
        date: format(date!, "PPP"),
        passengers: parseInt(passengers),
        price: selectedBus.price,
        insurance: insurance ? {
          name: insurance.name,
          price: insurance.price
        } : null,
        totalPrice: parseInt(selectedBus.price.replace("K", "")) + (insurance?.price || 0)
      };

      // Store booking in localStorage
      const existingBookings = JSON.parse(localStorage.getItem("zambus-bookings") || "[]");
      localStorage.setItem("zambus-bookings", JSON.stringify([...existingBookings, booking]));

      toast({
        title: "Booking Confirmed!",
        description: "Your trip has been successfully booked.",
      });

      setShowBookingDialog(false);
      setSelectedBus(null);
      setSelectedInsurance("");
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="min-h-screen bg-background page-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <Card className="p-6 lg:col-span-2">
            <h1 className="text-2xl font-bold mb-6 text-gradient">Book Your Trip</h1>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="from">From</Label>
                  <Select onValueChange={setFrom} value={from}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select departure city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city.toLowerCase()}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="to">To</Label>
                  <Select onValueChange={setTo} value={to}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select destination city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city.toLowerCase()}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Travel Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passengers">Number of Passengers</Label>
                  <Input
                    type="number"
                    id="passengers"
                    value={passengers}
                    onChange={(e) => setPassengers(e.target.value)}
                    placeholder="Enter number of passengers"
                    min="1"
                    max="10"
                  />
                </div>
              </div>

              <Button 
                className="w-full btn-gradient" 
                onClick={handleSearch}
                disabled={isSearching}
              >
                {isSearching ? (
                  <div className="loading-dots">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                ) : (
                  "Search Available Buses"
                )}
              </Button>
            </div>

            {/* Search Results */}
            <AnimatePresence>
              {hasSearched && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-8 space-y-4"
                >
                  <h2 className="text-xl font-semibold">
                    {searchResults.length > 0 
                      ? `Available Buses (${searchResults.length})`
                      : "No buses found for this route"}
                  </h2>
                  
                  {searchResults.map((bus) => (
                    <motion.div
                      key={bus.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-4 border rounded-lg hover:border-primary/50 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-lg">{bus.companyName}</h3>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Star className="h-4 w-4 text-secondary fill-current" />
                            <span>{bus.rating}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="text-sm">
                            <div className="font-medium">{bus.departureTime}</div>
                            <div className="text-muted-foreground flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {bus.duration}
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="font-semibold text-lg">{bus.price}</div>
                            <div className="text-sm text-muted-foreground">
                              {bus.seatsAvailable} seats left
                            </div>
                          </div>
                          
                          <Button 
                            className="btn-gradient"
                            onClick={() => handleBookNow(bus)}
                          >
                            Book Now
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </Card>

          {/* Booking Dialog */}
          <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-gradient">
                  Complete Your Booking
                </DialogTitle>
                <DialogDescription>
                  Review your trip details and choose optional insurance coverage
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                {selectedBus && (
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <h3 className="font-semibold mb-2">{selectedBus.companyName}</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">From - To</p>
                          <p className="font-medium">{selectedBus.from} - {selectedBus.to}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Date</p>
                          <p className="font-medium">{date ? format(date, "PPP") : ""}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Departure</p>
                          <p className="font-medium">{selectedBus.departureTime}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Duration</p>
                          <p className="font-medium">{selectedBus.duration}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-4 flex items-center">
                        <Shield className="h-5 w-5 mr-2 text-secondary" />
                        Travel Insurance Options
                      </h3>
                      <RadioGroup
                        value={selectedInsurance}
                        onValueChange={setSelectedInsurance}
                        className="space-y-3"
                      >
                        {insuranceOptions.map((insurance) => (
                          <div
                            key={insurance.id}
                            className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:border-primary/50 transition-colors"
                          >
                            <RadioGroupItem value={insurance.id} id={insurance.id} />
                            <div className="flex-1">
                              <Label
                                htmlFor={insurance.id}
                                className="font-medium cursor-pointer"
                              >
                                {insurance.name}
                              </Label>
                              <p className="text-sm text-muted-foreground">
                                {insurance.description}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Coverage: {insurance.coverage}
                              </p>
                            </div>
                            <div className="font-semibold">
                              K{insurance.price}
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <div className="p-4 bg-muted rounded-lg">
                      <h3 className="font-semibold mb-2">Price Summary</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Bus Fare ({passengers} passenger{parseInt(passengers) > 1 ? 's' : ''})</span>
                          <span>{selectedBus.price}</span>
                        </div>
                        {selectedInsurance && (
                          <div className="flex justify-between">
                            <span>Insurance</span>
                            <span>K{insuranceOptions.find(i => i.id === selectedInsurance)?.price}</span>
                          </div>
                        )}
                        <div className="flex justify-between font-semibold pt-2 border-t">
                          <span>Total</span>
                          <span>
                            K{
                              parseInt(selectedBus.price.replace("K", "")) +
                              (selectedInsurance ? insuranceOptions.find(i => i.id === selectedInsurance)?.price || 0 : 0)
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowBookingDialog(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="btn-gradient"
                  onClick={handleConfirmBooking}
                  disabled={isBooking}
                >
                  {isBooking ? (
                    <div className="loading-dots">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  ) : (
                    "Confirm Booking"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Popular Routes */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Popular Routes</h2>
            <div className="space-y-4">
              {[
                { from: "Lusaka", to: "Livingstone", price: "K350" },
                { from: "Kitwe", to: "Lusaka", price: "K280" },
                { from: "Ndola", to: "Chipata", price: "K320" },
              ].map((route) => (
                <div
                  key={`${route.from}-${route.to}`}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer"
                  onClick={() => {
                    setFrom(route.from.toLowerCase());
                    setTo(route.to.toLowerCase());
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-medium">
                        {route.from} → {route.to}
                      </p>
                      <p className="text-sm text-muted-foreground">from {route.price}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="hover:bg-primary/5">
                    Select
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}