// userDAO.js
import User from '../models/User.js';
import { hashPassword, comparePassword, authenticateUser } from '../auth.js';

// userDAO.js
export const createUser = async (userData) => {
  if (!userData.password) {
    throw new Error('A senha é obrigatória.');
  }

  const hashedPassword = await hashPassword(userData.password);
  const user = await User.create({ ...userData, password: hashedPassword });
  return user;
};

  

// Função atualizada para buscar por 'user'
export const findUserByUsername = async (username) => {
 return await User.findOne({ where: { user: username } });
};

export const findByID = async (id) => {
 return await User.findByPk(id);
};

export const updateUser = async (id, userData) => {
 const user = await User.findByPk(id);
 if (!user) throw new Error('Usuário não encontrado');
 await user.update(userData);
 return user;
};

export const deleteUser = async (id) => {
 const user = await User.findByPk(id);
 if (!user) throw new Error('Usuário não encontrado');
 await user.destroy();
};

export const listAllUser = async () => {
  try {
      const user = await User.findAll();
      return user;
  } catch (error) {
      console.error('Erro ao listar todos os usuários:', error);
      throw error; // Ou retorne uma resposta de erro apropriada, dependendo do seu contexto
  }
};

// UserDao.js
