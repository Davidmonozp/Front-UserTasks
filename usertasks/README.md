# CRUD de Usuarios con React y laravel

Este proyecto implementa un CRUD (Crear, Leer, Actualizar y Eliminar) de usuarios utilizando React para el frontend y laravel con MySQL para el backend.

## Prerrequisitos

Antes de comenzar, asegúrate de tener instaladas las siguientes herramientas:

### Backend

- MySQL

### Frontend

- React

## Instalación

### Backend

1.  Clona este repositorio:

    ```bash
    git clone https://github.com/Davidmonozp/Front-UserTasks.git
    cd usertasks
    ```

2.  Instala las dependencias:

    ```bash
    npm install
    ```

3.  Instala Yup:

    ```bash
    npm install yup

4.  Instala SweetAlert2:

    ```bash
    npm install sweetalert2

5.  Instala Formik:

    ```bash
   npm install formik

6.  Instala Axios:

    ```bash
   npm install Axios

7.  Instala Axios:

    ```bash
   npm install bootstrap

  
## Ejecución

### Backend

1.  Inicia el servidor backend:

    ```bash
    php artisan serve
    ```

    El servidor estará disponible en `http://127.0.0.1:8000`.

### Frontend

1.  Inicia el servidor de desarrollo de React:

    ```bash
    npm run dev
    ```

    La aplicación estará disponible en `http://localhost:5173/`.

## Uso

La aplicación permite realizar las siguientes operaciones:

- **Registro:** Puedes registrate como usuario o administrador
- **Login:** Permite ingresar a la App
- **Listar tareas:** Muestra una lista de todas las tareas registradas.
- **Crear tareas:** Permite agregar una nueva tarea.
- **Editar tarea:** Permite modificar los datos de una tarea existente si eres administrador.
- **Eliminar tarea:** Permite eliminar una tarea si eres administrador usuario.
