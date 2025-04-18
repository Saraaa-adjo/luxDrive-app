// models/carModel.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const CarModel = sequelize.define('Car', {
  model: DataTypes.STRING,
  brand: DataTypes.STRING,
  dailyPrice: DataTypes.DECIMAL(10, 2),
  image: DataTypes.STRING,
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'cars'
});

export default CarModel;