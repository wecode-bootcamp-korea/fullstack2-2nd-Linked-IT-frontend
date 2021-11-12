import { useState, useEffect } from 'react/cjs/react.development';
import styled from 'styled-components';
import UserCard from '../../components/UserCard/UserCard';
import Button from '../../components/Button/Button';
import { sortArrayByName, searchUserByName } from './utils/TempUtil';
import { acceptFriendRequest } from './utils/TempAPI';
import API_ENDPOINT from '../../api';

const USER_ID = 1; // API 미구현으로 인한 임시 로직

export default function FriendList(props) {
  const { category, cardData, handleReload } = props;

  const title =
    category === '3'
      ? '받은 친구 요청'
      : category === '2'
      ? '보낸 친구 요청'
      : '1촌';

  const confirmMsg =
    category === '3'
      ? '정말로 받은 친구 요청을 거절하시겠습니까?'
      : category === '2'
      ? '정말로 보낸 친구 요청을 취소하시겠습니까?'
      : '정말로 1촌 관계를 끊으시겠습니까?';

  const buttonText =
    category === '3' ? '거절' : category === '2' ? '취소' : '1촌 끊기';

  const [userCardList, setUserCardList] = useState([]);
  const [filteredCardList, setFilteredCardList] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [sortCriteria, setSortCriteria] = useState('');

  useEffect(() => {
    setUserCardList(cardData || []);
    setFilteredCardList(cardData || []);
  }, [cardData]);

  useEffect(() => {
    const filteredList = searchUserByName(userCardList, searchInput);
    setFilteredCardList(filteredList);
  }, [searchInput, userCardList]);

  useEffect(() => {
    if (filteredCardList.length === 0) return;
    const sortedList = sortArrayByName(filteredCardList, sortCriteria);
    setFilteredCardList(sortedList);
  }, [sortCriteria, filteredCardList]);

  const deleteFriend = friendId => {
    const result = window.confirm(confirmMsg);
    if (result) {
      const url = `${API_ENDPOINT}/friend/`;
      const options = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: category === '3' ? friendId : USER_ID,
          friendId: category === '3' ? USER_ID : friendId,
        }),
      };
      fetch(url, options)
        .then(res => res.json())
        .then(data => {
          // updateCardList(friendId);
          handleReload(false);
        })
        .catch(console.log);
    }
  };

  const clickBtnAccept = async friendId => {
    await acceptFriendRequest(friendId);
    alert('친구 요청을 수락하였습니다.');
    // updateCardList(friendId);
    handleReload(false);
  };

  // const updateCardList = friendId => {
  //   const newList = filteredCardList.filter(card => card.userId !== friendId);
  //   setUserCardList(newList);
  //   setFilteredCardList(newList);
  // };

  return (
    <Container>
      <Header>
        <Title>
          {title} {userCardList?.length}
        </Title>
        <AdditionalFeature>
          <Sort>
            정렬 기준
            <StyledSelect onChange={e => setSortCriteria(e.target.value)}>
              <option value="asc">오름차순</option>
              <option value="desc">내림차순</option>
            </StyledSelect>
          </Sort>
          <Search>
            <StyledInput
              placeholder="이름으로 검색"
              onChange={e => setSearchInput(e.target.value)}
            ></StyledInput>
          </Search>
        </AdditionalFeature>
      </Header>
      <UserCardContainer>
        {filteredCardList?.map((card, idx) => {
          const { userId, school } = card;
          return (
            <UserCardWrapper
              key={userId}
              borderBottom={idx === filteredCardList?.length - 1 ? false : true}
            >
              <UserCard
                key={userId}
                profile={card}
                withoutName="false"
                relation="true"
                type={school ? 'education major' : ''}
                text=""
              />
              <ButtonWrapper>
                <BtnSendMessage text="메시지" />
                {category === '3' && (
                  <BtnAccept
                    text="수락"
                    onClick={() => clickBtnAccept(userId)}
                  />
                )}
                <Button
                  text={buttonText}
                  onClick={() => deleteFriend(userId)}
                />
              </ButtonWrapper>
            </UserCardWrapper>
          );
        })}
      </UserCardContainer>
    </Container>
  );
}

const Container = styled.div`
  min-height: 200px;
  border: 1px solid ${({ theme }) => theme.colors.borderGrey};
  border-radius: 10px;
  margin-bottom: 40px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Header = styled.header`
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderGrey};
  padding: 15px 20px;
`;

const Title = styled.h1`
  margin-bottom: 15px;
  font-size: 19px;
`;

const AdditionalFeature = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  * {
    color: ${({ theme }) => theme.colors.fontGrey};
    font-size: 16px;
  }
`;

const Sort = styled.div``;

const StyledSelect = styled.select`
  margin-left: 10px;
  text-align: center;
`;

const Search = styled.div``;

const StyledInput = styled.input`
  height: 25px;
`;

const UserCardContainer = styled.div`
  overflow: auto;
`;

const UserCardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: ${({ borderBottom }) => (borderBottom ? '1px' : '0')} solid
    ${({ theme }) => theme.colors.borderGrey};
  padding: 15px 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;

  button {
    margin-left: 10px;
  }
`;

const BtnSendMessage = styled(Button).attrs(({ theme }) => {
  return { color: theme.colors.primary };
})``;

const BtnAccept = styled(Button).attrs(({ theme }) => {
  return { color: theme.colors.primary };
})``;
