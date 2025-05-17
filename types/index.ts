export type TCreateUser = {
  name: string;
  email: string;
  password: string;
  address: string;
  shopName: string;
  shopId?: string;
  phone: string;
  city: string;
  postCode: string;
  categoryLimit: string | number;
  showEmail: boolean;
};
export type TSignInUser = {
  email: string;
  password: string;
};
export type TCategory = {
  name: string;
  _id: string;
};

export interface TUser {
  name: string;
  email: string;
  role: string;
  password: string;
  image: string;
  categories?: { name: string; status: string }[];
}

export type TProduct = {
  _id: string;
  name: string;
  price: number;
  category: [{ name: string }] | [];
  location: string;
  description: string;
  image: string;
  sallerId: TUser;
  createdAt: string;
};

export type TSaller = {
  _id: string;
  name: string;
  email: string;
  categoryCount: number;
  productCount: number;
  status: string;
  phone: string;
  address: string;
  subEndDate?: Date;
  subStartDate?: Date;
  transactionId?: string;
};

export type TSubscription = {
  sallerId: string;
  startDate: Date;
  endDate: Date;
};

export type TPricingPlan = {
  title: string;
  price: number;
  features: string[];
  _id?: string;
};

export type TRequest = {
  name: string;
  productCount: number;
  sallerId: string;
  email: string;
  _id?: string;
};
