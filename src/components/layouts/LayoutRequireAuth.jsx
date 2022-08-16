import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../context/UserProvider";

const LayoutRequireAuth = () => {
  //REQUIERE UN USUARIO LOGEADO PARA MOSTRAR LAS RUTAS PROTEGIDAS

  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default LayoutRequireAuth;
