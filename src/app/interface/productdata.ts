// export interface Product {
//   id: string;
//   name: string;
//   category: string;
//   subCategory: string;
//   price: number;
//   discount: number;
//   quantity: number;
//   brand: string;
//   size: string[];
//   color: string[];
//   description: string;
//   image: string;
//   status: boolean;
// }
export interface Product {
  id?: string;
  name: string;
  category: string;
  subCategory: string;
  price: number;
  discount?: number;
  quantity: number;
  brand: string;
  size: string[];
  color: string[];
  description?: string;
  image: string;
  status: boolean;
}
