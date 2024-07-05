import React, { useRef } from "react";

const Todocard = ({
  todo,
  handleSelect,
  handleDelete,
  handleEdit,
  handleSave,
}) => {
  const nameRef = useRef();
  const descRef = useRef();

  return (
    <div className="col">
      <div className="todo card m-2 h-100">
        {todo.editing ? (
          <input name="taskname" ref={nameRef} required/>
        ) : (
          <h3 className="card-title text-center">{todo.name}</h3>
        )}
        <div className="card-body">
          <p>
            Description :{" "}
            {todo.editing ? (
              <input name="taskdesc" required ref={descRef} />
            ) : (
              <i>{todo.description}</i>
            )}
          </p>

          <div className="d-flex justify-content-between align-items-center">
            <div>
              <label htmlFor="status" className="me-2">
                <i>Status</i> :{" "}
              </label>
              <select
                name="status"
                onChange={(e) => {
                  handleSelect(todo.id, e.target.value);
                }}
                className={
                  todo.status
                    ? "bg-success text-white py-1 px-3 text-center"
                    : "bg-danger text-white py-1 px-3 text-center"
                }
              >
                <option
                  value="Done"
                  selected={todo.status}
                  className="bg-white text-black"
                >
                  Done
                </option>
                <option
                  value="Not Done"
                  selected={!todo.status}
                  className="bg-white text-black"
                >
                  Not Done
                </option>
              </select>
            </div>
            <div>
              <div
                className="btn editBtn"
                onClick={() => {
                  if (!todo.editing) {
                    handleEdit(todo.id);
                  } else {
                    handleSave(
                      todo.id,
                      nameRef.current.value,
                      descRef.current.value
                    );
                  }
                }}
              >
                <img
                  src={todo.editing ? "./assets/save.png" : "./assets/edit.png"}
                  alt="edit"
                  className="img-fluid h-100"
                />
              </div>
              <div
                className="btn trashBtn"
                onClick={() => handleDelete(todo.id)}
              >
                <img
                  src="./assets/trash.png"
                  alt="trash icon"
                  className="img-fluid h-100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todocard;
