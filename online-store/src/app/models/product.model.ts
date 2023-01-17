export interface Category {
  id: string;
  title: string;
}

export interface Product {
  id: string;
  title: string;
  images: string[];
  price: number;
  description: string;
  category: Category;
  taxes ?: number;
}

export interface CreateProductDTO extends Omit<Product, 'id' | 'category'> {
  categoryId: number;
}

export type UpdateProductDTO = Partial<CreateProductDTO>
