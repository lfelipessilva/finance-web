export interface DefaultPaginatedGetRequest<T> {
  data: T[];
  summary: {
    total: number;
    page: number;
    page_size: number;
  };
}

export type DefaultGetRequest<T> = T[];
