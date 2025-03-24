import { cva } from "class-variance-authority";
import { Loader2, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type CircularProgressProps = {
  value?: number;
  isLoading?: boolean;
  size?: "default" | "sm" | "lg" | "xxs" | "xs";
  strokeWidth?: number;
  color?: string;
};

const CircularProgress = ({
  value,
  isLoading = false,
  size = "default",
  strokeWidth = 3,
  color = "text-primary",
}: CircularProgressProps) => {
  const progressVariants = cva("transition-all", {
    variants: {
      size: {
        default: "h-16 w-16",
        xxs: "h-4 w-4",
        xs: "h-8 w-8",
        sm: "h-12 w-12",
        lg: "h-24 w-24",
      },
    },
    defaultVariants: {
      size: "default",
    },
  });

  const sizeClass = progressVariants({ size });
  const [dimension] = sizeClass.split(" ");
  const numericSize = parseInt(dimension.replace("h-", ""), 10);
  const radius = numericSize / 2 - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - ((value || 0) / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        className={cn(
          sizeClass,
          "transform -rotate-90",
          color,
          isLoading && "animate-spin"
        )}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        role="progressbar"
      >
        <circle
          className="text-muted opacity-25"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx="50%"
          cy="50%"
        />
        {isLoading ? (
          <circle
            className="opacity-75"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray="45, 100"
            r={radius}
            cx="50%"
            cy="50%"
          />
        ) : (
          <circle
            className="transition-all duration-300"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={offset}
            r={radius}
            cx="50%"
            cy="50%"
          />
        )}
      </svg>

      <div className="absolute flex items-center justify-center">
        {isLoading ? (
          <Loader2 className={cn("animate-spin", sizeClass, color)} />
        ) : value !== undefined ? (
          value >= 100 ? (
            <CheckCircle className={cn(sizeClass, "text-green-500")} />
          ) : (
            <span className={cn("text-sm font-medium", color)}>
              {Math.round(value)}%
            </span>
          )
        ) : null}
      </div>
    </div>
  );
};

export { CircularProgress };
