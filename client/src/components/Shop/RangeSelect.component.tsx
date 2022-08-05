import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
  Button,
  Collapse,
  List,
  ListItem,
  ListItemText,
  TextField,
} from '@mui/material';
import { errorsHelper } from 'utils/formik.errorsHelper';
import { Shopping } from 'interfaces/Filter.interface';

interface Props {
  initState: boolean;
  title: string;
  filter: Shopping;
  isReset: boolean;
  handlePrices: React.Dispatch<React.SetStateAction<number[]>>;
}

export const RangeSelect: React.FC<Props> = ({
  initState,
  title,
  filter,
  isReset,
  handlePrices,
}) => {
  const [isOpen, setIsOpen] = useState(initState);
  const handleCollapse = () => setIsOpen((isOpen) => !isOpen);

  const initPrices = () => {
    formik.setFieldValue('min', filter.prices[0]);
    formik.setFieldValue('max', filter.prices[1]);
    handlePrices(filter.prices);
  };

  useEffect(() => {
    if (isReset) initPrices();
  }, [isReset]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      min: filter.prices[0],
      max: filter.prices[1],
    },
    validationSchema: Yup.object({
      min: Yup.number().min(0).max(500000),
    }),
    onSubmit: ({ min, max }, { resetForm }) => {
      console.log('values', min, max);
      const prices = [min, max];
      handlePrices(prices);
      // resetForm();
    },
  });

  return (
    <div className="collapse_items_wrapper">
      <List>
        <ListItem onClick={handleCollapse}>
          <ListItemText className="collapse_title" primary={title} />
          {isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </ListItem>

        <Collapse in={isOpen} timeout="auto">
          <List component="div" disablePadding></List>
          <form className="mt-3" onSubmit={formik.handleSubmit}>
            <div>
              <TextField
                style={{
                  width: '100%',
                }}
                placeholder="€ min"
                type={'number'}
                variant="outlined"
                {...formik.getFieldProps('min')}
                {...errorsHelper(formik, 'min')}
                name="min"
              />
            </div>
            <div>
              <TextField
                style={{
                  width: '100%',
                }}
                placeholder="€ max"
                type={'number'}
                variant="outlined"
                {...formik.getFieldProps('max')}
                {...errorsHelper(formik, 'max')}
                name="max"
              />
            </div>
            <Button
              className="mt-3"
              variant="contained"
              color="secondary"
              size="small"
              type="submit"
            >
              Search
            </Button>
          </form>
        </Collapse>
      </List>
    </div>
  );
};
