import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { DashboardHoc } from 'hoc/Dashboard.hoc';
import { useAppDispatch, useAppSelector } from 'hooks/use-type-selector.hook';
import { ProductsTable } from 'components/ProductsTable.component';
import { ToastType } from 'interfaces/ToastType.enum';
import { clearNotifications } from 'store/reducers/notifications.reducer';
import { errorsHelper } from 'utils/formik.errorsHelper';
import { Guitar } from 'interfaces/Guitars.interface';
import { deleteGuitar, getGuitars } from 'store/reducers/guitars.reducer';
import guitarService from 'services/guitars.service';

export const AdminProducts: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const notifications = useAppSelector(({ notifications }) => notifications);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState('');

  const [products, setProducts] = useState<Guitar[]>([]);
  const [idToRemove, setIdToRemove] = useState(0);

  const fetchGuitars = async () => {
    const data = await guitarService.readGuitars();
    setProducts(data);
  };

  useEffect(() => {
    // dispatch(getGuitars());
    fetchGuitars();
  }, []);

  useEffect(() => {
    closeModal();
    setIsModalOpen(false);
    if (notifications && notifications.type !== ToastType.ERROR) {
      // navigate('/dashboard', { replace: true });
      dispatch(clearNotifications());
    }
  }, [dispatch, notifications, products]);

  useEffect(() => {
    if (notifications && notifications.type === ToastType.DELETE_SUCCESS) {
      navigate('/dashboard/admin/manage_products', { replace: true });
      dispatch(getGuitars());
      dispatch(clearNotifications());
    }
  }, [notifications, dispatch, navigate]);

  const deleteProduct = () => {
    closeModal();
    dispatch(deleteGuitar(idToRemove));
    const filtered = products.filter((guitar) => {
      console.log(
        'guitar.id !== idToRemove :>> ',
        guitar.id,
        idToRemove,
        guitar.id !== idToRemove
      );
      return guitar.id !== idToRemove;
    });
    setProducts(filtered);
  };

  const openModal = (id: number) => {
    setIsModalOpen(true);
    setIdToRemove(id);
  };

  const closeModal = () => setIsModalOpen(false);

  const gotoEdit = (id: number) => {
    navigate(`/dashboard/admin/edit_product/${id}`, { replace: true });
  };

  const resetSearch = () => {
    fetchGuitars();
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      query: '',
    },
    validationSchema: Yup.object({
      query: Yup.string().min(4, '4 char min').max(30, '30 char max'),
    }),
    onSubmit: (values) => {
      console.log('values', values.query);
      // dispatch(shopping());
      // const fil = {
      //   sortBy: 'model',
      //   order: Order.ASC,
      //   skip: 0,
      //   limit: 10,
      //   price: [560, 5654],
      // };
      // setFilter(fil);
      filter(query);
    },
  });

  const filter = (key: Date | string | number) => {
    const filtered = products.filter((guitar) => {
      if (typeof key === 'string') return guitar.model.includes(key);
      else return guitar.available >= key;
    });
    setProducts(filtered);
  };

  const sort = (key: keyof Guitar, order: number) => {
    const sorted = products.sort((a: Guitar, b: Guitar) => {
      if (a[key] > b[key]) return order;
      else return -order;
    });
    setProducts(sorted);
    return sorted;
  };

  return (
    <DashboardHoc title="Products">
      <div className="products_table">
        <div>
          <form
            className="mt-3"
            style={{ maxWidth: '250px' }}
            onSubmit={formik.handleSubmit}
          >
            <div className="formBlock">
              <TextField
                style={{
                  width: '100%',
                }}
                label="Enter your search"
                type={'text'}
                variant="outlined"
                {...formik.getFieldProps('query')}
                {...errorsHelper(formik, 'query')}
                onChange={(e) => setQuery(e.currentTarget.value)}
                value={query}
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
        <hr />
        <ProductsTable
          products={products}
          openModal={openModal}
          closeModal={closeModal}
          isModalOpen={isModalOpen}
          deleteProduct={deleteProduct}
          sort={sort}
          gotoEdit={gotoEdit}
        />
      </div>
    </DashboardHoc>
  );
};
