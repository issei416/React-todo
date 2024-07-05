import { useState } from "react";
import "./App.css";
import Todocard from "./Components/Todocard";

function App() {
  const initialTodo = [
    {
      id: 1,
      name: "React Todo",
      description: "Build a dynamic todo manager using React",
      status: true,
      editing: false,
    },
    {
      id: 2,
      name: "Components",
      description: "Add components like todo cards for the project",
      status: true,
      editing: false,
    },
    {
      id: 3,
      name: "Hooks & States",
      description: "use States and Hooks to maintain the data",
      status: true,
      editing: false,
    },
    {
      id: 4,
      name: "API",
      description: "use an API to store todo data and track changes",
      status: false,
      editing: false,
    }
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
      <div className="display-2 text-success bg-dark text-center d-flex align-items-stretch justify-content-center pb-2">
        MY - TODO
      </div>
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
          required
        />
        <input
          type="text"
          placeholder="Todo Description"
          className="me-md-5 rounded p-2 col w-100 my-2"
          name="taskdesc"
          required
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
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
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
