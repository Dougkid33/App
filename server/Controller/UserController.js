// userController.js
import { createUser,  findUserByUsername, updateUser, deleteUser } from '../DAO/UserDao.js';
import { generateToken, authenticateUser } from '../auth.js';

// Função para registrar um novo usuário
export const registerUser = async (req, res) => {
 try {
    const user = await createUser(req.body);
    res.status(201).json(user);
 } catch (error) {
    res.status(500).json({ error: error.message });
 }
};

// Função para autenticar um usuário existente
export const loginUser = async (req, res) => {
 try {
    const user = await authenticateUser(req.body.user, req.body.senha);
    const token = generateToken(user);
    res.json({ token });
 } catch (error) {
    res.status(401).json({ error: error.message });
 }
};

// Função para buscar informações de um usuário autenticado
export const getUserInfo = async (req, res) => {
 try {
    const user = await findUserByUsername(req.user.user); // Supondo que 'req.user' contém o usuário autenticado
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json(user);
 } catch (error) {
    res.status(500).json({ error: error.message });
 }
};

// Função para atualizar informações de um usuário autenticado
export const updateUserInfo = async (req, res) => {
 try {
    const user = await updateUser(req.user.id, req.body); // Supondo que 'req.user' contém o usuário autenticado
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json(user);
 } catch (error) {
    res.status(500).json({ error: error.message });
 }
};

// Função para deletar um usuário autenticado
export const deleteUserAccount = async (req, res) => {
 try {
    await deleteUser(req.user.id); // Supondo que 'req.user' contém o usuário autenticado
    res.status(204).end();
 } catch (error) {
    res.status(500).json({ error: error.message });
 }
};
