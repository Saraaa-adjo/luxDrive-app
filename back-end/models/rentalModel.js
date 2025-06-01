import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Rental = sequelize.define('Rental', {
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true
    }
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true,
      isAfterStartDate(value) {
        if (value <= this.startDate) {
          throw new Error('End date must be after start date');
        }
      }
    }
  },
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2), // Meilleur type pour les prix
    allowNull: false,
    validate: {
      min: 0
    }
  },
  status: {
    type: DataTypes.ENUM('active', 'terminé', 'cancelled', 'early_return'),
    defaultValue: 'active'
  },
  actualEndDate: {
    type: DataTypes.DATE,
    validate: {
      isDate: true
    }
  },
  adjustedPrice: {
    type: DataTypes.DECIMAL(10, 2),
    validate: {
      min: 0
    }
  }
}, {
  tableName: 'rentals',
  timestamps: true
});

Rental.associate = (models) => {
  Rental.belongsTo(models.Car, { foreignKey: 'carId', as: 'Car' });
  Rental.belongsTo(models.Client, { foreignKey: 'clientId', as: 'Client' });
};

export default Rental;