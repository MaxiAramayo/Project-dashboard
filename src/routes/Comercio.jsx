import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useFirestore } from "../hooks/useFirestore";

const Comercio = () => {
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
    deleteProductosDeCategoria,
  ] = useFirestore();

  useEffect(() => {
    getProductos(params.id);
    console.log("Datos obteniendo");
  }, []);

  const loadingData = loading.getProductos && <p>Loading data..</p>;
  const errorData = error && <p>{error}</p>;

  const obj = {};

  data.map((item) => {
    {
      if (item.productos.length > 0) {
        item.productos.forEach((producto) => {
          const { categoria } = producto;
          obj[categoria] = obj[categoria]
            ? [...obj[categoria], producto]
            : [producto];
        });
      } else {
        return null;
      }
    }
  });

  const EliminarCategoriaYproductos = (id, categoria) => {
    let CategoriaAEliminar = "";

    console.log(categoria);

    console.log(data);

    data.map((item) =>
      item.categorias.map((Cat) => {
        if (Cat.nombre === categoria) {
          CategoriaAEliminar = Cat.id;
          console.log(Cat.id);
        }
        // console.log(Cat);
      })
    );

    deleteProducto(id, CategoriaAEliminar, false);
    deleteProductosDeCategoria(id, categoria);
  };

  return (
    <div className="flex flex-col justify-center mt-16 text-white itemsP-center">
      <h1 className="my-5 text-2xl font-semibold text-center">Productos</h1>
      {data.map((item) => (
        <div key={item.id}>
          <h1 className="text-center">{item.nombre}</h1>
        </div>
      ))}

      <div>
        {Object.keys(obj).map((key) => (
          <div className="flex flex-col gap-5 p-5 " key={key}>
            <h1 className="font-semibold text-center uppercase">{key}</h1>
            <button onClick={() => EliminarCategoriaYproductos(params.id, key)}>
              Eliminar Categoria con productos influidos
            </button>
            {obj[key].map((producto, index) => (
              <div
                className="flex flex-col gap-2 p-3 bg-slate-800 rounded-xl "
                key={index}
              >
                <h1 className="font-semibold">
                  Nombre: <span className="font-normal">{producto.nombre}</span>
                </h1>
                <p className="font-semibold">
                  Precio: <span className="font-normal">{producto.precio}</span>
                </p>
                <p className="font-semibold">
                  Descripcion:
                  <span className="font-normal"> {producto.descripcion}</span>
                </p>

                <div className="flex gap-4">
                  <Link
                    to={`/editar-producto/${params.id}/${producto.id}/${producto.nombre}/${producto.precio}/${producto.descripcion}/${key}`}
                    className="px-2 py-1 bg-yellow-500 rounded-full "
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => deleteProducto(params.id, producto.id, true)}
                    className="px-2 py-1 bg-red-500 rounded-full "
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <Link
        className="p-2 mx-auto mt-20 text-center text-white w-60 bg-slate-700 rounded-xl"
        to={`/agregar-producto/${params.id}`}
      >
        Agregar Producto
      </Link>
    </div>
  );
};
export default Comercio;
