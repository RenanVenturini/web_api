import axios from 'axios';

const API_URL = 'https://localhost:44359/api';

class UsuarioService {
  getUsuarios() {
    return axios.get(`${API_URL}/Usuario`);
  }

  getUsuarioById(id) {
    return axios.get(`${API_URL}/Usuario/${id}`);
  }

  createUsuario(usuario) {
    return axios.post(`${API_URL}/Usuario`, usuario);
  }

  updateUsuario(usuario) {
    return axios.put(`${API_URL}/Usuario`, usuario);
  }

  deleteUsuario(id) {
    return axios.delete(`${API_URL}/Usuario/${id}`);
  }

  getCep(cep) {
    return axios.get(`${API_URL}/Usuario/consulta-cep/${cep}`);
  }
}

export default new UsuarioService();

