export interface DefaultGetRequest<T> {
  data: T[];
  summary: {
    total: number;
    page: number;
    page_size: number;
  };
}
