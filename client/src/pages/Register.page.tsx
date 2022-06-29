import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { RegisterForm } from 'components/RegisterForm.component';
import { useAppSelector } from 'hooks/use-type-selector.hook';
import { ToastType } from 'interfaces/ToastType.enum';

export const Register: React.FC = () => {
  const notifications = useAppSelector(({ notifications }) => notifications);
  const navigate = useNavigate();

  useEffect(() => {
    if (notifications && notifications.type === ToastType.SUCCESS) {
      navigate('/auth/login', { replace: true });
    }
  }, [notifications, navigate]);

  return (
    <div className="page_wrapper">
      <div className="container">
        <div className="register_login_container">
          <div className="left">
            <>
              <h1>New Customer</h1>
              <p>
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
              onClick={() => navigate('/auth/login', { replace: true })}
            >
              Already register ?
            </Button>
          </div>
          <div className="right">
            <>
              <h2>Register</h2>
              <RegisterForm />
            </>
          </div>
        </div>
      </div>
    </div>
  );
};
