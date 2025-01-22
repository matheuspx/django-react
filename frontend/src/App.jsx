import React, { useState, useEffect } from 'react';
import api from './axios';
import './App.css';

const App = () => {
  const [details, setDetails] = useState([]);
  const [formData, setFormData] = useState({ id: '', nome: '', cargo: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await api.get('/');
      setDetails(response.data);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setMessage('Erro ao carregar dados');
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nome || !formData.cargo) {
      setMessage('Por favor, preencha todos os campos');
      return;
    }
    try {
      await api.post('/', formData);
      setMessage('Usuário criado com sucesso!');
      setFormData({ nome: '', cargo: '' });
      loadData();
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      setMessage('Erro ao criar usuário');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!formData.nome) {
      setMessage('O nome é obrigatório para atualização');
      return;
    }
    try {
      const response = await api.patch('/', {
        nome: formData.nome,
        cargo: formData.cargo,
        id: formData.id,
      });
      setMessage(response.data.message || 'Usuário atualizado com sucesso!');
      setFormData({ nome: '', cargo: '' });
      loadData();
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      setMessage(error.response?.data?.error || 'Erro ao atualizar usuário');
    }
  };

  const handleDelete = async (nome) => {
    try {
      const response = await api.delete('/', { data: { nome } });
      setMessage(response.data.message || 'Usuário deletado com sucesso!');
      loadData();
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      setMessage(error.response?.data?.error || 'Erro ao deletar usuário');
    }
  };

  const selectUserForUpdate = (user) => {
    setFormData({
      id: user.id,
      nome: user.nome,
      cargo: user.cargo,
    });
    setMessage(`Editando usuário: ${user.nome}`);
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Gerenciamento de Usuários</h1>
      </header>

      {message && <div className="message">{message}</div>}

      <div className="form-container">
        <h2>{formData.nome ? 'Atualizar Usuário' : 'Adicionar Usuário'}</h2>
        <form>
          <div className="form-group">
            <label>Nome:</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              placeholder="Digite o nome"
            />
          </div>

          <div className="form-group">
            <label>Cargo:</label>
            <input
              type="text"
              name="cargo"
              value={formData.cargo}
              onChange={handleInputChange}
              placeholder="Digite o cargo"
            />
          </div>

          <div className="button-group">
            <button type="button" onClick={handleSubmit}>
              Criar Novo
            </button>
            <button
              type="button"
              onClick={handleUpdate}
              disabled={!formData.nome}
            >
              Atualizar Existente
            </button>
          </div>
        </form>
      </div>

      <div className="table-container">
        <h2>Lista de Usuários</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Cargo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {details.map((output, index) => (
              <tr key={index}>
                <td>{output.nome}</td>
                <td>{output.cargo}</td>
                <td>
                  <div className='button-table'>
                    <button onClick={() => selectUserForUpdate(output)}>
                      Editar
                    </button>
                    <button onClick={() => handleDelete(output.nome)}>
                      Deletar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
