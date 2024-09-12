import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navegacion from './plantilla/Navegacion';
import ListadoUsuarios from './Usuarios/ListadoUsuarios';
import AgregarUsuarios from './Usuarios/AgregarUsuarios';
import EditarUsuarios from './Usuarios/EditarUsuarios';
import ListadoProductos from './Productos/ListadoProductos';
import AgregarProducto from './Productos/AgregarProductos';
import EditarProducto from './Productos/EditarProductos'; // Importar el componente

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        {/* Componente de navegación */}
        <Navegacion />
        
        {/* Definición de rutas */}
        <Routes>
          <Route path="/" element={<ListadoUsuarios />} />
          <Route path="/agregar" element={<AgregarUsuarios />} />
          <Route path="/editar/:id" element={<EditarUsuarios />} />
          <Route path="/productos" element={<ListadoProductos />} />
          <Route path="/agregar-producto" element={<AgregarProducto />} />
          <Route path="/editar-producto/:id" element={<EditarProducto />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
