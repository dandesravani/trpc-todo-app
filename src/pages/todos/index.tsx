import { CreateTodo, Todo } from 'prisma/_sqlite/specs';
import React from 'react';
import { CreateTodoForm } from '~/components/AddTodoForm';
import { FormTodo } from '~/components/EditTodoForm';
import { TodoList } from '~/components/TodoList';
import { TodoModal } from '~/components/TodoModal';
import { trpc } from '~/utils/trpc';

const TodoPage = () => {
  const [editTodo, set] = React.useState<FormTodo>({ title: '', done: false });
  const utils = trpc.useContext();
  const todos = trpc.todo.todos.useQuery();
  const [isEdit, setEdit] = React.useState(false);

  console.log(isEdit);

  if (!todos.data) return <div>Loading...</div>;

  const addMutation = trpc.todo.create.useMutation({
    async onSuccess() {
      await utils.todo.todos.invalidate();
    },
  });

  const deleteMutation = trpc.todo.delete.useMutation({
    async onSuccess() {
      await utils.todo.todos.invalidate();
    },
  });

  const editMutation = trpc.todo.update.useMutation({
    async onSuccess() {
      await utils.todo.todos.invalidate();
    },
  });

  const handleCreate = (todo: CreateTodo) => {
    addMutation.mutate({ ...editTodo, ...todo });
  };

  const handleDelete = (id: Pick<Todo, 'id'>) => {
    deleteMutation.mutate(id);
  };

  const handleEdit = (todo: Todo) => {
    console.log(isEdit);
    console.log('helo');
    setEdit(!isEdit);
    set(todo);
    editMutation.mutate(todo);
  };

  return (
    <>
      <TodoList
        todos={todos.data?.todos}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      <TodoModal
        disabled={addMutation.isLoading}
        onSubmit={handleCreate}
        error={addMutation.error?.message}
      />
    </>
  );
};

export default TodoPage;
