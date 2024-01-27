import { useState } from "react";
import { useTodoStore } from "../Store";
import EditTodoForm from "./EditTodoForm";
import "../todoItems.css";
const TodoItem = ({ id, priority, title, date, content}) => {
  const { toggleTodoStatus, deleteTodo, moveDoneToTodo } = useTodoStore();
  const [isEditing, setEditing] = useState(false);

  const [isChecked, setIsChecked] = useState(false);

  const timeDifference = date - Date.now();

  const minutes = (Math.floor(timeDifference / (1000 * 60)) % 60) + 1;
  const hours = (Math.floor(timeDifference / (1000 * 60 * 60)) % 24) + 1;
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) + 1;

  let timeLeft;
  if (days > 1) {
    timeLeft = `${days} days`;
  } else if (hours > 1) {
    timeLeft = `${hours} hrs`;
  } else if (minutes >= 1) {
    timeLeft = `${minutes} min${minutes === 1 ? "" : "s"}`;
  } else if (days === 0) {
    timeLeft = "due";
  } else if (days < 0) {
    timeLeft = `${Math.abs(days)} day${days === -1 ? "" : "s"} ago`;
  }

  const doneStyles = {
    fontWeight: isChecked ? "" : "bold",
    textDecoration: isChecked ? "line-through" : "none",
    WebkitTextFillColor: isChecked ? "black" : "",
  };

  const handleCheckboxChange = () => {
    setIsChecked((prevChecked) => !prevChecked);
    if (isChecked) {
      // Ifa checkbox is unchecked, move to todo
      moveDoneToTodo(id);
    } else {
      // If checkbox is checked, toggle todo status
      toggleTodoStatus(id);
    }
  };

  const toggleEdit = () => {
    setEditing(!isEditing);
  };

  const handleDelete = () => {
    deleteTodo(id);
  };
  return (
    <div
      className={`${days === 1 && !isChecked ? "flashy-animation" : "" }`}
      style={{
        border: "1px white solid",
        width: "600px",
        height: "110px",
        display: "flex",
        flexDirection: "row",
        borderRadius: "10px",
        marginBottom: "10px",
        backgroundColor: "#1d1d1d",
        fontWeight: "bold",
        overflow: "hidden",
      }}
    >
      <div
        className={`flex p-[5px] justify-between w-full `}
      >
        <div className="w-full mx-[10px] flex flex-col gap-2">
          <span className="flex flex-row w-full justify-between">
            <span style={doneStyles} className="flex flex-row">
              <span>({priority})</span>
              <h3 className="mx-[10px]">{title}</h3>
            </span>
            <span
              className={
                isChecked || days <= 0 ? "text-gray-400" : "text-orange-400"
              }
            >
              {timeLeft}
            </span>
          </span>
          <p
            style={doneStyles}
            className={`${
              days === 1 ? "text-orange-700" : "text-white"
            } font-medium`}
          >
            {content}
          </p>
        </div>
        <span className="flex flex-col justify-between p-[5px]">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          {!isChecked ? (
            days === 1 ? (
              <img
                onClick={toggleEdit}
                className="w-[20px]"
                src="src\assets\pencil2.png"
                alt=""
              />
            ) : (
              <img
                className="w-[20px]"
                onClick={toggleEdit}
                src="src\assets\white-pencil.png"
                alt=""
              />
            )
          ) : (
            <img className="h-[20px]" src="src\assets\no-edit.png" alt="" />
          )}
          {isEditing && (
            <EditTodoForm
              id={id}
              currentTitle={title}
              currentContent={content}
              currentPriority={priority}
              currentDueDate={new Date(date).toISOString().split("T")[0]}
              closeForm={toggleEdit}
            />
          )}
          <img
            onClick={handleDelete}
            className="h-[20px]"
            src={`src/assets/${
              isChecked || days !== 1 ? "white-trash" : "trash"
            }.png`}
            alt=""
          />
        </span>
      </div>
    </div>
  );
};

export default TodoItem;
