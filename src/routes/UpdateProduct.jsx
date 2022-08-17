import { Fragment, useEffect, useState } from "react";
import { Link, useParams, Navigate, useNavigate } from "react-router-dom";
import { modificarProducto } from "../hooks/modificarProducto";
import { useFirestore } from "../hooks/useFirestore";
import { useForm } from "react-hook-form";

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

  // const [updateProduct] = modificarProducto();

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

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   deleteProducto(params.id, params.idProducto, true);
  //   addProducto(params.id, producto, true);

  //   console.log(producto);
  //   updateProducto(initialValue);
  //   navigate(`/comercio/${params.id}`);
  // };

  //CATEGORIAS

  // const [categorias, setCategorias] = useState("");

  // const handleChangeCategoria = (e) => {
  //   setCategorias(e.target.value);
  // };

  // const handleSubmitCategoria = (e) => {
  //   e.preventDefault();
  //   addCategoria(params.id, categorias);
  //   setCategorias("");
  // };

  // const obj = {};

  //React Form ----------------------------------------------------------------------------

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmitProducto = (data) => {
    deleteProducto(params.id, params.idProducto, true);
    addProducto(params.id, data, true);

    console.log(data);
    updateProducto(initialValue);
    navigate(`/comercio/${params.id}`);
    navigate(`/comercio/${params.id}`);
  };

  console.log(params);

  console.log(data);

  let arrayCategoria = [];

  data.map((item) => {
    item.categorias?.map((categorias) => {
      arrayCategoria.push(categorias);
    });
  });

  console.log(data);

  return (
    <div className="text-white">
      <h1 className="p-5 text-center">Productos de {params.id}</h1>

      <div className="flex flex-col w-3/4 mx-auto">
        <Link to={`/agregar-categoria/${params.id}`}>
          Ir a Agregar una Categoria Nueva
        </Link>

        <form
          onSubmit={handleSubmit(onSubmitProducto)}
          className="flex flex-col items-center justify-center gap-5"
        >
          <input
            type="text"
            // name="nombre"
            placeholder={params.nombre}
            className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
            {...register("nombre", {
              required: true,
            })}
            onChange={handleChange}
            // value={producto.nombre}
          />

          {errors.nombre && <p> debe agregar algo</p>}

          <input
            type="text"
            // // name="precio"
            placeholder={params.precio}
            className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
            {...register("precio", {
              required: true,
            })}
            onChange={handleChange}
            // value={producto.precio}
          />

          {errors.precio && <p> debe agregar algo</p>}

          <textarea
            // name="descripcion"
            placeholder={params.descripcion}
            className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
            {...register("descripcion", {
              required: true,
            })}
            onChange={handleChange}
            // value={producto.descripcion}
          />
          {errors.descripcion && <p> debe agregar algo</p>}

          <select
            onChange={handleChange}
            // name="categoria"
            className="w-full px-4 py-2 text-black rounded"
            {...register("categoria", {
              required: true,
            })}
          >
            <option selected disabled value={""}>
              Selecciona una categoria o crea una
            </option>
            {arrayCategoria.map((item) => (
              <option key={item.id}>{item.nombre}</option>
            ))}
            {/* {item.categorias?.map((categoria) => (
                    <option key={categoria.id} value={categoria.nombre}>
                      {categoria.nombre}
                    </option>
                  ))} */}
          </select>

          {errors.categoria && <p>Debe seleccionar una categoria</p>}

          <button
            type="submit"
            className="w-full px-4 py-2 leading-tight text-white bg-purple-500 border-0 border-purple-500 rounded-lg hover:bg-purple-700"
          >
            Agregar
          </button>

          <Link to={`/comercio/${params.id}`}>Volver</Link>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
