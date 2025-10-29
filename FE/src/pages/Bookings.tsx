// import { useState } from "react";
// import Header from "@/components/Header";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Search, Calendar, TrendingDown, TrendingUp } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";

// const Bookings = () => {
//   const [selectedOrg, setSelectedOrg] = useState<any>(null);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [slot, setSlot] = useState("");

//   const organizations = [
//     {
//       id: 1,
//       name: "City General Hospital",
//       departments: ["Orthopedics", "Cardiology", "Neurology"],
//       currentCrowd: "Medium",
//       peakHours: "12 PM - 2 PM",
//       lowHours: "10 AM - 11 AM",
//       trending: "down",
//     },
//     {
//       id: 2,
//       name: "Metro Medical Center",
//       departments: ["Cardiology", "Pediatrics", "Emergency"],
//       currentCrowd: "Low",
//       peakHours: "3 PM - 5 PM",
//       lowHours: "8 AM - 10 AM",
//       trending: "down",
//     },
//     {
//       id: 3,
//       name: "Central Healthcare Clinic",
//       departments: ["General Medicine", "Dentistry"],
//       currentCrowd: "High",
//       peakHours: "11 AM - 1 PM",
//       lowHours: "2 PM - 4 PM",
//       trending: "up",
//     },
//   ];

//   const getCrowdColor = (crowd: string) => {
//     switch (crowd) {
//       case "Low":
//         return "bg-success/20 text-success border-success/30";
//       case "Medium":
//         return "bg-warning/20 text-warning border-warning/30";
//       case "High":
//         return "bg-destructive/20 text-destructive border-destructive/30";
//       default:
//         return "bg-muted/20 text-muted-foreground border-muted/30";
//     }
//   };

//   // handle booking form submit
//   const handleBookingSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const bookingData = {
//       name,
//       phone,
//       slot,
//       center: selectedOrg?.name,
//     };

//     try {
//       const response = await fetch("http://localhost:5000/api/bookings", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(bookingData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert("✅ Booking successful!");
//         setName("");
//         setPhone("");
//         setSlot("");
//         setIsDialogOpen(false);
//       } else {
//         alert(data.error || "❌ Something went wrong");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Server error. Please try again later.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
//       <main className="container mx-auto px-6 pt-24 pb-12">
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold mb-2">Book Appointment</h1>
//           <p className="text-muted-foreground">
//             Search and book slots at available organizations
//           </p>
//         </div>

//         <div className="mb-8">
//           <div className="relative">
//             <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
//             <Input
//               placeholder="Search hospitals, clinics, or departments..."
//               className="pl-12 h-12 text-lg"
//             />
//           </div>
//         </div>

//         <div className="grid gap-6">
//           {organizations.map((org) => (
//             <Card
//               key={org.id}
//               className="p-6 hover:shadow-glow transition-shadow"
//             >
//               <div className="flex items-start justify-between mb-4">
//                 <div>
//                   <h3 className="text-2xl font-bold mb-2">{org.name}</h3>
//                   <div className="flex flex-wrap gap-2">
//                     {org.departments.map((dept) => (
//                       <Badge key={dept} variant="outline" className="text-xs">
//                         {dept}
//                       </Badge>
//                     ))}
//                   </div>
//                 </div>
//                 <Badge className={`${getCrowdColor(org.currentCrowd)} border`}>
//                   {org.currentCrowd} Crowd
//                 </Badge>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
//                 <div className="flex items-center gap-2 text-sm">
//                   <TrendingUp className="w-4 h-4 text-destructive" />
//                   <span className="text-muted-foreground">Peak Hours:</span>
//                   <span className="font-semibold">{org.peakHours}</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-sm">
//                   <TrendingDown className="w-4 h-4 text-success" />
//                   <span className="text-muted-foreground">Low Hours:</span>
//                   <span className="font-semibold">{org.lowHours}</span>
//                 </div>
//               </div>

