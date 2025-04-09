import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const FoodModel = sequelize.define('Food', {
  name: DataTypes.STRING,
  description: DataTypes.TEXT,
  price: DataTypes.DECIMAL(10, 2),
  image: DataTypes.STRING,
  restaurant: DataTypes.TEXT
}, {
  tableName: 'foods'
});

export default FoodModel;