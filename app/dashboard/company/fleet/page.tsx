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

interface Bus {
  id: number;
  registrationNumber: string;
  model: string;
  capacity: number;
  manufactureYear: number;
  lastMaintenance: string;
  mileage: number;
  status: 'Active' | 'Maintenance' | 'Out of Service';
}

export default function CompanyFleetPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [buses, setBuses] = useState<Bus[]>([
    {
      id: 1,
      registrationNumber: "ZB 1234",
      model: "Scania K410",
      capacity: 45,
      manufactureYear: 2020,
      lastMaintenance: "2024-02-15",
      mileage: 150000,
      status: "Active",
    },
    {
      id: 2,
      registrationNumber: "ZB 5678",
      model: "Volvo 9700",
      capacity: 52,
      manufactureYear: 2021,
      lastMaintenance: "2024-03-01",
      mileage: 120000,
      status: "Active",
    },
  ]);

  const [editingBus, setEditingBus] = useState<Bus | null>(null);

  const validateBus = (formData: FormData) => {
    const registrationNumber = formData.get('registrationNumber') as string;
    const model = formData.get('model') as string;
    const capacity = formData.get('capacity') as string;
    const manufactureYear = formData.get('manufactureYear') as string;
    const lastMaintenance = formData.get('lastMaintenance') as string;
    const mileage = formData.get('mileage') as string;

    if (!registrationNumber || !model || !capacity || !manufactureYear || !lastMaintenance || !mileage) {
      throw new Error('All fields are required');
    }

    // Validate registration number format (example: ZB 1234)
    if (!/^ZB\s\d{4}$/.test(registrationNumber)) {
      throw new Error('Invalid registration number format. Must be in format: ZB XXXX');
    }

    // Validate capacity
    const capacityNum = parseInt(capacity);
    if (isNaN(capacityNum) || capacityNum < 1 || capacityNum > 100) {
      throw new Error('Capacity must be between 1 and 100');
    }

    // Validate manufacture year
    const yearNum = parseInt(manufactureYear);
    const currentYear = new Date().getFullYear();
    if (isNaN(yearNum) || yearNum < 2000 || yearNum > currentYear) {
      throw new Error(`Manufacture year must be between 2000 and ${currentYear}`);
    }

    // Validate last maintenance date
    const maintenanceDate = new Date(lastMaintenance);
    if (isNaN(maintenanceDate.getTime())) {
      throw new Error('Invalid maintenance date');
    }
    if (maintenanceDate > new Date()) {
      throw new Error('Last maintenance date cannot be in the future');
    }

    // Validate mileage
    const mileageNum = parseInt(mileage);
    if (isNaN(mileageNum) || mileageNum < 0) {
      throw new Error('Mileage must be a positive number');
    }

    return {
      registrationNumber,
      model,
      capacity: capacityNum,
      manufactureYear: yearNum,
      lastMaintenance,
      mileage: mileageNum,
      status: 'Active' as const
    };
  };

  const handleAddBus = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const validatedData = validateBus(formData);

      // Check for duplicate registration number
      const isDuplicate = buses.some(bus => 
        bus.registrationNumber.toLowerCase() === validatedData.registrationNumber.toLowerCase()
      );

      if (isDuplicate) {
        throw new Error('A bus with this registration number already exists');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newBus = {
        id: Math.random(),
        ...validatedData
      };

      setBuses(prev => [...prev, newBus]);
      toast({
        title: "Bus added",
        description: "New bus has been added to the fleet successfully.",
      });

      // Reset form (you'll need to implement this)
      // formRef.current?.reset();
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "An unexpected error occurred while adding the bus.";
      
      toast({
        title: "Failed to add bus",
        description: errorMessage,
        variant: "destructive",
      });
      console.error("Add bus error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditBus = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingBus) return;
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const registrationNumber = (formData.get('registrationNumber') as string).trim().toUpperCase();
      const model = (formData.get('model') as string).trim();
      const capacity = parseInt(formData.get('capacity') as string);
      const manufactureYear = parseInt(formData.get('manufactureYear') as string);
      const lastMaintenance = formData.get('lastMaintenance') as string;
      const mileage = parseInt(formData.get('mileage') as string);

      // Validation checks
      if (!/^ZB\s*\d{4}$/.test(registrationNumber)) {
        throw new Error('Invalid registration number format. Must be in format "ZB XXXX"');
      }

      if (capacity < 1 || capacity > 100) {
        throw new Error('Capacity must be between 1 and 100');
      }

      const currentYear = new Date().getFullYear();
      if (manufactureYear < 2000 || manufactureYear > currentYear) {
        throw new Error(`Manufacture year must be between 2000 and ${currentYear}`);
      }

      if (mileage < 0) {
        throw new Error('Mileage cannot be negative');
      }

      // Check for duplicate registration (excluding current bus)
      const isDuplicate = buses.some(bus => 
        bus.id !== editingBus.id && 
        bus.registrationNumber === registrationNumber
      );

      if (isDuplicate) {
        throw new Error('A bus with this registration number already exists');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setBuses(prev => prev.map(bus => 
        bus.id === editingBus.id 
          ? {
              ...bus,
              registrationNumber,
              model,
              capacity,
              manufactureYear,
              lastMaintenance,
              mileage
            }
          : bus
      ));

      toast({
        title: "Bus updated",
        description: "Bus details have been updated successfully.",
      });

      setEditingBus(null);
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "An unexpected error occurred while updating the bus.";
      
      toast({
        title: "Failed to update bus",
        description: errorMessage,
        variant: "destructive",
      });
      console.error("Edit bus error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBus = async (busId: number) => {
    try {
      // Check if bus has active schedules (mock check)
      const hasActiveSchedules = Math.random() < 0.2; // 20% chance of having active schedules
      if (hasActiveSchedules) {
        throw new Error('Cannot delete bus with active schedules');
      }

      // Add confirmation dialog
      const confirmed = window.confirm(
        "Are you sure you want to delete this bus? This action cannot be undone."
      );
      if (!confirmed) return;

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setBuses(prev => prev.filter(bus => bus.id !== busId));
      toast({
        title: "Bus deleted",
        description: "Bus has been removed from the fleet successfully.",
      });
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "An unexpected error occurred while deleting the bus.";
      
      toast({
        title: "Failed to delete bus",
        description: errorMessage,
        variant: "destructive",
      });
      console.error("Delete bus error:", error);
    }
  };

  const handleUpdateBusStatus = async (busId: number, newStatus: Bus['status']) => {
    try {
      // Check if status change is allowed
      const bus = buses.find(b => b.id === busId);
      if (!bus) {
        throw new Error('Bus not found');
      }

      if (bus.status === newStatus) {
        throw new Error(`Bus is already ${newStatus}`);
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setBuses(prev => prev.map(bus => 
        bus.id === busId ? { ...bus, status: newStatus } : bus
      ));

      toast({
        title: "Status updated",
        description: `Bus status has been updated to ${newStatus}.`,
      });
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "An unexpected error occurred while updating the bus status.";
      
      toast({
        title: "Failed to update status",
        description: errorMessage,
        variant: "destructive",
      });
      console.error("Update bus status error:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Fleet Management</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Bus
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingBus ? 'Edit Bus' : 'Add New Bus'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={editingBus ? handleEditBus : handleAddBus} className="space-y-4">
              <div>
                <Label htmlFor="registrationNumber">Registration Number</Label>
                <Input 
                  id="registrationNumber" 
                  name="registrationNumber" 
                  placeholder="ZB XXXX"
                  defaultValue={editingBus?.registrationNumber}
                  required 
                />
              </div>
              <div>
                <Label htmlFor="model">Model</Label>
                <Input 
                  id="model" 
                  name="model" 
                  placeholder="e.g., Scania K410" 
                  defaultValue={editingBus?.model}
                  required 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input 
                    id="capacity" 
                    name="capacity" 
                    type="number" 
                    min="1"
                    max="100"
                    defaultValue={editingBus?.capacity}
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor="manufactureYear">Manufacture Year</Label>
                  <Input 
                    id="manufactureYear" 
                    name="manufactureYear" 
                    type="number"
                    min="2000"
                    max={new Date().getFullYear()}
                    defaultValue={editingBus?.manufactureYear}
                    required 
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="lastMaintenance">Last Maintenance</Label>
                <Input 
                  id="lastMaintenance" 
                  name="lastMaintenance" 
                  type="date"
                  defaultValue={editingBus?.lastMaintenance}
                  required 
                />
              </div>
              <div>
                <Label htmlFor="mileage">Mileage (km)</Label>
                <Input 
                  id="mileage" 
                  name="mileage" 
                  type="number"
                  min="0"
                  defaultValue={editingBus?.mileage}
                  required 
                />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (editingBus ? "Updating..." : "Adding...") : (editingBus ? "Update Bus" : "Add Bus")}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Registration</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Last Maintenance</TableHead>
              <TableHead>Mileage (km)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {buses.map((bus) => (
              <TableRow key={bus.id}>
                <TableCell>{bus.registrationNumber}</TableCell>
                <TableCell>{bus.model}</TableCell>
                <TableCell>{bus.capacity}</TableCell>
                <TableCell>{bus.manufactureYear}</TableCell>
                <TableCell>{bus.lastMaintenance}</TableCell>
                <TableCell>{bus.mileage}</TableCell>
                <TableCell>{bus.status}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuItem onClick={() => setEditingBus(bus)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleUpdateBusStatus(bus.id, 'Active')}>
                      Set Active
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleUpdateBusStatus(bus.id, 'Maintenance')}>
                      Set Maintenance
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleUpdateBusStatus(bus.id, 'Out of Service')}>
                      Set Out of Service
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => handleDeleteBus(bus.id)}
                      className="text-red-600"
                    >
                      <Trash className="h-4 w-4 mr-2" />
                      Delete Bus
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
