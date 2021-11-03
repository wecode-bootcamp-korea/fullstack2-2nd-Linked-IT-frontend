const isKorean = string => {
  const uniCode = string.charCodeAt(0);
  if (0x1100 <= uniCode && uniCode <= 0x11ff) return true;
  if (0x3130 <= uniCode && uniCode <= 0x318f) return true;
  if (0xac00 <= uniCode && uniCode <= 0xd7a3) return true;
  return false;
};
export default isKorean;
