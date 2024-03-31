import { DataTypes } from 'sequelize';
import sequelize from '../sequelizeConfig.js';

const Chave = sequelize.define('Chave', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  SalaDaChave: {
    type: DataTypes.STRING(100), // VARCHAR(100)
    allowNull: false
  },
  SituacaoEmprestimo: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  Descricao: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
}, {
  tableName: 'chave', // Nome da tabela
  timestamps: false // Não cria colunas `createdAt` e `updatedAt`
});

export default Chave;