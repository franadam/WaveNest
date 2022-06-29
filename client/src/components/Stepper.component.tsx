import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from 'hooks/use-type-selector.hook';
import { Button, Step, StepLabel, Stepper, TextField } from '@mui/material';
import { Modal } from 'react-bootstrap';
import { errorsHelper } from 'utils/formik.errorsHelper';
import { Loader } from './Loader.component';
import { updateProfileEmail } from 'store/reducers/auth.reducer';
import { clearNotifications } from 'store/reducers/notifications.reducer';
import { ToastType } from 'interfaces/ToastType.enum';

const EmailStepper: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(({ notifications }) => notifications);
  const profile = useAppSelector(({ auth }) => auth.profile);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const steps = ['Enter old email', 'Enter new email', 'Are you sure?'];

  useEffect(() => {
    if (notifications.type === ToastType.SUCCESS) {
      dispatch(clearNotifications());
      closeModal();
      setIsLoading(false);
    }
  }, [dispatch, notifications]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: profile.email,
      newEmail: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .min(5, '5 char min')
        .max(30, '30 char max')
        .test(
          'match',
          'Please check your email',
          (email) => email === profile.email
        ),
      newEmail: Yup.string()
        .min(5, '5 char min')
        .max(30, '30 char max')
        .test(
          'match',
          'Please check your email',
          (email) => email !== profile.email
        )
        .required('sorry the email is required'),
    }),
    onSubmit(values) {
      console.log('values', values);
      setIsLoading(true);
      dispatch(updateProfileEmail({ id: profile.id, email: values.newEmail }));
    },
  });

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };
  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const nextButton = () => (
    <Button
      className="mt-3"
      variant="contained"
      color="primary"
      onClick={() => handleNext()}
    >
      Next
    </Button>
  );

  const backButton = () => (
    <Button
      className="mt-3"
      variant="contained"
      color="primary"
      onClick={() => handleBack()}
    >
      Back
    </Button>
  );

  return (
    <>
      <form
        className="mt-3 article_form"
        style={{ maxWidth: '250px' }}
        onSubmit={formik.handleSubmit}
      >
        <div className="formBlock">
          <TextField
            style={{
              width: '100%',
            }}
            type={'text'}
            variant="outlined"
            value={profile.email}
            disabled
          />
        </div>

        <Button
          className="mb-3"
          type="submit"
          variant="contained"
          color="primary"
          size="small"
          onClick={() => openModal()}
        >
          Edit Email
        </Button>
      </form>
      <Modal size="lg" centered show={isModalOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update tour Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stepper activeStep={activeStep}>
            {steps.map((label, idx) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <form className="mt-3 stepper_form" onSubmit={formik.handleSubmit}>
            {activeStep === 0 && (
              <div className="formBlock">
                <TextField
                  style={{
                    width: '100%',
                  }}
                  type={'text'}
                  variant="outlined"
                  {...formik.getFieldProps('email')}
                  {...errorsHelper(formik, 'email')}
                />
                {formik.values.email && !formik.errors.email && nextButton()}
              </div>
            )}
            {activeStep === 1 && (
              <div className="formBlock">
                <TextField
                  style={{
                    width: '100%',
                  }}
                  type={'text'}
                  variant="outlined"
                  {...formik.getFieldProps('newEmail')}
                  {...errorsHelper(formik, 'newEmail')}
                />
                {backButton()}
                {formik.values.newEmail &&
                  !formik.errors.newEmail &&
                  nextButton()}
              </div>
            )}
            {activeStep === 2 && (
              <div className="formBlock">
                {isLoading ? (
                  <Loader full={true} />
                ) : (
                  <>
                    <Button
                      className="mt-3"
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={formik.submitForm}
                    >
                      Edit Email
                    </Button>
                    {backButton()}
                  </>
                )}
              </div>
            )}
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EmailStepper;
