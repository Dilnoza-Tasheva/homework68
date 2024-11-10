import { configureStore } from '@reduxjs/toolkit';
import { todoListSlicer } from '../containers/todoList/todoListSlice.ts';


export const store = configureStore({
  reducer: {
    todoList: todoListSlicer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;