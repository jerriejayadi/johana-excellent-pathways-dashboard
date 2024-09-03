import classNames from "classnames";
import React from "react";

interface ChipProps {
  className?: string;
  children?: React.ReactNode;
  color: "success" | "error" | "warning" | "neutral";
}

export default function Chip({ className, children, color }: ChipProps) {
  const colorClass = classNames({
    "bg-dark-success text-dark-success bg-opacity-20": color === "success",
    "bg-dark-error text-dark-error bg-opacity-20": color === "error",
  });
  return (
    <div className={`${colorClass} px-2 rounded-full w-fit ${className ?? ""}`}>
      {children}
    </div>
  );
}
