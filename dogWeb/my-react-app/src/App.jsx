import { Routes, Route, Link } from "react-router-dom";
import Web_dog from "./web/Dog_Web";
import Info from "./web/info_OF_dogs";
import '../src/App.css'

function App() {
  return (
    <>
      {/* Rutas */}
      <Routes>
        <Route path="/Pagina_1" element={<Web_dog />} />
        <Route path="/Pagina_2" element={<Info />} />
      </Routes>
    </>
  );
}

export default App;