import { createRent, getRent, deleteRent, listAllRents, updateRent } from "../DAO/RentDao.js";

export const createEmprestimo = async (req, res) => {
    try {
        const rent = await createRent(req.body);
        res.status(201).json(rent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

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
        res.status(200).json(rent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
