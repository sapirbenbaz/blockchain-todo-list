import axios from "axios";
import { Task } from "../types/Task";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getTasks() {
  const response = await axios.get(`${API_BASE_URL}/tasks`);
  return response.data.map((task: Task) => ({
    id: Number(task.id),
    description: task.description,
    completed: task.completed,
  }));
}

export async function postTask(text: string) {
  return await axios.post(`${API_BASE_URL}/tasks`, {
    description: text,
  });
}

export async function completeTask(id: number) {
  return await axios.patch(`${API_BASE_URL}/tasks/${id}/complete`);
}