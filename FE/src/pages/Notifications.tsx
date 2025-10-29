import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCircle, AlertCircle, Info } from "lucide-react";

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: "alert",
      title: "Queue Position Updated",
      message: "You've moved to position #3 at City General Hospital",
      time: "2 minutes ago",
      read: false,
    },
    {
      id: 2,
      type: "success",
      title: "Appointment Confirmed",
      message: "Your slot at Metro Medical Center has been confirmed for Oct 28",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      type: "info",
      title: "Low Wait Time Alert",
      message: "Central Healthcare Clinic has low congestion right now",
      time: "3 hours ago",
      read: true,
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertCircle className="w-5 h-5 text-warning" />;
      case "success":
        return <CheckCircle className="w-5 h-5 text-success" />;
      case "info":
        return <Info className="w-5 h-5 text-info" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with your queue status</p>
        </div>

        <div className="max-w-3xl space-y-4">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`p-6 hover:shadow-glow transition-shadow ${
                !notification.read ? "border-primary/50" : ""
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold">{notification.title}</h3>
                    {!notification.read && (
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        New
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground mb-2">{notification.message}</p>
                  <p className="text-sm text-muted-foreground">{notification.time}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Notifications;
