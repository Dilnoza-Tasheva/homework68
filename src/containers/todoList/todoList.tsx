import {useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store.ts';
import { useEffect, useState } from 'react';
import { addNewTask, checkTask, fetchList } from './todoListSlice.ts';
import { ITask } from '../../types';


const TodoList = () => {
  const tasks = useSelector((state: RootState) => state.todoList.tasks);
  const dispatch: AppDispatch = useDispatch();
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    dispatch(fetchList());
  },[dispatch]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      dispatch(addNewTask(newTaskTitle));
      setNewTaskTitle('');
    }
  };

  const clickOnCheck = (task: ITask) => {
    dispatch(checkTask(task));
  };

  return (
    <div className="container">
      <form className="mb-2" onSubmit={onSubmit}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="What is your new task?"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <button type="submit" className="btn btn-outline-success">Add task</button>
        </div>
      </form>


      <ul className="list-group">
        {tasks.map((task) => (
          <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
            {task.title}
            <div>
              <input type="checkbox"
                     className="me-2"
                     checked={task.done}
                     onChange={() => clickOnCheck(task)}
              />
              <button className="btn btn-outline-danger">Delete</button>
            </div>
          </li>
        ))}


      </ul>
    </div>
  );
};

export default TodoList;