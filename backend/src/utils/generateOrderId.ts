export const generateOrderId = (): string => {
  const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, '');
  const random = Math.floor(1000 + Math.random() * 9000);
  return `GWS-${dateStr}-${random}`;
};

