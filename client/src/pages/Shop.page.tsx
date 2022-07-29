import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GridOffIcon from '@mui/icons-material/GridOff';
import GridOnIcon from '@mui/icons-material/GridOn';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from 'hooks/use-type-selector.hook';
import { getGuitars, selectAllGuitars } from 'store/reducers/guitars.reducer';
import { Guitar } from 'interfaces/Guitars.interface';
import { getBrands, selectAllBrands } from 'store/reducers/brands.reducer';
import { CardBlock } from 'components/Home';
import { CustomPagination } from 'components/Pagination.component';
import { SearchBar } from 'components/SearchBar.component';
import paginationHelper from 'utils/pagination';

export const Shop = () => {
  const [grid, setGrid] = useState(false);
  const [products, setProducts] = useState<Guitar[]>([]);
  const [query, setQuery] = useState('');
  const [activePage, setActivePage] = useState(1);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const notifications = useAppSelector(({ notifications }) => notifications);
  const allGuitars = useAppSelector((state) => selectAllGuitars(state));
  const allBrands = useAppSelector((state) => selectAllBrands(state));

  const limit = 10;

  const fetchGuitars = async () => {
    setProducts(allGuitars);
  };

  useEffect(() => {
    dispatch(getGuitars());
    dispatch(getBrands());
  }, [dispatch]);

  useEffect(() => {
    fetchGuitars();
  }, [allGuitars]);

  const resetSearch = () => {
    fetchGuitars();
    setQuery('');
  };

  const handleSearch = (query: string) => {
    setQuery(query);
  };

  const filterRows = (filters: string, rows: Guitar[] = products) => {
    const filtered = paginationHelper.filterRows(filters, rows);
    console.log('filtered :>> ', filtered);
    setActivePage(1);
    setProducts(filtered);
    return filtered;
  };

  /* 
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
  console.log('sorted', key, order, sorted);
  setProducts(sorted);
  return sorted;
};
*/
  // const resetSearch = () => {};

  const handleGrid = () => {
    setGrid((state) => !state);
  };

  const calculatedRows = products.slice(
    (activePage - 1) * limit,
    activePage * limit
  );

  const count = products.length;

  const totalPages = Math.ceil(count / limit);

  return (
    <div className="page_container">
      <div className="page_top">
        <div className="container">
          <SearchBar
            query={query}
            allGuitars={allGuitars}
            setQuery={setQuery}
            handleSearch={filterRows}
            resetSearch={resetSearch}
          />
        </div>
      </div>
      <div className="container">
        <div className="shop_wrapper">
          <div className="left">
            collapse brands collapse frets range select{' '}
          </div>
          <div className="right">
            <div className="shop_options">
              <div className="shop_grids clear">
                <div
                  className={`grid_btn ${grid ? '' : 'active'}`}
                  onClick={() => handleGrid()}
                >
                  <GridOnIcon />
                </div>
                <div
                  className={`grid_btn ${!grid ? '' : 'active'}`}
                  onClick={() => handleGrid()}
                >
                  <GridOffIcon />
                </div>
              </div>
              <div>
                {products.length && (
                  <>
                    <CardBlock items={calculatedRows} grid={grid} />
                    <CustomPagination
                      products={products}
                      activePage={activePage}
                      totalPages={totalPages}
                      gotoPage={setActivePage}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
