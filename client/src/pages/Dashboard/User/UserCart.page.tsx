import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { DashboardHoc } from 'hoc/Dashboard.hoc';
import { useAppDispatch, useAppSelector } from 'hooks/use-type-selector.hook';
import { purchaseCart, removeFromUserCart } from 'store/reducers/auth.reducer';
import { Guitar } from 'interfaces/Guitars.interface';
import { CartsList } from 'components/Dasboard/CartsList.component';
import { Loader } from 'components/Loader.component';
import { ToastType } from 'interfaces/ToastType.enum';

export const UserCart: React.FC = () => {
  const [isLoading, setisLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const profile = useAppSelector(({ auth }) => auth.profile);
  const notifications = useAppSelector(({ notifications }) => notifications);

  const removeItem = (id: number) => {
    dispatch(removeFromUserCart(id));
  };

  useEffect(() => {
    if (notifications && notifications.type === ToastType.CART_SUCCESS) {
      navigate('/dashboard', { replace: true });
    } else {
      setisLoading(false);
    }
  }, [notifications, navigate]);

  const computePrice = (cart: Guitar[]) => {
    let sum = 0;
    cart.forEach((item) => {
      sum += item.price;
    });
    return sum;
  };

  const createOrderHandler = async (data: any, actions: any) => {
    const order = await actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: 'EUR',
            value: `${computePrice(profile.cart)}`,
          },
        },
      ],
    });
    return order;
  };

  const approveHandler = async (data: any, actions: any): Promise<void> => {
    if (actions && actions.order) {
      await actions.order.capture();
      dispatch(purchaseCart(data.orderID));
    }
    return setisLoading(true);
  };

  return (
    <DashboardHoc title="Cart">
      {profile.cart && profile.cart.length ? (
        <>
          <CartsList products={profile.cart} removeItem={removeItem} />
          <div className="user_cart_sum">
            Total amount: €{computePrice(profile.cart)}
          </div>
          <div className="pp_button">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <PayPalButtons
                  createOrder={createOrderHandler}
                  onApprove={approveHandler}
                  onCancel={() => {
                    setisLoading(false);
                  }}
                />
              </>
            )}
          </div>
        </>
      ) : (
        <div>Ther is nothing in the cart</div>
      )}
    </DashboardHoc>
  );
};
