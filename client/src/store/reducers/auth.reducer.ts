import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Guitar } from 'interfaces/Guitars.interface';
import { ToastType } from 'interfaces/ToastType.enum';
import { Credentials, User, UserRole } from 'interfaces/Users.interface';
import { authService } from 'services/users.service';
import { RootState } from 'store/store';
import { customError } from 'utils/customError';
import { updateFieldHelper } from 'utils/updateHelper';
import { errorGlobal, successGlobal } from './notifications.reducer';
import { getSites } from './sites.reducer';

interface State {
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
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
      const user = await authService.register(credentials);
      await thunkApi.dispatch(
        successGlobal({
          message: `Welcome ${user.firstname}, check your mail to verify the account`,
          type: ToastType.AUTH_SUCCESS,
        })
      );
      return user;
    } catch (err: any) {
      const error = customError(err.response.data);
      await thunkApi.dispatch(errorGlobal(error.message));
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: Credentials, thunkApi) => {
    try {
      const user = await authService.login(credentials);

      await thunkApi.dispatch(
        successGlobal({
          message: `Welcome ${user.firstname}`,
          type: ToastType.AUTH_SUCCESS,
        })
      );
      return user;
    } catch (err: any) {
      const error = customError(err.response.data);
      await thunkApi.dispatch(errorGlobal(error.message));
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkApi) => {
    try {
      const user = await authService.logout();

      await thunkApi.dispatch(
        successGlobal({
          message: `Goodby ${user.firstname}`,
          type: ToastType.AUTH_SUCCESS,
        })
      );
      return user;
    } catch (err: any) {
      const error = customError(err.response.data);
      await thunkApi.dispatch(errorGlobal(error.message));
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const googleLoginUser = createAsyncThunk(
  'auth/login/google',
  async (_, thunkApi) => {
    try {
      const user = await authService.googleLogin();

      await thunkApi.dispatch(
        successGlobal({
          message: `Welcome ${user.firstname}`,
          type: ToastType.AUTH_SUCCESS,
        })
      );
      return user;
    } catch (err: any) {
      const error = customError(err.response.data);
      await thunkApi.dispatch(errorGlobal(error.message));
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getProfile = createAsyncThunk(
  'auth/profile',
  async (_, thunkApi) => {
    try {
      const user = await authService.profile();

      await thunkApi.dispatch(
        successGlobal({
          message: `Welcome ${user.firstname}`,
          type: ToastType.AUTH_SUCCESS,
        })
      );

      return user;
    } catch (err: any) {
      const error = customError(err.response.data);
      await thunkApi.dispatch(errorGlobal(error.message));
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const isUserAuth = createAsyncThunk(
  'auth/isUserAuth',
  async (_, thunkApi) => {
    try {
      const isLogged = authService.isAuth();

      if (isLogged) {
        await thunkApi.dispatch(
          successGlobal({ message: `Welcome`, type: ToastType.AUTH_SUCCESS })
        );
        await thunkApi.dispatch(getProfile());
        await thunkApi.dispatch(getSites());
      }
      return isLogged;
    } catch (err: any) {
      const error = customError(err.response.data);
      await thunkApi.dispatch(errorGlobal(error.message));
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const verifyUser = createAsyncThunk(
  'auth/verifyUser',
  async (_, thunkApi) => {
    try {
      const user = await authService.verifyUser();
      const isVerified = user.verified;
      if (isVerified) {
        await thunkApi.dispatch(
          successGlobal({
            message: `you are verified`,
            type: ToastType.AUTH_SUCCESS,
          })
        );
      }
      return isVerified;
    } catch (err: any) {
      const error = customError(err.response.data);
      await thunkApi.dispatch(errorGlobal(error.message));
      return thunkApi.rejectWithValue(error);
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
          ? await authService.update(id, rest)
          : await authService.update(id, updates);
      await thunkApi.dispatch(
        successGlobal({
          message: 'profile updated',
          type: ToastType.AUTH_SUCCESS,
        })
      );
      console.log('reducer profile', profile);
      return profile;
    } catch (err: any) {
      const error = customError(err.response.data);
      await thunkApi.dispatch(errorGlobal(error.message));
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateProfileEmail = createAsyncThunk(
  'auth/updateProfileEmail',
  async ({ id, email }: { id: number; email: string }, thunkApi) => {
    try {
      const user = await authService.updateEmail(id, email);
      await thunkApi.dispatch(
        successGlobal({
          message: 'profile updated',
          type: ToastType.AUTH_SUCCESS,
        })
      );
      return user;
    } catch (err: any) {
      const error = customError(err.response.data);
      await thunkApi.dispatch(errorGlobal(error.message));
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const addToUserCart = createAsyncThunk(
  'auth/addToUserCart',
  async ({ id, guitar }: { id: number; guitar: Guitar }, thunkApi) => {
    try {
      const rootState = thunkApi.getState() as RootState;
      const cart = rootState.auth.profile.cart;
      const updatedCart = [...cart, guitar];
      await authService.addToCart(id, updatedCart);
      console.log('reducer>> cart', cart);
      await thunkApi.dispatch(
        successGlobal({
          message: 'item added to cart',
          type: ToastType.CART_SUCCESS,
        })
      );
      return updatedCart;
    } catch (err: any) {
      const error = customError(err.response.data);
      await thunkApi.dispatch(errorGlobal(error.message));
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const removeFromUserCart = createAsyncThunk(
  'auth/removeFromUserCart',
  async (id: number, thunkApi) => {
    try {
      const rootState = thunkApi.getState() as RootState;
      const { email, cart, ...rest } = rootState.auth.profile;
      const updatedCart = cart.filter((guitar) => guitar.id !== id);
      console.log('reducer >> updatedCart', cart, id, updatedCart);
      await authService.update(id, { ...rest, cart: updatedCart });
      await thunkApi.dispatch(
        successGlobal({
          message: 'item remove from cart',
          type: ToastType.CART_SUCCESS,
        })
      );
      return updatedCart;
    } catch (err: any) {
      const error = customError(err.response.data);
      await thunkApi.dispatch(errorGlobal(error.message));
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const purchaseCart = createAsyncThunk(
  'auth/purchaseCart',
  async (order_id: string, thunkApi) => {
    try {
      const history = await authService.purchase(order_id);
      console.log('reducer>> cart', history);
      await thunkApi.dispatch(
        successGlobal({
          message: 'Thank you for your purchase',
          type: ToastType.CART_SUCCESS,
        })
      );
      console.log('reducer >>> history', history);
      return history;
    } catch (err: any) {
      const error = customError(err.response.data);
      await thunkApi.dispatch(errorGlobal(error.message));
      return thunkApi.rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'pending';
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
        state.status = 'pending';
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
        state.status = 'pending';
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
        state.status = 'pending';
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
        state.status = 'pending';
      })
      .addCase(isUserAuth.fulfilled, (state, action) => {
        if (action.payload) state.isAuth = action.payload;
        state.status = 'succeeded';
      })
      .addCase(isUserAuth.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getProfile.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        if (action.payload) {
          state.profile.firstname = action.payload.firstname;
          state.profile.lastname = action.payload.lastname;
          state.profile.username = action.payload.username;
          state.profile.password = action.payload.password;
          state.profile.id = action.payload.id;
          state.profile.email = action.payload.email;
          state.isAuth = true;
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
        state.status = 'pending';
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        if (action.payload) {
          state.profile.firstname = updateFieldHelper(
            'firstname',
            state,
            action
          );
          state.profile.lastname = updateFieldHelper('lastname', state, action);
          state.profile.username = updateFieldHelper('username', state, action);
          state.profile.password = updateFieldHelper('password', state, action);
          state.profile.email = updateFieldHelper('email', state, action);
          state.profile.token = updateFieldHelper('token', state, action);
          state.profile.history = updateFieldHelper('history', state, action);
          state.profile.cart = updateFieldHelper('cart', state, action);
          state.profile.verified = updateFieldHelper('verified', state, action);
          state.profile.roles = updateFieldHelper('roles', state, action);
          state.status = 'succeeded';
          state.isAuth = true;
        }
      })
      .addCase(updateProfile.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(updateProfileEmail.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(updateProfileEmail.fulfilled, (state, action) => {
        if (action.payload) {
          state.isAuth = true;
          state.profile.email = action.payload.email;
          state.status = 'succeeded';
        }
      })
      .addCase(updateProfileEmail.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(verifyUser.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.profile.verified = action.payload;
          state.status = 'succeeded';
        }
      })
      .addCase(verifyUser.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(addToUserCart.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(addToUserCart.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(addToUserCart.fulfilled, (state, action) => {
        if (action.payload) {
          state.profile.cart = action.payload;
          state.status = 'succeeded';
        }
      })
      .addCase(removeFromUserCart.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(removeFromUserCart.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(removeFromUserCart.fulfilled, (state, action) => {
        if (action.payload) {
          state.profile.cart = action.payload;
          state.status = 'succeeded';
        }
      })
      .addCase(purchaseCart.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(purchaseCart.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(purchaseCart.fulfilled, (state, action) => {
        if (action.payload) {
          state.profile.history = action.payload;
          state.profile.cart = [];
          state.status = 'succeeded';
        }
      });
  },
});

// export const {} = authSlice.actions;

export default authSlice.reducer;
