import { useState } from "react";
import { useTodoStore } from "../Store";

function AddTodoForm({ setFormVisible }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState(1);
  const [date, setDate] = useState("");
  const [titleError, setTitleError] = useState("");
  const [dateError, setDateError] = useState("");

  const addTodo = useTodoStore((state) => state.addTodo);

  const handleAddTodo = () => {
    setTitleError("");
    setDateError("");

    if (!title) {
      setTitleError("Please enter a Title!");
      return;
    }

    if (!date) {
      setDateError("Please enter the due date!");
      return;
    }

    const newTodo = {
      id: Date.now(),
      title,
      content,
      priority,
      date: new Date(date).getTime(),
      completed: false,
    };

    addTodo(newTodo);
    setFormVisible(false);
  };

  return (
    <div className="absolute border-2 flex flex-col border-red-500 bg-gray-500 h-[525px] w-[400px] gap-4 left-[37%] p-7 rounded-lg">
      <div className="flex flex-col gap-[25px] items-center w-full relative">
        <div className="title w-full text-center">
          <input
            className="w-full rounded-md px-1"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          {titleError && (
            <p className="absolute text-center w-full text-red-700 m-0 p-0">
              {titleError}
            </p>
          )}
        </div>
        <div className="content w-full">
          <textarea
            className="w-full px-1 rounded-md overflow-y-auto h-[200px]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={30}
            cols={10}
            placeholder="Content"
          />
        </div>
        <div className="flex gap-2">
          <label>priority: </label>
          <select
          className="rounded-md w-[30px]"
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div className="date flex flex-row w-full gap-2">
          <label>Due Date: </label>
          <input
            className="w-3/4 h-8 rounded-md p-1"
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          {dateError && (
            <p className="absolute text-center w-full text-red-700 m-0 p-0">
              add date
            </p>
          )}
        </div>
        <div className="buttons gap-2 flex flex-col items-center self-center w-[200px]">
          <button
            onClick={handleAddTodo}
            className="w-full bg-orange-400"
            type="submit"
          >
            Add Todo
          </button>
          <button
            className="w-full border-2 border-orange-400"
            onClick={() => {
              setFormVisible(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTodoForm;
