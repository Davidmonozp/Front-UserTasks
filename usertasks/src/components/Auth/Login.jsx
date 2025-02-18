import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./styles.css"; 

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("El correo no es válido")
        .required("El correo es obligatorio"),
      password: Yup.string().required("La contraseña es obligatoria"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await api.post("/login", values);
        const { token, role, userId } = response.data;

        // Guardar en el localStorage
        localStorage.setItem("authToken", token);
        localStorage.setItem("role", role);
        localStorage.setItem("user_id", userId);

        // Actualizar estado global con la función login
        login(token, role, userId);

        Swal.fire("Éxito", "Inicio de sesión exitoso", "success");

        navigate("/task-list");
      } catch  {
        Swal.fire("Error", "No se pudo iniciar sesión", "error");
      }
    },
  });

  return (
    <section className="register py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-4 shadow-sm rounded-3">
              <h1 className="text-center mb-4">Iniciar Sesión</h1>

              <form onSubmit={formik.handleSubmit}>
                {/* Campo de correo */}
                <div className="mb-4">
                  <label htmlFor="email" className="form-label">
                    Correo
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control form-control-lg"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                  {formik.errors.email && (
                    <div className="text-info">{formik.errors.email}</div>
                  )}
                </div>

                {/* Campo de contraseña */}
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control form-control-lg"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  {formik.errors.password && (
                    <div className="text-info">{formik.errors.password}</div>
                  )}
                </div>

                {/* Botón de envío */}
                <button type="submit" className="btn btn-primary btn-lg w-100">
                  Ingresar
                </button>
              </form>

              {/* Enlace para crear una cuenta */}
              <p className="mt-3 text-center">
                ¿No tienes una cuenta?{" "}
                <a href="/register">Crear cuenta</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
