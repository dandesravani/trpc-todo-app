/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */
import { PrismaClient } from '@prisma/client';
import { TodoList } from './_sqlite/specs';

const prisma = new PrismaClient();

export const todos: TodoList = [
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

async function main() {
  const firstPostId = '5c03994c-fc16-47e0-bd02-d218a370a078';
  await prisma.post.upsert({
    where: {
      id: firstPostId,
    },
    create: {
      id: firstPostId,
      title: 'First Post',
      text: 'This is an example post generated from `prisma/seed.ts`',
    },
    update: {},
  });

  // await prisma.todo.create({
  //   data: {
  //     done: false,
  //     title: 'something',
  //   },
  // });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
