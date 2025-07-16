import { useState } from 'react';
import api from '../api';

export default function TaskForm({ fetchTasks }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Low',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/tasks', form);
    setForm({ title: '', description: '', dueDate: '', priority: 'Low' });
    fetchTasks();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
        className="block mb-2 border p-2 w-full"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="block mb-2 border p-2 w-full"
      />
      <input
        type="date"
        name="dueDate"
        value={form.dueDate}
        onChange={handleChange}
        className="block mb-2 border p-2 w-full"
      />
      <select
        name="priority"
        value={form.priority}
        onChange={handleChange}
        className="block mb-2 border p-2 w-full"
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Add Task
      </button>
    </form>
  );
}
