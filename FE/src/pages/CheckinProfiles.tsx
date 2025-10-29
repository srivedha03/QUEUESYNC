// import { useState, useEffect } from "react";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import Header from "@/components/Header";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// const CheckinProfiles = () => {
//   const center = "City General Hospital";
//   const [slotData, setSlotData] = useState<Record<string, any[]>>({});
//   const [selectedSlot, setSelectedSlot] = useState("9:00 AM - 10:00 AM");
//   const [loading, setLoading] = useState(true);

//   const slots = [
//     "9:00 AM - 10:00 AM",
//     "10:00 AM - 11:00 AM",
//     "11:00 AM - 12:00 PM",
//     "2:00 PM - 3:00 PM",
//   ];

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const res = await fetch(
//           `http://localhost:5000/api/bookings/center/${encodeURIComponent(
//             center
//           )}`
//         );
//         const data = await res.json();
//         console.log("Fetched data:", data);
//         setSlotData(data);
//       } catch (err) {
//         console.error("Error fetching bookings:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBookings();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-muted-foreground text-lg">
//           Loading check-in profiles...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
//       <main className="container mx-auto px-6 py-8">
//         <h1 className="text-3xl font-bold text-foreground mb-2">{center}</h1>
//         <p className="text-muted-foreground mb-6">
//           Check-in profiles for each slot
//         </p>

//         <Tabs value={selectedSlot} onValueChange={setSelectedSlot}>
//           <TabsList className="flex flex-wrap gap-2 mb-6">
//             {slots.map((slot) => (
//               <TabsTrigger key={slot} value={slot}>
//                 {slot}
//               </TabsTrigger>
//             ))}
//           </TabsList>

//           {slots.map((slot) => (
//             <TabsContent key={slot} value={slot}>
//               {slotData[slot]?.length ? (
//                 <div className="overflow-x-auto">
//                   <Table>
//                     <TableHeader>
//                       <TableRow>
//                         <TableHead className="w-[50px]">#</TableHead>
//                         <TableHead>Name</TableHead>
//                         <TableHead>Phone</TableHead>
//                         <TableHead>Patient Type</TableHead>
//                         <TableHead>Slot</TableHead>
//                       </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                       {slotData[slot].map((user, i) => (
//                         <TableRow key={i}>
//                           <TableCell>{i + 1}</TableCell>
//                           <TableCell className="font-medium">
//                             {user.name}
//                           </TableCell>
//                           <TableCell>{user.phone}</TableCell>
//                           <TableCell>{user.patient_type}</TableCell>
//                           <TableCell>{user.slot}</TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </div>
//               ) : (
//                 <p className="text-sm text-muted-foreground">
//                   No users for this slot.
//                 </p>
//               )}
//             </TabsContent>
//           ))}
//         </Tabs>
//       </main>
//     </div>
//   );
// };

// export default CheckinProfiles;

import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Header from "@/components/Header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const CheckinProfiles = () => {
  const center = "City General Hospital";
  const [slotData, setSlotData] = useState<Record<string, any[]>>({});
  const [selectedSlot, setSelectedSlot] = useState("9:00 AM - 10:00 AM");
  const [loading, setLoading] = useState(true);

  const slots = [
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "2:00 PM - 3:00 PM",
  ];

  const fetchBookings = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/bookings/center/${encodeURIComponent(
          center
        )}`
      );
      const data = await res.json();
      setSlotData(data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const toggleCheckin = async (id: number, currentStatus: boolean) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/bookings/checkin/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ checkin: !currentStatus }),
        }
      );
      const updated = await res.json();
      console.log("Updated:", updated);

      // Update local state instantly
      setSlotData((prev) => {
        const newData = { ...prev };
        for (const slot in newData) {
          newData[slot] = newData[slot].map((user) =>
            user.id === id ? { ...user, ...updated } : user
          );
        }
        return newData;
      });
    } catch (err) {
      console.error("Error updating check-in:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground text-lg">
          Loading check-in profiles...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">{center}</h1>
        <p className="text-muted-foreground mb-6">
          Check-in profiles for each slot
        </p>

        <Tabs value={selectedSlot} onValueChange={setSelectedSlot}>
          <TabsList className="flex flex-wrap gap-2 mb-6">
            {slots.map((slot) => (
              <TabsTrigger key={slot} value={slot}>
                {slot}
              </TabsTrigger>
            ))}
          </TabsList>

          {slots.map((slot) => (
            <TabsContent key={slot} value={slot}>
              {slotData[slot]?.length ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Patient Type</TableHead>
                        <TableHead>Slot</TableHead>
                        <TableHead>Check-in</TableHead>
                        <TableHead>Check-in Time</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {slotData[slot].map((user, i) => (
                        <TableRow key={user.id}>
                          <TableCell>{i + 1}</TableCell>
                          <TableCell className="font-medium">
                            {user.name}
                          </TableCell>
                          <TableCell>{user.phone}</TableCell>
                          <TableCell>{user.patient_type}</TableCell>
                          <TableCell>{user.slot}</TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant={user.checkin ? "secondary" : "default"}
                              onClick={() =>
                                toggleCheckin(user.id, user.checkin)
                              }
                            >
                              {user.checkin ? "Checked In" : "Check In"}
                            </Button>
                          </TableCell>
                          <TableCell>
                            {user.checkinTime
                              ? new Date(user.checkinTime).toLocaleString()
                              : "—"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No users for this slot.
                </p>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
};

export default CheckinProfiles;
