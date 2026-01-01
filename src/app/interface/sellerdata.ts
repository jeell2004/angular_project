export interface Sellerdata {
  name: string;
  email: string;
  phone: string;
  businessType: 'Individual' | 'Proprietorship' | 'Private Limited' | 'Partnership';
  gst?: string;              // Optional
  password: string;
  confirmPassword: string;
  terms: boolean;
}

export interface login{
  email: string;
  password: string;
}