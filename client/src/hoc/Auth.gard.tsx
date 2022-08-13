import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader } from 'components/Loader.component';
import { useAppSelector } from 'hooks/use-type-selector.hook';
import { ToastType } from 'interfaces/ToastType.enum';
import { authService } from 'services/users.service';

interface Props {
  ComposedComponent: React.FC;
}

export const AuthGard: React.FC<Props> = ({ ComposedComponent }) => {
  const AuthenticationCheck: React.FC = () => {
    const [isUserAuth, setIsUserAuth] = useState(false);

    const notifications = useAppSelector(({ notifications }) => notifications);
    const authReducer = useAppSelector(({ auth }) => auth);
    const {
      isAuth,
      profile: { token },
    } = authReducer;
    const navigate = useNavigate();

    useEffect(() => {
      if (
        (isAuth && token !== authService.getToken()) ||
        (notifications && notifications.type === ToastType.ERROR)
      ) {
        navigate('/auth/login');
      } else {
        setIsUserAuth(true);
      }
    }, [navigate, isAuth, notifications]);

    return !isAuth ? <Loader full={true} /> : <ComposedComponent />;
  };

  return <AuthenticationCheck />;
};
