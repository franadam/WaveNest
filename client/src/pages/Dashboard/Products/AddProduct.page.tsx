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
import { PicUpload } from 'components/Upload.component';
import { Picture } from 'interfaces/Pictures.interface';
import { ImageViewer } from 'components/ImageViewer';

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
  }, [notifications, dispatch, navigate, allBrands]);

  const formik = useFormik({
    initialValues: {
      model: '',
      frets: '',
      wood: '',
      price: '',
      available: '',
      description: '',
      brand: '',
      images: [{ id: '', url: '' }],
      shipping: false,
      created_at: new Date(),
      updated_at: new Date(),
    },
    validationSchema: productFormValidations,
    onSubmit: (values) => {
      const newGuitar = {
        model: values.model.trim(),
        description: values.description.trim(),
        price: +values.price,
        brand: values.brand,
        shipping: values.shipping,
        available: +values.available,
        wood: values.wood.trim(),
        frets: +values.frets,
        publish: values.shipping,
        images: values.images,
      };
      dispatch(addGuitar(newGuitar));
      setIsLoading(true);
    },
  });

  const fields = Object.keys(formik.values).slice(0, -5);

  const handlePictureValue = (picture: Picture) => {
    const pictures = formik.values.images.filter((img) => img.id !== '');
    pictures.push(picture);
    formik.setFieldValue('images', pictures);
  };

  const deleteImage = (id: string) => {
    const pictures = formik.values.images.filter((img) => img.id !== id);
    formik.setFieldValue('images', pictures);
  };

  return (
    <DashboardHoc title="Add Product">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ImageViewer
            images={formik.values.images}
            deleteImage={deleteImage}
          />
          <PicUpload handlePictureValue={handlePictureValue} />
          <Divider className="mt-3 mb-3" />

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
                <h5>Do we offer free shipping?</h5>
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
