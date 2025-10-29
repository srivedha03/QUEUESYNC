import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Clock, MapPin, Settings } from "lucide-react";

const UserDashboard = () => {
  const userStats = {
    totalAppointments: 12,
    completedAppointments: 8,
    upcomingAppointments: 2,
    averageWaitTime: 18,
  };

  const recentAppointments = [
    {
      id: 1,
      organization: "City General Hospital",
      department: "Orthopedics",
      date: "Oct 28, 2025",
      status: "Upcoming",
      token: "A-42",
    },
    {
      id: 2,
      organization: "Metro Medical Center",
      department: "Cardiology",
      date: "Oct 25, 2025",
      status: "Completed",
      token: "B-18",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">UserDashboard</h1>
          <p className="text-muted-foreground">
            Your profile and appointment history
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <Card className="p-6 lg:col-span-1">
            <div className="flex flex-col items-center text-center">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  JS
                </AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold mb-1">John Smith</h3>
              <p className="text-muted-foreground mb-2">john.smith@email.com</p>
              <p className="text-sm text-muted-foreground mb-4">
                +91 98765 43210
              </p>
              <Badge variant="outline" className="mb-6">
                Normal User
              </Badge>
              <Button variant="outline" className="w-full mb-2">
                <Settings className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              <Button variant="ghost" className="w-full">
                Change Password
              </Button>
            </div>
          </Card>

          {/* Stats & History */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Total</p>
                <p className="text-3xl font-bold text-primary">
                  {userStats.totalAppointments}
                </p>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Completed</p>
                <p className="text-3xl font-bold text-success">
                  {userStats.completedAppointments}
                </p>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Upcoming</p>
                <p className="text-3xl font-bold text-warning">
                  {userStats.upcomingAppointments}
                </p>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Avg Wait</p>
                <p className="text-3xl font-bold">
                  {userStats.averageWaitTime}m
                </p>
              </Card>
            </div>

            {/* Recent Appointments */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6">Recent Appointments</h3>
              <div className="space-y-4">
                {recentAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold mb-1">
                          {appointment.organization}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {appointment.department}
                        </p>
                      </div>
                      <Badge
                        className={
                          appointment.status === "Upcoming"
                            ? "bg-warning/20 text-warning border-warning/30"
                            : "bg-success/20 text-success border-success/30"
                        }
                      >
                        {appointment.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {appointment.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Token: {appointment.token}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
