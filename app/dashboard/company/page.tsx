import { Card } from "@/components/ui/card";
import {
  Bus,
  Users,
  MapPin,
  TrendingUp,
  Calendar,
  Clock,
} from "lucide-react";

export default function CompanyDashboard() {
  const stats = [
    {
      title: "Active Routes",
      value: "12",
      icon: MapPin,
      trend: "+2 this month",
    },
    {
      title: "Total Buses",
      value: "8",
      icon: Bus,
      trend: "All operational",
    },
    {
      title: "Customers",
      value: "2.4k",
      icon: Users,
      trend: "+18% this month",
    },
    {
      title: "Revenue",
      value: "K124,500",
      icon: TrendingUp,
      trend: "+12% vs last month",
    },
  ];

  const upcomingDepartures = [
    {
      route: "Lusaka - Livingstone",
      time: "08:00",
      bus: "ZB 1234",
      bookings: "42/50",
    },
    {
      route: "Lusaka - Kitwe",
      time: "09:30",
      bus: "ZB 5678",
      bookings: "38/50",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Company Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {stat.trend}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Today's Departures</h2>
          <div className="space-y-4">
            {upcomingDepartures.map((departure) => (
              <div
                key={departure.bus}
                className="flex items-center justify-between p-4 bg-muted rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{departure.route}</p>
                    <p className="text-sm text-muted-foreground">
                      Bus: {departure.bus}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{departure.time}</p>
                  <p className="text-sm text-muted-foreground">
                    {departure.bookings} booked
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Schedule Overview</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">This Week's Schedule</p>
                  <p className="text-sm text-muted-foreground">
                    28 scheduled trips
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bus className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Bus Utilization</p>
                  <p className="text-sm text-muted-foreground">
                    85% average capacity
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}