import { useState } from 'react';
import api from '../api';
import TaskDetails from './TaskDetails';

export default function TaskList({ tasks, fetchTasks }) {
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const handleDelete = async () => {
    await api.delete(`/tasks/${confirmDeleteId}`);
    fetchTasks();
    setConfirmDeleteId(null);
  };

  return (
    <div className="mt-8 grid grid-cols-1 gap-6">
      {tasks.length === 0 && (
        <div className="text-center text-gray-500 text-lg">
          No tasks available. Start by adding one!
        </div>
      )}

      {tasks.map((task) => (
        <div
          key={task._id}
          className="bg-gradient-to-br from-purple-200 to-pink-100 border border-purple-300 rounded-xl p-6 shadow-md transition transform hover:scale-[1.01]"
        >
          <h2 className="text-xl font-bold text-purple-800 mb-2">{task.title}</h2>
          <p className="text-gray-700 mb-2">{task.description || 'No description'}</p>
          <div className="text-sm text-gray-600 flex flex-col gap-1 mb-4">
            <span>Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</span>
            <span className="capitalize">
              Priority:{' '}
              <span
                className={`font-semibold ${
                  task.priority === 'High'
                    ? 'text-red-600'
                    : task.priority === 'Medium'
                    ? 'text-yellow-600'
                    : 'text-green-600'
                }`}
              >
                {task.priority}
              </span>
            </span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setSelectedTaskId(task._id)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition"
            >
              ✏️ Edit
            </button>
            <button
              onClick={() => setConfirmDeleteId(task._id)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      ))}

      {/* Edit Task Modal */}
      {selectedTaskId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md">
            <TaskDetails
              taskId={selectedTaskId}
              closeModal={() => setSelectedTaskId(null)}
              fetchTasks={fetchTasks}
            />
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm text-center">
            <h2 className="text-lg font-semibold mb-4 text-red-600">Delete this task?</h2>
            <p className="text-gray-600 mb-6">This action cannot be undone.</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
