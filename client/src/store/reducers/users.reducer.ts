import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: 0,
  firstname: '',
  lastname: '',
  email: '',
  history: [],
  cart: [],
  verify: null,
  roles: '',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: { test: (state) => initialState },
});

export const { test } = usersSlice.actions;

export default usersSlice.reducer;
