export type IApartment = {
  _id: string;
  unitNumber: string;
  unitName: string;
  project: string;
  description: string;
  size: number;
  bedrooms: number;
  bathrooms: number;
  price: number;
  images: string[];
  createdAt?: string;
};

export type PaginationMeta = {
  total: number;
  page: number;
  limit: number;
};

export interface PaginationProps {
  meta: PaginationMeta;
}

export interface IResponse<T> {
  message: string;
  success: boolean;
  data?: T;
}
