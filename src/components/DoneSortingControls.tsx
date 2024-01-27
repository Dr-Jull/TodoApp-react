import { useTodoStore } from "../Store";

const DoneSortingControls = () => {
  const {sortDoneByPriority,clearAllDone,sortDoneByDate} = useTodoStore();
  // const sortDoneByPriority = useTodoStore((state)=>state.sortDoneByPriority)
  // const sortByDueDate = useTodoStore((state) => state.sortByDueDate)
  return (
    <div className="flex flex-row gap-8 h-[40px] w-full items-center p-5">
      <p className=" text-2xl text-black font-bold">Done items - </p>
      <div onClick={sortDoneByPriority}><img src="src\assets\sort.svg" alt="" /></div>
      <div onClick={sortDoneByDate}><img src="src\assets\clock.png" alt="" /></div>
      <div onClick={clearAllDone}><img src="src\assets\trash.png" alt="" /></div>
    </div>
  );
};

export default DoneSortingControls;
