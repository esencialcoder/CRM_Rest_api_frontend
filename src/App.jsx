import { Header } from "./component/layout/Header";
import { Navegacion } from "./component/layout/Navegacion";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Clientes } from "./component/clients/Clientes";
import { Productos } from "./component/products/Productos";
import { Pedidos } from "./component/pedidos/Pedidos";

function App() {
  return (
    <>
      <Header />
      <Router>
        <div className="grid contenedor contenido-principal">
          <Navegacion />
          <main className="caja-contenido col-9">
            <Routes>
              <Route path="/" element={<Clientes />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/pedidos" element={<Pedidos />} />
            </Routes>
          </main>
        </div>
      </Router>
    </>
  );
}

export default App;
