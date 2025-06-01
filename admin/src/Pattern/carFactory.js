export const createCar = (type, baseData) => {
  const specifics = {
    standard: { category: 'standard' },
    premium: { 
      category: 'premium',
      requiresSignature: true 
    },
    electric: {
      category: 'electric',
      chargingTime: '6h'
    }
  };

  return specifics[type] || specifics.standard;
};