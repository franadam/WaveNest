import { createSlice } from '@reduxjs/toolkit';
import { ToastType } from 'interfaces/ToastType.enum';

interface State {
  type: ToastType | undefined;
  message: string;
}

const initialState: State = { type: undefined, message: '' };

const notifications = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    errorGlobal: (state, action) => {
      state.message = action.payload;
      state.type = ToastType.ERROR;
    },
    successGlobal: (state, action) => {
      state.message = action.payload;
      state.type = ToastType.SUCCESS;
    },
    clearNotifications: (state) => {
      state.type = undefined;
      state.message = '';
    },
  },
});

export const { errorGlobal, successGlobal, clearNotifications } =
  notifications.actions;

export default notifications.reducer;
