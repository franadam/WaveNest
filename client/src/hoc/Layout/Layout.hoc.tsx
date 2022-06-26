import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { Footer } from 'components/Footer.component';
import { Header } from 'components/Header.component';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './Layout.module.css';
import { showToast } from 'utils/notification';
import { useAppDispatch, useAppSelector } from 'hooks/use-type-selector.hook';
import { clearNotifications } from 'store/reducers/notifications.reducer';

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  const notifications = useAppSelector((state) => state.notifications);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (notifications && notifications.message && notifications.type)
      showToast(notifications.type, notifications.message);
    dispatch(clearNotifications);
  }, [notifications, dispatch]);

  return (
    <div className={classes.container}>
      <Header />
      <div className={classes.children}>
        {children}
        <ToastContainer />
      </div>
      <Footer />
    </div>
  );
};
