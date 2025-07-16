import { useState, useEffect } from 'react';
import api from '../api';

export default function TaskDetails({ taskId, closeModal, fetchTasks }) {
  const [task, setTask] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Low',
  });

  // Fetch task by ID
  useEffect(() => {
    const fetchTask = async () => {
      const res = await api.get(`/tasks/${taskId}`);
      setTask(res.data);
      setForm({
        title: res.data.title,
        description: res.data.description,
        dueDate: res.data.dueDate?.split('T')[0] || '',
        priority: res.data.priority,
      });
    };
    fetchTask();
  }, [taskId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await api.put(`/tasks/${taskId}`, form);
    fetchTasks(); // Refresh list
    closeModal(); // Close detail view
  };

  if (!task) return <p>Loading task...</p>;

  return (
    <div className="p-4 bg-white rounded shadow-lg max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Task</h2>
      <form onSubmit={handleUpdate}>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 border mb-2"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border mb-2"
        />
        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          className="w-full p-2 border mb-2"
        />
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="w-full p-2 border mb-2"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={closeModal}
            className="bg-gray-400 text-white px-4 py-2"
          >
            Cancel
          </button>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
