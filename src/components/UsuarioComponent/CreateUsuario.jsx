import React, { useState } from 'react';
import { TextField, Button, Grid, Box, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import UsuarioService from '../../services/UsuarioService';
import axios from 'axios';

const UsuarioComponent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cep: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    UF: '',
  });

  const [loadingCep, setLoadingCep] = useState(false);
  const [cepError, setCepError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const removeMask = (value) => {
    return value.replace(/\D/g, '');
  };

  const clearAddressFields = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      rua: '',
      complemento: '',
      bairro: '',
      cidade: '',
      UF: '',
    }));
  };

  const handleCepChange = async (e) => {
    const cep = removeMask(e.target.value);
    setFormData({ ...formData, cep: e.target.value });
    setCepError('');

    if (cep.length === 8) {
      try {
        setLoadingCep(true);
        const response = await UsuarioService.getCep(cep);
        const data = response.data;

        setFormData((prevFormData) => ({
          ...prevFormData,
          rua: data.logradouro,
          complemento: data.complemento,
          bairro: data.bairro,
          cidade: data.localidade,
          UF: data.uf,
        }));
      } catch (error) {
        clearAddressFields();
        if (axios.isAxiosError(error) && error.response) {
          const backendMessage = error.response.data.error;
          setCepError(backendMessage);
        } else {
          console.error('Erro ao consultar CEP:', error);
          setCepError('Erro ao consultar CEP.');
        }
      } finally {
        setLoadingCep(false);
      }
    } else {
      clearAddressFields();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await UsuarioService.createUsuario({
        nome: formData.nome,
        email: formData.email,
        telefone: removeMask(formData.telefone),
        endereco: {
          CEP: removeMask(formData.cep),
          rua: formData.rua,
          numero: formData.numero,
          complemento: formData.complemento,
          bairro: formData.bairro,
          cidade: formData.cidade,
          UF: formData.UF,
        },
      });
      console.log('Usuário cadastrado com sucesso!');
      navigate('/');
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    }
  };

  const handleVoltar = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="sm">
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center" 
        sx={{ mt: 4 }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Cadastro de Usuário
        </Typography>
        <Box 
          component="form" 
          onSubmit={handleSubmit} 
          sx={{ 
            mt: 2, 
            border: '1px solid #ccc', 
            borderRadius: '8px', 
            padding: '40px', 
            width: '100%', 
            boxShadow: 1 
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputMask
                mask="(99) 99999-9999"
                value={formData.telefone}
                onChange={handleChange}
              >
                {(inputProps) => (
                  <TextField
                    {...inputProps}
                    fullWidth
                    label="Telefone"
                    name="telefone"
                    required
                  />
                )}
              </InputMask>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputMask
                mask="99999-999"
                value={formData.cep}
                onChange={handleCepChange}
              >
                {(inputProps) => (
                  <TextField
                    {...inputProps}
                    fullWidth
                    label="CEP"
                    name="cep"
                    required
                    error={!!cepError}
                    helperText={cepError}
                  />
                )}
              </InputMask>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Rua"
                name="rua"
                value={formData.rua}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Número"
                name="numero"
                value={formData.numero}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Complemento"
                name="complemento"
                value={formData.complemento}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Bairro"
                name="bairro"
                value={formData.bairro}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Cidade"
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="UF"
                name="UF"
                value={formData.UF}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Cadastrar
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={handleVoltar} fullWidth>
                Voltar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default UsuarioComponent;
