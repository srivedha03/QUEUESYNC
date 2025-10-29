import { Star, Sun, Globe, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminNavbar = () => {
  return (
    <nav className="border-b border-border bg-background">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Star className="h-6 w-6 text-primary fill-primary" />
              <span className="text-xl font-bold">
                <span className="text-primary">QUEUE</span>{" "}
                <span className="text-foreground">SYNC</span>
              </span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Home
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Appointments
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Bookings
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Congestion Control
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Sun className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Globe className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full"></span>
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Dashboard
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
