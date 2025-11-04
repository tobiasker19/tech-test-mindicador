import { useAuth } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

// Componente que recibe 'children' como prop
const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuth(); // Revisa si hay un token válido
    const location = useLocation();

    // Si no está autenticado, redirigir a la página de login
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Si está autenticado, renderizar los hijos
    return <>{children}</>;
};

export default ProtectedRoutes;