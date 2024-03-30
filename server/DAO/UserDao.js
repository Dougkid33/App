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

// UserDao.js
