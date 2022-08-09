import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { DashboardHoc } from 'hoc/Dashboard.hoc';
import { useAppDispatch, useAppSelector } from 'hooks/use-type-selector.hook';
import { ProductsTable } from 'components/Dasboard/ProductsTable.component';
import { ToastType } from 'interfaces/ToastType.enum';
import { clearNotifications } from 'store/reducers/notifications.reducer';
import { Guitar } from 'interfaces/Guitars.interface';
import {
  deleteGuitar,
  getGuitars,
  selectAllGuitars,
} from 'store/reducers/guitars.reducer';
import { Column, Order, Page, Sort } from 'interfaces/Filter.interface';
import paginationHelper from 'utils/pagination';
import { SearchBar } from 'components/SearchBar.component';

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

  const filterRows = (filters: string, rows: Guitar[]) => {
    const filtered = paginationHelper.filterRows(filters, rows);
    setActivePage(1);
    setProducts(filtered);
    return filtered;
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
    const sorted = paginationHelper.handleSort(products, key, order);
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

  const pageProps: Page = {
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
        <SearchBar
          query={query}
          allGuitars={allGuitars}
          setQuery={setQuery}
          resetSearch={resetSearch}
          handleSearch={filterRows}
        />

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
