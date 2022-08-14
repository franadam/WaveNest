import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, TextField } from '@mui/material';
import { errorsHelper } from 'utils/formik.errorsHelper';
import { useNavigate } from 'react-router-dom';
import { DashboardHoc } from 'hoc/Dashboard.hoc';
import { useAppDispatch, useAppSelector } from 'hooks/use-type-selector.hook';
import { Site } from 'interfaces/Sites.interface';
import { updateSite } from 'store/reducers/sites.reducer';
import siteService from 'services/sites.service';
import { ToastType } from 'interfaces/ToastType.enum';
import { clearNotifications } from 'store/reducers/notifications.reducer';

interface Props {}

const INIT_VARS = {
  id: 0,
  address: '',
  phone: '',
  hours: '',
  email: '',
};

export const ManageSite: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const notifications = useAppSelector(({ notifications }) => notifications);
  const [vars, setVars] = useState<Site>(INIT_VARS);

  const fetchVars = async () => {
    const data = await siteService.readSites();
    setVars(data);
  };

  useEffect(() => {
    fetchVars();
  }, []);

  useEffect(() => {
    if (notifications && notifications.type === ToastType.UPDATE_SUCCESS) {
      navigate('/dashboard', { replace: true });
      dispatch(clearNotifications());
    }
    if (notifications.type === ToastType.ERROR) setVars(INIT_VARS);
  }, [notifications, dispatch, navigate]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: vars,
    validationSchema: Yup.object({
      address: Yup.string().min(4, '4 char min').required('address is require'),
      phone: Yup.string().min(9, '9 char min').required('phone is require'),
      hours: Yup.string().min(4, '4 char min').required('hours is require'),
      email: Yup.string().min(10, '10 char min').required('email is require'),
    }),
    onSubmit: (values) => {
      const { id, ...rest } = vars;
      dispatch(updateSite({ id, payload: rest }));
    },
  });

  const fields = Object.keys(formik.values).slice(1);

  return (
    <DashboardHoc title="Manage Vars">
      <div className="container">
        <form className="mt-3" onSubmit={formik.handleSubmit}>
          {fields.map((field: keyof Site) => (
            <div className="formBlock" key={field}>
              <TextField
                style={{
                  width: '100%',
                }}
                label={`Enter your ${field}`}
                type={'text'}
                variant="outlined"
                {...formik.getFieldProps(field)}
                {...errorsHelper(formik, field)}
                onChange={(e) =>
                  setVars((state) => ({ ...state, [field]: e.target.value }))
                }
                value={vars[field]}
                name={field}
              />
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              className="mb-3"
              variant="contained"
              color="primary"
              size="small"
              type="submit"
            >
              Update Vars
            </Button>
          </div>
        </form>
      </div>
    </DashboardHoc>
  );
};
