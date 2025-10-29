import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";

type AppointmentInfo = {
  id: number;
  slug: string;
  organization: string;
  department: string;
  position: number;
  estimatedWait: number;
  averageWait: number;
  condition: "Low" | "High" | "Very High";
  doctors: number;
  queueLength: number;
};

const Appointments = () => {
  const navigate = useNavigate();

  const appointments: AppointmentInfo[] = [
    {
      id: 1,
      slug: "city-general-hospital",
      organization: "City General Hospital",
      department: "Orthopedics",
      position: 7,
      estimatedWait: 23,
      averageWait: 18,
      condition: "High",
      doctors: 5,
      queueLength: 21,
    },
    {
      id: 2,
      slug: "metro-medical-center",
      organization: "Metro Medical Center",
      department: "Orthopedics",
      position: 3,
      estimatedWait: 12,
      averageWait: 15,
      condition: "Low",
      doctors: 5,
      queueLength: 9,
    },
  ];

  const getConditionColor = (condition: AppointmentInfo["condition"]) => {
    switch (condition) {
      case "Low":
        return "bg-success/20 text-success border-success/30";
      case "High":
        return "bg-warning/20 text-warning border-warning/30";
      case "Very High":
        return "bg-destructive/20 text-destructive border-destructive/30";
      default:
        return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Appointments</h1>
          <p className="text-muted-foreground">
            Track your registered organizations and queue status
          </p>
        </div>

        <div className="grid gap-6">
          {appointments.map((appointment) => (
            <Card
              key={appointment.id}
              className="p-6 hover:shadow-glow transition-shadow cursor-pointer"
              onClick={() => navigate(`/appointments/${appointment.slug}`)}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-1">
                    {appointment.organization}
                  </h3>
                  <p className="text-muted-foreground">
                    {appointment.department}
                  </p>
                </div>
                <Badge
                  className={`${getConditionColor(
                    appointment.condition
                  )} border`}
                >
                  {appointment.condition} Congestion
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Estimated Wait
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      {appointment.estimatedWait} min
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Your Position
                    </p>
                    <p className="text-2xl font-bold text-accent">
                      #{appointment.position}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-info/20 flex items-center justify-center">
                    <Activity className="w-6 h-6 text-info" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Queue Length
                    </p>
                    <p className="text-2xl font-bold">
                      {appointment.queueLength}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {appointment.doctors} doctors available • Avg wait:{" "}
                  {appointment.averageWait} min
                </span>
                <span className="text-muted-foreground">
                  Updates every 10 seconds
                </span>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Appointments;
