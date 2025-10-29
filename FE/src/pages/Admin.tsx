import AdminNavbar from "@/components/AdminNavbar";
import AdminProfile from "@/components/AdminProfile";
import StatsCard from "@/components/StatsCard";
import WalkInsList from "@/components/WalkInsList";
import { Users, Clock, TrendingUp, Activity } from "lucide-react";
import Header from "@/components/Header";
const Admin = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Organization metrics and department analytics
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-1">
            <AdminProfile />
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard
                title="Total Departments"
                value={8}
                color="primary"
                icon={Activity}
              />
              <StatsCard
                title="Active Walk-ins"
                value={24}
                color="success"
                icon={Users}
              />
              <StatsCard
                title="Avg Time/Dept"
                value="22m"
                color="warning"
                icon={Clock}
              />
              <StatsCard
                title="Daily Avg People"
                value={156}
                color="default"
                icon={TrendingUp}
              />
            </div>

            <WalkInsList />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
