import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth.reducer';
import guitarsReducer from './reducers/guitars.reducer';
import notificationsReducer from './reducers/notifications.reducer';
import usersReducer from './reducers/users.reducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    guitars: guitarsReducer,
    notifications: notificationsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
