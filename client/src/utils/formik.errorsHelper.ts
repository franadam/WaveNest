export const errorsHelper = (formik: any, value: string) => ({
  error: formik.errors[value] && formik.touched[value] ? true : false,
  helperText:
    formik.errors[value] && formik.touched[value] ? formik.errors[value] : null,
});
