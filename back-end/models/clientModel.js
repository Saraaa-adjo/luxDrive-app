import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const ClientModel = sequelize.define('Client', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(191), // Réduit à 191 caractères pour utf8mb4
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: false
  }
}, {
  tableName: 'clients',
  timestamps: true // Ajout des champs createdAt/updatedAt
});

export default ClientModel;