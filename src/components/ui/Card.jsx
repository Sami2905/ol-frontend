import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export default function Card({
  children,
  className,
  hover = false,
  glass = false,
  ...props
}) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -4 } : {}}
      transition={{ duration: 0.2 }}
      className={cn(
        "rounded-2xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-lg",
        hover && "hover:shadow-2xl transition-shadow duration-300",
        glass && "glass-card",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

