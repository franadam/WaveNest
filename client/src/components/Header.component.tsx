import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/use-type-selector.hook';
import { Link, useNavigate } from 'react-router-dom';
import { isUserAuth, logoutUser } from 'store/reducers/auth.reducer';
import { clearNotifications } from 'store/reducers/notifications.reducer';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuth = useAppSelector(({ auth }) => auth.isAuth);

  const logout = async () => {
    await dispatch(logoutUser());
    navigate('/');
    await dispatch(clearNotifications());
  };

  useEffect(() => {
    isUserAuth();
  }, []);

  return (
    <header className="bck_b_light">
      <div className="container">
        <div className="left">
          <div className="logo">Wave</div>
        </div>
        <div className="right">
          <div className="top">
            <>
              <div className="cart_link">
                <span>0</span>
                <Link to={'/dashboard/user_cart'}> My Cart</Link>
              </div>
              <Link to={'/dashboard/'}> My Account</Link>
              {isAuth && <span onClick={() => logout()}>Logout</span>}
              {!isAuth && <Link to={'/auth/login'}> Login</Link>}
            </>
          </div>

          <div className="bottom">
            <Link to={'/'}> Home</Link>
            <Link to={'/shop'}> Shop</Link>
          </div>
        </div>
      </div>
    </header>
  );
};
