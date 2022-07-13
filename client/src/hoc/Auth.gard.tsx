import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader } from 'components/Loader.component';
import { useAppSelector } from 'hooks/use-type-selector.hook';
import { ToastType } from 'interfaces/ToastType.enum';

interface Props {
  ComposedComponent: React.FC;
}

export const AuthGard: React.FC<Props> = ({ ComposedComponent }) => {
  const AuthenticationCheck: React.FC = () => {
    const [isAuth, setIsAuth] = useState(false);

    const notifications = useAppSelector(({ notifications }) => notifications);
    const userIsAuth = useAppSelector(({ auth }) => auth.isAuth);
    const navigate = useNavigate();

    useEffect(() => {
      if (
        !userIsAuth &&
        notifications &&
        notifications.type === ToastType.ERROR
      ) {
        navigate('/auth/login');
      } else {
        setIsAuth(true);
      }
    }, [navigate, userIsAuth, notifications]);

    return !isAuth ? <Loader full={true} /> : <ComposedComponent />;
  };

  return <AuthenticationCheck />;
};