//               <div className="flex items-center gap-4">
//                 <Button
//                   variant="default"
//                   className="bg-primary hover:bg-primary-glow"
//                   onClick={() => {
//                     setSelectedOrg(org);
//                     setIsDialogOpen(true);
//                   }}
//                 >
//                   <Calendar className="w-4 h-4 mr-2" />
//                   Book Slot
//                 </Button>
//                 <Button variant="outline">View Details</Button>
//               </div>
//             </Card>
//           ))}
//         </div>
//       </main>

//       {/* Booking Form Dialog */}
//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent className="sm:max-w-md">
//           <DialogHeader>
//             <DialogTitle>Book Appointment — {selectedOrg?.name}</DialogTitle>
//           </DialogHeader>

//           <form onSubmit={handleBookingSubmit} className="space-y-4 mt-2">
//             <div className="space-y-2">
//               <Label htmlFor="name">Full Name</Label>
//               <Input
//                 id="name"
//                 placeholder="Enter your name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="phone">Phone Number</Label>
//               <Input
//                 id="phone"
//                 placeholder="Enter your phone number"
//                 type="tel"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="slot">Select Slot</Label>
//               <Select onValueChange={(value) => setSlot(value)}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Choose a time slot" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="9:00 AM - 10:00 AM">
//                     9:00 AM - 10:00 AM
//                   </SelectItem>
//                   <SelectItem value="10:00 AM - 11:00 AM">
//                     10:00 AM - 11:00 AM
//                   </SelectItem>
//                   <SelectItem value="11:00 AM - 12:00 PM">
//                     11:00 AM - 12:00 PM
//                   </SelectItem>
//                   <SelectItem value="2:00 PM - 3:00 PM">
//                     2:00 PM - 3:00 PM
//                   </SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <DialogFooter className="flex justify-end gap-2 mt-4">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => setIsDialogOpen(false)}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 type="submit"
//                 className="bg-primary hover:bg-primary-glow"
//               >
//                 Confirm Booking
//               </Button>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default Bookings;

// import { useState, useEffect } from "react";
// import Header from "@/components/Header";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Search, Calendar, TrendingDown, TrendingUp } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";

// const Bookings = () => {
//   const [selectedOrg, setSelectedOrg] = useState<any>(null);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [slot, setSlot] = useState("");
//   const [slotCounts, setSlotCounts] = useState<Record<string, number>>({});

//   const organizations = [
//     {
//       id: 1,
//       name: "City General Hospital",
//       departments: ["Orthopedics", "Cardiology", "Neurology"],
//       currentCrowd: "Medium",
//       peakHours: "12 PM - 2 PM",
//       lowHours: "10 AM - 11 AM",
//       trending: "down",
//     },
//     {
//       id: 2,
//       name: "Metro Medical Center",
//       departments: ["Cardiology", "Pediatrics", "Emergency"],
//       currentCrowd: "Low",
//       peakHours: "3 PM - 5 PM",
//       lowHours: "8 AM - 10 AM",
//       trending: "down",
//     },
//     {
//       id: 3,
//       name: "Central Healthcare Clinic",
//       departments: ["General Medicine", "Dentistry"],
//       currentCrowd: "High",
//       peakHours: "11 AM - 1 PM",
//       lowHours: "2 PM - 4 PM",
//       trending: "up",
//     },
//   ];

//   const slots = [
//     "9:00 AM - 10:00 AM",
//     "10:00 AM - 11:00 AM",
//     "11:00 AM - 12:00 PM",
//     "2:00 PM - 3:00 PM",
//   ];

//   const getCrowdColor = (crowd: string) => {
//     switch (crowd) {
//       case "Low":
//         return "bg-success/20 text-success border-success/30";
//       case "Medium":
//         return "bg-warning/20 text-warning border-warning/30";
//       case "High":
//         return "bg-destructive/20 text-destructive border-destructive/30";
//       default:
//         return "bg-muted/20 text-muted-foreground border-muted/30";
//     }
//   };

//   // 🧠 Fetch booking counts for that hospital
//   const fetchSlotCounts = async (centerName: string) => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/bookings/count/${centerName}`
//       );
//       const data = await response.json();
//       const counts: Record<string, number> = {};
//       data.forEach((item: any) => {
//         counts[item.slot] = item.count;
//       });
//       setSlotCounts(counts);
//     } catch (err) {
//       console.error("Error fetching slot counts:", err);
//     }
//   };

