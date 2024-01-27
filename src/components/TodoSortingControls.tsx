import { useTodoStore } from "../Store";

const TodoSortingControls = () => {
  const {sortTodoByPriority,  clearAllTodos, sortTodoByDate}= useTodoStore();
  // const sortDoneByPriority = useTodoStore((state)=>state.sortDoneByPriority)
  // const sortByDueDate = useTodoStore((state) => state.sortByDueDate)

  return (
    <div className="flex flex-row gap-8 h-[40px] w-full items-center p-5">
      <p className=" text-2xl text-black font-bold">Todo items - </p>
      <div onClick={sortTodoByPriority}><img src="src\assets\sort.svg" alt="" /></div>
      <div onClick={sortTodoByDate}><img src="src\assets\clock.png" alt="" /></div>
      <div onClick={clearAllTodos}><img src="src\assets\trash.png" alt="" /></div>
      {/* You can also use a dropdown or other UI elements */}
    </div>
  );
};

export default TodoSortingControls;
