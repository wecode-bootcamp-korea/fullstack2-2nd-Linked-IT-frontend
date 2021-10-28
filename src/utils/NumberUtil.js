export function addComma(amount) {
  const numberlized = parseInt(amount);
  if (isNaN(numberlized)) return amount;
  if (numberlized < 0) return amount;
  return numberlized.toLocaleString();
}
