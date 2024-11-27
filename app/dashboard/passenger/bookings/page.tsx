'use client';

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Edit, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface Booking {
  id: number;
  routeId: number;
  scheduleId: number;
  origin: string;
  destination: string;
  departureDate: string;
  departureTime: string;
  seatNumber: string;
  passengerName: string;
  passengerPhone: string;
  status: 'Confirmed' | 'Cancelled' | 'Completed';
  fare: number;
}

export default function PassengerBookingsPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 1,
      routeId: 1,
      scheduleId: 1,
      origin: "Lusaka",
      destination: "Livingstone",
      departureDate: "2024-03-20",
      departureTime: "08:00",
      seatNumber: "12A",
      passengerName: "John Doe",
      passengerPhone: "+260 97 1234567",
      status: "Confirmed",
      fare: 250,
    },
  ]);

  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);

  const validateBooking = (formData: FormData) => {
    const origin = formData.get('origin') as string;
    const destination = formData.get('destination') as string;
    const departureDate = formData.get('departureDate') as string;
    const departureTime = formData.get('departureTime') as string;
    const passengerName = formData.get('passengerName') as string;
    const passengerPhone = formData.get('passengerPhone') as string;

    if (!origin || !destination || !departureDate || !departureTime || !passengerName || !passengerPhone) {
      throw new Error('All fields are required');
    }

    // Validate departure date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(departureDate);
    if (selectedDate < today) {
      throw new Error('Departure date cannot be in the past');
    }

    // Validate departure time
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(departureTime)) {
      throw new Error('Invalid time format. Use HH:MM (24-hour format)');
    }

    // Validate passenger name
    if (passengerName.length < 3) {
      throw new Error('Passenger name must be at least 3 characters long');
    }

    // Validate phone number (Zambian format)
    const phoneRegex = /^\+260\s\d{2}\s\d{7}$/;
    if (!phoneRegex.test(passengerPhone)) {
      throw new Error('Invalid phone number format. Use: +260 XX XXXXXXX');
    }

    // Check if selected date and time is not too close to departure
    const departureDateTime = new Date(`${departureDate}T${departureTime}`);
    const minBookingTime = new Date();
    minBookingTime.setHours(minBookingTime.getHours() + 2); // Minimum 2 hours before departure
    if (departureDateTime < minBookingTime) {
      throw new Error('Bookings must be made at least 2 hours before departure');
    }

    return {
      origin,
      destination,
      departureDate,
      departureTime,
      passengerName,
      passengerPhone,
      status: 'Confirmed' as const,
      // Mock values for demo
      routeId: Math.floor(Math.random() * 1000),
      scheduleId: Math.floor(Math.random() * 1000),
      seatNumber: `${Math.floor(Math.random() * 45 + 1)}${String.fromCharCode(65 + Math.floor(Math.random() * 4))}`,
      fare: Math.floor(Math.random() * 300 + 150),
    };
  };

  const handleAddBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const validatedData = validateBooking(formData);

      // Check for duplicate booking
      const isDuplicate = bookings.some(booking => 
        booking.departureDate === validatedData.departureDate &&
        booking.departureTime === validatedData.departureTime &&
        booking.passengerPhone === validatedData.passengerPhone
      );

      if (isDuplicate) {
        throw new Error('You already have a booking for this date and time');
      }

      // Check seat availability (mock)
      const seatsAvailable = Math.random() > 0.2; // 80% chance of seats being available
      if (!seatsAvailable) {
        throw new Error('No seats available for this schedule');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newBooking = {
        id: Math.random(),
        ...validatedData
      };

      setBookings(prev => [...prev, newBooking]);
      toast({
        title: "Booking confirmed",
        description: `Your booking has been confirmed. Seat number: ${newBooking.seatNumber}`,
      });

      // Reset form (you'll need to implement this)
      // formRef.current?.reset();
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "An unexpected error occurred while making the booking.";
      
      toast({
        title: "Booking failed",
        description: errorMessage,
        variant: "destructive",
      });
      console.error("Add booking error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingBooking) return;
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const origin = (formData.get('origin') as string).trim();
      const destination = (formData.get('destination') as string).trim();
      const departureDate = formData.get('departureDate') as string;
      const departureTime = formData.get('departureTime') as string;
      const passengerName = (formData.get('passengerName') as string).trim();
      const passengerPhone = (formData.get('passengerPhone') as string).trim();

      // Validation
      if (!origin || !destination) {
        throw new Error('Origin and destination are required');
      }

      if (origin === destination) {
        throw new Error('Origin and destination cannot be the same');
      }

      const now = new Date();
      const selectedDate = new Date(`${departureDate}T${departureTime}`);
      
      if (selectedDate < now) {
        throw new Error('Cannot book for past dates and times');
      }

      if (!passengerName || passengerName.length < 3) {
        throw new Error('Please enter a valid passenger name');
      }

      // Validate Zambian phone number
      if (!/^\+260\d{9}$/.test(passengerPhone)) {
        throw new Error('Please enter a valid Zambian phone number (+260XXXXXXXXX)');
      }

      // Check if the route exists (mock check)
      const routeExists = Math.random() < 0.9; // 90% chance route exists
      if (!routeExists) {
        throw new Error('No available route found for selected origin and destination');
      }

      // Check seat availability (mock check)
      const seatAvailable = Math.random() < 0.8; // 80% chance seat is available
      if (!seatAvailable) {
        throw new Error('No seats available for selected date and time');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setBookings(prev => prev.map(booking => 
        booking.id === editingBooking.id 
          ? {
              ...booking,
              origin,
              destination,
              departureDate,
              departureTime,
              passengerName,
              passengerPhone
            }
          : booking
      ));

      toast({
        title: "Booking updated",
        description: "Your booking has been updated successfully.",
      });

      setEditingBooking(null);
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "An unexpected error occurred while updating the booking.";
      
      toast({
        title: "Failed to update booking",
        description: errorMessage,
        variant: "destructive",
      });
      console.error("Edit booking error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId: number) => {
    try {
      const booking = bookings.find(b => b.id === bookingId);
      if (!booking) {
        throw new Error('Booking not found');
      }

      // Check if booking can be cancelled
      const departureDateTime = new Date(`${booking.departureDate}T${booking.departureTime}`);
      const now = new Date();
      const hoursUntilDeparture = (departureDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);
      
      if (hoursUntilDeparture < 4) {
        throw new Error('Bookings can only be cancelled at least 4 hours before departure');
      }

      // Add confirmation dialog
      const confirmed = window.confirm(
        "Are you sure you want to cancel this booking? This action cannot be undone."
      );
      if (!confirmed) return;

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setBookings(prev => prev.map(booking => 
        booking.id === bookingId ? { ...booking, status: 'Cancelled' as const } : booking
      ));

      toast({
        title: "Booking cancelled",
        description: "Your booking has been cancelled successfully.",
      });
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "An unexpected error occurred while cancelling the booking.";
      
      toast({
        title: "Failed to cancel booking",
        description: errorMessage,
        variant: "destructive",
      });
      console.error("Cancel booking error:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Bookings</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Booking
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingBooking ? 'Edit Booking' : 'Make a New Booking'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={editingBooking ? handleEditBooking : handleAddBooking} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="origin">Origin</Label>
                  <Input 
                    id="origin" 
                    name="origin" 
                    placeholder="From"
                    defaultValue={editingBooking?.origin}
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor="destination">Destination</Label>
                  <Input 
                    id="destination" 
                    name="destination" 
                    placeholder="To"
                    defaultValue={editingBooking?.destination}
                    required 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="departureDate">Departure Date</Label>
                  <Input 
                    id="departureDate" 
                    name="departureDate" 
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    defaultValue={editingBooking?.departureDate}
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor="departureTime">Departure Time</Label>
                  <Input 
                    id="departureTime" 
                    name="departureTime" 
                    type="time"
                    defaultValue={editingBooking?.departureTime}
                    required 
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="passengerName">Passenger Name</Label>
                <Input 
                  id="passengerName" 
                  name="passengerName" 
                  placeholder="Full name"
                  defaultValue={editingBooking?.passengerName}
                  required 
                />
              </div>
              <div>
                <Label htmlFor="passengerPhone">Phone Number</Label>
                <Input 
                  id="passengerPhone" 
                  name="passengerPhone" 
                  placeholder="+260 XX XXXXXXX"
                  defaultValue={editingBooking?.passengerPhone}
                  required 
                />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Processing..." : (editingBooking ? "Update Booking" : "Confirm Booking")}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Route</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Seat</TableHead>
              <TableHead>Passenger</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Fare (K)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>{`${booking.origin} → ${booking.destination}`}</TableCell>
                <TableCell>{`${booking.departureDate} ${booking.departureTime}`}</TableCell>
                <TableCell>{booking.seatNumber}</TableCell>
                <TableCell>{booking.passengerName}</TableCell>
                <TableCell>{booking.passengerPhone}</TableCell>
                <TableCell>{booking.fare}</TableCell>
                <TableCell>{booking.status}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    {booking.status === 'Confirmed' && (
                      <>
                        <DropdownMenuItem onClick={() => setEditingBooking(booking)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleCancelBooking(booking.id)}
                          className="text-red-600"
                        >
                          <Trash className="h-4 w-4 mr-2" />
                          Cancel
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
