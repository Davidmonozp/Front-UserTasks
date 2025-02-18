import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useTasks } from "../../context/TaskContext";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./taskList.css";

const TaskList = () => {
  const { tasks, loading, deleteTask } = useTasks();
  const { userId, role, logout } = useAuth();
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  const handleDelete = (taskId) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminarla!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTask(taskId);
        setFilteredTasks(filteredTasks.filter((task) => task.id !== taskId));
        Swal.fire("Eliminada!", "La tarea ha sido eliminada.", "success");
      }
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="task-list-title">Lista de Tareas </h2>
      <button className="logout-button" onClick={logout}>
        <i className="fas fa-sign-out-alt"></i> Cerrar sesión
      </button>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Título</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => {
              const canEdit =
                role === "admin" ||
                (role === "user" && task.user_id === userId);
              const canDelete =
                role === "admin" ||
                (role === "user" && task.user_id === userId);

              return (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>
                    {canEdit && (
                      <Link
                        to={`/edit-task/${task.id}`}
                        className="btn btn-sm me-2"
                      >
                        <i className="fas fa-edit"></i>
                      </Link>
                    )}
                    {canDelete && (
                      <button
                        className="btn btn-sm"
                        onClick={() => handleDelete(task.id)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TaskList;
