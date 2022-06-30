import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader } from 'components/Loader.component';
import { useAppSelector } from 'hooks/use-type-selector.hook';

interface Props {
  ComposedComponent: React.FC;
}

export const AuthGard: React.FC<Props> = ({ ComposedComponent }) => {
  const AuthenticationCheck: React.FC = () => {
    const [isAuth, setIsAuth] = useState(false);
    const userIsAuth = useAppSelector(({ auth }) => auth.isAuth);
    const navigate = useNavigate();
    useEffect(() => {
      if (!userIsAuth) {
        navigate('/auth');
      } else {
        setIsAuth(true);
      }
    }, [navigate, userIsAuth]);
    return !isAuth ? <Loader full={true} /> : <ComposedComponent />;
  };

  return <AuthenticationCheck />;
};
