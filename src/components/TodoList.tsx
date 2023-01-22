import { Button, Flex, Table } from '@mantine/core';
import { EditModal } from './EditModal';

interface Todo {
  id: number;
  title: string;
  done: boolean;
}

interface TodoListProps {
  todos: Todo[];
  disabled: boolean;
  error: string;
  onEdit(todo: Todo): void;
  onDelete(id: Pick<Todo, 'id'>): void;
}

export const TodoList = ({
  todos,
  onDelete,
  onEdit,
  disabled,
  error,
}: TodoListProps) => {
  return (
    <Flex
      direction="column"
      justify="center"
      w="600px"
      align="center"
      m="0 auto"
    >
      <div>
        <Table verticalSpacing="xs">
          <thead>
            <tr>
              <th>Title</th>
              <th>completed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((t) => (
              <tr key={t.id}>
                <td>{t.title}</td>
                <td>
                  <input
                    placeholder="checkbox"
                    type="checkbox"
                    checked={t.done}
                  />
                </td>
                <td>
                  <Button.Group>
                    <EditModal
                      disabled={disabled}
                      error={error}
                      onSubmit={onEdit}
                      todo={t}
                    />
                    <Button
                      type="button"
                      variant="default"
                      onClick={() => onDelete({ id: t.id })}
                    >
                      Delete
                    </Button>
                  </Button.Group>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Flex>
  );
};
