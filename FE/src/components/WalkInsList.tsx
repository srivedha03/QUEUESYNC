import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users } from "lucide-react";

interface WalkIn {
  id: string;
  department: string;
  date: string;
  count: number;
  avgTime: string;
  status: "active" | "completed";
}

const mockWalkIns: WalkIn[] = [
  {
    id: "1",
    department: "Emergency Department",
    date: "Oct 28, 2025",
    count: 24,
    avgTime: "18m",
    status: "active",
  },
  {
    id: "2",
    department: "Cardiology",
    date: "Oct 25, 2025",
    count: 15,
    avgTime: "25m",
    status: "completed",
  },
  {
    id: "3",
    department: "Orthopedics",
    date: "Oct 24, 2025",
    count: 18,
    avgTime: "30m",
    status: "completed",
  },
];

const WalkInsList = () => {
  return (
    <Card className="p-6 bg-card border-border">
      <h3 className="text-xl font-bold text-foreground mb-6">Department Walk-ins</h3>
      <div className="space-y-4">
        {mockWalkIns.map((walkIn) => (
          <div
            key={walkIn.id}
            className="p-4 bg-secondary/50 rounded-lg border border-border hover:border-primary/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <h4 className="font-semibold text-foreground">{walkIn.department}</h4>
              <Badge
                variant={walkIn.status === "active" ? "default" : "secondary"}
                className={walkIn.status === "active" ? "bg-warning text-background" : ""}
              >
                {walkIn.status === "active" ? "Active" : "Completed"}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{walkIn.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{walkIn.count} people</span>
              </div>
              <div>
                <span>Avg: {walkIn.avgTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default WalkInsList;
