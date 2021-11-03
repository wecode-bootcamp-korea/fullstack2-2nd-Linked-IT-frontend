export function SearchByKeywords(category, keyword) {
  // if search input has 2+ words
  if (keyword.includes(' ')) {
    return keyword.split(' ').every(word => {
      return Object.values(category).some(val => {
        return (
          typeof val === 'string' &&
          val.toLowerCase().includes(word.toLowerCase())
        );
      });
    });
  }
  // if search input has 1 word
  else {
    return Object.values(category).some(val => {
      return (
        typeof val === 'string' &&
        val.toLowerCase().includes(keyword.toLowerCase())
      );
    });
  }
}
