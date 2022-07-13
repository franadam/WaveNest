import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Loader } from './Loader.component';
import { errorsHelper } from 'utils/formik.errorsHelper';
import { useAppDispatch, useAppSelector } from 'hooks/use-type-selector.hook';
import { registerUser } from 'store/reducers/auth.reducer';
import { User } from 'interfaces/Users.interface';
import { ToastType } from 'interfaces/ToastType.enum';
import { SocialLogin } from './SocialLogin.component';
import { clearNotifications } from 'store/reducers/notifications.reducer';

export const RegisterForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const notifications = useAppSelector(({ notifications }) => notifications);

  const navigate = useNavigate();

  useEffect(() => {
    if (notifications && notifications.type === ToastType.AUTH_SUCCESS) {
      navigate('/auth', { replace: true });
      dispatch(clearNotifications());
    } else {
      setIsLoading(false);
    }
  }, [notifications, navigate, dispatch]);

  const handleSubmit = async (value: Partial<User>) => {
    // event.preventDefault();
    await dispatch(registerUser(value as User));
    setIsLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('you must provide an email')
        .email('invalid email'),
      password: Yup.string().required('you must provide a password'),
      firstname: Yup.string().required(),
      lastname: Yup.string().required(),
      username: Yup.string(),
    }),
    onSubmit: (value) => {
      setIsLoading(true);
      handleSubmit(value);
    },
  });

  return (
    <>
      <div className="auth_container">
        <SocialLogin formType={true} />
        {isLoading ? (
          <Loader />
        ) : (
          <form className="mt-3" onSubmit={formik.handleSubmit}>
            {Object.keys(formik.values).map((field) => (
              <div key={field} className="formBlock">
                <TextField
                  style={{
                    width: '100%',
                  }}
                  label={`Enter your ${field}`}
                  type={
                    field === 'password'
                      ? 'password'
                      : field === 'email'
                      ? 'email'
                      : 'text'
                  }
                  variant="outlined"
                  {...formik.getFieldProps(field)}
                  {...errorsHelper(formik, field)}
                />
              </div>
            ))}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"
            >
              Register
            </Button>
          </form>
        )}
      </div>
    </>
  );
};