//   // When dialog opens for a hospital → fetch counts
//   useEffect(() => {
//     if (selectedOrg && isDialogOpen) fetchSlotCounts(selectedOrg.name);
//   }, [selectedOrg, isDialogOpen]);

//   const handleBookingSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const bookingData = { name, phone, slot, center: selectedOrg?.name };

//     try {
//       const response = await fetch("http://localhost:5000/api/bookings", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(bookingData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert("✅ Booking successful!");
//         setName("");
//         setPhone("");
//         setSlot("");
//         // Refresh the counts immediately for that hospital
//         fetchSlotCounts(selectedOrg.name);
//         setIsDialogOpen(false);
//       } else {
//         alert(data.error || "❌ Something went wrong");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Server error. Please try again later.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
//       <main className="container mx-auto px-6 pt-24 pb-12">
//         <h1 className="text-4xl font-bold mb-2">Book Appointment</h1>
//         <p className="text-muted-foreground mb-8">
//           Search and book slots at available organizations
//         </p>

//         <div className="relative mb-8">
//           <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
//           <Input
//             placeholder="Search hospitals, clinics, or departments..."
//             className="pl-12 h-12 text-lg"
//           />
//         </div>

//         <div className="grid gap-6">
//           {organizations.map((org) => (
//             <Card
//               key={org.id}
//               className="p-6 hover:shadow-glow transition-shadow"
//             >
//               <div className="flex items-start justify-between mb-4">
//                 <div>
//                   <h3 className="text-2xl font-bold mb-2">{org.name}</h3>
//                   <div className="flex flex-wrap gap-2">
//                     {org.departments.map((dept) => (
//                       <Badge key={dept} variant="outline" className="text-xs">
//                         {dept}
//                       </Badge>
//                     ))}
//                   </div>
//                 </div>
//                 <Badge className={`${getCrowdColor(org.currentCrowd)} border`}>
//                   {org.currentCrowd} Crowd
//                 </Badge>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
//                 <div className="flex items-center gap-2 text-sm">
//                   <TrendingUp className="w-4 h-4 text-destructive" />
//                   <span className="text-muted-foreground">Peak Hours:</span>
//                   <span className="font-semibold">{org.peakHours}</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-sm">
//                   <TrendingDown className="w-4 h-4 text-success" />
//                   <span className="text-muted-foreground">Low Hours:</span>
//                   <span className="font-semibold">{org.lowHours}</span>
//                 </div>
//               </div>

//               <div className="flex items-center gap-4">
//                 <Button
//                   variant="default"
//                   className="bg-primary hover:bg-primary-glow"
//                   onClick={() => {
//                     setSelectedOrg(org);
//                     setIsDialogOpen(true);
//                   }}
//                 >
//                   <Calendar className="w-4 h-4 mr-2" />
//                   Book Slot
//                 </Button>
//                 <Button variant="outline">View Details</Button>
//               </div>
//             </Card>
//           ))}
//         </div>
//       </main>

//       {/* Booking Dialog */}
//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent className="sm:max-w-md">
//           <DialogHeader>
//             <DialogTitle>Book Appointment — {selectedOrg?.name}</DialogTitle>
//           </DialogHeader>

