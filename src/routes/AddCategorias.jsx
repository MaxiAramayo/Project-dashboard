import { FacebookAuthProvider } from "firebase/auth";
import React from "react";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useFirestore } from "../hooks/useFirestore";

const AddCategorias = () => {
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
    deleteProducto,
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

  function VerificarCategoria(categoria) {
    let Validacion = false;
    data.map((item) =>
      item.categorias?.map((categorias) => {
        if (categorias.nombre === categoria) {
          Validacion = true;
        }
      })
    );
    return Validacion;
  }

  const [ShowCategoria, setShowCategoria] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitCategoria = (data) => {
    console.log("submit");
    if (VerificarCategoria(data.CategoriaAgregar)) {
      console.log("Esta Categoria Ya existe");
      setShowCategoria(true);
      setTimeout(() => {
        setShowCategoria(false);
      }, 2000);
      console.log(ShowCategoria);
    } else {
      console.log("La categoria no existe");
      setShowCategoria(false);
      console.log(data.CategoriaAgregar);
      addCategoria(params.id, data.CategoriaAgregar);
      navigate(`/comercio/${params.id}`);
    }
  };

  const eliminarCategoria = (id, idCategoria, opcion) => {
    deleteProducto(id, idCategoria, opcion);
  };

  let arrayCategoria = [];

  data.map((item) => {
    item.categorias?.map((categorias) => {
      arrayCategoria = [...arrayCategoria, categorias];
    });
  });

  console.log(arrayCategoria);

  return (
    <div className="flex flex-col w-3/4 mx-auto">
      <h1 className="p-5 text-center text-white">Productos de {params.id}</h1>
      <form
        onSubmit={handleSubmit(onSubmitCategoria)}
        className="flex flex-col items-center justify-center gap-5 mb-16"
      >
        <input
          type="text"
          placeholder="nombre"
          {...register("CategoriaAgregar", {
            required: true,
            maxLength: { value: 25 },
          })}
          className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
        />

        {errors.CategoriaAgregar && <p> debe agregar algo</p>}

        {ShowCategoria ? <p>La categoria ya Existe</p> : <></>}

        <button
          className="w-full px-4 py-2 leading-tight text-white bg-purple-500 border-0 border-purple-500 rounded-lg hover:bg-purple-700"
          type="submit"
        >
          Agregar Categoria
        </button>
      </form>

      {arrayCategoria.map((item) => (
        <div
          key={item.id}
          className="flex text-white flex-col items-center justify-center gap-5 mb-16"
        >
          <h1>{item.nombre}</h1>
          <button
            onClick={() => eliminarCategoria(params.id, item.id, false)}
            className="px-2 py-1 bg-red-500 rounded-full "
          >
            Eliminar
          </button>
        </div>
      ))}

      {/*    {arrayCategoria.map((item) => {
        <div key={item.id}>
          <h1 className="text-white">{item.nombre}</h1>

          <div className="flex gap-4">
            <button
                  onClick={() => deleteProducto(params.id, categoria.nombre, false)}
                  className="px-2 py-1 bg-red-500 rounded-full "
                >
                  Eliminar
                </button>
          </div>
        </div>;
      })} */}
    </div>
  );
};

export default AddCategorias;
