import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useFirestore } from "../hooks/useFirestore";

const Home = () => {
  const [data, error, loading, getData] = useFirestore();

  const loadingData = loading.getData && <p>Loading data..</p>;
  const errorData = error && <p>{error}</p>;

  useEffect(() => {
    console.log("GetData");
    getData();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-24">
        <div>
          <h1 className="text-2xl font-semibold text-center text-white mb-11">Home</h1>

          {loadingData}
          {errorData}
          <div className="text-white">
            {console.log(data)}

            {data.map((comercios) => (
              <div key={comercios.id}>
                <Link to={`/comercio/${comercios.id}/`} className="text-xl text-white underline">
                  {comercios.nombre}
                </Link>

                
              </div>
            ))}
          </div>

          <div className="p-2 mt-20 text-center text-white bg-slate-700 rounded-xl" >
            <Link to="/agregar-comercio">Agregar Comercio</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
