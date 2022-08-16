import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useFirestore } from "../hooks/useFirestore";
import { ValidacionDeCategoria } from "../validators/validaciones";

const AddProductos = () => {
  const params = useParams();

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
  ] = useFirestore();

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

  const navigate = useNavigate();

  const [producto, setProducto] = useState(initialValue);

  const handleChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //    addProducto(params.id, producto);
  //   console.log(producto);
  //   setProducto(initialValue);

  //   setTimeout(() => {
  //     location.reload()
  //   }, 1500);

  // };

  //React Form ----------------------------------------------------------------------------

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmitProducto = (data) => {
    console.log(data);
    console.log(producto);
    addProducto(params.id, data);
    navigate(`/comercio/${params.id}`);
  };

  console.log(data);

  let arrayCategoria = [];

  data.map((item) => {
    item.categorias?.map((categorias) => {
      arrayCategoria.push(categorias);
    });
  });

  console.log(arrayCategoria);

  return (
    <>
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
              placeholder="Nombre"
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
              placeholder="Precio"
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
              placeholder="Descripcion"
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
    </>
  );
};

export default AddProductos;

{
  /* <>
      <div className="text-white">
        <h1 className="p-5 text-center">Productos de {params.id}</h1>

        <div className="flex flex-col w-3/4 mx-auto">
          <form onSubmit={handleSubmit(onSubmitCategoria)} 
          className="flex flex-col items-center justify-center gap-5 mb-16">
            <input
              type="text"
              placeholder="nombre"
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
              placeholder="Nombre"
              className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
              onChange={handleChange}
              value={producto.nombre}
            />
            <input
              type="text"
              name="precio"
              placeholder="Precio"
              className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
              onChange={handleChange}
              value={producto.precio}
            />
            <textarea
              name="descripcion"
              placeholder="Descripcion"
              className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
              onChange={handleChange}
              value={producto.descripcion}
            />

            <select
              onChange={handleChange}
              name="categoria"
              className="w-full px-4 py-2 text-black rounded"
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
              Agregar
            </button>

            <Link to={`/comercio/${params.id}`}>Volver</Link>
          </form>
        </div>
      </div>
    </> */
}
