import { Category } from "@/entity/category";
import IconRenderer from "./icon";
import { cn } from "@/lib/utils";
import React from "react";

interface CategoryBadgeProps extends React.ComponentProps<"div"> {
  category: Category;
}
const CategoryBadge = ({
  category,
  className,
  ...props
}: CategoryBadgeProps) => (
  <div className={cn("flex gap-2", className)} {...props}>
    <IconRenderer iconName={category.icon} background={category.color} />
    {category.name}
  </div>
);

export { CategoryBadge };
