import { createRent, getRent, deleteRent, listAllRents, updateRent } from "../DAO/RentDao.js";
import { updateKeyStatus, updateKey } from "../DAO/KeysDAO.js";
import{updateChave, getChave} from "./KeysController.js";



export const createEmprestimo = async (req, res) => {
    try {
        const rent = await createRent(req.body); // Criação do empréstimo

        // Assume que `req.body` contém `Chave_ID`
        const chaveId = req.body.Chave_ID;
        if (!chaveId) {
            throw new Error('ID da Chave não fornecido');
        }

        // Atualização do status da chave para indicar que está emprestada
        try {
            await updateKeyStatus(chaveId, false);
        } catch (error) {
            console.error('Erro ao atualizar status da chave:', error);
            // Pode optar por desfazer o empréstimo aqui, dependendo da lógica de negócio
            throw new Error('Falha ao atualizar status da chave');
        }

        res.status(201).json(rent);
    } catch (error) {
        console.error('Erro ao criar empréstimo:', error);
        res.status(500).json({ error: error.message });
    }
};


export const getEmprestimo = async (req, res) => {
    try {
        const rent = await getRent(req.params.id);
        if (!rent) {
            return res.status(404).json({ error: 'Empréstimo não encontrado' });
        }
        res.status(200).json(rent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteEmprestimo = async (req, res) => {
    try {
        const numberOfDestroyedRows = await deleteRent(req.params.id);
        await updateKeyStatus(rent.Chave_ID, true); // volta o status da chave para `true` (disponível)
        res.status(201).json(rent);
        if (numberOfDestroyedRows === 0) {
            return res.status(404).json({ error: 'Empréstimo não encontrado' });
        }
        res.status(200).json({ message: 'Empréstimo deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const listAllEmprestimos = async (req, res) => {
    try {
        const rents = await listAllRents();
        res.status(200).json(rents);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateEmprestimo = async (req, res) => {
    try {
        const rent = await updateRent(req.params.id, req.body);

        // Se o empréstimo está sendo marcado como devolvido (assumindo que 'false' indica devolvido)
        if (req.body.Status === false) {
            // Atualiza o status da chave para `true` (disponível), assumindo que rent.Chave_ID existe
            await updateKeyStatus(rent.Chave_ID, true);
        }

        res.status(200).json(rent);
    } catch (error) {
        console.error('Erro ao atualizar empréstimo:', error);
        res.status(500).json({ error: error.message });
    }
};

