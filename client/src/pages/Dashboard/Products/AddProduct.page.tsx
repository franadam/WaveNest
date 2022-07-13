import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Divider,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/use-type-selector.hook';
import { DashboardHoc } from 'hoc/Dashboard.hoc';
import { ToastType } from 'interfaces/ToastType.enum';
import { clearNotifications } from 'store/reducers/notifications.reducer';
import { errorsHelper } from 'utils/formik.errorsHelper';
import { Loader } from 'components/Loader.component';
import { productFormValidations } from 'utils/formikValidations';
import { getBrands, selectAllBrands } from 'store/reducers/brands.reducer';
import { addGuitar } from 'store/reducers/guitars.reducer';

export const AddProduct: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const notifications = useAppSelector(({ notifications }) => notifications);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const allBrands = useAppSelector((state) => selectAllBrands(state));

  useEffect(() => {
    dispatch(getBrands());
    dispatch(clearNotifications());
  }, [dispatch]);

  useEffect(() => {
    if (notifications && notifications.type === ToastType.CREATE_SUCCESS) {
      navigate('/dashboard/admin/manage_products', { replace: true });
      dispatch(clearNotifications());
    }
    if (notifications.type === ToastType.ERROR) setIsLoading(false);
  }, [notifications, dispatch, navigate]);

  const formik = useFormik({
    initialValues: {
      model: '',
      frets: '',
      wood: '',
      price: '',
      available: '',
      description: '',
      brand: '',
      shipping: false,
      created_at: new Date(),
      updated_at: new Date(),
    },
    validationSchema: productFormValidations,
    onSubmit: (values) => {
      console.log('values', values);
      const newGuitar = {
        model: values.model,
        description: values.description,
        price: +values.price,
        brand: values.brand,
        shipping: values.shipping,
        available: +values.available,
        wood: values.wood,
        frets: +values.frets,
        publish: values.shipping,
      };
      dispatch(addGuitar(newGuitar));

      setIsLoading(true);
      dispatch(clearNotifications());
    },
  });

  const fields = Object.keys(formik.values).slice(0, -4);

  return (
    <DashboardHoc title="Add Product">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <form className="mt-3 article_form" onSubmit={formik.handleSubmit}>
            {fields.map((field) => (
              <div key={field} className="formBlock">
                <TextField
                  style={{
                    width: '100%',
                  }}
                  label={`Enter your ${field}`}
                  type={
                    field === 'price' || field === 'available'
                      ? 'number'
                      : 'text'
                  }
                  variant="outlined"
                  multiline={field === 'description'}
                  rows={field === 'description' ? 4 : ''}
                  {...formik.getFieldProps(field)}
                  {...errorsHelper(formik, field)}
                />
              </div>
            ))}

            <Divider className="mt-3 mb-3" />

            <div className="formBlock">
              <FormControl variant="outlined">
                <h5>Select a brand</h5>
                <Select
                  {...formik.getFieldProps('brand')}
                  error={
                    formik.errors.brand && formik.touched.brand ? true : false
                  }
                >
                  {allBrands.length &&
                    allBrands.map(({ id, name }) => (
                      <MenuItem key={id} value={id}>
                        <em>{name}</em>
                      </MenuItem>
                    ))}
                </Select>
                {formik.errors.brand && formik.touched.brand ? (
                  <FormHelperText error={true}>
                    {formik.errors.brand}
                  </FormHelperText>
                ) : null}
              </FormControl>
            </div>

            <Divider className="mt-3 mb-3" />

            <div className="formBlock">
              <FormControl variant="outlined">
                <h5>Do e offer free shipping?</h5>
                <Select
                  {...formik.getFieldProps('shipping')}
                  error={
                    formik.errors.shipping && formik.touched.shipping
                      ? true
                      : false
                  }
                >
                  <MenuItem value={1}>
                    <em>Yes</em>
                  </MenuItem>
                  <MenuItem value={0}>
                    <em>No</em>
                  </MenuItem>
                </Select>
                {formik.errors.shipping && formik.touched.shipping ? (
                  <FormHelperText error={true}>
                    {formik.errors.shipping}
                  </FormHelperText>
                ) : null}
              </FormControl>
            </div>

            <Divider className="mt-3 mb-3" />

            <Button
              className="mb-3"
              type="submit"
              variant="contained"
              color="primary"
              size="small"
            >
              Add Product
            </Button>
          </form>
        </>
      )}
    </DashboardHoc>
  );
};
