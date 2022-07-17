import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { ToastType } from 'interfaces/ToastType.enum';
import { User } from 'interfaces/Users.interface';
import { usersService } from 'services/users.service';
import { RootState } from 'store/store';
import { customError } from 'utils/customError';
import { errorGlobal, successGlobal } from './notifications.reducer';

// interface State {
//   status: 'idle' | 'pending' | 'succeeded' | 'failed';
// }

const usersAdapter = createEntityAdapter<User>();

const initialState = usersAdapter.getInitialState({
  status: 'idle',
});

export const getUsers = createAsyncThunk(
  'users/getAllUsers',
  async (__, thunkApi) => {
    try {
      const users = await usersService.fetchUsers();
      thunkApi.dispatch(
        successGlobal({
          message: `users fetched`,
          type: ToastType.READ_SUCCESS,
        })
      );
      console.log('reducer users', users);
      return users;
    } catch (err: any) {
      const error = customError(err.response.data);
      await thunkApi.dispatch(errorGlobal(error.message));
      return thunkApi.rejectWithValue(error);
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
        state.status = 'pending';
      })
      .addCase(getUsers.fulfilled, usersAdapter.upsertMany)
      .addCase(getUsers.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = usersAdapter.getSelectors<RootState>((state) => state.users);

// export const {} = usersSlice.actions;

export default usersSlice.reducer;
