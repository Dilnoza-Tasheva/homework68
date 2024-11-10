import {useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store.ts';
import { useEffect } from 'react';
import { fetchList } from './todoListSlice.ts';


const TodoList = () => {
  const tasks = useSelector((state: RootState) => state.todoList.tasks);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchList());
  },[dispatch]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <form className="mb-2" onSubmit={onSubmit}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="What is your new task?"
          />
          <button type="submit" className="btn btn-outline-success">Add task</button>
        </div>
      </form>


      <ul className="list-group">
        {tasks.map((task) => (
          <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <input type="checkbox"
                     className="me-2"
              />
              {task.title}
              <button className="btn btn-outline-danger">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;