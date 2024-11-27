"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Edit, Trash } from "lucide-react";
import { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

interface Route {
  id: number;
  origin: string;
  destination: string;
  distance: string;
  duration: string;
  stops: string[];
  fare: string;
  status: string;
}

interface RouteFormData {
  origin: string;
  destination: string;
  distance: string;
  duration: string;
  stops: string[];
  fare: string;
}

const DEFAULT_ROUTES: Route[] = [
  {
    id: 1,
    origin: "Lusaka",
    destination: "Livingstone",
    distance: "472",
    duration: "6",
    stops: ["Kafue", "Mazabuka", "Monze", "Choma", "Kalomo"],
    fare: "250",
    status: "Active"
  },
  {
    id: 2,
    origin: "Lusaka",
    destination: "Ndola",
    distance: "321",
    duration: "4",
    stops: ["Kabwe", "Kapiri Mposhi", "Serenje"],
    fare: "200",
    status: "Active"
  }
];

export default function CompanyRoutesPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [routes, setRoutes] = useState<Route[]>(DEFAULT_ROUTES);
  const [editingRoute, setEditingRoute] = useState<Route | null>(null);

  const validateRoute = (formData: FormData): RouteFormData => {
    const origin = formData.get('origin') as string;
    const destination = formData.get('destination') as string;
    const distance = formData.get('distance') as string;
    const duration = formData.get('duration') as string;
    const stopsString = formData.get('stops') as string;
    const fare = formData.get('fare') as string;

    if (!origin || !destination || !distance || !duration || !stopsString || !fare) {
      throw new Error('All fields are required');
    }

    // Validate numeric fields
    const distanceNum = Number(distance);
    const durationNum = Number(duration);
    const fareNum = Number(fare);

    if (isNaN(distanceNum) || isNaN(durationNum) || isNaN(fareNum)) {
      throw new Error('Distance, duration, and fare must be valid numbers');
    }

    if (distanceNum <= 0 || durationNum <= 0 || fareNum <= 0) {
      throw new Error('Distance, duration, and fare must be positive numbers');
    }

    // Convert stops string to array and filter out empty values
    const stops = stopsString.split(',')
      .map(stop => stop.trim())
      .filter(Boolean);

    if (stops.length === 0) {
      throw new Error('At least one stop is required');
    }

    return {
      origin: origin.trim(),
      destination: destination.trim(),
      distance,
      duration,
      stops,
      fare
    };
  };

  const handleAddRoute = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const validatedData = validateRoute(formData);

      // Check for duplicate routes
      const isDuplicate = routes.some(route => 
        route.origin.toLowerCase() === validatedData.origin.toLowerCase() &&
        route.destination.toLowerCase() === validatedData.destination.toLowerCase()
      );

      if (isDuplicate) {
        throw new Error('A route between these locations already exists');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newRoute = {
        id: Math.floor(Math.random() * 10000),
        origin: validatedData.origin,
        destination: validatedData.destination,
        distance: validatedData.distance,
        duration: validatedData.duration,
        stops: validatedData.stops,
        fare: validatedData.fare,
        status: 'Active' as const
      } satisfies Route;

      setRoutes(prevRoutes => [...prevRoutes, newRoute] as Route[]);
      toast({
        title: "Route added",
        description: "New route has been added successfully.",
      });

      // Reset form (you'll need to implement this)
      // formRef.current?.reset();
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "An unexpected error occurred while adding the route.";
      
      toast({
        title: "Failed to add route",
        description: errorMessage,
        variant: "destructive",
      });
      console.error("Add route error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditRoute = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!editingRoute) {
        throw new Error('No route selected for editing');
      }

      const formData = new FormData(e.currentTarget);
      const validatedData = validateRoute(formData);

      // Check for duplicate routes (excluding the current route)
      const isDuplicate = routes.some(route => 
        route.id !== editingRoute.id &&
        route.origin.toLowerCase() === validatedData.origin.toLowerCase() &&
        route.destination.toLowerCase() === validatedData.destination.toLowerCase()
      );

      if (isDuplicate) {
        throw new Error('A route between these locations already exists');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedRoute = {
        ...editingRoute,
        origin: validatedData.origin,
        destination: validatedData.destination,
        distance: validatedData.distance,
        duration: validatedData.duration,
        stops: validatedData.stops,
        fare: validatedData.fare
      } satisfies Route;

      setRoutes(prevRoutes => prevRoutes.map(route => 
        route.id === editingRoute.id ? updatedRoute : route
      ) as Route[]);
      toast({
        title: "Route updated",
        description: "Route has been updated successfully.",
      });

      setEditingRoute(null);
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "An unexpected error occurred while updating the route.";
      
      toast({
        title: "Failed to update route",
        description: errorMessage,
        variant: "destructive",
      });
      console.error("Edit route error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteRoute = async (routeId: number) => {
    try {
      // Check if route has active schedules (mock check)
      const hasActiveSchedules = Math.random() < 0.2; // 20% chance of having active schedules
      if (hasActiveSchedules) {
        throw new Error('Cannot delete route with active schedules');
      }

      // Add confirmation dialog
      const confirmed = window.confirm(
        "Are you sure you want to delete this route? This action cannot be undone."
      );
      if (!confirmed) return;

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setRoutes(prevRoutes => prevRoutes.filter(route => route.id !== routeId));
      toast({
        title: "Route deleted",
        description: "Route has been deleted successfully.",
      });
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "An unexpected error occurred while deleting the route.";
      
      toast({
        title: "Failed to delete route",
        description: errorMessage,
        variant: "destructive",
      });
      console.error("Delete route error:", error);
    }
  };

  const handleUpdateRouteStatus = async (routeId: number, newStatus: string) => {
    try {
      // Validate status
      if (!['Active', 'Inactive', 'Maintenance'].includes(newStatus)) {
        throw new Error('Invalid route status');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setRoutes(prevRoutes => prevRoutes.map(route => 
        route.id === routeId ? { ...route, status: newStatus } : route
      ));

      toast({
        title: "Status updated",
        description: `Route status has been updated to ${newStatus}.`,
      });
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "An unexpected error occurred while updating the route status.";
      
      toast({
        title: "Failed to update status",
        description: errorMessage,
        variant: "destructive",
      });
      console.error("Update route status error:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Routes</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Route
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingRoute ? 'Edit Route' : 'Add New Route'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={editingRoute ? handleEditRoute : handleAddRoute} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="origin">Origin</Label>
                  <Input 
                    id="origin" 
                    name="origin" 
                    placeholder="Departure city" 
                    defaultValue={editingRoute?.origin}
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor="destination">Destination</Label>
                  <Input 
                    id="destination" 
                    name="destination" 
                    placeholder="Destination city" 
                    defaultValue={editingRoute?.destination}
                    required 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="distance">Distance (km)</Label>
                  <Input 
                    id="distance" 
                    name="distance" 
                    type="number" 
                    placeholder="Enter distance" 
                    defaultValue={editingRoute?.distance}
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Duration (hours)</Label>
                  <Input 
                    id="duration" 
                    name="duration" 
                    type="number" 
                    placeholder="Enter duration" 
                    defaultValue={editingRoute?.duration}
                    required 
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="stops">Stops (comma-separated)</Label>
                <Input 
                  id="stops" 
                  name="stops" 
                  placeholder="e.g., Kafue, Mazabuka, Choma" 
                  defaultValue={editingRoute?.stops.join(', ')}
                />
              </div>
              <div>
                <Label htmlFor="fare">Fare (K)</Label>
                <Input 
                  id="fare" 
                  name="fare" 
                  type="number" 
                  placeholder="Enter fare" 
                  defaultValue={editingRoute?.fare}
                  required 
                />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (editingRoute ? "Updating..." : "Adding...") : (editingRoute ? "Update Route" : "Add Route")}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Origin</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Distance (km)</TableHead>
              <TableHead>Duration (hours)</TableHead>
              <TableHead>Stops</TableHead>
              <TableHead>Fare (K)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {routes.map((route) => (
              <TableRow key={route.id}>
                <TableCell>{route.origin}</TableCell>
                <TableCell>{route.destination}</TableCell>
                <TableCell>{route.distance}</TableCell>
                <TableCell>{route.duration}</TableCell>
                <TableCell>{route.stops.join(', ')}</TableCell>
                <TableCell>{route.fare}</TableCell>
                <TableCell>{route.status}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuItem onClick={() => setEditingRoute(route)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleUpdateRouteStatus(route.id, 'Active')}>
                      Set Active
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleUpdateRouteStatus(route.id, 'Inactive')}>
                      Set Inactive
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleUpdateRouteStatus(route.id, 'Maintenance')}>
                      Set Maintenance
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => handleDeleteRoute(route.id)}
                      className="text-red-600"
                    >
                      <Trash className="h-4 w-4 mr-2" />
                      Delete Route
                    </DropdownMenuItem>
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