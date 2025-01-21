import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { Task } from "../types/Task";
import axios from "axios";
import Loader from "./Loader";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loaderMessage, setLoaderMessage] = useState<string>("Loading");

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/tasks`);
      const fetchedTasks = response.data.map((task: any) => ({
        id: Number(task.id),
        text: task.description,
        completed: task.completed,
      }));
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      alert("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }

  async function addTask(text: string) {
    if (!text.trim()) {
      alert("Task description cannot be empty");
      return;
    }

    try {
      setLoading(true);
      setLoaderMessage("Pending transaction");
      await axios.post(`${API_BASE_URL}/tasks`, {
        description: text,
      });

      await fetchTasks();
      setText("");
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task");
    } finally {
      setLoading(false);
    }
  }

  async function toggleCompleted(id: number) {
    try {
      setLoading(true);
      setLoaderMessage("Pending transaction");

      await axios.patch(`${API_BASE_URL}/tasks/${id}/complete`);
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    } catch (error) {
      console.error("Error completing task:", error);
      alert("Failed to complete task");
    } finally {
      setLoading(false);
    }
  }

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
