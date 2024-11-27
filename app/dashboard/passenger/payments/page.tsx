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

interface Payment {
  id: number;
  bookingId: number;
  amount: number;
  method: 'Mobile Money' | 'Bank Card' | 'Bank Transfer';
  status: 'Pending' | 'Completed' | 'Failed' | 'Refunded';
  reference: string;
  timestamp: string;
  route: string;
  departureDate: string;
}

export default function PassengerPaymentsPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: 1,
      bookingId: 1,
      amount: 250,
      method: 'Mobile Money',
      status: 'Completed',
      reference: 'PAY-123456',
      timestamp: '2024-03-15 14:30',
      route: 'Lusaka → Livingstone',
      departureDate: '2024-03-20',
    },
  ]);

  const validatePayment = (formData: FormData) => {
    const amount = formData.get('amount') as string;
    const method = formData.get('method') as Payment['method'];
    const reference = formData.get('reference') as string;

    if (!amount || !method || !reference) {
      throw new Error('All fields are required');
    }

    // Validate amount
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      throw new Error('Amount must be a positive number');
    }

    // Validate payment method
    if (!['Mobile Money', 'Bank Card', 'Bank Transfer'].includes(method)) {
      throw new Error('Invalid payment method');
    }

    // Validate reference number format
    if (method === 'Mobile Money') {
      // Validate mobile money reference (e.g., MTN, Airtel format)
      if (!/^[A-Z0-9]{8,12}$/.test(reference)) {
        throw new Error('Invalid mobile money reference number');
      }
    } else if (method === 'Bank Card') {
      // Validate card payment reference
      if (!/^[A-Z]-\d{6}$/.test(reference)) {
        throw new Error('Invalid card payment reference');
      }
    } else {
      // Validate bank transfer reference
      if (!/^BT-\d{8}$/.test(reference)) {
        throw new Error('Invalid bank transfer reference');
      }
    }

    return {
      amount: amountNum,
      method,
      reference,
      status: 'Pending' as const,
      timestamp: new Date().toISOString().replace('T', ' ').split('.')[0],
      // Mock values for demo
      bookingId: Math.floor(Math.random() * 1000),
      route: 'Lusaka → Livingstone',
      departureDate: '2024-03-20',
    };
  };

  const handleAddPayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const validatedData = validatePayment(formData);

      // Check for duplicate reference
      const isDuplicate = payments.some(payment => 
        payment.reference.toLowerCase() === validatedData.reference.toLowerCase()
      );

      if (isDuplicate) {
        throw new Error('This payment reference has already been used');
      }

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate payment success/failure (90% success rate)
      const isSuccessful = Math.random() < 0.9;
      if (!isSuccessful) {
        throw new Error('Payment processing failed. Please try again.');
      }

      const newPayment = {
        id: Math.random(),
        ...validatedData,
        status: 'Completed' as const,
      };

      setPayments(prev => [...prev, newPayment]);
      toast({
        title: "Payment successful",
        description: `Payment of K${newPayment.amount} has been processed successfully.`,
      });

      // Reset form (you'll need to implement this)
      // formRef.current?.reset();
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "An unexpected error occurred while processing the payment.";
      
      toast({
        title: "Payment failed",
        description: errorMessage,
        variant: "destructive",
      });
      console.error("Add payment error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestRefund = async (paymentId: number) => {
    try {
      const payment = payments.find(p => p.id === paymentId);
      if (!payment) {
        throw new Error('Payment not found');
      }

      if (payment.status !== 'Completed') {
        throw new Error('Only completed payments can be refunded');
      }

      // Check if payment is eligible for refund (within 24 hours)
      const paymentTime = new Date(payment.timestamp);
      const now = new Date();
      const hoursSincePayment = (now.getTime() - paymentTime.getTime()) / (1000 * 60 * 60);
      
      if (hoursSincePayment > 24) {
        throw new Error('Refunds are only available within 24 hours of payment');
      }

      // Add confirmation dialog
      const confirmed = window.confirm(
        "Are you sure you want to request a refund? This action cannot be undone."
      );
      if (!confirmed) return;

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setPayments(prev => prev.map(payment => 
        payment.id === paymentId ? { ...payment, status: 'Refunded' as const } : payment
      ));

      toast({
        title: "Refund requested",
        description: "Your refund request has been submitted successfully.",
      });
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "An unexpected error occurred while requesting the refund.";
      
      toast({
        title: "Refund request failed",
        description: errorMessage,
        variant: "destructive",
      });
      console.error("Refund request error:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Payments</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Payment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Make a Payment</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddPayment} className="space-y-4">
              <div>
                <Label htmlFor="amount">Amount (K)</Label>
                <Input 
                  id="amount" 
                  name="amount" 
                  type="number"
                  min="1"
                  step="0.01"
                  placeholder="Enter amount"
                  required 
                />
              </div>
              <div>
                <Label htmlFor="method">Payment Method</Label>
                <Select name="method" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mobile Money">Mobile Money</SelectItem>
                    <SelectItem value="Bank Card">Bank Card</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="reference">Reference Number</Label>
                <Input 
                  id="reference" 
                  name="reference" 
                  placeholder="Enter payment reference"
                  required 
                />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Processing..." : "Confirm Payment"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date & Time</TableHead>
              <TableHead>Route</TableHead>
              <TableHead>Amount (K)</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Reference</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.timestamp}</TableCell>
                <TableCell>{payment.route}</TableCell>
                <TableCell>{payment.amount}</TableCell>
                <TableCell>{payment.method}</TableCell>
                <TableCell>{payment.reference}</TableCell>
                <TableCell>{payment.status}</TableCell>
                <TableCell className="text-right">
                  {payment.status === 'Completed' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleRequestRefund(payment.id)}
                    >
                      Request Refund
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
