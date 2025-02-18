import { Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Asegúrate de que `useAuth` esté correctamente importado
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
// import Dashboard from "../components/Dashboard";
import EditTask from "../components/Tasks/EditTask";
import AddTask from "../components/Tasks/AddTask";
import TasksList from "../components/Tasks/TaskList";

const AppRoutes = () => {
  const { authToken } = useAuth(); // Obtenemos el token desde el contexto de autenticación

  return (
    <RouterRoutes>
      {/* Ruta pública para Login */}
      <Route path="/login" element={<Login />} />

      {/* Ruta pública para Register */}
      <Route path="/register" element={<Register />} />

      <Route
        path="/task-list"
        element={authToken ? <TasksList /> : <Navigate to="/login" />}
      />

      <Route
        path="/add-task"
        element={authToken ? <AddTask /> : <Navigate to="/login" />}
      />

      {/* Ruta protegida para EditTask */}
      <Route
        path="/edit-task/:id"
        element={authToken ? <EditTask /> : <Navigate to="/login" />}
      />
      <Route
        path="/view-task/:id"
        element={authToken ? <viewTask /> : <Navigate to="/login" />}
      />

      <Route path="*" element={<Navigate to="/login" />} />
    </RouterRoutes>
  );
};

export default AppRoutes;
