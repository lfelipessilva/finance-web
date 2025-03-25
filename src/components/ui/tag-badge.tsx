import { Tag } from "@/entity/tag";

const TagBadge = ({ tag, onClick }: { tag: Tag; onClick: () => void }) => (
  <button
    type="button"
    style={{ backgroundColor: tag.color }}
    className="text-xs flex gap-1 h-fit rounded-sm py-0.5 px-1 group transition-all cursor-pointer hover:opacity-80"
    onClick={onClick}
  >
    {tag.name}
  </button>
);

export { TagBadge };
