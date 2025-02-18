import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import PropTypes from "prop-types";


const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { authToken } = useAuth(); // Obtener el authToken desde el AuthContext
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch de tareas
  useEffect(() => {
    const fetchTasks = async () => {
      if (authToken) {
        try {
          setLoading(true);
          const response = await axios.get("http://127.0.0.1:8000/api/tasks", {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          setTasks(response.data);
        } catch (error) {
          console.error("Error al obtener las tareas:", error);
          setError("No se pudo cargar las tareas");
        } finally {
          setLoading(false);
        }
      } else {
        setError("No estás autenticado");
        setLoading(false);
      }
    };

    fetchTasks();
  }, [authToken]);

  // Función para agregar una tarea
  const addTask = async (newTask) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/tasks", newTask, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log(response.data);
      setTasks((prevTasks) => [...prevTasks, response.data]);
    } catch (error) {
      console.error("Error al agregar la tarea:", error);
      setError("No se pudo agregar la tarea");
    }
  };

  // Función para eliminar una tarea
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
      setError("No se pudo eliminar la tarea");
    }
  };

  // Función para actualizar una tarea
  const updateTask = async (taskId, updatedTask) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/tasks/${taskId}`,
        updatedTask,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log(response.data);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, ...response.data } : task
        )
      );

      return response;
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
      setError("No se pudo actualizar la tarea");
      throw error;
    }
  };
    

  
  const viewTask = async (taskId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener la tarea:", error);
      setError("No se pudo obtener la tarea");
    }
  };

  return (
    <TaskContext.Provider
      value={{ tasks, loading, error, addTask, deleteTask, updateTask, viewTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


export const useTasks = () => useContext(TaskContext);
