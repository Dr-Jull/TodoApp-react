import { useState } from "react";
import { useTodoStore } from "../Store";

const EditTodoForm = ({
  id,
  currentTitle,
  currentContent,
  currentPriority,
  currentDueDate,
  closeForm,
}) => {
  const [title, setTitle] = useState(currentTitle);
  const [content, setContent] = useState(currentContent);
  const [priority, setPriority] = useState(currentPriority);
  const [date, setDate] = useState(currentDueDate);
  const [titleError, setTitleError] = useState(false);
  const [dateError, setDateError] = useState(false);

  const editTodo = useTodoStore((state) => state.editTodo);

  const handleEditTodo = () => {
    if (!title) {
      setTitleError(true);
      return;
    }
    if (!date) {
      setDateError(true);
      return;
    }
    const updatedTodo = {
      title,
      content,
      priority,
      date: new Date(date).getTime(),
    };

    editTodo(id, updatedTodo);
    closeForm();
  };

  return (
    <div className="absolute border-2 top-1/4 flex flex-col border-red-500 bg-gray-500 h-[450px] w-[400px] gap-4 left-[37%] p-7 rounded-lg">
      <div className="flex flex-col gap-[25px] items-center w-full relative">
        <h1 className="text-4xl text-orange-400">Edit Todo</h1>
        <label className="title w-full gap-2 flex flex-row">
          Title:
          <input
            className={`w-full px-1 rounded-md  ${titleError&& "bg-red-500"}`}
            type="text"
            value={title}
            onChange={(e) => {setTitle(e.target.value), setTitleError(false)}}
          />
        </label>
        <label className="w-full flex gap-2">
          Content:
          <input
            className="px-1 w-full rounded-md overflow-y-auto"
            type="text"
            value={content}
            onChange={(e) => {setContent(e.target.value)}}
          />
        </label>
        <label className="flex gap-2">
          Priority:
          <select
          className="w-[30px] rounded-md border-none"
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
        <label className="w-full justify-center flex gap-2">
          Date:
          <input
          className={`rounded-md px-2 w-1/2 ${dateError&& "bg-red-500"}`}
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <div className="buttons gap-2 flex flex-col items-center self-center w-[200px] mt-6">
          <button
            onClick={handleEditTodo}
            className="w-full bg-orange-400"
            type="submit"
          >
            Update
          </button>
          <button
            className="w-full border-2 border-orange-400"
            onClick={()=>{closeForm()}}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTodoForm;
