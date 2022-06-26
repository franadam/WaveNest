import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DashboardHoc from 'hoc/Dashboard.hoc';
import { useAppDispatch, useAppSelector } from 'hooks/use-type-selector.hook';
import { errorsHelper } from 'utils/formik.errorsHelper';
import { Button, TextField } from '@mui/material';

const UserInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(({ auth }) => auth.profile);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: profile.firstname,
      lastname: profile.lastname,
      username: profile.username,
      email: profile.email,
    },
    validationSchema: Yup.object({
      firstname: Yup.string()
        .min(5, '5 char min')
        .max(30, '30 char max')
        .required('sorry the firstname is required'),
      lastname: Yup.string()
        .min(5, '5 char min')
        .max(30, '30 char max')
        .required('sorry the lastname is required'),
      username: Yup.string().min(5, '5 char min').max(30, '10 char max'),
      email: Yup.string()
        .min(5, '5 char min')
        .max(30, '30 char max')
        .required('sorry the email is required'),
    }),
    onSubmit: (values) => {
      console.log('values', values);
    },
  });

  return (
    <DashboardHoc title="User Information">
      <form
        className="mt-3 article_form"
        style={{ maxWidth: '250px' }}
        onSubmit={formik.handleSubmit}
      >
        {Object.keys(formik.values).map((field) => (
          <div key={field} className="formBlock">
            <TextField
              style={{
                width: '100%',
              }}
              label={`Enter your ${field}`}
              type={'text'}
              variant="outlined"
              {...formik.getFieldProps(field)}
              {...errorsHelper(formik, field)}
            />
          </div>
        ))}
        <Button
          className="mb-3"
          type="submit"
          variant="contained"
          color="primary"
          size="small"
        >
          Edit Profile
        </Button>
      </form>
    </DashboardHoc>
  );
};

export default UserInfo;
