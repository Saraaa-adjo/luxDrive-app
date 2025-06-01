// pricingStrategies.js
export const pricingStrategies = {
  standard: (basePrice, days) => basePrice * days,
  premium: (basePrice, days) => basePrice * days * 1.2,
  weekend: (basePrice) => basePrice * 0.8 * 2,  // Forfait week-end
  longTerm: (basePrice, days) => (days > 7 ? basePrice * days * 0.7 : basePrice * days)
};