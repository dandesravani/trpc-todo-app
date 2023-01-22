import { Todo } from 'prisma/_sqlite/specs';
import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core';
import React from 'react';

export type FormValue<T extends { id: any }> = Omit<T, 'id'> & Pick<T, 'id'>;

export type FormTodo = Pick<Todo, 'title' | 'done'> & Partial<Pick<Todo, 'id'>>;

export interface EditTodoFormProps {
  editTodo: FormTodo;
  onSubmit(todo: FormTodo): void;
  disabled: boolean;
  error?: string | null;
}

export const EditTodoForm = ({
  onSubmit,
  editTodo,
  disabled,
  error,
}: EditTodoFormProps) => {
  const [todo, setTodo] = React.useState<FormTodo>({
    ...editTodo,
  });

  // const form = useForm({
  //   initialValues: initial,
  //   validate: {
  //     title: (value) =>
  //       value.length <= 3
  //         ? 'Title should be more than 3 character length'
  //         : null,
  //   },
  // });

  return (
    <>
      <h3>Add a Todo</h3>

      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          //   console.log({ todo });
          onSubmit(todo);
          setTodo({ title: '', done: false });
        }}
      >
        <br />
        <TextInput
          label="Title:"
          type="text"
          placeholder="Enter Todo"
          value={todo.title}
          onChange={(evt) => setTodo({ ...todo, title: evt.target.value })}
        />

        <Checkbox
          label="completed"
          mt="md"
          checked={todo.done}
          onChange={(evt) => setTodo({ ...todo, done: evt.target.checked })}
        />
        <br />
        <Group position="center">
          <Button type="submit" disabled={disabled}>
            Edit
          </Button>
        </Group>
        {error && <p>Something went wrong! {error} </p>}
      </form>
    </>
  );
};
