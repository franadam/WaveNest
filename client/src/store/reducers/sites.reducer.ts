import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { Site } from 'interfaces/Sites.interface';
import { ToastType } from 'interfaces/ToastType.enum';
import siteService from 'services/sites.service';
import { RootState } from 'store/store';
import { customError } from 'utils/customError';
import { errorGlobal, successGlobal } from './notifications.reducer';

// interface State {
//   status: 'idle' | 'pending' | 'succeeded' | 'failed';
// }

const sitesAdapter = createEntityAdapter<Site>();

const initialState = sitesAdapter.getInitialState({
  status: 'idle',
});

export const addSite = createAsyncThunk(
  'sites/add',
  async (payload: Site, thunkApi) => {
    try {
      const site = await siteService.createSite(payload);
      thunkApi.dispatch(
        successGlobal({
          message: `site ${site.id} added`,
          type: ToastType.CREATE_SUCCESS,
        })
      );
      return site;
    } catch (err: any) {
      const error = customError(err.response.data);
      await thunkApi.dispatch(errorGlobal(error.message));
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getSites = createAsyncThunk(
  'sites/getAllSites',
  async (__, thunkApi) => {
    try {
      const sites = await siteService.readSites();
      thunkApi.dispatch(
        successGlobal({
          message: `sites fetched`,
          type: ToastType.READ_SUCCESS,
        })
      );
      return sites;
    } catch (err: any) {
      const error = customError(err.response.data);
      await thunkApi.dispatch(errorGlobal(error.message));
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getSiteById = createAsyncThunk(
  'sites/getSiteById',
  async (id: number, thunkApi) => {
    try {
      const site = await siteService.readSite(id);
      thunkApi.dispatch(
        successGlobal({
          message: `site${site.id}  fetched`,
          type: ToastType.READ_SUCCESS,
        })
      );
      return site;
    } catch (err: any) {
      const error = customError(err.response.data);
      await thunkApi.dispatch(errorGlobal(error.message));
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateSite = createAsyncThunk(
  'sites/update',
  async ({ id, payload }: { id: number; payload: Partial<Site> }, thunkApi) => {
    try {
      const site = await siteService.updateSite(id, payload);
      thunkApi.dispatch(
        successGlobal({
          message: `site ${site.id} updated`,
          type: ToastType.UPDATE_SUCCESS,
        })
      );
      return site;
    } catch (err: any) {
      const error = customError(err.response.data);
      await thunkApi.dispatch(errorGlobal(error.message));
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteSite = createAsyncThunk(
  'sites/delete',
  async (id: number, thunkApi) => {
    try {
      const site = await siteService.deleteSite(id);
      thunkApi.dispatch(
        successGlobal({
          message: `site ${site.id} removed`,
          type: ToastType.DELETE_SUCCESS,
        })
      );
      return site.id;
    } catch (err: any) {
      const error = customError(err.response.data);
      await thunkApi.dispatch(errorGlobal(error.message));
      return thunkApi.rejectWithValue(error);
    }
  }
);

const sitesSlice = createSlice({
  name: 'sites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addSite.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(addSite.fulfilled, sitesAdapter.upsertOne)
      .addCase(addSite.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getSites.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getSites.fulfilled, sitesAdapter.upsertOne)
      .addCase(getSites.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getSiteById.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getSiteById.fulfilled, sitesAdapter.upsertOne)
      .addCase(getSiteById.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(updateSite.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(updateSite.fulfilled, sitesAdapter.upsertOne)
      .addCase(updateSite.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(deleteSite.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(deleteSite.fulfilled, sitesAdapter.removeOne)
      .addCase(deleteSite.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const {
  selectAll: selectAllSites,
  selectById: selectSiteById,
  selectIds: selectSiteIds,
} = sitesAdapter.getSelectors<RootState>((state) => state.sites);

// export const {} = sitesSlice.actions;

export default sitesSlice.reducer;
