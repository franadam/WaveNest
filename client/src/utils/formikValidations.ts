import * as Yup from 'yup';

export const formValues = {
  model: '',
  frets: '',
  wood: '',
  brand: '',
  description: '',
  price: '',
  available: '',
  itemSold: '',
  shipping: false,
  created_at: new Date(),
  updated_at: new Date(),
};

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
      .max(100000, '100000 char max')
      .required('Sorry, the price is required'),
    available: Yup.number().required('Do we have stock'),
    shipping: Yup.boolean().required('Do we offer shipping'),
  });
