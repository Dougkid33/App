import express from 'express';
import { createEmprestimo, getEmprestimo, deleteEmprestimo, listAllEmprestimos,buscarEmprestimoPorusuario,atualizarOuDevolverEmprestimo, updateEmprestimo } from '../Controller/RentController.js'; // Ajuste o caminho de importação conforme necessário

const rentRouter = express.Router();

rentRouter.post('/criarEmprestimo', createEmprestimo);
rentRouter.get('/buscarEmprestimo/:id', getEmprestimo);
rentRouter.delete('/deletarEmprestimo/:id', deleteEmprestimo);
rentRouter.get('/listarTodosEmprestimos', listAllEmprestimos);
rentRouter.put('/atualizarEmprestimo/:id', updateEmprestimo);
rentRouter.get('/buscarEmprestimoPorUsuario/:id', buscarEmprestimoPorusuario);
rentRouter.put('/atualizarOuDevolverEmprestimo/:id', atualizarOuDevolverEmprestimo);


export default rentRouter;
