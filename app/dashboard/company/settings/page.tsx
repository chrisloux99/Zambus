"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CompanySettingsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Company Settings</h1>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Company Profile</TabsTrigger>
          <TabsTrigger value="contact">Contact Information</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="p-6">
            <form className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" defaultValue="Power Tools Bus Services" />
                </div>
                <div>
                  <Label htmlFor="businessLicense">Business License Number</Label>
                  <Input id="businessLicense" defaultValue="BTR-2024-1234" />
                </div>
                <div>
                  <Label htmlFor="description">Company Description</Label>
                  <Textarea
                    id="description"
                    defaultValue="Premium bus service with modern fleet and professional drivers."
                  />
                </div>
                <div>
                  <Label htmlFor="operatingRegions">Operating Regions</Label>
                  <Input
                    id="operatingRegions"
                    defaultValue="Lusaka, Copperbelt, Southern Province"
                  />
                </div>
              </div>
              <Button>Save Changes</Button>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card className="p-6">
            <form className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Primary Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="contact@powertools.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Primary Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    defaultValue="+260 97 1234567"
                  />
                </div>
                <div>
                  <Label htmlFor="address">Physical Address</Label>
                  <Textarea
                    id="address"
                    defaultValue="123 Cairo Road, Lusaka, Zambia"
                  />
                </div>
                <div>
                  <Label htmlFor="supportEmail">Support Email</Label>
                  <Input
                    id="supportEmail"
                    type="email"
                    defaultValue="support@powertools.com"
                  />
                </div>
              </div>
              <Button>Update Contact Info</Button>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="p-6">
            <form className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Booking Notifications</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications for new bookings
                    </p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Schedule Updates</h3>
                    <p className="text-sm text-muted-foreground">
                      Get notified about schedule changes
                    </p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">System Alerts</h3>
                    <p className="text-sm text-muted-foreground">
                      Important system notifications
                    </p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
              </div>
              <Button>Save Preferences</Button>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}