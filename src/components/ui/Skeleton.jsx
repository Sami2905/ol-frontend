import { cn } from "../../utils/cn";

export default function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn("animate-pulse rounded-xl bg-gray-200 dark:bg-slate-700 shimmer", className)}
      {...props}
    />
  );
}

