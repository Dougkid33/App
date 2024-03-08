import { DataTypes } from 'sequelize';
import { sequelize } from './sequelize'; // Importe a instância sequelize já configurada
import Usuario from './Usuario'; // Importe o modelo Usuario
import Chave from './Chave'; // Importe o modelo Chave

const Emprestimo = sequelize.define('Emprestimo', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  DataHoraEmprestimo: {
    type: DataTypes.DATE,
    allowNull: false
  },
  DataHoraDevolucao: {
    type: DataTypes.DATE,
    allowNull: true
  },
  Status: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  Usuario_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario, // Referência ao modelo Usuario
      key: 'ID' // Campo de referência na tabela Usuario
    }
  },
  Chave_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Chave, // Referência ao modelo Chave
      key: 'ID' // Campo de referência na tabela Chave
    }
  }
}, {
  tableName: 'emprestimo', // Nome da tabela
  timestamps: false // Não cria colunas `createdAt` e `updatedAt`

});

export default Emprestimo;
