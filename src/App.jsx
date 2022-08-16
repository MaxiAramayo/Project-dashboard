import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import Login from "./routes/Login";
import LayoutRequireAuth from "./components/layouts/LayoutRequireAuth";
import Register from "./routes/Register";
import { useContext } from "react";
import { UserContext } from "./context/UserProvider";
import Profile from "./routes/Profile";
import NotFound from "./routes/NotFound";
import AddComercio from "./routes/AddComercio";
import Comercio from "./routes/Comercio";
import AddProductos from "./routes/AddProductos";
import UpdateProduct from "./routes/UpdateProduct";
import AddCategorias from "./routes/AddCategorias";
import UpdateCategoria from "./routes/updateCategoria";

function App() {
  const { user } = useContext(UserContext);

  if (user === false) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <Routes>
        //RUTAS PROTEGIDAS
        <Route path="/" element={<LayoutRequireAuth />}></Route>
        //RUTAS PUBLICAS
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route index element={<Home />} />
        <Route path="perfil" element={<Profile />} />
        <Route path="agregar-comercio" element={<AddComercio />} />
        <Route path="comercio/:id" element={<Comercio />} />
        <Route path="agregar-producto/:id" element={<AddProductos />} />
        <Route path="agregar-categoria/:id" element={<AddCategorias />} />
        <Route
          path="editar-producto/:id/:idProducto/:nombre/:precio/:descripcion/:categoria"
          element={<UpdateProduct />}
        />
        <Route
          path="editar-categoria/:id/:idCategoria"
          element={<UpdateCategoria />}
        />
        //RUTA 404
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
