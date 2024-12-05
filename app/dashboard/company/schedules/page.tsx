"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

export default function CompanySchedulesPage() {
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      route: "Lusaka - Livingstone",
      bus: "ZB 1234",
      departure: "08:00",
      arrival: "14:00",
      days: "Daily",
      status: "Active",
    },
    {
      id: 2,
      route: "Lusaka - Kitwe",
      bus: "ZB 5678",
      departure: "09:30",
      arrival: "13:30",
      days: "Mon, Wed, Fri",
      status: "Active",
    },
  ]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Schedules</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Schedule
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Schedule</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="route">Route</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select route" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lusaka-livingstone">
                      Lusaka - Livingstone
                    </SelectItem>
                    <SelectItem value="lusaka-kitwe">
                      Lusaka - Kitwe
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="bus">Bus</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select bus" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zb1234">ZB 1234</SelectItem>
                    <SelectItem value="zb5678">ZB 5678</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="departure">Departure Time</Label>
                  <Input id="departure" type="time" />
                </div>
                <div>
                  <Label htmlFor="arrival">Arrival Time</Label>
                  <Input id="arrival" type="time" />
                </div>
              </div>
              <div>
                <Label htmlFor="days">Operating Days</Label>
                <Input id="days" placeholder="e.g., Daily, Mon-Fri" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button>Add Schedule</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Route</TableHead>
              <TableHead>Bus</TableHead>
              <TableHead>Departure</TableHead>
              <TableHead>Arrival</TableHead>
              <TableHead>Days</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schedules.map((schedule) => (
              <TableRow key={schedule.id}>
                <TableCell>{schedule.route}</TableCell>
                <TableCell>{schedule.bus}</TableCell>
                <TableCell>{schedule.departure}</TableCell>
                <TableCell>{schedule.arrival}</TableCell>
                <TableCell>{schedule.days}</TableCell>
                <TableCell>{schedule.status}</TableCell>
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