import { useState } from 'react';
import { useTasks } from '../../context/TaskContext';

const AddTask = () => {
  const [taskName, setTaskName] = useState(''); // Estado para el nombre de la tarea
  const [taskDescription, setTaskDescription] = useState(''); // Estado para la descripción de la tarea
  const { addTask } = useTasks(); // Usamos la función de agregar tarea del contexto

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = { 
      title: taskName,  // Cambié el nombre del campo a 'title'
      description: taskDescription // Agregué el campo de descripción
    };
    await addTask(newTask); // Llama a la función del contexto para agregar la tarea
    setTaskName('');
    setTaskDescription(''); // Limpiar el campo de descripción después de agregar la tarea
  };

  return (
    <div>
      <h1>Add New Task</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Task title"  // Cambié el placeholder a 'Task title'
          />
        </div>
        <div>
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Task description" // Placeholder para la descripción
          />
        </div>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default AddTask;
