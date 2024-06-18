import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, TextField, Box, Paper, Container, Typography
} from '@mui/material';
import { Link } from 'react-router-dom';
import UsuarioService from '../../services/UsuarioService';

const ListUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await UsuarioService.getUsuarios();
      setUsuarios(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  const handleDelete = async (usuarioId) => {
    try {
      await UsuarioService.deleteUsuario(usuarioId);
      fetchUsuarios();
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsuarios = usuarios.filter((usuario) =>
    usuario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.telefone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTelefone = (telefone) => {
    const cleaned = ('' + telefone).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return telefone;
  };

  return (
    <Container maxWidth="md">
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center" 
        sx={{ mt: 4 }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Usuários
        </Typography>
        <Box 
          sx={{ 
            border: '1px solid #ccc', 
            borderRadius: '8px', 
            padding: '16px', 
            width: '100%', 
            boxShadow: 1 
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <TextField
              label="Pesquisar usuário"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Box>
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <Button component={Link} to="/create" variant="contained" color="primary">
              Criar Novo Usuário
            </Button>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Telefone</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell align="right">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsuarios.map((usuario) => (
                  <TableRow key={usuario.usuarioId}>
                    <TableCell>{usuario.nome}</TableCell>
                    <TableCell>{formatTelefone(usuario.telefone)}</TableCell>
                    <TableCell>{usuario.email}</TableCell>
                    <TableCell align="right">
                      <Button 
                        component={Link} 
                        to={`/update/${usuario.usuarioId}`} 
                        variant="contained" 
                        color="primary" 
                        sx={{ mr: 1 }}
                      >
                        Atualizar
                      </Button>
                      <Button 
                        variant="contained" 
                        color="secondary" 
                        onClick={() => handleDelete(usuario.usuarioId)}
                      >
                        Deletar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Container>
  );
};

export default ListUsuario;
