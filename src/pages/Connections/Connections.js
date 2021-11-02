import { useState, useEffect } from 'react';
import styled from 'styled-components';
import UserCard from '../../components/UserCard/UserCard';
import Button from '../../components/Button/Button';
import FloatingFooter from '../../components/FloatingFooter/FloatingFooter';

export default function Connections(props) {
  const [userCardList, setUserCardList] = useState([]);
  const [filteredCardList, setFilteredCardList] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [sortCriteria, setSortCriteria] = useState('');

  useEffect(() => {
    const url = `/data/mynetwork/userCardListData.json`;
    fetch(url)
      .then(res => res.json())
      .then(res => {
        setUserCardList(res.data);
        setFilteredCardList(res.data);
      });
  }, []);

  useEffect(() => {
    const filteredList = userCardList.filter((card, idx) => {
      if (
        card.firstName.indexOf(searchInput) > -1 ||
        card.lastName.indexOf(searchInput) > -1
      ) {
        return true;
      }
    });
    setFilteredCardList(filteredList);
  }, [searchInput]);

  useEffect(() => {
    const sortedList = [...filteredCardList].sort(compareName);
    setFilteredCardList(sortedList);
  }, [sortCriteria]);

  function compareName(obj1, obj2) {
    if (sortCriteria === 'asc') {
      if (obj1.lastName < obj2.lastName) {
        return -1;
      } else if (obj1.lastName === obj2.lastName) {
        if (obj1.firstName < obj2.firstName) {
          return -1;
        } else {
          return 1;
        }
      } else {
        return 1;
      }
    } else if (sortCriteria === 'desc') {
      if (obj1.lastName < obj2.lastName) {
        return 1;
      } else if (obj1.lastName === obj2.lastName) {
        if (obj1.firstName < obj2.firstName) {
          return 1;
        } else {
          return -1;
        }
      } else {
        return -1;
      }
    } else {
      return 0;
    }
  }

  return (
    <Container>
      <Main>
        <Header>
          <Title>1촌 {userCardList.length}명</Title>
          <AdditionalFeature>
            <Sort>
              정렬 기준
              <StyledSelect onChange={e => setSortCriteria(e.target.value)}>
                <option value="default">기본</option>
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
          {filteredCardList.map((card, idx) => {
            return (
              <UserCardWrapper
                key={card.id}
                borderBottom={
                  idx === filteredCardList.length - 1 ? false : true
                }
              >
                <UserCard
                  key={card.id}
                  profile={card}
                  withoutName="false"
                  relation="true"
                  type="location ejob"
                  text=""
                />
                <ButtonWrapper>
                  <BtnMessage text="메시지" />
                  <Button text="1촌 끊기"></Button>
                </ButtonWrapper>
              </UserCardWrapper>
            );
          })}
        </UserCardContainer>
      </Main>
      <FloatingFooter />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  top: 70px;
  display: flex;
  justify-content: space-between;
  width: 1128px;
  margin: 0 auto;
`;

const Main = styled.main`
  width: 782px;
  height: 850px;
  border: 1px solid ${({ theme }) => theme.colors.borderGrey};
  border-radius: 10px;
  overflow: auto;
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
  border: none;
  margin-left: 10px;
  text-align: center;
`;

const Search = styled.div``;

const StyledInput = styled.input`
  height: 25px;
`;

const UserCardContainer = styled.div``;

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

const BtnMessage = styled(Button).attrs({
  color: ({ theme }) => theme.colors.primary,
})``;
