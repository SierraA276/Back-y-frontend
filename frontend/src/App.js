import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navegacion from './plantilla/Navegacion';
import ListadoUsuarios from './Usuarios/ListadoUsuarios';
import AgregarUsuarios from './Usuarios/AgregarUsuarios';
import EditarUsuarios from './Usuarios/EditarUsuarios';
import ListadoProductos from './Productos/ListadoProductos';
import AgregarProducto from './Productos/AgregarProductos'; // Importar el componente

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Navegacion />
        <Routes>
          <Route path="/" element={<ListadoUsuarios />} />
          <Route path="/agregar" element={<AgregarUsuarios />} />
          <Route path="/editar/:id" element={<EditarUsuarios />} />
          <Route path="/productos" element={<ListadoProductos />} />
          <Route path="/agregar-producto" element={<AgregarProducto />} /> {/* Nueva ruta */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
