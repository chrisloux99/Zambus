"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/lib/auth/store';
import { format } from 'date-fns';
import { Bus, Calendar, MapPin, Clock } from 'lucide-react';

interface Booking {
  id: string;
  route: string;
  date: string;
  status: string;
  company: string;
  departureTime: string;
  arrivalTime: string;
  seatNumber: string;
  price: string;
}

export default function PassengerDashboard() {
  const { user } = useAuth();
  const [activeBookings, setActiveBookings] = useState<Booking[]>([
    {
      id: 'B001',
      route: 'Lusaka → Livingstone',
      date: '2024-03-15',
      status: 'Upcoming',
      company: 'Power Tools Bus Services',
      departureTime: '08:00',
      arrivalTime: '14:00',
      seatNumber: '23A',
      price: 'K350'
    }
  ]);

  const [bookingHistory, setBookingHistory] = useState<Booking[]>([
    {
      id: 'B002',
      route: 'Kitwe → Lusaka',
      date: '2024-02-20',
      status: 'Completed',
      company: 'Mazhandu Family Bus',
      departureTime: '09:30',
      arrivalTime: '13:30',
      seatNumber: '15B',
      price: 'K280'
    }
  ]);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome back, {user?.name}</h1>
          <p className="text-muted-foreground mt-2">Manage your bookings and view your travel history</p>
        </div>

        <Tabs defaultValue="active" className="space-y-8">
          <TabsList>
            <TabsTrigger value="active">Active Bookings</TabsTrigger>
            <TabsTrigger value="history">Booking History</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <div className="grid gap-6">
              {activeBookings.map((booking) => (
                <Card key={booking.id} className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Bus className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{booking.route}</h3>
                          <p className="text-sm text-muted-foreground">{booking.company}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{format(new Date(booking.date), 'PP')}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{booking.departureTime} - {booking.arrivalTime}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Seat {booking.seatNumber}</span>
                        </div>
                        <div className="text-sm font-semibold">{booking.price}</div>
                      </div>
                    </div>

                    <div className="mt-4 md:mt-0">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                        {booking.status}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history">
            <div className="grid gap-6">
              {bookingHistory.map((booking) => (
                <Card key={booking.id} className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                          <Bus className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{booking.route}</h3>
                          <p className="text-sm text-muted-foreground">{booking.company}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{format(new Date(booking.date), 'PP')}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{booking.departureTime} - {booking.arrivalTime}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Seat {booking.seatNumber}</span>
                        </div>
                        <div className="text-sm font-semibold">{booking.price}</div>
                      </div>
                    </div>

                    <div className="mt-4 md:mt-0">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-muted text-muted-foreground">
                        {booking.status}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}