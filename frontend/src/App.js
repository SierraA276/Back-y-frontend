import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navegacion from './plantilla/Navegacion';
import ListadoUsuarios from './Usuarios/ListadoUsuarios';
import AgregarUsuarios from './Usuarios/AgregarUsuarios';
import EditarUsuarios from './Usuarios/EditarUsuarios';
import ListadoProductos from './Productos/ListadoProductos';

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Navegacion />
        <Routes>
          <Route exact path="/" element={<ListadoUsuarios />} />
          <Route exact path="/agregar" element={<AgregarUsuarios />} />
          <Route exact path="/editar/:id" element={<EditarUsuarios />} /> 
          <Route exact path="/productos" element={<ListadoProductos />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
