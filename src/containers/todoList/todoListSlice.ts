import { ITask, taskState, taskStateApi } from '../../types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';


interface todoListState {
  tasks: ITask[];
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

export const checkTask = createAsyncThunk('tasks/checkTask', async (task: ITask) => {
  const checkedTask: taskState = {title: task.title, done: !task.done};
  await axiosApi.put(`tasks/${task.id}.json`, checkedTask);
  return {...task, done: !task.done};
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
      })
      .addCase(addNewTask.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(addNewTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks.push(action.payload);
      })
      .addCase(addNewTask.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(checkTask.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(checkTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = state.tasks.map(task =>
        task.id === action.payload.id ? action.payload : task );
      })
      .addCase(checkTask.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  }

});

export const todoListSlicer = todoListSlice.reducer;