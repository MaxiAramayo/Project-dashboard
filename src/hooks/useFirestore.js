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
import { async } from "@firebase/util";

export const useFirestore = () => {
  const [data, setData] = useState([]);

  const [error, setError] = useState([]);

  const [loading, setLoading] = useState({});

  //TRAE TODOS LOS COMERCIOS
  const getData = async () => {
    /* console.log(auth.currentUser); */

    try {
      setLoading((prev) => ({ ...prev, getData: true }));
      const dataRef = collection(db, "comercios");

      const q = query(dataRef);
      const querySnapshot = await getDocs(q);
      const dataDB = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      setData(dataDB);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, getData: false }));
    }
  };

  //TRAE UN COMERCIO POR ID
  const searchData = async (id) => {
    try {
      setLoading((prev) => ({ ...prev, searchData: true }));
      const dataRef = collection(db, "comercios");
      const q = query(dataRef, where("id", "==", id));
      const querySnapshot = await getDocs(q);
      const dataDB = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      setData(dataDB);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, searchData: false }));
    }
  };

  //TRAE UNA LA LISTA DE PRODUCTOS DE UN RESTAURANTE
  const getProductos = async (id) => {
    try {
      setLoading((prev) => ({ ...prev, getProductos: true }));
      const dataRef = collection(db, "comercios");
      const q = query(dataRef, where("id", "==", id));
      const querySnapshot = await getDocs(q);
      const dataDB = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      setData(dataDB);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, getProductos: false }));
    }
  };

  //AGREGA UN COMERCIO
  const addData = async (store) => {
    try {
      setLoading((prev) => ({ ...prev, addData: true }));
      const newDoc = {
        id: nanoid(6),
        nombre: store.nombre,
        direccion: store.direccion,
        productos: [],
        categorias: [],
      };

      const docRef = doc(db, "comercios", newDoc.id);

      await setDoc(docRef, newDoc);

      setData([...data, newDoc]);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, addData: false }));
    }
  };

  const addCategoria = async (id, categoria) => {
    try {
      setLoading((prev) => ({ ...prev, addCategoria: true }));
      const newCategoria = {
        nombre: categoria,
        id: nanoid(6),
      };

      const dataRef = doc(db, "comercios", id);

      await updateDoc(dataRef, {
        categorias: arrayUnion(newCategoria),
      });
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, addCategoria: false }));
    }
  };

  const addProducto = async (id, producto) => {
    try {
      setLoading((prev) => ({ ...prev, addProducto: true }));
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
      setLoading((prev) => ({ ...prev, addProducto: false }));
    }
  };

  //ELIMINAR TODOS LOS PRODUCTOS DE UNA CATEGORIA
  const deleteProductosDeCategoria = (id, categoria) => {
    try {
      setLoading((prev) => ({ ...prev, deleteProductos: true }));
      const dataRef = doc(db, "comercios", id);

      console.log(id, categoria);

      let productosConCategoria = [];

      data.filter((item) =>
        item.productos.map((productos) => {
          if (productos.categoria === categoria) {
            console.log(productos);
            productosConCategoria = [...productosConCategoria, productos];
          }
        })
      );

      productosConCategoria.forEach(async (item) => {
        await updateDoc(dataRef, {
          productos: arrayRemove(item),
        });
      });

      setData(
        data.map((item) => {
          if (item.id === id) {
            item.productos = item.productos.filter(
              (item) => item.categoria !== categoria
            );
          }
          return item;
        })
      );
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, deleteProductos: false }));
    }
  };

  const deleteProducto = async (id, idProducto, opcion) => {
    console.log(idProducto);
    if (opcion === true) {
      try {
        setLoading((prev) => ({ ...prev, deleteProducto: true }));
        const dataRef = doc(db, "comercios", id);

        const productos = data.find((item) => item.id === id).productos;

        const producto = productos.find((item) => item.id === idProducto);

        console.log(producto);

        await updateDoc(dataRef, {
          productos: arrayRemove(producto),
        });

        setData(
          data.map((item) => {
            if (item.id === id) {
              item.productos = item.productos.filter(
                (item) => item.id !== idProducto
              );
            }
            return item;
          })
        );
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading((prev) => ({ ...prev, deleteProducto: false }));
      }
    } else if (opcion === false) {
      try {
        setLoading((prev) => ({ ...prev, deleteCategoria: true }));
        const dataRef = doc(db, "comercios", id);

        const categorias = data.find((item) => item.id === id).categorias;

        const categoria = categorias.find((item) => item.id === idProducto);

        await updateDoc(dataRef, {
          categorias: arrayRemove(categoria),
        });

        setData(
          data.map((item) => {
            if (item.id === id) {
              item.categorias = item.categorias.filter(
                (item) => item.id !== idProducto
              );
            }
            return item;
          })
        );
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading((prev) => ({ ...prev, deleteCategoria: false }));
      }
    }
  };

  return [
    data,
    error,
    loading,
    getData,
    addData,
    searchData,
    addCategoria,
    addProducto,
    getProductos,
    /* updateProduct, */
    deleteProducto,
    // deleteCategoria,
    deleteProductosDeCategoria,
  ];
};
