import API_ENDPOINT from '../../../api';

const USER_ID = 1; // API 미구현으로 인한 임시 로직

export const acceptFriendRequest = async friendId => {
  const url = `${API_ENDPOINT}/friend/`;
  const options = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: friendId,
      friendId: USER_ID, // API 미구현으로 인한 임시 로직
      friendStatusId: 4,
    }),
  };

  const result = await fetch(url, options)
    .then(res => res.json())
    .then(data => {
      return data;
    })
    .catch(console.log);

  return result;
};
