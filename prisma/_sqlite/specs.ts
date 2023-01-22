import { z } from 'zod';

export const Todo = z.object({
  id: z.number(),
  title: z.string().min(3),
  done: z.boolean(),
});

export type Todo = z.infer<typeof Todo>;

export const TodoList = z.array(Todo);
export type TodoList = z.infer<typeof TodoList>;

export const CreateTodo = Todo.omit({ id: true });
export type CreateTodo = z.infer<typeof CreateTodo>;

export const UpdateTodo = Todo.partial();
export type UpdateTodo = z.infer<typeof UpdateTodo>;
