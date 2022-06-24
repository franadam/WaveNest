import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Credentials, User, UserRole } from 'interfaces/Users.interface';
import {
  fetchUsers,
  googleLogin,
  login,
  logout,
  profile,
  register,
  isAuth,
} from 'services/users.service';
import { normalizer } from 'utils/normalizer';
import { errorGlobal, successGlobal } from './notifications.reducer';

interface State {
  status: string;
  profile: User;
  ids: number[];
  isAuth: Boolean;
  entities: { [id: string]: User };
}

const initialState: State = {
  status: 'idle',
  ids: [],
  isAuth: false,
  entities: {},
  profile: {
    id: 0,
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    email: '',
    token: '',
    history: [],
    cart: [],
    verified: false,
    roles: UserRole.USER,
  },
};

export const registerUser = createAsyncThunk(
  'users/register',
  async (credentials: User, thunkApi) => {
    try {
      const user = await register(credentials);
      await thunkApi.dispatch(
        successGlobal(
          `Welcome ${user.firstname}, check your mail to verify the account`
        )
      );
      return user;
    } catch (error: any) {
      await thunkApi.dispatch(errorGlobal(error.message));
    }
  }
);

export const loginUser = createAsyncThunk(
  'users/login',
  async (credentials: Credentials, thunkApi) => {
    try {
      const user = await login(credentials);
      await thunkApi.dispatch(successGlobal(`Welcome ${user.firstname}`));
      return user;
    } catch (error: any) {
      await thunkApi.dispatch(errorGlobal(error.message));
    }
  }
);

export const logoutUser = createAsyncThunk(
  'users/logout',
  async (_, thunkApi) => {
    try {
      const user = await logout();
      await thunkApi.dispatch(successGlobal(`Goodby ${user.firstname}`));
      return user;
    } catch (error: any) {
      await thunkApi.dispatch(errorGlobal(error.message));
    }
  }
);

export const googleLoginUser = createAsyncThunk(
  'users/login/google',
  async (_, thunkApi) => {
    try {
      const user = await googleLogin();
      await thunkApi.dispatch(successGlobal(`Welcome ${user.firstname}`));
      return user;
    } catch (error: any) {
      await thunkApi.dispatch(errorGlobal(error.message));
    }
  }
);

export const getProfile = createAsyncThunk(
  'users/profile',
  async (_, thunkApi) => {
    try {
      const user = await profile();
      await thunkApi.dispatch(successGlobal(`Welcome ${user.firstname}`));
      return user;
    } catch (error: any) {
      await thunkApi.dispatch(errorGlobal(error.message));
    }
  }
);

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
  reducers: {
    isUserAuth: (state) => {
      state.isAuth = isAuth();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.profile.firstname = action.payload.firstname;
          state.profile.lastname = action.payload.lastname;
          state.profile.username = action.payload.username;
          state.profile.password = action.payload.password;
          state.profile.email = action.payload.email;
          state.profile.token = action.payload.token;
          state.profile.history = action.payload.history;
          state.profile.cart = action.payload.cart;
          state.profile.verified = action.payload.verified;
          state.profile.roles = action.payload.roles;
          state.status = 'succeeded';
        }
      })
      .addCase(registerUser.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.profile.firstname = action.payload.firstname;
          state.isAuth = true;
          state.profile.lastname = action.payload.lastname;
          state.profile.username = action.payload.username;
          state.profile.password = action.payload.password;
          state.profile.email = action.payload.email;
          state.profile.token = action.payload.token;
          state.profile.history = action.payload.history;
          state.profile.cart = action.payload.cart;
          state.profile.verified = action.payload.verified;
          state.profile.roles = action.payload.roles;
          state.status = 'succeeded';
        }
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(googleLoginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(googleLoginUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.profile.firstname = action.payload.firstname;
          state.profile.lastname = action.payload.lastname;
          state.profile.username = action.payload.username;
          state.profile.password = action.payload.password;
          state.profile.email = action.payload.email;
          state.profile.token = action.payload.token;
          state.isAuth = true;
          state.profile.history = action.payload.history;
          state.profile.cart = action.payload.cart;
          state.profile.verified = action.payload.verified;
          state.profile.roles = action.payload.roles;
          state.status = 'succeeded';
        }
      })
      .addCase(googleLoginUser.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.profile.firstname = '';
          state.isAuth = false;
          state.profile.lastname = '';
          state.profile.username = '';
          state.profile.password = '';
          state.profile.email = '';
          state.profile.token = '';
          state.profile.history = [];
          state.profile.cart = [];
          state.profile.verified = action.payload.verified;
          state.profile.roles = action.payload.roles;
          state.status = 'succeeded';
        }
      })
      .addCase(logoutUser.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        if (action.payload) {
          state.profile.firstname = action.payload.firstname;
          state.profile.lastname = action.payload.lastname;
          state.profile.username = action.payload.username;
          state.profile.password = action.payload.password;
          state.profile.email = action.payload.email;
          state.profile.token = action.payload.token;
          state.profile.history = action.payload.history;
          state.profile.cart = action.payload.cart;
          state.profile.verified = action.payload.verified;
          state.profile.roles = action.payload.roles;
          state.status = 'succeeded';
        }
      })
      .addCase(getProfile.rejected, (state) => {
        state.status = 'failed';
      })
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

export const { isUserAuth } = usersSlice.actions;

export default usersSlice.reducer;
