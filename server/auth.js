// auth.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const secret = 'seu_segredo_aqui'; // Use uma chave secreta mais segura em produção

export const generateToken = (user) => {
 return jwt.sign({ id: user.id }, secret, { expiresIn: '1h' });
};

export const hashPassword = async (password) => {
 const salt = await bcrypt.genSalt(10);
 return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password, hash) => {
 return await bcrypt.compare(password, hash);
};

// Função atualizada para autenticação pelo campo 'user'
export const authenticateUser = async (username, password) => {
 const user = await findUserByUsername(username);
 if (!user) throw new Error('Usuário não encontrado');
 const isPasswordValid = await comparePassword(password, user.senha);
 if (!isPasswordValid) throw new Error('Senha inválida');
 return user;
};
