import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GridOffIcon from '@mui/icons-material/GridOff';
import GridOnIcon from '@mui/icons-material/GridOn';
import { useAppDispatch, useAppSelector } from 'hooks/use-type-selector.hook';
import { getGuitars, selectAllGuitars } from 'store/reducers/guitars.reducer';
import { Guitar } from 'interfaces/Guitars.interface';
import { getBrands, selectAllBrands } from 'store/reducers/brands.reducer';
import { CardBlock } from 'components/Home';
import { CustomPagination } from 'components/Pagination.component';
import { SearchBar } from 'components/SearchBar.component';
import paginationHelper from 'utils/pagination';
import guitarService from 'services/guitars.service';
import { Shopping } from 'interfaces/Filter.interface';
import { Loader } from 'components/Loader.component';
import { CollapseCheckBox, CustomSitch, RangeSelect } from 'components/Shop';

const initFilter = {
  frets: [20, 21, 22, 24],
  brands: [1, 2, 3, 4],
  prices: [0, 50000],
  available: 1,
  shipping: false,
};

export const Shop = () => {
  const [grid, setGrid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isReset, setIsReset] = useState(false);
  const [products, setProducts] = useState<Guitar[]>([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Shopping>(initFilter);
  const [activePage, setActivePage] = useState(1);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const notifications = useAppSelector(({ notifications }) => notifications);
  const allGuitars = useAppSelector((state) => selectAllGuitars(state));
  const allBrands = useAppSelector((state) => selectAllBrands(state));

  const limit = 10;

  useEffect(() => {
    dispatch(getGuitars());
    dispatch(getBrands());
  }, [dispatch]);

  useEffect(() => {
    const brands = allBrands.map((brand) => brand.id);
    setFilter((filter) => ({ ...filter, brands }));
  }, [allBrands]);

  useEffect(() => {
    filterRows(filter);
    setIsLoading(false);
  }, [filter]);

  const resetSearch = () => {
    const brands = allBrands.map((brand) => brand.id);
    filterRows({ ...initFilter, brands });
    setIsReset(true);
    setQuery('');
  };

  const handleFrets = (frets: number[]) => {
    setFilter((filter) => ({ ...filter, frets }));
  };

  const handleBrands = (brands: number[]) => {
    setFilter((filter) => ({ ...filter, brands }));
  };

  const handlePrices = (prices: number[]) => {
    setFilter((filter) => ({ ...filter, prices }));
  };

  const handleShipping = (isShipping: boolean) => {
    setFilter((filter) => ({ ...filter, shipping: isShipping }));
  };

  const filterRows = async (filter: Shopping) => {
    // setQuery(query);

    // if (key.includes('frets')) {
    //   console.log('frets');
    //   setFilter((filter) => ({ ...filter, frets: newChecked }));
    //   handleFilter({ ...filter, frets: newChecked });
    // } else {
    //   console.log('brands');
    //   setFilter((filter) => ({ ...filter, brands: newChecked }));
    //   handleFilter({ ...filter, brands: newChecked });
    // }

    const shop = await guitarService.shopping(filter);
    setActivePage(1);
    setProducts(shop);
  };

  const handleSearch = (filters: string, rows: Guitar[] = products) => {
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
  // const resetSearch = () => {};

  const handleRange = (filters: number[]) => {
    const filtered = filterRows(`${filters[0]}`);
  };

  const handleFilter = (filters: number[]) => {
    const filtered = filterRows(`${filters[0]}`);
  };
*/

  const handleGrid = () => {
    setGrid((state) => !state);
  };

  const calculatedRows = products.slice(
    (activePage - 1) * limit,
    activePage * limit
  );

  const count = products.length;

  const totalPages = Math.ceil(count / limit);

  if (isLoading) return <Loader full={true} />;

  return (
    <div className="page_container">
      <div className="page_top">
        <div className="container">
          <SearchBar
            query={query}
            allGuitars={allGuitars}
            setQuery={setQuery}
            handleSearch={handleSearch}
            resetSearch={resetSearch}
          />
        </div>
      </div>
      <div className="container">
        <div className="shop_wrapper">
          <div className="left">
            <CollapseCheckBox
              title="brands"
              initState={true}
              filter={filter}
              list={allBrands}
              handleFrets={handleFrets}
              handleBrands={handleBrands}
            />
            <CollapseCheckBox
              title="frets"
              initState={true}
              filter={initFilter}
              list={[
                { id: 20, name: 20 },
                { id: 21, name: 21 },
                { id: 22, name: 22 },
                { id: 24, name: 24 },
              ]}
              handleFrets={handleFrets}
              handleBrands={handleBrands}
            />
            <CustomSitch
              title="shipping"
              filter={initFilter}
              isReset={isReset}
              handleShipping={handleShipping}
            />
            <RangeSelect
              initState={true}
              title="price"
              filter={initFilter}
              isReset={isReset}
              handlePrices={handlePrices}
            />
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
                {products.length && !isLoading ? (
                  <>
                    <CardBlock items={calculatedRows} grid={grid} />
                    <CustomPagination
                      products={calculatedRows}
                      activePage={activePage}
                      totalPages={totalPages}
                      gotoPage={setActivePage}
                    />
                  </>
                ) : (
                  <h5>
                    Oops, we did not find what you were looking for... Reset
                    your search
                  </h5>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
