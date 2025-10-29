import { useState } from "react";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Users,
  Clock,
} from "lucide-react";

const CongestionControl = () => {
  const [selectedCenter, setSelectedCenter] = useState<string | null>(null);

  // Step 1: Available centers
  const centers = [
    { id: "center1", name: "City General Hospital", location: "Bengaluru" },
    { id: "center2", name: "Metro Medical Center", location: "Mysuru" },
    { id: "center3", name: "Lotus Health Clinic", location: "Hubballi" },
  ];

  // Step 2: Counters per center
  const countersData: Record<string, any[]> = {
    center1: [
      {
        id: 1,
        name: "Dr. Rakesh Menon",
        queueLength: 12,
        avgServiceTime: 3.5,
        status: "overloaded",
        estimatedWait: 42,
      },
      {
        id: 2,
        name: "Dr. Anita Rao",
        queueLength: 8,
        avgServiceTime: 4.2,
        status: "normal",
        estimatedWait: 34,
      },
      {
        id: 3,
        name: "Dr. Kavya Srinivasan",
        queueLength: 3,
        avgServiceTime: 3.8,
        status: "available",
        estimatedWait: 11,
      },
    ],
    center2: [
      {
        id: 1,
        name: "Dr. Rakesh Menon",
        queueLength: 5,
        avgServiceTime: 3.5,
        status: "normal",
        estimatedWait: 18,
      },
      {
        id: 2,
        name: "Dr. Anita Rao",
        queueLength: 2,
        avgServiceTime: 3.0,
        status: "available",
        estimatedWait: 6,
      },
    ],
    center3: [
      {
        id: 1,
        name: "Dr. Rakesh Menon",
        queueLength: 10,
        avgServiceTime: 4.1,
        status: "overloaded",
        estimatedWait: 41,
      },
      {
        id: 2,
        name: "Dr. Anita Rao",
        queueLength: 4,
        avgServiceTime: 3.7,
        status: "normal",
        estimatedWait: 15,
      },
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "overloaded":
        return "bg-destructive/20 text-destructive border-destructive/30";
      case "normal":
        return "bg-warning/20 text-warning border-warning/30";
      case "available":
        return "bg-success/20 text-success border-success/30";
      default:
        return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 pt-24 pb-12">
        <div className="mb-8 flex items-center gap-4">
          {selectedCenter && (
            <Button
              variant="ghost"
              onClick={() => setSelectedCenter(null)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
          )}
          <h1 className="text-4xl font-bold mb-2">Congestion Control</h1>
        </div>

        {!selectedCenter ? (
          <>
            <p className="text-muted-foreground mb-8">
              Select a center to view its counters and live queue congestion.
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {centers.map((center) => (
                <Card
                  key={center.id}
                  onClick={() => setSelectedCenter(center.id)}
                  className="p-6 cursor-pointer hover:shadow-glow transition-shadow border border-border"
                >
                  <h3 className="text-2xl font-bold mb-2">{center.name}</h3>
                  <p className="text-muted-foreground">{center.location}</p>
                  <Button className="mt-4 w-full">View Counters</Button>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                {centers.find((c) => c.id === selectedCenter)?.name}
              </h2>
              <p className="text-muted-foreground">
                Live counter congestion overview
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {countersData[selectedCenter]?.map((counter) => (
                <Card
                  key={counter.id}
                  className="p-6 hover:shadow-glow transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">{counter.name}</h3>
                    <Badge
                      className={`${getStatusColor(
                        counter.status
                      )} border capitalize`}
                    >
                      {counter.status}
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Queue Length
                        </span>
                      </div>
                      <span className="text-2xl font-bold">
                        {counter.queueLength}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Estimated Wait
                        </span>
                      </div>
                      <span className="text-2xl font-bold text-primary">
                        {counter.estimatedWait} min
                      </span>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Avg Service Time
                        </span>
                        <span className="font-semibold">
                          {counter.avgServiceTime} min
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <Card className="p-6 bg-card/50">
              <h3 className="text-xl font-bold mb-4">Redistribution Action</h3>
              <div className="flex items-center gap-4 text-sm">
                <Badge variant="outline" className="text-base py-2 px-4">
                  Dr. Rakesh Menon (12 users)
                </Badge>
                <ArrowRight className="w-5 h-5 text-primary" />
                <Badge variant="outline" className="text-base py-2 px-4">
                  Dr. Kavya Srinivasan (2 users)
                </Badge>
                <span className="text-muted-foreground ml-auto">
                  Move 3 users
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Estimated improvement: Wait time reduced from 42 min → 28 min
              </p>
            </Card>
          </>
        )}
      </main>
    </div>
  );
};

export default CongestionControl;
