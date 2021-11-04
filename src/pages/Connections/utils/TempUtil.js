import isKorean from '../../../utils/LanguageUtil';

export function sortArrayByName(array, sortCriteria) {
  array.sort(compareName);
  if (sortCriteria === 'desc') array = array.reverse();
  return array;
}

export function compareName(obj1, obj2) {
  if (obj1.lastName.toUpperCase() < obj2.lastName.toUpperCase()) {
    return 1;
  } else if (obj1.lastName.toUpperCase() === obj2.lastName.toUpperCase()) {
    if (obj1.firstName.toUpperCase() < obj2.firstName.toUpperCase()) {
      return 1;
    } else {
      return -1;
    }
  } else {
    return -1;
  }
}

export function searchUserByName(userCardList, searchInput) {
  return userCardList.filter(card => {
    const { lastName, firstName } = card;
    const booleanValue = isKorean(lastName);
    const name = booleanValue
      ? lastName + ' ' + firstName
      : firstName + ' ' + lastName;
    return name.toUpperCase().indexOf(searchInput.toUpperCase()) > -1;
  });
}
