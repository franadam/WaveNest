import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useAppSelector } from 'hooks/use-type-selector.hook';
import { LoginForm } from 'components/Auth/LoginForm.component';

export const Login: React.FC = () => {
  const userIsAuth = useAppSelector(({ auth }) => auth.isAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (userIsAuth) {
      navigate('/dashboard', { replace: true });
    }
  }, [userIsAuth, navigate]);

  return (
    <div className="page_wrapper">
      <div className="container">
        <div className="register_login_container">
          <div className="left">
            <>
              <h1>Welcome Back</h1>
              <p>
                Ut enim benefici liberalesque sumus, non ut exigamus gratiam
                (neque enim beneficium faeneramur sed natura propensi ad
                liberalitatem sumus), sic amicitiam non spe mercedis adducti sed
                quod omnis eius fructus in ipso amore inest, expetendam putamus.
                Proinde concepta rabie saeviore, quam desperatio incendebat et
                fames, amplificatis viribus ardore incohibili in excidium urbium
                matris Seleuciae efferebantur, quam comes tuebatur Castricius
                tresque legiones bellicis sudoribus induratae.
              </p>
            </>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => navigate('/auth/register', { replace: true })}
            >
              Need to register ?
            </Button>
          </div>
          <div className="right">
            <>
              <h2>Login</h2>
              <LoginForm />
            </>
          </div>
        </div>
      </div>
    </div>
  );
};
