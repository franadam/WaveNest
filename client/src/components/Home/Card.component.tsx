import React, { useEffect, useState } from 'react';
import { Guitar } from 'interfaces/Guitars.interface';
import { renderCardImage } from 'utils/renderCardImage';
import { CustomButton } from '../CustomButton.component';
import { useAppDispatch, useAppSelector } from 'hooks/use-type-selector.hook';
import { AddToCart } from 'components/AddToCart.component';
import { addToUserCart, verifyUser } from 'store/reducers/auth.reducer';
import { ToastType } from 'interfaces/ToastType.enum';
import { clearNotifications } from 'store/reducers/notifications.reducer';

interface Props {
  grid: boolean;
  item: Guitar;
}

export const Card: React.FC<Props> = ({ grid, item }) => {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [errorType, setErrorType] = useState('');

  const { isAuth, profile: user } = useAppSelector((state) => state.auth);
  const notifications = useAppSelector(({ notifications }) => notifications);

  const dispatch = useAppDispatch();

  const closeModal = () => setisModalOpen(false);

  const verifyAccount = async () => {
    console.log('verifyAccount');
    dispatch(verifyUser());
  };

  useEffect(() => {
    if (notifications && notifications.type === ToastType.CART_SUCCESS) {
      dispatch(clearNotifications());
    }
  }, [dispatch, notifications]);

  const handleAddToCart = (guitar: Guitar) => {
    if (!isAuth) {
      setisModalOpen(true);
      setErrorType('auth');
      return false;
    }
    if (!user.verified) {
      setisModalOpen(true);
      setErrorType('verify');
      return false;
    }
    dispatch(addToUserCart({ id: user.id, guitar }));
  };

  return (
    <div className={`card_item_wrapper ${grid ? 'grid_bars' : ''}`}>
      <div
        className="image"
        style={{ background: `url(${renderCardImage(item.images)})` }}
      ></div>
      <div className="action_container">
        <div className="tags">
          <div className="brand">{item.brand.name}</div>
          <div className="name">{item.model}</div>
          <div className="name">€{item.price}</div>
        </div>

        {grid ? (
          <div className="description">
            <p>{item.description}</p>
          </div>
        ) : null}
        <div className="actions">
          <div className="button_wrapp">
            <CustomButton
              type="default"
              altClass="card_link"
              buttonTitle="View Product"
              linkTo={`guitar_detail/${item.id}`}
              style={{ fontWeight: 'bold' }}
            />
          </div>
          <div className="button_wrapp">
            <CustomButton
              type="bag_link"
              altClass="card_link"
              runAction={() => handleAddToCart(item)}
              iconSize="23"
              linkTo={`guitar_detail/${item.id}`}
              buttonTitle="View Product"
              style={{ fontWeight: 'bold' }}
            />
          </div>
        </div>
      </div>
      <AddToCart
        isModalOpen={isModalOpen}
        errorType={errorType}
        closeModal={closeModal}
        verifyAccount={verifyAccount}
      />
    </div>
  );
};
