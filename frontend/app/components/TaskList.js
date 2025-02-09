export default function TaskList() {
  const tasks = [
    { id: 1, description: 'Collect waste from Area A', status: 'Pending' },
    { id: 2, description: 'Collect waste from Area B', status: 'Completed' },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Task List</h2>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id}>
            {task.description} - {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
}