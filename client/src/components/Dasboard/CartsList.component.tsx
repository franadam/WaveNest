import React, { Fragment } from 'react';
import { CartDetails } from './CartDetails.component';
import { Guitar } from 'interfaces/Guitars.interface';

interface Props {
  products: Guitar[];
  removeItem: (id: number) => void;
}

export const CartsList: React.FC<Props> = ({ products, removeItem }) => {
  return (
    <div>
      {products.map((product) => (
        <Fragment key={product.id}>
          <CartDetails product={product} removeItem={removeItem} />
        </Fragment>
      ))}
    </div>
  );
};
