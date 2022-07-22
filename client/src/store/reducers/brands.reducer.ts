import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { Brand } from 'interfaces/Brands.interface';
import { ToastType } from 'interfaces/ToastType.enum';
import brandService from 'services/brands.service';
import { RootState } from 'store/store';
import { customError } from 'utils/customError';
import { errorGlobal, successGlobal } from './notifications.reducer';

// interface State {
//   status: 'idle' | 'pending' | 'succeeded' | 'failed';
// }

const brandsAdapter = createEntityAdapter<Brand>();

const initialState = brandsAdapter.getInitialState({
  status: 'idle',
});

export const addBrand = createAsyncThunk(
  'brands/add',
  async (payload: Brand, thunkApi) => {
    try {
      const brand = await brandService.createBrand(payload);
      thunkApi.dispatch(
        successGlobal({
          message: `brand ${brand.id} added`,
          type: ToastType.CREATE_SUCCESS,
        })
      );
      return brand;
    } catch (err: any) {
      const error = customError(err.response.data);
      await thunkApi.dispatch(errorGlobal(error.message));
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getBrands = createAsyncThunk(
  'brands/getAllBrands',
  async (__, thunkApi) => {
    try {
      const brands = await brandService.readBrands();
      thunkApi.dispatch(
        successGlobal({
          message: `brands fetched`,
          type: ToastType.READ_SUCCESS,
        })
      );
      console.log('reducer brands', brands);
      return brands;
    } catch (err: any) {
      const error = customError(err.response.data);
      await thunkApi.dispatch(errorGlobal(error.message));
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getBrandById = createAsyncThunk(
  'brands/getBrandById',
  async (id: number, thunkApi) => {
    try {
      const brand = await brandService.readBrand(id);
      thunkApi.dispatch(
        successGlobal({
          message: `brand${brand.id}  fetched`,
          type: ToastType.READ_SUCCESS,
        })
      );
      console.log('reducer brand', brand);
      return brand;
    } catch (err: any) {
      const error = customError(err.response.data);
      await thunkApi.dispatch(errorGlobal(error.message));
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateBrand = createAsyncThunk(
  'brands/update',
  async (
    { id, payload }: { id: number; payload: Partial<Brand> },
    thunkApi
  ) => {
    try {
      const brand = await brandService.updateBrand(id, payload);
      thunkApi.dispatch(
        successGlobal({
          message: `brand ${brand.id} updated`,
          type: ToastType.UPDATE_SUCCESS,
        })
      );
      return brand;
    } catch (err: any) {
      const error = customError(err.response.data);
      await thunkApi.dispatch(errorGlobal(error.message));
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteBrand = createAsyncThunk(
  'brands/delete',
  async (id: number, thunkApi) => {
    try {
      const brand = await brandService.deleteBrand(id);
      thunkApi.dispatch(
        successGlobal({
          message: `brand ${brand.id} removed`,
          type: ToastType.DELETE_SUCCESS,
        })
      );
      return brand.id;
    } catch (err: any) {
      const error = customError(err.response.data);
      await thunkApi.dispatch(errorGlobal(error.message));
      return thunkApi.rejectWithValue(error);
    }
  }
);

const brandsSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addBrand.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(addBrand.fulfilled, brandsAdapter.upsertOne)
      .addCase(addBrand.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getBrands.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getBrands.fulfilled, brandsAdapter.upsertMany)
      .addCase(getBrands.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getBrandById.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getBrandById.fulfilled, brandsAdapter.upsertOne)
      .addCase(getBrandById.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(updateBrand.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(updateBrand.fulfilled, brandsAdapter.upsertOne)
      .addCase(updateBrand.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(deleteBrand.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(deleteBrand.fulfilled, brandsAdapter.removeOne)
      .addCase(deleteBrand.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const {
  selectAll: selectAllBrands,
  selectById: selectBrandById,
  selectIds: selectBrandIds,
} = brandsAdapter.getSelectors<RootState>((state) => state.brands);

// export const {} = brandsSlice.actions;

export default brandsSlice.reducer;
