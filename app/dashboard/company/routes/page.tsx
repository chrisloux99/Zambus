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

export default function CompanyRoutesPage() {
  const { toast } = useToast();
  const [routes, setRoutes] = useState([
    {
      id: 1,
      from: "Lusaka",
      to: "Livingstone",
      price: 350,
      duration: "6 hours",
      frequency: "Daily",
      discount: "10% off for students",
      insurance: "Basic coverage included",
    },
    {
      id: 2,
      from: "Lusaka",
      to: "Kitwe",
      price: 280,
      duration: "4 hours",
      frequency: "Twice daily",
      discount: "15% off for seniors",
      insurance: "Premium coverage available",
    },
  ]);

  const [isAddingRoute, setIsAddingRoute] = useState(false);
  const [editingRoute, setEditingRoute] = useState(null);

  const handleAddRoute = (formData: FormData) => {
    const newRoute = {
      id: routes.length + 1,
      from: formData.get('from') as string,
      to: formData.get('to') as string,
      price: Number(formData.get('price')),
      duration: formData.get('duration') as string,
      frequency: formData.get('frequency') as string,
      discount: formData.get('discount') as string,
      insurance: formData.get('insurance') as string,
    };

    setRoutes([...routes, newRoute]);
    setIsAddingRoute(false);
    toast({
      title: "Route added",
      description: "New route has been added successfully.",
    });
  };

  const handleDeleteRoute = (id: number) => {
    setRoutes(routes.filter(route => route.id !== id));
    toast({
      title: "Route deleted",
      description: "Route has been deleted successfully.",
    });
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
              <DialogTitle>Add New Route</DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleAddRoute(new FormData(e.currentTarget));
            }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="from">From</Label>
                  <Input id="from" name="from" placeholder="Departure city" required />
                </div>
                <div>
                  <Label htmlFor="to">To</Label>
                  <Input id="to" name="to" placeholder="Destination city" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price (K)</Label>
                  <Input id="price" name="price" type="number" placeholder="Enter price" required />
                </div>
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Input id="duration" name="duration" placeholder="e.g., 4 hours" required />
                </div>
              </div>
              <div>
                <Label htmlFor="frequency">Frequency</Label>
                <Input id="frequency" name="frequency" placeholder="e.g., Daily, Twice daily" required />
              </div>
              <div>
                <Label htmlFor="discount">Discount Offers</Label>
                <Input id="discount" name="discount" placeholder="e.g., 10% off for students" />
              </div>
              <div>
                <Label htmlFor="insurance">Insurance Options</Label>
                <Input id="insurance" name="insurance" placeholder="e.g., Basic coverage included" />
              </div>
              <Button type="submit">Save Route</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Price (K)</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Insurance</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {routes.map((route) => (
              <TableRow key={route.id}>
                <TableCell>{route.from}</TableCell>
                <TableCell>{route.to}</TableCell>
                <TableCell>{route.price}</TableCell>
                <TableCell>{route.duration}</TableCell>
                <TableCell>{route.frequency}</TableCell>
                <TableCell>{route.discount}</TableCell>
                <TableCell>{route.insurance}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDeleteRoute(route.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}