import { taskState } from '../../types';
import { createSlice } from '@reduxjs/toolkit';


interface todoListState {
  tasks: taskState[];
  loading: boolean;
}

const initialState: todoListState = {
  tasks: [],
  loading: false,
};

export const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  extraReducers: (builder) => {
    builder
  }

});

export const todoListSlicer = todoListSlice.reducer;