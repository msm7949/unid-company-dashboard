/*
 * TeamIcon — Dynamic team icon with color coding
 */
import { Brain, Palette, Settings, Rocket, Layout, FlaskConical } from "lucide-react";
import type { Team } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  Brain: <Brain size={18} />,
  Palette: <Palette size={18} />,
  Settings: <Settings size={18} />,
  Rocket: <Rocket size={18} />,
  Layout: <Layout size={18} />,
  FlaskConical: <FlaskConical size={18} />,
};

export default function TeamIcon({ team, size = "md" }: { team: Team; size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-12 h-12",
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-lg flex items-center justify-center shrink-0`}
      style={{ backgroundColor: `${team.color}20`, color: team.color }}
    >
      {iconMap[team.icon] || <Brain size={18} />}
    </div>
  );
}
