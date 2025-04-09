import { Sequelize } from 'sequelize';

// Configuration pour MySQL
const sequelize = new Sequelize({
  database: 'int',    // Nom de votre base MySQL
  username: 'root',              // Utilisateur MySQL
  password: '',                  // Mot de passe MySQL
  host: 'localhost',             // Hôte MySQL
  port: 3306,                    // Port MySQL
  dialect: 'mysql',              // Dialecte MySQL
  logging: false,                // Désactive les logs SQL
  pool: {
    max: 5,                      // Nombre max de connexions
    min: 0,                      // Nombre min de connexions
    acquire: 30000,              // Temps max pour acquérir une connexion
    idle: 10000                  // Temps max d'inactivité
  }
});

// Fonction de connexion
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connecté à la base MySQL "Livraison Repas"');
    
    // Synchronisation des modèles (uniquement en dev)
    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync({ alter: true });
      console.log('🔄 Modèles synchronisés');
    }
    
    return sequelize;
  } catch (error) {
    console.error('❌ Erreur de connexion à MySQL:', error.message);
    process.exit(1);
  }
};

// Export pour utiliser sequelize dans les modèles
export default sequelize;