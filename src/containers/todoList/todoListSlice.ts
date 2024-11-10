import { taskState } from '../../types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';


interface todoListState {
  tasks: taskState[];
  isLoading: boolean;
  error: boolean;
}

const initialState: todoListState = {
  tasks: [],
  isLoading: false,
  error: false,
};

export const fetchList = createAsyncThunk('tasks/fetchList', async() => {
  const {data: todoList} = await axiosApi<taskState[]>('tasks.json');
  console.log(todoList);
  return todoList;
});

export const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchList.pending, (state) => {
          state.isLoading = true;
          state.error = false;
      })
      .addCase(fetchList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchList.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  }

});

export const todoListSlicer = todoListSlice.reducer;