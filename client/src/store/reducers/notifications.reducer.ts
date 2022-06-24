import { createSlice } from '@reduxjs/toolkit';
import { ToastType } from 'interfaces/ToastType.enum';

interface State {
  type: ToastType;
  message: string;
}

const initialState: State = { type: ToastType.SUCCESS, message: '' };

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
      state = initialState;
    },
  },
});

export const { errorGlobal, successGlobal, clearNotifications } =
  notifications.actions;

export default notifications.reducer;
