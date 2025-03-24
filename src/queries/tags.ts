import { api } from "@/api/axios";
import { queryOptions } from "@tanstack/react-query";
import { DefaultGetRequest } from "./type";
import { Tag } from "@/entity/tag";

export const getTagsQueryKey = "tags";

export const tagOptions = () => {
  return queryOptions({
    queryKey: [getTagsQueryKey],
    queryFn: async () => {
      try {
        const response = await api.get<DefaultGetRequest<Tag>>("/tags");

        return response.data;
      } catch (error) {
        console.error(error);
        return [];
      }
    },
    retry: 2,
  });
};
