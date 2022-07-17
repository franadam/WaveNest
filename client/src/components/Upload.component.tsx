import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Loader } from './Loader.component';
import { Form } from 'react-bootstrap';
import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/use-type-selector.hook';
import { clearNotifications } from 'store/reducers/notifications.reducer';
import { ToastType } from 'interfaces/ToastType.enum';
import guitarService from 'services/guitars.service';
import { Picture } from 'interfaces/Pictures.interface';

interface Props {
  handlePictureValue: (picture: Picture) => void;
}

export const PicUpload: React.FC<Props> = ({ handlePictureValue }) => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const notifications = useAppSelector(({ notifications }) => notifications);

  const handleImage = async (formData: FormData) => {
    try {
      setIsLoading(true);
      const upload = await guitarService.uploadImage(formData);
      if (!Array.isArray(upload)) handlePictureValue(upload);
      setIsLoading(false);
    } catch (error) {
      console.log('error :>> ', error);
      setIsLoading(false);
    }
  };

  const formikPic = useFormik({
    initialValues: { picture: '' },
    validationSchema: Yup.object({
      picture: Yup.mixed().required('you must provide an image'),
    }),
    onSubmit(values) {
      let formData = new FormData();
      formData.append('picture', values.picture);
      console.log('values, formData', values, formData);
      handleImage(formData);
      // if (notifications && notifications.type === ToastType.CREATE_SUCCESS) {
      //   setIsLoading(false);
      //   dispatch(clearNotifications());
      // }
    },
  });

  const handleFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { files } = e.target;
    if (files) formikPic.setFieldValue('picture', files[0]);
  };

  return (
    <>
      {isLoading ? (
        <Loader full={false} />
      ) : (
        <Form onSubmit={formikPic.handleSubmit}>
          <Form.Group controlId="formFile">
            <Form.Control
              type="file"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleFile(e)
              }
            />
            {formikPic.errors.picture && formikPic.touched.picture ? (
              <div>error</div>
            ) : null}
          </Form.Group>

          <Button
            className="mt-3"
            type="submit"
            variant="contained"
            color="secondary"
            size="small"
          >
            Add Image
          </Button>
        </Form>
      )}
    </>
  );
};
