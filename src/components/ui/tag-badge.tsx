import { Tag } from "@/entity/tag";
import { X } from "lucide-react";

const TagBadge = ({
  tag,
  isDelete = false,
  onClick,
}: {
  tag: Tag;
  isDelete?: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    style={{ backgroundColor: tag.color }}
    className="text-xs flex items-center h-fit rounded-sm py-0.5 px-1 group transition-all cursor-pointer hover:opacity-80"
    onClick={onClick}
  >
    {tag.name}
    {isDelete && <X size={12} className="w-0 group-hover:w-4 transition-all" />}
  </button>
);

export { TagBadge };