//           <form onSubmit={handleBookingSubmit} className="space-y-4 mt-2">
//             <div className="space-y-2">
//               <Label>Full Name</Label>
//               <Input
//                 placeholder="Enter your name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <Label>Phone Number</Label>
//               <Input
//                 placeholder="Enter your phone number"
//                 type="tel"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <Label>Select Slot</Label>
//               <Select onValueChange={(value) => setSlot(value)}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Choose a time slot" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {slots.map((s) => (
//                     <SelectItem key={s} value={s}>
//                       {s} —{" "}
//                       <span className="text-muted-foreground text-xs">
//                         {slotCounts[s] || 0} booked
//                       </span>
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             <DialogFooter>
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => setIsDialogOpen(false)}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 type="submit"
//                 className="bg-primary hover:bg-primary-glow"
//               >
//                 Confirm Booking
//               </Button>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default Bookings;

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, TrendingDown, TrendingUp } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
  const [selectedOrg, setSelectedOrg] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [slot, setSlot] = useState("");
  const [slotCounts, setSlotCounts] = useState<
    Record<string, { count: number; percentage: number }>
  >({});
  const organizations = [
    {
      id: 1,
      name: "City General Hospital",
      departments: ["Orthopedics", "Cardiology", "Neurology"],
      currentCrowd: "Medium",
      peakHours: "12 PM - 2 PM",
      lowHours: "10 AM - 11 AM",
      trending: "down",
    },
    {
      id: 2,
      name: "Metro Medical Center",
      departments: ["Cardiology", "Pediatrics", "Emergency"],
      currentCrowd: "Low",
      peakHours: "3 PM - 5 PM",
      lowHours: "8 AM - 10 AM",
      trending: "down",
    },
    {
      id: 3,
      name: "Central Healthcare Clinic",
      departments: ["General Medicine", "Dentistry"],
      currentCrowd: "High",
      peakHours: "11 AM - 1 PM",
      lowHours: "2 PM - 4 PM",
      trending: "up",
    },
  ];

  const slots = [
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "2:00 PM - 3:00 PM",
  ];
  const [patientType, setPatientType] = useState("");

  const getCrowdColor = (crowd: string) => {
    switch (crowd) {
      case "Low":
        return "bg-success/20 text-success border-success/30";
      case "Medium":
        return "bg-warning/20 text-warning border-warning/30";
      case "High":
        return "bg-destructive/20 text-destructive border-destructive/30";
      default:
        return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  // 🧠 Fetch slot booking counts for selected hospital
  const fetchSlotCounts = async (centerName: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/bookings/count/${encodeURIComponent(
          centerName
        )}`
      );
      const data = await response.json();
      console.log("Fetched slot data:", data);

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
    if (selectedOrg && isDialogOpen) fetchSlotCounts(selectedOrg.name);
  }, [selectedOrg, isDialogOpen]);

  // 📝 Handle booking
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const bookingData = {
      name,
      phone,
      slot,
      center: selectedOrg?.name,
      patient_type: patientType,
    };
    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Booking successful!");
        setName("");
        setPhone("");
        setSlot("");
        setPatientType("");
        fetchSlotCounts(selectedOrg.name);
        setIsDialogOpen(false);
      } else {
        alert(data.error || "❌ Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Please try again later.");
    }
  };

  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 pt-24 pb-12">
        <h1 className="text-4xl font-bold mb-2">Book Appointment</h1>
        <p className="text-muted-foreground mb-8">
          Search and book slots at available organizations
        </p>

        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            placeholder="Search hospitals, clinics, or departments..."
            className="pl-12 h-12 text-lg"
          />
        </div>

        <div className="grid gap-6">
          {organizations.map((org) => (
            <Card
              key={org.id}
              className="p-6 hover:shadow-glow transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{org.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {org.departments.map((dept) => (
                      <Badge key={dept} variant="outline" className="text-xs">
                        {dept}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Badge className={`${getCrowdColor(org.currentCrowd)} border`}>
                  {org.currentCrowd} Crowd
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-destructive" />
                  <span className="text-muted-foreground">Peak Hours:</span>
                  <span className="font-semibold">{org.peakHours}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <TrendingDown className="w-4 h-4 text-success" />
                  <span className="text-muted-foreground">Low Hours:</span>
                  <span className="font-semibold">{org.lowHours}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  className="bg-primary hover:bg-primary-glow"
                  onClick={() => {
                    setSelectedOrg(org);
                    setIsDialogOpen(true);
                  }}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Slot
                </Button>

                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() =>
                      navigate(
                        `/peakhours?center=${encodeURIComponent(org.name)}`
                      )
                    }
                  >
                    <TrendingUp className="w-4 h-4 text-destructive" />
                    Peak Hours
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>

      {/* Booking Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Book Appointment — {selectedOrg?.name}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleBookingSubmit} className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input
                placeholder="Enter your phone number"
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
                Confirm Booking
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Bookings;
