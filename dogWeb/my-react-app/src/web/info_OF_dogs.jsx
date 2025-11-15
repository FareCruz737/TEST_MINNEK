import { useEffect, useState } from "react";
import "../css/info_OF_dogs.css";

function Info() {
  // Estado principal con todos los perros
  const [data, setData] = useState([]);
  // Estado con los perros filtrados según búsqueda
  const [filteredData, setFilteredData] = useState([]);
  // Estado del input de búsqueda
  const [search, setSearch] = useState("");
  // Estado para saber por qué columna se está ordenando
  const [sortType, setSortType] = useState("");
  // Estado para añadir un nuevo perro
  const [newDog, setNewDog] = useState({ breed: "", sub: "" });

  // Cargar datos desde localStorage o API al iniciar
  useEffect(() => {
    const saved = localStorage.getItem("dogsData");
    if (saved) {
      const parsed = JSON.parse(saved);
      setData(parsed);
      setFilteredData(parsed);
      return;
    }

    async function loadData() {
      const res = await fetch("https://dog.ceo/api/breeds/list/all");
      const json = await res.json();

      const finalList = [];
      // Convertir objeto de razas y subrazas en array plano
      Object.entries(json.message).forEach(([raza, subrazas]) => {
        if (subrazas.length === 0) {
          finalList.push({ breed: raza, sub: "N/A" });
        } else {
          subrazas.forEach((s) => finalList.push({ breed: raza, sub: s }));
        }
      });

      setData(finalList);
      setFilteredData(finalList);
      localStorage.setItem("dogsData", JSON.stringify(finalList));
    }

    loadData();
  }, []);

  // Filtrar datos según el input de búsqueda
  useEffect(() => {
    const f = data.filter(
      (item) =>
        item.breed.toLowerCase().includes(search.toLowerCase()) ||
        item.sub.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(f);
  }, [search, data]);

  // Ordenar datos por raza o subraza
  const sortData = (type) => {
    setSortType(type);
    const sorted = [...filteredData].sort((a, b) =>
      a[type].localeCompare(b[type])
    );
    setFilteredData(sorted);
  };

  // Añadir un perro manualmente
  const addDog = () => {
    if (newDog.breed.trim() === "") return; // No agregar si raza vacía
    const updated = [...data, newDog];
    setData(updated);
    setFilteredData(updated);
    localStorage.setItem("dogsData", JSON.stringify(updated));
    setNewDog({ breed: "", sub: "" }); // Limpiar inputs
  };

  // Eliminar un perro de la lista
  const deleteDog = (index) => {
    const updated = data.filter((_, i) => i !== index);
    setData(updated);
    setFilteredData(updated);
    localStorage.setItem("dogsData", JSON.stringify(updated));
  };

  return (
    <div className="containerInfo">
      <h3>Administrar, buscar y filtrar</h3>

      {/* Input para buscar por raza o subraza */}
      <input
        type="text"
        placeholder="Buscar raza o subraza..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input-search"
      />

      {/* Botones para ordenar la tabla */}
      <div className="sort-buttons">
        <button onClick={() => sortData("breed")}>Ordenar por raza</button>
        <button onClick={() => sortData("sub")}>Ordenar por subraza</button>
      </div>

      {/* Sección para agregar un perro manualmente */}
      <div className="add-section">
        <h3>Añadir perro manualmente</h3>
        <input
          type="text"
          placeholder="Raza"
          value={newDog.breed}
          onChange={(e) => setNewDog({ ...newDog, breed: e.target.value })}
        />
        <input
          type="text"
          placeholder="Subraza (opcional)"
          value={newDog.sub}
          onChange={(e) =>
            setNewDog({ ...newDog, sub: e.target.value || "N/A" })
          }
        />
        <button onClick={addDog}>Agregar</button>
      </div>

      {/* Tabla que muestra razas y subrazas */}
      <table className="tabla-perros">
        <thead>
          <tr>
            <th>Raza</th>
            <th>Subraza</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.breed}</td>
              <td>{item.sub}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteDog(index)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Info;
