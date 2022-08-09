import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardHoc } from 'hoc/Dashboard.hoc';
import { useAppDispatch, useAppSelector } from 'hooks/use-type-selector.hook';
import { removeFromUserCart } from 'store/reducers/auth.reducer';
import { Guitar } from 'interfaces/Guitars.interface';
import { CartsList } from 'components/Dasboard/CartsList.component';

interface Props {}

export const UserCart: React.FC<Props> = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const profile = useAppSelector(({ auth }) => auth.profile);

  const removeItem = (id: number) => {
    console.log('removeItem id :>> ', id);
    dispatch(removeFromUserCart(id));
  };

  const computePrice = (cart: Guitar[]) => {
    let sum = 0;
    console.log('cart', cart);
    cart.forEach((item) => {
      sum += item.price;
    });
    return sum;
  };

  return (
    <DashboardHoc title="Cart">
      {profile.cart && profile.cart.length ? (
        <>
          <CartsList products={profile.cart} removeItem={removeItem} />
          <div className="user_cart_sum">
            Total amount: €{computePrice(profile.cart)}
          </div>
        </>
      ) : (
        <div>Ther is nothing in the cart</div>
      )}
    </DashboardHoc>
  );
};
