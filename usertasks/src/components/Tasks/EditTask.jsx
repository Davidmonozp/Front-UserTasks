import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useTasks } from "../../context/TaskContext";
import Swal from "sweetalert2";
import "./editarTask.css";

const EditTask = () => {
  const { id } = useParams();
  const { tasks, updateTask } = useTasks();
  const { userId, role } = useAuth();
  const [task, setTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const foundTask = tasks.find((t) => t.id === parseInt(id));
    if (foundTask) {
      if (foundTask.user_id !== userId && role !== "admin") {
        Swal.fire("Acción no permitida", "No puedes editar esta tarea", "error");
        navigate("/task-list");
      } else {
        setTask(foundTask);
      }
    } else {
      Swal.fire("Tarea no encontrada", "No pudimos encontrar la tarea", "error");
      navigate("/task-list");
    }
  }, [id, tasks, userId, role, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task) return;

    try {
      await updateTask(task.id, task);
      await Swal.fire("Tarea actualizada", "La tarea ha sido actualizada correctamente", "success");
      navigate("/task-list", { replace: true });
      window.location.reload();
    } catch {
      Swal.fire("Error", "Hubo un problema al actualizar la tarea", "error");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Editar Tarea</h2>
      {task ? (
        <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
          <div className="form-group">
            <label htmlFor="title">Título</label>
            <input
              id="title"
              type="text"
              className="form-control"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              className="form-control"
              value={task.description}
              onChange={(e) => setTask({ ...task, description: e.target.value })}
              required
            />
          </div>
          <div className="buttons-container">
            <button type="submit" className="btn-guardar">Guardar cambios</button>
            <button type="button" className="btn-back" onClick={() => window.history.back()}>
              <i className="fas fa-arrow-left"></i>
            </button>
          </div>
        </form>
      ) : (
        <div className="alert alert-info">Cargando tarea...</div>
      )}
    </div>
  );
};

export default EditTask;
