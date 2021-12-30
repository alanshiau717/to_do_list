// let nextTodoId = 0;

// export const addToDo = (content: any) => ({
//   type: "ADD_TODO",
//   payload: {
//     id: ++nextTodoId,
//     content,
//   },
// });

// export const toggleToDo = (id: number) => ({
//   type: "TOGGLE_TODO",
//   payload: { id },
// });

export const setFilter = (filter: string) => ({
  type: "SET_FILTER",
  payload: { filter },
});
