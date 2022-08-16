import { useState } from "react";
import { db, auth } from "../firebase";
import {
  getDocs,
  collection,
  where,
  query,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  collectionGroup,
  deleteField,
  FieldValue,
  arrayRemove,
} from "firebase/firestore";
import { nanoid } from "nanoid";

export const modificarProducto = () => {

  const [data, setData] = useState([]);

  const [error, setError] = useState([]);

  const [loading, setLoading] = useState({});

  const updateProduct = async (id, producto) => {
    try {
      setLoading((prev) => ({ ...prev, updateProduct: true }));

      const newProducto = {
        id: nanoid(6),
        nombre: producto.nombre,
        precio: producto.precio,
        descripcion: producto.descripcion,
        categoria: producto.categoria,
      };
      const dataRef = doc(db, "comercios", id);

      await updateDoc(dataRef, {
        productos: arrayUnion(newProducto),
      });

    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, updateProduct: false }));
    }
  };

  return [
    data,
    error,
    loading,
    updateProduct, 
  ];
};

export default modificarProducto;
