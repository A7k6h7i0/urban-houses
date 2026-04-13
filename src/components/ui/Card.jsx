import { cn } from "../../utils/cn";

export function Card({ className, children }) {
  return <div className={cn("panel", className)}>{children}</div>;
}

export function CardHeader({ className, children }) {
  return <div className={cn("border-b border-white/10 px-5 py-4", className)}>{children}</div>;
}

export function CardBody({ className, children }) {
  return <div className={cn("p-5", className)}>{children}</div>;
}
