import { task, taskState, taskStateApi } from '../../types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';


interface todoListState {
  tasks: task[];
  isLoading: boolean;
  error: boolean;
}

const initialState: todoListState = {
  tasks: [],
  isLoading: false,
  error: false,
};

export const fetchList = createAsyncThunk('tasks/fetchList', async() => {
  const {data} = await axiosApi<taskStateApi>('tasks.json');
  return Object.keys(data).map(id => ({id, ...data[id]}));
});

export const addNewTask = createAsyncThunk('tasks/addNewTask', async (title: string) => {
  const newTask: taskState = {title, done: false};
  const {data} = await axiosApi.post<{name: string}>('tasks.json', newTask);
  return {id: data.name, ...newTask};
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