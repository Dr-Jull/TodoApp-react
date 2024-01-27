import { create } from "zustand";

type Todo = {
  id: number;
  title: string;
  date: number;
  priority: number;
  content: string;
  completed: boolean;
};

interface TodoStore {
//   fullDone: any;
  // fullTodos: any;
  todos: Todo[] | [];
  done: Todo[] | [];
  sortOrder: string;
  addTodo: (todo: Todo) => void;
  toggleTodoStatus: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, updatedTodo: Partial<Todo>) => void;
  sortTodoByPriority: () => void;
  sortDoneByPriority: () => void;
  // searchTodos: (searchTerm: string) => void;
  sortTodoByDate: () => void;
  sortDoneByDate: () => void;
  moveDoneToTodo: (id: number) => void;
  clearAllTodos: () => void;
  clearAllDone: () => void;
}

export const useTodoStore = create<TodoStore>((set) => {
  // const initialTodos: Todo[] = JSON.parse(
  //   localStorage.getItem("todos") ?? "[]"
  // );
  // const initialDone: Todo[] = JSON.parse(localStorage.getItem("done") ?? "[]");

  return {
    todos: JSON.parse(localStorage.getItem("todos") || "[]") || [],
    done: JSON.parse(localStorage.getItem("done")||"[]") || [],
    // fullTodos: [],
    // fullDone: [],
    sortOrder: "asc",

    addTodo: (todo) =>
      set((state) => {
        const updatedTodos = [...state.todos, todo];
        // localStorage.setItem("todos", JSON.stringify(updatedTodos));
        return { todos: updatedTodos, done: state.done };
      }),

    toggleTodoStatus: (id) =>
      set((state) => {
        const updatedTodos = state.todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );

        const movedTodo = state.todos.find((todo) => todo.id === id);

        if (movedTodo ) {
          return {
            todos: updatedTodos.filter((todo) => todo.id !== id),
            done: [...state.done, movedTodo],
          };
        }

        const updatedDone = state.done.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );

        return { todos: updatedTodos, done: updatedDone };
      }),

    deleteTodo: (id) =>
      set((state) => {
        const updatedTodos = state.todos.filter((todo) => todo.id !== id);
        const updatedDone = state.done.filter((todo) => todo.id !== id);

        return { todos: updatedTodos, done: updatedDone };
      }),

    editTodo: (id, updatedTodo) =>
      set((state) => {
        const updatedTodos = state.todos.map((todo) =>
          todo.id === id ? { ...todo, ...updatedTodo } : todo
        );

        const updatedDone = state.done.map((todo) =>
          todo.id === id ? { ...todo, ...updatedTodo } : todo
        );

        return { todos: updatedTodos, done: updatedDone };
      }),
    sortTodoByPriority: () =>
      set((state) => {
        const newSortOrder = state.sortOrder === "asc" ? "desc" : "asc";
        const sortedTodos = [...state.todos].sort((a, b) =>
          newSortOrder === "asc"
            ? a.priority - b.priority
            : b.priority - a.priority
        );

        return {
          sortOrder: newSortOrder,
          todos: sortedTodos,
          done: state.done,
        };
      }),
    sortDoneByPriority: () =>
      set((state) => {
        const newSortOrder = state.sortOrder === "asc" ? "desc" : "asc";
        const sortedDone = [...state.done].sort((a, b) =>
          newSortOrder === "asc"
            ? a.priority - b.priority
            : b.priority - a.priority
        );

        return {
          sortOrder: newSortOrder,
          todos: state.todos,
          done: sortedDone,
        };
      }),

    // searchTodos: (searchTerm: string) =>
    //   set((state) => {
    //     const normalizedSearchTerm = searchTerm.toLowerCase().trim();

    //     if (normalizedSearchTerm === "") {
    //       return { todos: state.fullTodos, done: state.fullDone };
    //     }

    //     const filteredTodos = [...todos].filter(
    //       (todo: any) =>
    //         todo.title.toLowerCase().includes(normalizedSearchTerm) ||
    //         todo.content.toLowerCase().includes(normalizedSearchTerm)
    //     );

    //     const filteredDone = state.fullDone.filter(
    //       (todo: any) =>
    //         todo.title.toLowerCase().includes(normalizedSearchTerm) ||
    //         todo.content.toLowerCase().includes(normalizedSearchTerm)
    //     );

    //     return { todos: filteredTodos, done: filteredDone };
    //   }),

    sortTodoByDate: () =>
      set((state) => {
        const newSortOrder = state.sortOrder === "asc" ? "desc" : "asc";
        const sortedTodos = [...state.todos].sort((a, b) =>
          newSortOrder === "asc" ? a.date - b.date : b.date - a.date
        );

        return {
          sortOrder: newSortOrder,
          todos: sortedTodos,
          done: state.done,
        };
      }),

    sortDoneByDate: () =>
      set((state) => {
        const newSortOrder = state.sortOrder === "asc" ? "desc" : "asc";
        const sortedDone = [...state.done].sort((a, b) =>
          newSortOrder === "asc" ? a.date - b.date : b.date - a.date
        );

        return {
          sortOrder: newSortOrder,
          todos: state.todos,
          done: sortedDone,
        };
      }),

    moveDoneToTodo: (id) =>
      set((state) => {
        const movedTodo = state.done.find((todo) => todo.id === id);

        if (movedTodo) {
          return {
            todos: [...state.todos, movedTodo],
            done: state.done.filter((todo) => todo.id !== id),
          };
        }

        return state;
      }),

    clearAllTodos: () =>
      set(() => {
        const updatedTodos = [];
        return { todos: updatedTodos };
      }),

    clearAllDone: () =>
      set(() => {
        const updatedDone = [];
        return { done: updatedDone };
      }),
  };
});
