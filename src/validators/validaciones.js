import { useFirestore } from "../hooks/useFirestore";

const ValidacionDeCategoria = (categoria) => {
  const [data, getProductos] = useFirestore();
  let validacion = false;
  getProductos("K3A18i");

  data.map((item) =>
    item.categorias?.map((categorias) => {
      console.log(categorias);
      if (categorias.nombre === categoria) {
        return validacion = true;
      }
    })
  );
  if(validacion === true){
    return true;
  }else{
    return false;
  }
};

export {ValidacionDeCategoria} ;
