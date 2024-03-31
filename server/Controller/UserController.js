// userController.js
import { createUser,  findByID, updateUser, deleteUser, listAllUser } from '../DAO/UserDao.js';
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
    const user = await authenticateUser(req.body.user, req.body.password);
    const token = generateToken(user);
    res.json({ token, user });
 } catch (error) {
    res.status(401).json({ error: error.message });
 }
};

// Função para buscar informações de um usuário autenticado
export const getUserInfo = async (req, res) => {
   try {
     // Acessa o ID do usuário a partir dos parâmetros da rota
     const userId = req.params.id;
     const user = await findByID(userId); // Use o ID para buscar o usuário no banco
 
     if (!user) {
       return res.status(404).json({ error: 'Usuário não encontrado' });
     }
     const userData = user.dataValues;
     res.json(userData);
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
   const { id } = req.params;
   const numberOfDestroyedRows = await deleteUser(id);
   if (numberOfDestroyedRows === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
  }
  res.status(200).json({ message: 'Usuário deletada com sucesso' });
 } catch (error) {
    res.status(500).json({ error: error.message });
 }
};

// Função para listar todos os usuários
export const listAllUsers = async (req, res) => {
 try {
    const users = await listAllUser();
    res.json(users);
 } catch (error) {
    res.status(500).json({ error: error.message });
 }
};
