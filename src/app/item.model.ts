export type ItemCategory = | 'Books'  | 'Electronics'  | 'Clothing';
export type CategoryFilter =  | 'All'   | ItemCategory;
export interface Item {
  id: number;
  name: string;
  category: ItemCategory;
  description: string;
}