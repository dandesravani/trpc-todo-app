import { PrismaClient } from '@prisma/client';
import { initTRPC } from '@trpc/server';

import { CreateTodo, Todo, UpdateTodo } from 'prisma/_sqlite/specs';

const prisma = new PrismaClient();

const t = initTRPC.create();

const router = t.router;
const publicProcedure = t.procedure;

export const todoRouter = router({
  todos: publicProcedure.query(async () => {
    const todos = await prisma.todo.findMany({});
    return {
      todos,
    };
  }),
  create: publicProcedure.input(CreateTodo).mutation(async ({ input }) => {
    const newTodo = await prisma.todo.create({
      data: input,
    });
    return newTodo;
  }),
  update: publicProcedure.input(UpdateTodo).mutation(async ({ input }) => {
    const updatedTodo = await prisma.todo.update({
      where: {
        id: input.id,
      },
      data: input,
    });
    return updatedTodo;
  }),
  delete: publicProcedure
    .input(Todo.pick({ id: true }))
    .mutation(async ({ input }) => {
      const deleteTodo = await prisma.todo.delete({
        where: {
          id: input.id,
        },
      });
      return deleteTodo;
    }),
});

export type TodoRouter = typeof todoRouter;
