import * as Yup from 'yup';
import { FormikValues } from 'formik';
import { Guitar } from 'interfaces/Guitars.interface';
import { Picture } from 'interfaces/Pictures.interface';

export interface MyFormikValues extends FormikValues {
  model: string;
  frets: number;
  wood: string;
  price: number;
  available: number;
  description: string;
  brand: number;
  images: Picture[];
  shipping: number;
  itemSold: number;
  created_at: string;
  updated_at: string;
}

export const formValues = {
  model: '',
  frets: 20,
  wood: '',
  price: 1,
  available: 0,
  description: '',
  brand: 1,
  images: [{ id: '', url: '' }],
  shipping: 0,
  id: 999,
  itemSold: 0,
  created_at: '',
  updated_at: new Date().toISOString(),
};

export const getValuesToEdit = (guitar: any) => ({
  model: guitar.model,
  frets: +guitar.frets,
  wood: guitar.wood,
  price: +guitar.price,
  available: +guitar.available,
  description: guitar.description,
  shipping: guitar.shipping,
  images: guitar.images,
  id: guitar.id,
  brand: guitar.brand,
  itemSold: guitar.itemSold,
  created_at: guitar.created_at,
  updated_at: guitar.updated_at,
});

export const productFormValidations = () =>
  Yup.object({
    model: Yup.string()
      .min(3, '3 char min')
      .max(30, '30 char max')
      .required('Sorry, the model is required'),
    frets: Yup.number()
      .oneOf([20, 21, 22, 24], 'Only 20,21,22,24 allowed')
      .required('Sorry, the frets is required'),
    wood: Yup.string()
      .min(5, '5 char min')
      .max(30, '30 char max')
      .required('Sorry, the wood is required'),
    brand: Yup.string().required('Sorry, the brand is required'),
    description: Yup.string()
      .min(5, '5 char min')
      .max(230, '30 char max')
      .required('Sorry, the description is required'),
    price: Yup.number()
      .min(1, '1 char min')
      .max(1000000, '1000000 char max')
      .required('Sorry, the price is required'),
    available: Yup.number().required('Do we have stock'),
    shipping: Yup.boolean().required('Do we offer shipping'),
  });
