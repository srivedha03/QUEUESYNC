import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  color?: "default" | "success" | "warning" | "primary";
  icon?: LucideIcon;
}

const StatsCard = ({ title, value, color = "default", icon: Icon }: StatsCardProps) => {
  const colorClasses = {
    default: "text-foreground",
    success: "text-success",
    warning: "text-warning",
    primary: "text-primary",
  };

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-2">{title}</p>
          <p className={`text-3xl font-bold ${colorClasses[color]}`}>{value}</p>
        </div>
        {Icon && <Icon className={`h-8 w-8 ${colorClasses[color]} opacity-50`} />}
      </div>
    </Card>
  );
};

export default StatsCard;
