import { api } from "@/api/axios";
import { queryOptions } from "@tanstack/react-query";
import { DefaultGetRequest } from "./type";
import { Category } from "@/entity/category";

export const getCategoriesQueryKey = "categories";

export const categoryOptions = () => {
  return queryOptions({
    queryKey: [getCategoriesQueryKey],
    queryFn: async () => {
      try {
        const response = await api.get<DefaultGetRequest<Category>>(
          "/categories"
        );

        return response.data;
      } catch (error) {
        console.error(error);
        return [];
      }
    },
    retry: 2,
  });
};
