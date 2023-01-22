import { Button, Group, Modal } from '@mantine/core';
import { useState } from 'react';
import { FormTodo } from './AddTodoForm';
import { EditTodoForm } from './EditTodoForm';

export interface EditModalProps {
  onSubmit(todo: FormTodo): void;
  todo: FormTodo;
  disabled: boolean;
  error?: string | null;
}
export const EditModal = ({
  disabled,
  onSubmit,
  error,
  todo,
}: EditModalProps) => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        title="Get things done!"
      >
        <EditTodoForm
          editTodo={todo}
          disabled={disabled}
          onSubmit={(todo) => {
            onSubmit(todo);
            setOpened(false);
          }}
          error={error}
        />
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>Edit</Button>
      </Group>
    </>
  );
};
