

const TodoList = () => {
  return (
    <div className="container">
      <form className="mb-2">
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
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Task
          <div>
            <input type="checkbox"
                   className="me-2"
            />
            <button className="btn btn-outline-danger">Delete</button>
          </div>

        </li>
      </ul>

    </div>
  );
};

export default TodoList;