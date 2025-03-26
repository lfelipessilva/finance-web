import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { tagOptions } from "@/queries/tags";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useUpdateExpenseMutation } from "@/mutations/expense";
import { useCallback, useMemo } from "react";
import { getExpensesQueryKey } from "@/queries/expenses";
import { Expense } from "@/entity/expense";
import { Tag } from "@/entity/tag";
import { CircularProgress } from "./ui/circular-progress";
import { TagBadge } from "./ui/tag-badge";

interface TagPopoverProps {
  currentTags: Tag[];
  id: Expense["id"];
}

export function TagPopover({ currentTags, id }: TagPopoverProps) {
  const { data: tags } = useSuspenseQuery(tagOptions());
  const queryClient = useQueryClient();
  const { mutate: updateExpense, isPending } = useUpdateExpenseMutation();

  const selectedTagIds = useMemo(
    () => new Set(currentTags.map((t) => t.id)),
    [currentTags]
  );

  const availableTags = useMemo(
    () => tags.filter((tag) => !selectedTagIds.has(tag.id)),
    [tags, selectedTagIds]
  );

  const handleTagChange = useCallback(
    (tagId: number, isSelected: boolean) => {
      const updatedTagIds = isSelected
        ? currentTags.filter((t) => t.id !== tagId).map((t) => t.id)
        : [...currentTags.map((t) => t.id), tagId];

      updateExpense(
        { id, expense: { tagIds: updatedTagIds } },
        {
          onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: [getExpensesQueryKey] }),
        }
      );
    },
    [currentTags, id, updateExpense, queryClient]
  );

  return (
    <div className="flex gap-1 items-center justify-center">
      {currentTags.map((tag) => (
        <TagBadge
          key={tag.id}
          isDelete
          tag={tag}
          onClick={() => handleTagChange(tag.id, true)}
        />
      ))}
      {isPending && <CircularProgress isLoading size="xxs" />}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="xs"
            className="opacity-0 hover:opacity-100 transition-all"
          >
            <Plus size={12} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-fit p-1 rounded-sm">
          <div className="flex flex-col gap-1">
            {availableTags.length > 0 ? (
              availableTags.map((tag) => (
                <TagBadge
                  key={tag.id}
                  tag={tag}
                  onClick={() => handleTagChange(tag.id, false)}
                />
              ))
            ) : (
              <span className="text-xs text-gray-500">
                Náo há mais tags disponíveis
              </span>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}