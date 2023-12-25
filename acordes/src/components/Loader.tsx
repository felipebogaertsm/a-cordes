import React from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

// Define a type for the component props
type LoaderProps = {
  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl";
};

const Loader: React.FC<LoaderProps> = ({ size = "md" }) => {
  const sizeClasses = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-10 h-10",
    "2xl": "w-12 h-12",
    "3xl": "w-16 h-16",
    "4xl": "w-20 h-20",
    "5xl": "w-24 h-24",
    "6xl": "w-32 h-32",
  };

  // Get the class for the current size
  const sizeClass = sizeClasses[size];

  return <ReloadIcon className={`animate-spin mx-auto ${sizeClass}`} />;
};

export default Loader;
