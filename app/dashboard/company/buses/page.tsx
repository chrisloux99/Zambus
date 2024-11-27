"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
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

export default function CompanyBusesPage() {
  const [buses, setBuses] = useState([
    {
      id: 1,
      regNumber: "ZB 1234",
      model: "Scania K410",
      capacity: 50,
      status: "Active",
      lastService: "2024-02-15",
    },
    {
      id: 2,
      regNumber: "ZB 5678",
      model: "Volvo B11R",
      capacity: 45,
      status: "Active",
      lastService: "2024-02-20",
    },
  ]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Buses</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Bus
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Bus</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="regNumber">Registration Number</Label>
                  <Input id="regNumber" placeholder="e.g., ZB 1234" />
                </div>
                <div>
                  <Label htmlFor="model">Model</Label>
                  <Input id="model" placeholder="e.g., Scania K410" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="capacity">Seating Capacity</Label>
                  <Input id="capacity" type="number" placeholder="Enter capacity" />
                </div>
                <div>
                  <Label htmlFor="lastService">Last Service Date</Label>
                  <Input id="lastService" type="date" />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button>Add Bus</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reg Number</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Service</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {buses.map((bus) => (
              <TableRow key={bus.id}>
                <TableCell>{bus.regNumber}</TableCell>
                <TableCell>{bus.model}</TableCell>
                <TableCell>{bus.capacity}</TableCell>
                <TableCell>{bus.status}</TableCell>
                <TableCell>{bus.lastService}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
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