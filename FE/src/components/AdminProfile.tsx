import { useState, useEffect } from "react";
import { Settings, ScanLine, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const AdminProfile = () => {
  // ✅ Form state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [slot, setSlot] = useState("");
  const [patientType, setPatientType] = useState("");
  const [slotCounts, setSlotCounts] = useState<
    Record<string, { count: number; percentage: number }>
  >({});

  const center = "Admin Walk-in Desk";

  const slots = [
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "2:00 PM - 3:00 PM",
  ];

  // ✅ Fetch slot data (same as Bookings)
  const fetchSlotCounts = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/bookings/count/${encodeURIComponent(center)}`
      );
      const data = await response.json();
      const counts: Record<string, { count: number; percentage: number }> = {};
      data.forEach((item: any) => {
        counts[item.slot] = {
          count: item.count,
          percentage: item.percentage || 0,
        };
      });
      setSlotCounts(counts);
    } catch (err) {
      console.error("Error fetching slot counts:", err);
    }
  };

  useEffect(() => {
    if (isDialogOpen) fetchSlotCounts();
  }, [isDialogOpen]);

  // ✅ Handle form submit
  const handleWalkInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const walkInData = { name, phone, slot, center, patient_type: patientType };

    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(walkInData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Walk-in saved successfully!");
        setName("");
        setPhone("");
        setSlot("");
        setPatientType("");
        fetchSlotCounts();
        setIsDialogOpen(false);
      } else {
        alert(data.error || "❌ Something went wrong");
      }
    } catch (err) {
      console.error("Error saving walk-in:", err);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex flex-col items-center">
        <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mb-4">
          <span className="text-2xl font-bold text-primary-foreground">AS</span>
        </div>
        <h2 className="text-xl font-bold text-foreground mb-1">Admin Smith</h2>
        <p className="text-sm text-muted-foreground mb-1">
          admin.smith@hospital.com
        </p>
        <p className="text-sm text-muted-foreground mb-3">ORG-2025-4210</p>
        <Badge variant="secondary" className="mb-6">
          Emergency Department
        </Badge>

        <div className="w-full space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            size="lg"
          >
            <Settings className="h-4 w-4" />
            Edit Profile
          </Button>
          <Button
            variant="default"
            className="w-full justify-start gap-2 bg-primary hover:bg-primary/90"
            size="lg"
          >
            <ScanLine className="h-4 w-4" />
            Scanner
          </Button>
          {/* ✅ Walk-In button opens booking form */}
          <Button
            variant="default"
            className="w-full justify-start gap-2 bg-primary hover:bg-primary/90"
            size="lg"
            onClick={() => setIsDialogOpen(true)}
          >
            <UserPlus className="h-4 w-4" />
            Walk-In
          </Button>
        </div>
      </div>

      {/* ✅ Walk-in Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Walk-in Appointment — {center}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleWalkInSubmit} className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                placeholder="Enter patient name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input
                placeholder="Enter phone number"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Patient Type</Label>
              <Select onValueChange={(value) => setPatientType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select patient type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Emergency">Emergency</SelectItem>
                  <SelectItem value="VIP">VIP</SelectItem>
                  <SelectItem value="Senior Citizen">Senior Citizen</SelectItem>
                  <SelectItem value="General">General</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Select Slot</Label>
              <Select onValueChange={(value) => setSlot(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a time slot" />
                </SelectTrigger>
                <SelectContent>
                  {slots.map((s) => {
                    const percentage = slotCounts[s]?.percentage || 0;
                    let crowdText = "Moderate Crowd";
                    let textColor = "text-yellow-600";

                    if (percentage >= 70) {
                      crowdText = "Highly Crowded";
                      textColor = "text-red-600";
                    } else if (percentage <= 30) {
                      crowdText = "Less Crowd";
                      textColor = "text-green-600";
                    }

                    return (
                      <SelectItem key={s} value={s}>
                        {s} —{" "}
                        <span className={`${textColor} text-xs font-semibold`}>
                          {crowdText}
                        </span>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-primary hover:bg-primary-glow"
              >
                Confirm Walk-in
              </Button>
              <Button
                variant="default"
                className="w-full justify-start gap-2 bg-primary hover:bg-primary/90"
                size="lg"
                onClick={() => (window.location.href = "/checkins")}
              >
                <ScanLine className="h-4 w-4" />
                Check-in Profiles
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default AdminProfile;
