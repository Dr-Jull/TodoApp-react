// src/App.js
import React, { useState, useEffect } from "react";
import { useTodoStore } from "./Store";
import AddTodoForm from "./components/AddTodoForm";
import TodoSortingControls from "./components/TodoSortingControls";
import DoneSortingControls from "./components/DoneSortingControls";
import TodoItem from "./components/TodoItem";

const App = () => {
  const [isFormVisible, setFormVisible] = useState(false);

  const { todos, done } = useTodoStore();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("done", JSON.stringify(done));
  }, [done]);

  const normalizedSearchTerm = searchTerm.toLowerCase().trim();

  const filteredTodos = [...todos].filter(
    (todo: any) =>
      todo.title.toLowerCase().includes(normalizedSearchTerm) ||
      todo.content.toLowerCase().includes(normalizedSearchTerm)
  );

  const filteredDone = [...done].filter(
    (todo: any) =>
      todo.title.toLowerCase().includes(normalizedSearchTerm) ||
      todo.content.toLowerCase().includes(normalizedSearchTerm)
  );

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  return (
    <div className="flex flex-col h-screen w-full gap-5 pt-8 px-[100px]">
      <p className="bg-black flex text-center items-end p-4 text-xl justify-center h-[80px] font-bold rounded-2xl">
        <span className="text-orange-400 text-4xl">tasX</span> - get
        things done
      </p>
      <div className="flex flex-row h-15 gap-3">
        <button
          onClick={toggleFormVisibility}
          className={`border border-black text-black text-2xl w-1/5 bg-orange-500 p-0`}
        >
          +
        </button>
        {isFormVisible && <AddTodoForm setFormVisible={setFormVisible} />}
        <input
          className="border border-black outline-none bg-white w-full h-full text-black p-3 rounded-lg"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
        />
      </div>
      <hr className="border-2 border-black" />
      <span className="flex flex-row w-full h-full overflow-hidden px-5">
        <span className="flex flex-col gap-4 w-1/2 h-full">
          <TodoSortingControls />
          <div className="overflow-hidden overflow-y-auto h-full">
            {filteredTodos.map((todo) => (
              <TodoItem key={todo.id} {...todo} />
            ))}
          </div>
        </span>
        <span className="flex flex-col w-1/2 gap-4 h-full">
          <DoneSortingControls />
          <ul className="overflow-hidden overflow-y-auto h-full">
            {filteredDone.map((done) => (
              <TodoItem key={done.id} {...done} />
            ))}
          </ul>
        </span>
      </span>
    </div>
  );
};

export default App;
