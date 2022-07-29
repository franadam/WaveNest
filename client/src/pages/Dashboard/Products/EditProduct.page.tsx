import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
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
import {
  formValues,
  productFormValidations,
  getValuesToEdit,
  MyFormikValues,
} from 'utils/formikValidations';
import { getBrands, selectAllBrands } from 'store/reducers/brands.reducer';
import { getGuitars, updateGuitar } from 'store/reducers/guitars.reducer';
import { PicUpload } from 'components/Upload.component';
import { Picture } from 'interfaces/Pictures.interface';
import { ImageViewer } from 'components/ImageViewer';
import { Guitar } from 'interfaces/Guitars.interface';
import guitarService from 'services/guitars.service';

export const EditProduct: React.FC = () => {
  const [_, setIsLoading] = useState(false);
  const [ID, setID] = useState('');
  const [oldValues, setValues] = useState<MyFormikValues | undefined>(
    undefined
  );
  const [guitar, setGuitar] = useState<Guitar | undefined>(undefined);

  const allBrands = useAppSelector((state) => selectAllBrands(state));
  const notifications = useAppSelector(({ notifications }) => notifications);
  const guitars = useAppSelector(({ guitars }) => guitars);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    dispatch(getGuitars());
  }, [dispatch]);

  useEffect(() => {
    if (id) setID(id);

    if (guitar && guitar.brand) {
      setValues({
        model: guitar.model,
        frets: +guitar.frets,
        wood: guitar.wood,
        price: +guitar.price,
        available: +guitar.available,
        description: guitar.description,
        shipping: guitar.shipping ? 1 : 0,
        images: guitar.images,
        // id: guitar.id,
        brand: guitar.brand.id,
        itemSold: guitar.itemSold,
        created_at: guitar.created_at,
        updated_at: guitar.updated_at,
      });
    }
  }, [id, guitar]);

  const fetchGuitar = async (id: string) => {
    const data = await guitarService.readGuitar(+id);
    setGuitar(data);
  };

  useEffect(() => {
    setIsLoading(true);
    dispatch(getBrands());
    if (id && guitars.ids.length) {
      fetchGuitar(id);
    }

    dispatch(clearNotifications());
  }, [dispatch, id, guitars]);

  useEffect(() => {
    if (notifications && notifications.type === ToastType.UPDATE_SUCCESS) {
      navigate('/dashboard/admin/manage_products', { replace: true });
      dispatch(clearNotifications());
    }
    if (notifications.type === ToastType.ERROR) setIsLoading(false);
  }, [notifications, dispatch, navigate]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: oldValues ? oldValues : formValues,
    validationSchema: productFormValidations,
    onSubmit: async (values) => {
      const updatedGuitar = await getValuesToEdit({
        ...values,
        id: guitar?.id,
      });
      dispatch(updateGuitar({ id: +ID, payload: updatedGuitar }));
    },
  });

  const fields = Object.keys(formik.values).slice(0, -6);

  const handlePictureValue = (picture: Picture) => {
    const pictures = formik.values.images.filter((img) => img.id !== '');
    pictures.push(picture);
    formik.setFieldValue('images', pictures);
  };

  const deleteImage = (id: string) => {
    const pictures = formik.values.images.filter((img) => img.id !== id);
    formik.setFieldValue('images', pictures);
  };

  if (!oldValues) return <Loader full={true} />;

  return (
    <DashboardHoc title="Edit Product">
      <>
        <ImageViewer images={formik.values.images} deleteImage={deleteImage} />
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
                  field === 'price' || field === 'available' ? 'number' : 'text'
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
                defaultValue={formik.values.shipping}
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
            Edit Product
          </Button>
        </form>
      </>
    </DashboardHoc>
  );
};
