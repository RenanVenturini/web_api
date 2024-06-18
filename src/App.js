import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListUsuario from './components/UsuarioComponent/ListUsuario';
import CreateUsuario from './components/UsuarioComponent/CreateUsuario';
import UpdateUsuario from './components/UsuarioComponent/UpdateUsuario';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" exact element={<ListUsuario />} />
          <Route path="/create" element={<CreateUsuario />} />
          <Route path="/update/:usuarioId" element={<UpdateUsuario />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
