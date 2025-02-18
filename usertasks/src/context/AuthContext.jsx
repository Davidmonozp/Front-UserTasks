import PropTypes from "prop-types";
import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';  

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);
  const [role, setRole] = useState(localStorage.getItem('role') || null);
  const [userId, setUserId] = useState(localStorage.getItem('user_id') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (authToken) {
        try {
          // Realizamos la solicitud GET a la ruta 'me' para obtener la información del usuario autenticado
          const response = await axios.get('http://127.0.0.1:8000/api/me', {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });

          
          const { user_id, role } = response.data;

          setUserId(user_id); 
          setRole(role);        
          localStorage.setItem('user_id', user_id);  
          localStorage.setItem('role', role);     

        } catch (error) {
          console.error("Error al obtener los datos del usuario:", error);
        }
      }
      setLoading(false);
    };

    // Si el token de autenticación está presente, hacemos la solicitud para obtener los datos del usuario
    if (authToken) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [authToken]);

  // Función de login que actualiza el estado y el localStorage con la información del usuario.
  const login = (token, userRole, user_id) => {
    setAuthToken(token);
    setRole(userRole);
    setUserId(user_id);

    localStorage.setItem('authToken', token);
    localStorage.setItem('role', userRole);
    localStorage.setItem('user_id', user_id);  
  };

  const logout = () => {
    setAuthToken(null);
    setRole(null);
    setUserId(null);

    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    localStorage.removeItem('user_id');

  };

  const contextValue = {
    authToken,
    role,
    user_id: userId,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
