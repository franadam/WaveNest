import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Credentials, User, UserRole } from 'interfaces/Users.interface';
import {
  googleLogin,
  login,
  logout,
  profile,
  register,
  isAuth,
  update,
} from 'services/users.service';
import { AppDispatch, RootState } from 'store/store';
import {
  clearNotifications,
  errorGlobal,
  successGlobal,
} from './notifications.reducer';

interface State {
  status: string;
  profile: User;
  isAuth: Boolean;
}

const initialState: State = {
  status: 'idle',
  isAuth: false,
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
  'auth/register',
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
  'auth/login',
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
  'auth/logout',
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
  'auth/login/google',
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
  'auth/profile',
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

export const isUserAuth = createAsyncThunk(
  'auth/isUserAuth',
  async (_, thunkApi) => {
    try {
      const isLogged = isAuth();
      if (isLogged) await thunkApi.dispatch(getProfile());
      return isLogged;
    } catch (error: any) {
      await thunkApi.dispatch(errorGlobal(error.message));
    }
  }
);

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async ({ id, updates }: { id: number; updates: Partial<User> }, thunkApi) => {
    try {
      const { email, ...rest } = updates;
      const st = thunkApi.getState() as RootState;
      console.log('auth reducer >> state', st);

      const profile =
        st.auth.profile.email === email
          ? await update(id, rest)
          : await update(id, updates);
      await thunkApi.dispatch(successGlobal('profile updated'));
      console.log('reducer profile', profile);
      return profile;
    } catch (error: any) {
      await thunkApi.dispatch(errorGlobal(error.message));
    }
  }
);

const updateProfileHelper = (field: string, state: any, action: any) => {
  return action.payload[field] ? action.payload[field] : state.profile[field];
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
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
          state.profile.id = action.payload.id;
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
          state.profile.id = action.payload.id;
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
          state.profile.id = action.payload.id;
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
          state.profile.id = action.payload.id;
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
      .addCase(isUserAuth.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(isUserAuth.fulfilled, (state, action) => {
        if (action.payload) state.isAuth = action.payload;
      })
      .addCase(isUserAuth.rejected, (state) => {
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
          state.profile.id = action.payload.id;
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
      .addCase(updateProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        if (action.payload) {
          state.profile.firstname = updateProfileHelper(
            'firstname',
            state,
            action
          );
          state.profile.lastname = updateProfileHelper(
            'lastname',
            state,
            action
          );
          state.profile.username = updateProfileHelper(
            'username',
            state,
            action
          );
          state.profile.password = updateProfileHelper(
            'password',
            state,
            action
          );
          state.profile.email = updateProfileHelper('email', state, action);
          state.profile.token = updateProfileHelper('token', state, action);
          state.profile.history = updateProfileHelper('history', state, action);
          state.profile.cart = updateProfileHelper('cart', state, action);
          state.profile.verified = updateProfileHelper(
            'verified',
            state,
            action
          );
          state.profile.roles = updateProfileHelper('roles', state, action);
          state.status = 'succeeded';
        }
      })
      .addCase(updateProfile.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
