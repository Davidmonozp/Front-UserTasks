import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useTasks } from "../../context/TaskContext";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./taskList.css";

const TaskList = () => {
  const { tasks, loading, deleteTask } = useTasks();
  const { userId, role, logout } = useAuth();
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();

  // Función para navegar a la ruta de creación de tarea
  const handleCreateTask = () => {
    navigate("/add-task");
  };

  // Filtrar las tareas cada vez que cambien las tareas o el texto de búsqueda
  useEffect(() => {
    if (tasks && Array.isArray(tasks)) {
      // Aseguramos que tasks sea un array
      const result = tasks.filter((task) => {
        // Comprobamos que las propiedades title y description estén presentes
        const title = task?.title?.toLowerCase() || "";
        const description = task?.description?.toLowerCase() || "";
        return (
          title.includes(searchText.toLowerCase()) ||
          description.includes(searchText.toLowerCase())
        );
      });
      setFilteredTasks(result);
    }
  }, [tasks, searchText]);

  // Función para manejar la eliminación de tareas
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

  // Función para manejar los cambios en el campo de búsqueda
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div className="container mt-4">
      <h2 className="task-list-title">Lista de Tareas </h2>
      <div className="task-actions">
        <button className="create-task-button" onClick={handleCreateTask}>
          <i className="fas fa-plus"></i> Crear Tarea
        </button>

        {/* Campo de búsqueda */}
        <input
          type="text"
          className="search-task"
          placeholder="Buscar tarea..."
          value={searchText}
          onChange={handleSearchChange}
        />
      </div>
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
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => {
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
              })
            ) : (
              <tr>
                <td colSpan="3">No se encontraron tareas.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TaskList;
