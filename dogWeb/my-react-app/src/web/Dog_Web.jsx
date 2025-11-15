import { useEffect, useState } from "react";
import '../css/Dog_Web.css'       // Estilos del componente
import perros from '../assets/perros.jpg' // Imagen de presentación

function Web_dog() {
  // Estado para guardar las razas de perros
  const [razas, setRazas] = useState({});
  // Estado para guardar las imágenes de cada raza
  const [imagenes, setImagenes] = useState({});
  // Estado para saber cuál tarjeta está en hover
  const [hoverRaza, setHoverRaza] = useState(null);
  // Cuántas razas mostrar inicialmente
  const [cantidad, setCantidad] = useState(12);

  // Cargar datos de la API cuando se monta el componente
  useEffect(() => {
    async function cargarDatos() {
      // Obtener lista de todas las razas
      const res = await fetch("https://dog.ceo/api/breeds/list/all");
      const data = await res.json();
      setRazas(data.message);

      // Obtener una imagen aleatoria por cada raza
      const imgTemp = {};
      for (let raza of Object.keys(data.message)) {
        const resImg = await fetch(
          `https://dog.ceo/api/breed/${raza}/images/random`
        );
        const dataImg = await resImg.json();
        imgTemp[raza] = dataImg.message;
      }
      setImagenes(imgTemp);
    }

    cargarDatos();
  }, []);

  // Convertir el objeto de razas a un array
  const listaRazas = Object.keys(razas);
  // Seleccionar solo las primeras "cantidad" razas para mostrar
  const razasMostradas = listaRazas.slice(0, cantidad);

  return (
    <div className="Big_Father">
      {/* Encabezado principal */}
      <main className="Box_main">
        <h1>👑Reino de Canes👑</h1>
      </main>

      {/* Sección de bienvenida con imagen */}
      <section className="Box_Section">
        <h2>🐾🐶¡Bienvenido al Reino de los Canes!🐾🐶</h2>
        <img src={perros} />
      </section>

      {/* Caja de presentación */}
      <div className="box_presentation">Conoce a nuestros Reyes</div>

      {/* Grid con tarjetas de perros */}
      <div className="grid">
        {razasMostradas.map((raza) => (
          <div
            className="card"
            key={raza}
            onMouseEnter={() => setHoverRaza(raza)} // Mostrar overlay al pasar el mouse
            onMouseLeave={() => setHoverRaza(null)} // Ocultar overlay al salir
          >
            <img className="dog-img" src={imagenes[raza]} alt={raza} />
            <h3 className="dog-name">{raza}</h3>

            {/* Overlay con subrazas */}
            {hoverRaza === raza && (
              <div className="overlay">
                <h4>Subrazas</h4>
                {razas[raza].length === 0 ? (
                  <p>No tiene subrazas</p>
                ) : (
                  razas[raza].map((sub) => <p key={sub}>{sub}</p>)
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Botón "Ver más" para cargar más razas */}
      {cantidad < listaRazas.length && (
        <button
          className="btn-more"
          onClick={() => setCantidad(cantidad + 12)}
        >
          Ver más
        </button>
      )}
    </div>
  );
}

export default Web_dog;
