import { Bus } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Bus className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">ZamBus</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your trusted partner for intercity bus travel across Zambia.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/book" className="text-sm text-muted-foreground hover:text-primary">
                  Book Tickets
                </Link>
              </li>
              <li>
                <Link href="/track" className="text-sm text-muted-foreground hover:text-primary">
                  Track Bus
                </Link>
              </li>
              <li>
                <Link href="/companies" className="text-sm text-muted-foreground hover:text-primary">
                  Bus Companies
                </Link>
              </li>
              <li>
                <Link href="/insurance" className="text-sm text-muted-foreground hover:text-primary">
                  Travel Insurance
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-sm text-muted-foreground hover:text-primary">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-primary">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Email: support@zambus.com</li>
              <li>Phone: +260 97 1234567</li>
              <li>Address: Plot 123, Cairo Road</li>
              <li>Lusaka, Zambia</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} ZamBus. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}