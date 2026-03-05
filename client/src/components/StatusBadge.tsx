/*
 * StatusBadge — Task status indicator
 */
import { cn } from "@/lib/utils";

const statusConfig: Record<string, { bg: string; text: string; dot: string }> = {
  "진행중": { bg: "bg-blue-500/15", text: "text-blue-400", dot: "bg-blue-400" },
  "완료": { bg: "bg-emerald-500/15", text: "text-emerald-400", dot: "bg-emerald-400" },
  "대기": { bg: "bg-zinc-500/15", text: "text-zinc-400", dot: "bg-zinc-400" },
  "검토중": { bg: "bg-amber-500/15", text: "text-amber-400", dot: "bg-amber-400" },
};

const priorityConfig: Record<string, { bg: string; text: string }> = {
  "높음": { bg: "bg-rose-500/15", text: "text-rose-400" },
  "중간": { bg: "bg-amber-500/15", text: "text-amber-400" },
  "낮음": { bg: "bg-zinc-500/15", text: "text-zinc-400" },
};

export function StatusBadge({ status }: { status: string }) {
  const config = statusConfig[status] || statusConfig["대기"];
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium", config.bg, config.text)}>
      <span className={cn("w-1.5 h-1.5 rounded-full", config.dot)} />
      {status}
    </span>
  );
}

export function PriorityBadge({ priority }: { priority: string }) {
  const config = priorityConfig[priority] || priorityConfig["중간"];
  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium", config.bg, config.text)}>
      {priority}
    </span>
  );
}
