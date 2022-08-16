import { Fragment, useEffect, useState } from "react";
import { Link, useParams, Navigate, useNavigate } from "react-router-dom";
import { modificarProducto } from "../hooks/modificarProducto";
import { useFirestore } from "../hooks/useFirestore";

const UpdateProduct = () => {
  const params = useParams();

  console.log(params);

  const [
    data,
    error,
    loading,
    getData,
    addData,
    searchData,
    addCategoria,
    addProducto,
    getProductos,
    deleteProducto,
    // deleteCategoria,
  ] = useFirestore();

  const [updateProduct] = modificarProducto();

  const navigate = useNavigate();

  useEffect(() => {
    getProductos(params.id);
    console.log("Datos obteniendo");
  }, []);

  const initialValue = {
    nombre: "",
    precio: "",
    descripcion: "",
    categoria: "",
  };

  const [producto, updateProducto] = useState(initialValue);

  const handleChange = (e) => {
    updateProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    deleteProducto(params.id, params.idProducto, true);
    addProducto(params.id, producto, true);

    console.log(producto);
    updateProducto(initialValue);
    navigate(`/comercio/${params.id}`);
  };

  //CATEGORIAS

  const [categorias, setCategorias] = useState("");

  const handleChangeCategoria = (e) => {
    setCategorias(e.target.value);
  };

  const handleSubmitCategoria = (e) => {
    e.preventDefault();
    addCategoria(params.id, categorias);
    setCategorias("");
  };

  const obj = {};

  console.log(data);

  return (
    <div className="text-white">
      <h1 className="p-5 text-center">Producto ID: {params.idProducto}</h1>

      <div className="flex flex-col w-3/4 mx-auto">
        <form className="flex flex-col items-center justify-center gap-5 mb-16">
          <input
            type="text"
            placeholder={params.categoria}
            name="categorias"
            className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
            onChange={handleChangeCategoria}
            value={categorias}
          />

          <button
            className="w-full px-4 py-2 leading-tight text-white bg-purple-500 border-0 border-purple-500 rounded-lg hover:bg-purple-700"
            type="button"
            onClick={handleSubmitCategoria}
          >
            Agregar Categoria
          </button>
        </form>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center gap-5"
        >
          <input
            type="text"
            name="nombre"
            placeholder={params.nombre}
            className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
            onChange={handleChange}
            value={producto.nombre}
          />
          <input
            type="text"
            name="precio"
            placeholder={params.precio}
            className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
            onChange={handleChange}
            value={producto.precio}
          />
          <textarea
            name="descripcion"
            placeholder={params.descripcion}
            className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
            onChange={handleChange}
            value={producto.descripcion}
          />

          <select
            onChange={handleChange}
            name="categoria"
            className="w-full px-4 py-2 text-black rounded"
            placeholder={params.categoria}
          >
            {data.map((item, index) => (
              <Fragment key={index}>
                <option selected disabled value={""}>
                  Selecciona una categoria o crea una
                </option>
                {item.categorias?.map((categoria) => (
                  <option key={categoria.id} value={categoria.nombre}>
                    {categoria.nombre}
                  </option>
                ))}
              </Fragment>
            ))}
          </select>

          <button
            type="submit"
            className="w-full px-4 py-2 leading-tight text-white bg-purple-500 border-0 border-purple-500 rounded-lg hover:bg-purple-700"
          >
            Modificar
          </button>

          <button onClick={() => navigate(`/comercio/${params.id}`)}>
            Volver
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
