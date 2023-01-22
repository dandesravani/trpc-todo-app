import { CreateTodo, Todo, TodoList, UpdateTodo } from './specs';

export let todos: TodoList = [
  {
    id: 1,
    title: 'zkdfj',
    done: true,
  },
  {
    id: 2,
    title: 'ajslk',
    done: false,
  },
  { id: 3, title: 'aksdpa', done: true },
];

let nextId = 1000;
export const createTodo = (todo: CreateTodo): Todo => {
  const newTodo = { id: nextId++, ...todo };
  const updatedTodos = [...todos, newTodo];
  todos = updatedTodos;
  return newTodo;
};

export const updateTodo = (todo: UpdateTodo): Todo => {
  const found = todos.findIndex((t) => t.id === todo.id);
  if (found == -1) {
    throw new Error('todo not found');
  }
  const old = todos[found];

  return { ...old, ...todo };
};

export const listTodo = (): TodoList => todos;

type ID = Todo['id'];

export const deleteTodo = (id: ID): void => {
  todos = todos.filter((t) => t.id !== id);
};
