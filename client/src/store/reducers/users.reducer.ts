import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from 'interfaces/Users.interface';
import { fetchUsers } from 'services/users.service';
import { normalizer } from 'utils/normalizer';
import { errorGlobal, successGlobal } from './notifications.reducer';

interface State {
  status: string;
  ids: number[];
  entities: { [id: string]: User };
}

const initialState: State = {
  status: 'idle',
  ids: [],
  entities: {},
};

export const getUsers = createAsyncThunk(
  'users/getAllUsers',
  async (__, thunkApi) => {
    try {
      const users = await fetchUsers();
      // thunkApi.dispatch(successGlobal('fulfilled fulfilled fulfilled'));
      console.log('reducer users', users);
      return users;
    } catch (error: any) {
      await thunkApi.dispatch(errorGlobal(error.message));
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload) {
          const { ids, entities } = normalizer(action.payload);
          state.ids = ids;
          state.entities = entities;
        }
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

export const {} = usersSlice.actions;

export default usersSlice.reducer;
