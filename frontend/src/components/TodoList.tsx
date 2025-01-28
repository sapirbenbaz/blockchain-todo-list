import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { Task } from "../types/Task";
import Loader from "./Loader";
import { getTasks, postTask, completeTask } from "../services/api";

function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loaderMessage, setLoaderMessage] = useState<string>("Loading");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      alert("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (text: string) => {
    if (!text.trim()) {
      alert("Task description cannot be empty");
      return;
    }

    try {
      setLoading(true);
      setLoaderMessage("Pending transaction");
      await postTask(text);
      await fetchTasks();
      setText("");
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  const toggleCompleted = async (id: number) => {
    try {
      setLoading(true);
      setLoaderMessage("Pending transaction");
      await completeTask(id);
      setTasks(tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ));
    } catch (error) {
      console.error("Error completing task:", error);
      alert("Failed to complete task");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="todo-list">
      {loading && <Loader message={loaderMessage} />}
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={() => addTask(text)}>Add</button>
      {tasks.map((task) => (
        <TodoItem key={task.id} task={task} toggleCompleted={toggleCompleted} />
      ))}
    </div>
  );
}

export default TodoList;