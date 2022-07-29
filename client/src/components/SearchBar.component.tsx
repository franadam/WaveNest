import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Button, TextField } from '@mui/material';
import { errorsHelper } from 'utils/formik.errorsHelper';
import { Guitar } from 'interfaces/Guitars.interface';

interface Props {
  query: string;
  allGuitars: Guitar[];
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  resetSearch: () => void;
  handleSearch: (filters: string, rows?: Guitar[]) => Guitar[];
}

export const SearchBar: React.FC<Props> = ({
  query,
  allGuitars,
  setQuery,
  handleSearch,
  resetSearch,
}) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      query: '',
    },
    validationSchema: Yup.object({
      query: Yup.string().min(4, '4 char min').max(300, '300 char max'),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log('query', query);
      console.log('values', values);
      handleSearch(query, allGuitars);
      // resetForm();
    },
  });

  return (
    <div className="container">
      <form className="mt-3" onSubmit={formik.handleSubmit}>
        <div className="formBlock">
          <TextField
            style={{
              width: '100%',
            }}
            label="Search for something"
            type={'text'}
            variant="outlined"
            {...formik.getFieldProps('query')}
            {...errorsHelper(formik, 'query')}
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            name="query"
          />
        </div>
        <Button
          className="mb-3"
          variant="contained"
          color="primary"
          size="small"
          type="submit"
        >
          Search
        </Button>
        <Button
          className="mb-3"
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => resetSearch()}
        >
          Reset Search
        </Button>
      </form>
    </div>
  );
};
