import { Category } from "./category";
import { Tag } from "./tag";

export interface Expense {
  id: number;
  name: string;
  description: string;
  bank: string;
  card: string;
  value: number;
  category_id: string;
  category: Category;
  tags: Tag[];
  timestamp: string;
}
