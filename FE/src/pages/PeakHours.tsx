// src/pages/PeakHours.tsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PeakHours = () => {
  const location = useLocation();
  const [centerName, setCenterName] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const center = params.get("center");
    if (center) setCenterName(center);
  }, [location]);

  // 🎯 Static crowd data (can replace with API later)
  const data = [
    { time: "9 AM", people: Math.floor(Math.random() * 30) + 20 },
    { time: "10 AM", people: Math.floor(Math.random() * 30) + 40 },
    { time: "11 AM", people: Math.floor(Math.random() * 30) + 60 },
    { time: "12 PM", people: Math.floor(Math.random() * 30) + 70 },
    { time: "1 PM", people: Math.floor(Math.random() * 30) + 80 },
    { time: "2 PM", people: Math.floor(Math.random() * 30) + 60 },
    { time: "3 PM", people: Math.floor(Math.random() * 30) + 40 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 pt-24 pb-12">
        <Card className="p-6 shadow-lg">
          <h1 className="text-3xl font-bold mb-4 text-center">
            Peak Hour Trends — {centerName}
          </h1>
          <p className="text-muted-foreground text-center mb-8">
            Estimated crowd levels from 9 AM to 3 PM
          </p>

          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="people"
                  stroke="#3b82f6"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-center mt-8">
            <Button onClick={() => window.history.back()} variant="outline">
              ← Back to Bookings
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default PeakHours;
