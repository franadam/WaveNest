import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Filter } from 'interfaces/Filter.interface';
import { Guitar } from 'interfaces/Guitars.interface';
import {
  readGuitars,
  readGuitarsWithParams,
  shopGuitars,
} from 'services/guitars.service';
import { normalizer } from 'utils/normalizer';
import { errorGlobal, successGlobal } from './notifications.reducer';

interface State {
  status: string;
  ids: number[];
  entities: { [id: string]: Guitar };
  //error: string;
}

const initialState: State = {
  status: 'idle',
  ids: [],
  entities: {},
  //error: '',
};

export const getGuitars = createAsyncThunk(
  'guitars/getAllGuitars',
  async (__, thunkApi) => {
    try {
      const guitars = await readGuitars();
      // thunkApi.dispatch(successGlobal('fulfilled fulfilled fulfilled'));
      return guitars;
    } catch (error: any) {
      await thunkApi.dispatch(errorGlobal(error.message));
    }
  }
);

export const getGuitarsWithParams = createAsyncThunk(
  'guitars/getGuitarsWithParams',
  async (payload: Filter, thunkApi) => {
    try {
      const guitars = await readGuitarsWithParams(payload);
      return guitars;
    } catch (error: any) {
      await thunkApi.dispatch(errorGlobal(error.message));
    }
  }
);

// need auth
export const shopping = createAsyncThunk(
  'guitars/shopping',
  async (payload: Filter, thunkApi) => {
    try {
      const guitars = await shopGuitars(payload);
      return guitars;
    } catch (error: any) {
      await thunkApi.dispatch(errorGlobal(error.message));
    }
  }
);

const guitars = createSlice({
  name: 'guitars',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGuitars.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getGuitars.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload) {
          const { ids, entities } = normalizer(action.payload);
          state.ids = ids;
          state.entities = entities;
        }
      })
      .addCase(getGuitars.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(getGuitarsWithParams.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getGuitarsWithParams.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload) {
          const { ids, entities } = normalizer(action.payload);
          state.ids = ids;
          state.entities = entities;
        }
      })
      .addCase(getGuitarsWithParams.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(shopping.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(shopping.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload) {
          const { ids, entities } = normalizer(action.payload);
          state.ids = ids;
          state.entities = entities;
        }
      })
      .addCase(shopping.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const {} = guitars.actions;

export default guitars.reducer;
