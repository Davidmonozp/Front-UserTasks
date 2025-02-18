import { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import { useNavigate } from 'react-router-dom'; 
import Swal from 'sweetalert2'; 
import "./addTask.css";

const AddTask = () => {
  const [taskName, setTaskName] = useState(''); 
  const [taskDescription, setTaskDescription] = useState(''); 
  const { addTask } = useTasks(); 
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      title: taskName, 
      description: taskDescription, 
    };

    try {
      // Llama a la función del contexto para agregar la tarea
      await addTask(newTask);

      await Swal.fire(
        'Tarea agregada',
        'La tarea ha sido creada correctamente',
        'success'
      );

      navigate('/task-list');
      
      window.location.reload();
      
      // Limpiar los campos del formulario
      setTaskName('');
      setTaskDescription('');
    } catch  {
      // Muestra un error si algo sale mal
      Swal.fire('Error', 'Hubo un problema al agregar la tarea', 'error');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Añadir Nueva Tarea</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
        <div className="form-group">
          <label htmlFor="title">Título</label>
          <input
            id="title"
            type="text"
            className="form-control"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Ingresa el título de la tarea"
            required
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            className="form-control"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Ingresa una descripción para la tarea"
            required
          />
        </div>
        <div className="buttons-container mt-3 d-flex justify-content-between">
          <button type="submit" className="btn-guardar">
            <i className="fas fa-check-circle"></i> Agregar Tarea
          </button>
          <button type="button" className="btn-back" onClick={() => window.history.back()}>
            <i className="fas fa-arrow-left"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
