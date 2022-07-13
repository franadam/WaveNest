import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { Filter } from 'interfaces/Filter.interface';
import { Guitar } from 'interfaces/Guitars.interface';
import { ToastType } from 'interfaces/ToastType.enum';
import guitarService from 'services/guitars.service';
import { RootState } from 'store/store';
import { customError } from 'utils/customError';
import { errorGlobal, successGlobal } from './notifications.reducer';

// interface State extends EntityState<Guitar> {
//   status: 'idle' | 'pending' | 'succeeded' | 'failed';
//   // ids: number[];
//   // entities: { [id: string]: Guitar };
//   //error: string;
// }

const guitarsAdapter = createEntityAdapter<Guitar>();

const initialState = guitarsAdapter.getInitialState({
  status: 'idle',
  //error: '',
});

export const addGuitar = createAsyncThunk(
  'guitars/add',
  async (payload: any, thunkApi) => {
    try {
      const guitar = await guitarService.createGuitar(payload);
      thunkApi.dispatch(
        successGlobal({
          message: `guitar ${guitar.id} added`,
          type: ToastType.CREATE_SUCCESS,
        })
      );
      return guitar;
    } catch (err: any) {
      const error = customError(err.response.data);
      await thunkApi.dispatch(errorGlobal(error.message));
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getGuitars = createAsyncThunk(
  'guitars/getAllGuitars',
  async (__, thunkApi) => {
    try {
      const guitars = await guitarService.readGuitars();
      thunkApi.dispatch(
        successGlobal({
          message: `guitars fetched`,
          type: ToastType.READ_SUCCESS,
        })
      );
      return guitars;
    } catch (err: any) {
      const error = customError(err.response.data);
      await thunkApi.dispatch(errorGlobal(error.message));
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateGuitar = createAsyncThunk(
  'guitars/update',
  async (
    { id, payload }: { id: number; payload: Partial<Guitar> },
    thunkApi
  ) => {
    try {
      const guitar = await guitarService.updateGuitar(id, payload);
      thunkApi.dispatch(
        successGlobal({
          message: `guitar ${guitar.id} updated`,
          type: ToastType.UPDATE_SUCCESS,
        })
      );
      return guitar;
    } catch (err: any) {
      const error = customError(err.response.data);
      await thunkApi.dispatch(errorGlobal(error.message));
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteGuitar = createAsyncThunk(
  'guitars/delete',
  async (id: number, thunkApi) => {
    try {
      const guitar = await guitarService.deleteGuitar(id);
      thunkApi.dispatch(
        successGlobal({
          message: `guitar ${guitar.id} removed`,
          type: ToastType.DELETE_SUCCESS,
        })
      );
      return guitar.id;
    } catch (err: any) {
      const error = customError(err.response.data);
      await thunkApi.dispatch(errorGlobal(error.message));
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getGuitarsWithParams = createAsyncThunk(
  'guitars/getGuitarsWithParams',
  async (payload: Filter, thunkApi) => {
    try {
      const guitars = await guitarService.readGuitarsWithParams(payload);
      return guitars;
    } catch (err: any) {
      const error = customError(err.response.data);
      await thunkApi.dispatch(errorGlobal(error.message));
      return thunkApi.rejectWithValue(error);
    }
  }
);

// need auth
export const shopping = createAsyncThunk(
  'guitars/shopping',
  async (payload: Filter, thunkApi) => {
    try {
      const guitars = await guitarService.shopGuitars(payload);
      return guitars;
    } catch (err: any) {
      const error = customError(err.response.data);
      await thunkApi.dispatch(errorGlobal(error.message));
      return thunkApi.rejectWithValue(error);
    }
  }
);

const guitars = createSlice({
  name: 'guitars',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addGuitar.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(addGuitar.fulfilled, guitarsAdapter.upsertOne)
      .addCase(addGuitar.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getGuitars.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getGuitars.fulfilled, guitarsAdapter.upsertMany)
      .addCase(updateGuitar.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(updateGuitar.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(updateGuitar.fulfilled, guitarsAdapter.upsertOne)
      .addCase(deleteGuitar.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(deleteGuitar.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(deleteGuitar.fulfilled, guitarsAdapter.removeOne)
      .addCase(getGuitars.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getGuitarsWithParams.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getGuitarsWithParams.fulfilled, guitarsAdapter.upsertMany)
      .addCase(getGuitarsWithParams.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(shopping.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(shopping.fulfilled, guitarsAdapter.upsertMany)
      .addCase(shopping.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

// export const {} = guitars.actions;
// Export the customized selectors for this adapter using `getSelectors`
export const {
  selectAll: selectAllGuitars,
  selectById: selectGuitarById,
  selectIds: selectGuitarIds,
  // Pass in a selector that returns the guitars slice of state
} = guitarsAdapter.getSelectors<RootState>((state) => state.guitars);

export default guitars.reducer;
