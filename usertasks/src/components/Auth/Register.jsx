import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const RegisterForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate(); 

  const formik = useFormik({
    initialValues: {
      name: "",
      role: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Debe tener mínimo 3 letras")
        .required("El nombre es requerido"),
      role: Yup.string()
        .oneOf(["user", "admin"], "Role no válido")
        .required("El rol es requerido"),
      email: Yup.string()
        .email("Correo electrónico inválido")
        .required("El correo electrónico es requerido"),
      password: Yup.string()
        .min(5, "La contraseña debe tener al menos 5 caracteres")
        .required("La contraseña es requerida"),
      password_confirmation: Yup.string()
        .oneOf([Yup.ref("password")], "Las contraseñas deben coincidir")
        .required("La confirmación de la contraseña es requerida"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await api.post("/register", values);
        login(response.data.token);
        Swal.fire("Éxito", "Registro exitoso", "success");
        formik.resetForm();
        navigate("/login"); 
      } catch (error) {
        Swal.fire(
          "Error",
          error.response?.data?.message || "Error al registrar",
          "error"
        );
      }
    },
  });

  return (
    <section className="register py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-4 shadow-sm rounded-3">
              <h1 className="text-center mb-4">Crear Cuenta</h1>
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control form-control-lg"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                  {formik.errors.name && formik.touched.name && (
                    <div className="text-info">{formik.errors.name}</div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="role" className="form-label">
                    Rol
                  </label>
                  <select
                    id="role"
                    name="role"
                    className="form-control form-control-lg"
                    onChange={formik.handleChange}
                    value={formik.values.role}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Seleccione un rol</option>
                    <option value="user">Usuario</option>
                    <option value="admin">Administrador</option>
                  </select>
                  {formik.errors.role && formik.touched.role && (
                    <div className="text-info">{formik.errors.role}</div>
                  )}
                </div>

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
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.email && formik.touched.email && (
                    <div className="text-info">{formik.errors.email}</div>
                  )}
                </div>

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
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.password && formik.touched.password && (
                    <div className="text-info">{formik.errors.password}</div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="password_confirmation" className="form-label">
                    Confirmar Contraseña
                  </label>
                  <input
                    type="password"
                    id="password_confirmation"
                    name="password_confirmation"
                    className="form-control form-control-lg"
                    onChange={formik.handleChange}
                    value={formik.values.password_confirmation}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.password_confirmation &&
                    formik.touched.password_confirmation && (
                      <div className="text-info">
                        {formik.errors.password_confirmation}
                      </div>
                    )}
                </div>

                <button type="submit" className="btn btn-primary btn-lg w-100">
                  Registrar
                </button>
              </form>

              <p className="mt-3 text-center">
                ¿Ya tienes una cuenta? <a href="/login">Iniciar sesión</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
