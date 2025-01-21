import { Task } from '../types/Task';

interface TodoItemProps {
  task: Task;
  toggleCompleted: (id: number) => void;
}

function TodoItem({ task, toggleCompleted }: TodoItemProps) {
  function handleChange() {
    toggleCompleted(task.id);
  }

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleChange}
      />
      <p>{task.text}</p>
    </div>
  );
}

export default TodoItem;
