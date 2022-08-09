import React, { useState } from 'react';
import * as Yup from 'yup';
import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import { Guitar } from 'interfaces/Guitars.interface';
import { renderCardImage } from 'utils/renderCardImage';
import { errorsHelper } from 'utils/formik.errorsHelper';
import { useAppDispatch, useAppSelector } from 'hooks/use-type-selector.hook';
import { updateProfile } from 'store/reducers/auth.reducer';

interface Props {
  product: { amount: number; guitar: Guitar };
  removeItem: (id: number) => void;
}
/* 
export const CartDetails: React.FC<Props> = ({ product, removeItem }) => {
  const [amount, setAmount] = useState(product.amount);

  const dispatch = useAppDispatch();
  const profile = useAppSelector(({ auth }) => auth.profile);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log('amount :>> ', amount, +event.target.value);
    setAmount(+event.target.value);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      amount: product.amount,
    },
    validationSchema: Yup.object({
      amount: Yup.number().min(0).required('sorry the amount is required'),
    }),
    onSubmit: (values) => {
      console.log('values :>> ', values, amount);
      // const id =  product.guitar.id;
      // const updates: Partial<User> = values;
      const { email, cart, ...rest } = profile;
      const updatedCart = cart.map((product) => {
        return { amount: product.amount, guitar: product.guitar };
      });
      console.log(
        'reducer >> updatedCart',
        cart,
        product.guitar.id,
        updatedCart
      );
      dispatch(
        updateProfile({
          id: product.guitar.id,
          updates: {
            ...rest,
            cart: updatedCart.filter(({ amount }) => amount > 0),
          },
        })
      );
    },
  });

  return (
    <div>
      <div className="user_product_block" key={product.guitar.id}>
        <div className="item">
          <div
            className="image"
            style={{
              background: `url(${renderCardImage(
                product.guitar.images
              )}) no-repeat`,
            }}
          ></div>
        </div>
        <div className="item">
          <h4>Product name</h4>
          <div>
            {product.guitar.brand.name} {product.guitar.model}
          </div>
        </div>
        <div className="item">
          <h4>Price</h4>
          <div>€ {product.guitar.price}</div>
        </div>
        <div className="item">
          <h4>Amount</h4>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              style={{
                width: '100%',
              }}
              // label={`Enter your ${field}`}
              type={'number'}
              variant="outlined"
              {...formik.getFieldProps('amount')}
              {...errorsHelper(formik, 'amount')}
              value={amount}
              onChange={(event) => handleChange(event)}
            />
          </form>
        </div>
        <div className="item btn">
          <div
            className="cart_remove_btn"
            onClick={() => removeItem(product.guitar.id)}
          >
            Remove
          </div>
        </div>
      </div>
    </div>
  );
};
 */
