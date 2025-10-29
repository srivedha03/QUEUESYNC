import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { useParams } from "react-router-dom";

type LoadLevel = "Low" | "Moderate" | "High" | "Critical";

type DoctorInfo = {
  id: number;
  name: string;
  title: string;
  avgWaitMins: number;
  load: LoadLevel;
};

type HospitalConfig = {
  displayName: string;
  specialty: string;
  doctors: DoctorInfo[];
};

const HOSPITAL_DATA: Record<string, HospitalConfig> = {
  "city-general-hospital": {
    displayName: "City General Hospital",
    specialty: "Orthopedics",
    doctors: [
      {
        id: 1,
        name: "Dr. Rakesh Menon",
        title: "Orthopedic Surgeon",
        avgWaitMins: 12,
        load: "Moderate",
      },
      {
        id: 2,
        name: "Dr. Anita Rao",
        title: "Joint & Spine Specialist",
        avgWaitMins: 6,
        load: "Low",
      },
    ],
  },
  "metro-medical-center": {
    displayName: "Metro Medical Center",
    specialty: "Orthopedics",
    doctors: [
      {
        id: 1,
        name: "Dr. Kavya Srinivasan",
        title: "Orthopedic Consultant",
        avgWaitMins: 9,
        load: "Low",
      },
      {
        id: 2,
        name: "Dr. Sameer Iqbal",
        title: "Spine & Disk Specialist",
        avgWaitMins: 14,
        load: "Moderate",
      },
    ],
  },
};

const getLoadBadgeClasses = (load: LoadLevel) => {
  switch (load) {
    case "Low":
      return "bg-success/20 text-success border-success/30";
    case "Moderate":
      return "bg-warning/20 text-warning border-warning/30";
    case "High":
      return "bg-orange-500/20 text-orange-500 border-orange-500/30";
    case "Critical":
      return "bg-destructive/20 text-destructive border-destructive/30";
    default:
      return "bg-muted/20 text-muted-foreground border-muted/30";
  }
};

const AppointmentDetails = () => {
  // hospital slug from route, e.g. "city-general-hospital"
  const { orgId } = useParams<{ orgId: string }>();

  const data = orgId ? HOSPITAL_DATA[orgId] : undefined;

  // fallback if bad slug
  if (!data) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-6 pt-24 pb-12">
          <h1 className="text-2xl font-bold">Not found</h1>
          <p className="text-muted-foreground text-sm">
            This organization is not available.
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 pt-24 pb-12">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{data.displayName}</h1>
          <p className="text-muted-foreground">
            {data.specialty} · Live Queue Status (today)
          </p>
        </div>

        {/* Doctors grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {data.doctors.map((doc) => (
            <Card
              key={doc.id}
              className="p-5 border border-border bg-card rounded-xl shadow-sm"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold leading-tight">
                    {doc.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">{doc.title}</p>
                </div>

                <Badge
                  className={`${getLoadBadgeClasses(
                    doc.load
                  )} border text-xs font-medium`}
                >
                  {doc.load}
                </Badge>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Average wait today
                  </p>
                  <p className="text-2xl font-bold leading-none text-primary">
                    {doc.avgWaitMins} min
                  </p>
                </div>
              </div>

              <p className="text-[0.75rem] text-muted-foreground mt-4">
                Updated live · Based on queue flow, service speed, and patient
                load.
              </p>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AppointmentDetails;
