import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes/Routes";
import { TaskProvider } from "./context/TaskContext";
import { AuthProvider } from "./context/AuthContext";
import './index.css'; 


function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <Router>
          <Routes />
        </Router>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
