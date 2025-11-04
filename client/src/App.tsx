import { Routes, Route } from 'react-router-dom';

// Import LoginPage from './pages/Login';
import LoginPage from './pages/Login';

// Importar los componentes y páginas necesarias
import ConsultaUFPage from './pages/ConsultaUF';
import ProtectedRoutes from './components/ProtectedRoutes';

function App() {
  return (
    <Routes>
      {/* Ruta pública */}
      <Route path="/login*" element={<LoginPage />} /> 

      {/* Ruta protegida */}
      <Route 
        path="/"
        element={
          <ProtectedRoutes>
            <ConsultaUFPage />
          </ProtectedRoutes>
        }
      /> 
    </Routes>
  );
}

export default App;