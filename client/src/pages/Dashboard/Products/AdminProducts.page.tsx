import React, { useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Button, TextField } from '@mui/material';
import { DashboardHoc } from 'hoc/Dashboard.hoc';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useAppDispatch, useAppSelector } from 'hooks/use-type-selector.hook';
import { ProductsTable } from 'components/ProductsTable.component';
import { ToastType } from 'interfaces/ToastType.enum';
import { clearNotifications } from 'store/reducers/notifications.reducer';
import { errorsHelper } from 'utils/formik.errorsHelper';
import { Guitar } from 'interfaces/Guitars.interface';
import {
  deleteGuitar,
  getGuitars,
  selectAllGuitars,
} from 'store/reducers/guitars.reducer';
import { Column, Order, Page, Sort } from 'interfaces/Filter.interface';
import { Brand } from 'interfaces/Brands.interface';
import { Picture } from 'interfaces/Pictures.interface';

export const AdminProducts: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const notifications = useAppSelector(({ notifications }) => notifications);
  const allGuitars = useAppSelector((state) => selectAllGuitars(state));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState('');

  const [products, setProducts] = useState<Guitar[]>([]);
  const [idToRemove, setIdToRemove] = useState(0);

  const [sort, setSort] = useState<Sort>({
    order: Order.DESC,
    key: 'created_at',
  });

  const [activePage, setActivePage] = useState(1);
  const limit = 10;

  const fetchGuitars = async () => {
    setProducts(allGuitars);
  };

  useEffect(() => {
    dispatch(getGuitars());
  }, []);

  useEffect(() => {
    fetchGuitars();
  }, [allGuitars]);

  useEffect(() => {
    if (notifications && notifications.type === ToastType.DELETE_SUCCESS) {
      navigate('/dashboard/admin/manage_products', { replace: true });
      dispatch(clearNotifications());
    }
  }, [notifications, dispatch, navigate]);

  const deleteProduct = () => {
    closeModal();
    dispatch(deleteGuitar(idToRemove));
    const filtered = products.filter((guitar) => guitar.id !== idToRemove);
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
    setQuery('');
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      query: '',
    },
    validationSchema: Yup.object({
      query: Yup.string().min(4, '4 char min').max(30, '30 char max'),
    }),
    onSubmit: () => {
      console.log('query', query);
      filterRows(allGuitars, query);
    },
  });

  const filterRows = (rows: Guitar[], filters: string) => {
    if (!filters) return rows;

    const filtered = rows.filter((row) => {
      if (filters.match(/^\d*$/)) {
        return row.available >= +filters;
      }

      const times = [
        'years',
        'months',
        'weeks',
        'days',
        'minutes',
        'year',
        'month',
        'week',
        'day',
        'minute',
      ];

      if (times.includes(filters.split(' ').slice(-1).join(''))) {
        const createdAt = moment(row.created_at).toNow(true);
        const res = filters.toLowerCase().match(`${createdAt.slice(0, -1)}`);
        return !!res;
      }

      return row.model.toLowerCase().includes(filters.toLowerCase());
    });
    console.log('filtered :>> ', filtered);
    setProducts(filtered);
    return filtered;
  };

  const sortHelper = (
    order: number,
    A: string | number | boolean | Brand | Picture[],
    B: string | number | boolean | Brand | Picture[]
  ) => {
    if (A > B) return order;
    else return -order;
  };

  const handleSort = (key: keyof Guitar, order: number) => {
    setActivePage(1);
    setSort((prevSort) => ({
      order:
        prevSort.order === Order.ASC && prevSort.key === key
          ? Order.DESC
          : Order.ASC,
      key,
    }));
    const sorted = products.sort((a: Guitar, b: Guitar) => {
      const A = a[key];
      const B = b[key];
      if (typeof A === 'string' && typeof B === 'string') {
        return sortHelper(
          order,
          A.toLowerCase().split(/s*/).join(''),
          B.toLowerCase().split(/s*/).join('')
        );
      } else {
        return sortHelper(order, A, B);
      }
    });
    console.log('sorted', key, order, sorted);
    setProducts(sorted);
    return sorted;
  };

  const headers: { label: string; filter: keyof Guitar }[] = [
    { label: 'Created', filter: 'created_at' },
    { label: 'Model', filter: 'model' },
    { label: 'Available', filter: 'available' },
  ];

  const calculatedRows = products.slice(
    (activePage - 1) * limit,
    activePage * limit
  );

  const count = products.length;

  const totalPages = Math.ceil(count / limit);

  const pageProps = {
    activePage,
    limit,
    calculatedRows,
    count,
    totalPages,
    sort,
  };

  const sortIcon = (head: Column, sort: Sort) => {
    if (head.filter === sort.key) {
      console.log('order.order', head.filter, sort.order);
      if (sort.order === Order.ASC) {
        return <ArrowDropUpIcon />; //'⬆️';
      }
      return <ArrowDropDownIcon />; //'⬇️';
    } else {
      return '️↕️';
    }
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
                onChange={(e) => setQuery(e.target.value)}
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
          headers={headers}
          isModalOpen={isModalOpen}
          pageProps={pageProps}
          openModal={openModal}
          closeModal={closeModal}
          deleteProduct={deleteProduct}
          sortIcon={sortIcon}
          sort={handleSort}
          gotoEdit={gotoEdit}
          gotoPage={setActivePage}
        />
      </div>
    </DashboardHoc>
  );
};
