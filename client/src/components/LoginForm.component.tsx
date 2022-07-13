import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Loader } from './Loader.component';
import { errorsHelper } from 'utils/formik.errorsHelper';
import { useAppDispatch, useAppSelector } from 'hooks/use-type-selector.hook';
import { loginUser } from 'store/reducers/auth.reducer';
import { Credentials } from 'interfaces/Users.interface';
import { ToastType } from 'interfaces/ToastType.enum';
import { SocialLogin } from './SocialLogin.component';
import { clearNotifications } from 'store/reducers/notifications.reducer';

export const LoginForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const notifications = useAppSelector(({ notifications }) => notifications);
  const userIsAuth = useAppSelector(({ auth }) => auth.isAuth);

  useEffect(() => {
    if (
      userIsAuth &&
      notifications &&
      notifications.type === ToastType.AUTH_SUCCESS
    ) {
      navigate('/dashboard', { replace: true });
      dispatch(clearNotifications());
    } else {
      setIsLoading(false);
    }
  }, [notifications, userIsAuth, navigate, dispatch]);

  const handleSubmit = async (value: Credentials) => {
    await dispatch(loginUser(value));
    setIsLoading(false);
  };

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('you must provide an email')
        .email('invalid email'),
      password: Yup.string().required('you must provide a password'),
    }),
    onSubmit: (value) => {
      setIsLoading(true);
      handleSubmit(value);
    },
  });

  return (
    <>
      <SocialLogin formType={false} />
      <div className="auth_container">
        {isLoading ? (
          <Loader />
        ) : (
          <form className="mt-3" onSubmit={formik.handleSubmit}>
            <div className="formBlock">
              <TextField
                style={{
                  width: '100%',
                }}
                // name="email"
                label="Enter your email"
                variant="outlined"
                {...formik.getFieldProps('email')}
                {...errorsHelper(formik, 'email')}
              />
            </div>
            <div className="form-group">
              <TextField
                style={{
                  width: '100%',
                }}
                // name="password"
                label="Enter your password"
                type="password"
                variant="outlined"
                {...formik.getFieldProps('password')}
                {...errorsHelper(formik, 'password')}
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"
            >
              Login
            </Button>
          </form>
        )}
      </div>
    </>
  );
};
