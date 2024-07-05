import { useState } from "react";
import "./App.css";
import Todocard from "./Components/Todocard";

function App() {
  const initialTodo = [
    {
      id: 1,
      name: "React Todo",
      description: "Build a dynamic todo manager using React",
      status: false,
      editing: false,
    },
    {
      id: 2,
      name: "Todo 2",
      description: "Todo 2 Description",
      status: true,
      editing: false,
    },
    {
      id: 3,
      name: "Todo 2",
      description: "Todo 2 Description",
      status: false,
      editing: false,
    },
  ];
  const [todolist, setTodolist] = useState(initialTodo);
  const [filter, setFilter] = useState("All");

  const handleFilter = (value) => {
    setFilter(value);
  };

  const getFilteredTodos = () => {
    if (filter === "All") {
      return todolist;
    } else if (filter === "Done") {
      return todolist.filter((todo) => todo.status);
    } else {
      return todolist.filter((todo) => !todo.status);
    }
  };

  const filteredTodolist = getFilteredTodos();

  const handleSelect = (id, value) => {
    setTodolist((prevTodolist) =>
      prevTodolist.map((todo) =>
        todo.id === id ? { ...todo, status: value === "Done" } : todo
      )
    );
  };

  const handleDelete = (id) => {
    setTodolist((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleEdit = (id) => {
    setTodolist((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, editing: !todo.editing } : todo
      )
    );
  };

  const handleSave = (id, taskname, taskdesc) => {
    setTodolist((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              id: id,
              name: taskname,
              description: taskdesc,
              status: todo.status,
              editing: !todo.editing,
            }
          : todo
      )
    );
  };

  return (
    <>
      <h1 className="display-2 text-center bg-dark text-white d-flex align-items-center justify-content-center p-3">
        REACT - TODO
      </h1>
      <form
        className="d-flex flex-column flex-md-row justify-content-center align-items-center m-5"
        onSubmit={(e) => {
          e.preventDefault();
          const taskname = e.target.elements.taskname.value;
          const taskdesc = e.target.elements.taskdesc.value;
          setTodolist((todolist) => [
            ...todolist,
            {
              id: todolist.length + 1,
              name: taskname,
              description: taskdesc,
              status: false,
              editing: false,
            },
          ]);
          e.target.reset();
        }}
      >
        <input
          type="text"
          placeholder="Todo Name"
          className="me-md-5 rounded p-2 col w-100 my-2"
          name="taskname"
        />
        <input
          type="text"
          placeholder="Todo Description"
          className="me-md-5 rounded p-2 col w-100 my-2"
          name="taskdesc"
        />
        <button
          type="submit"
          className="btn border border-dark p-2 btn-success col-6 col-md my-2"
        >
          Add todo
        </button>
      </form>
      <div className="container">
        <div className="container d-flex justify-content-between align-items-center">
          <h1 className="text-center mb-4"> My Todos</h1>
          <select
            name="filter"
            id="filter"
            onChange={(e) => handleFilter(e.target.value)}
          >
            <option value="All" selected="true">
              All
            </option>
            <option value="Done">Done</option>
            <option value="Not Done">Not Done</option>
          </select>
        </div>
        <div className="container w-100 mb-5">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
            {filteredTodolist.map((todo) => (
              <Todocard
                todo={todo}
                handleSelect={handleSelect}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                handleSave={handleSave}
                key={todo.id}
              />
            ))}
            {console.log(todolist)}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
