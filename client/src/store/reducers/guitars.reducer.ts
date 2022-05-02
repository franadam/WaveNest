import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Filter } from 'interfaces/Filter.interface';
import { Guitar } from 'interfaces/Guitars.interface';
import {
  readGuitars,
  readGuitarsWithParams,
  shopGuitars,
} from 'services/guitars.service';
import { normalizer } from 'utils/normalizer';

const initialState: {
  status: string;
  ids: number[];
  // guitars: any[];
  entities: { [id: string]: Guitar };
  //error: string;
} = {
  status: 'idle',
  ids: [],
  // guitars: [],
  entities: {},
  //error: '',
};
export const getGuitars = createAsyncThunk(
  'guitars/getAllGuitars',
  async () => {
    const guitars = await readGuitars();
    return guitars;
  }
);

export const getGuitarsWithParams = createAsyncThunk(
  'guitars/getGuitarsWithParams',
  async (payload: Filter) => {
    const guitars = await readGuitarsWithParams(payload);
    return guitars;
  }
);

// need auth
export const shopping = createAsyncThunk(
  'guitars/shopping',
  async (payload: Filter) => {
    const guitars = await shopGuitars(payload);
    return guitars;
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
        const { ids, entities } = normalizer(action.payload);
        state.ids = ids;
        state.entities = entities;
      })
      .addCase(getGuitars.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getGuitarsWithParams.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getGuitarsWithParams.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { ids, entities } = normalizer(action.payload);
        state.ids = ids;
        state.entities = entities;
      })
      .addCase(getGuitarsWithParams.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(shopping.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(shopping.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { ids, entities } = normalizer(action.payload);
        state.ids = ids;
        state.entities = entities;
      })
      .addCase(shopping.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const {} = guitars.actions;

export default guitars.reducer;
