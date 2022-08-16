import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFirestore } from "../hooks/useFirestore";

const AddComercio = () => {
  const initialValue = {
    nombre: "",
    direccion: " "
  };
  const [store, setStore] = useState(initialValue);

  const [data, error, loading, getData, addData] = useFirestore();

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(store);
    await addData(store);
    setStore(initialValue);
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStore((old) => ({
      ...old,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <>
      <h1 className="text-xl font-bold text-center text-white mt-9">
        Agregar Comercio
      </h1>
      <form
        className="flex flex-col w-2/3 gap-5 mx-auto mt-5"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="nombre"
          onChange={handleChange}
          value={store.nombre}
          name="nombre"
          className="p-2 border-2 border-slate-600 rounded-xl"
        />

        <input
          type="text"
          placeholder="direccion"
          onChange={handleChange}
          value={store.direccion}
          name="direccion"
          className="p-2 border-2 border-slate-600 rounded-xl"
        />

        <div className="flex items-center justify-center gap-5">
          <label className="text-white" htmlFor="disponible">
            Disponible
          </label>
          <input
            type="checkbox"
            placeholder="disponible"
            onChange={handleChange}
            value={store.disponible}
            name="disponible"
          />
        </div>
        <button
          className="p-2 text-white rounded-full bg-slate-700"
          type="submit"
        >
          Add
        </button>
      </form>
    </>
  );
};

export default AddComercio;
