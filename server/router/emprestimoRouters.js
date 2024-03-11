import express from 'express';
import { createEmprestimo, getEmprestimo, deleteEmprestimo, listAllEmprestimos, updateEmprestimo } from '../Controller/RentController.js'; // Ajuste o caminho de importação conforme necessário

const rentRouter = express.Router();

rentRouter.post('/criarEmprestimo', createEmprestimo);
rentRouter.get('/buscarEmprestimo/:id', getEmprestimo);
rentRouter.delete('/deletarEmprestimo/:id', deleteEmprestimo);
rentRouter.get('/listarTodosEmprestimos', listAllEmprestimos);
rentRouter.put('/atualizarEmprestimo/:id', updateEmprestimo);

export default rentRouter;
