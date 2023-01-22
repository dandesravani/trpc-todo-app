import { Button, Group, Modal } from '@mantine/core';
import { useState } from 'react';
import { CreateTodoForm, FormTodo } from './AddTodoForm';

export interface TodoModalProps {
  onSubmit(todo: FormTodo): void;
  disabled: boolean;
  error?: string | null;
}
export const TodoModal = ({ disabled, onSubmit, error }: TodoModalProps) => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        title="Get things done!"
      >
        <CreateTodoForm
          disabled={disabled}
          onSubmit={(v) => {
            onSubmit(v);
            setOpened(false);
          }}
          error={error}
        />
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>Add Todo</Button>
      </Group>
    </>
  );
};
