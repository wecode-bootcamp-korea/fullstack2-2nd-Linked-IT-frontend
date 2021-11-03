import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProfileCard from './ProfileCard';
import UserCard from '../../../components/UserCard/UserCard';
import Button from '../../../components/Button/Button';
import { acceptFriendRequest } from '../../Connections/utils/TempAPI';

export default function CardListContainer(props) {
  const { category, cardData, isLayerOpened } = props;
  const [cardList, setCardList] = useState([]);

  useEffect(() => {
    setCardList(cardData);
  }, [cardData]);

  const clickBtnAccept = async friendId => {
    await acceptFriendRequest(friendId);
    alert('친구 요청을 수락하였습니다.');
    updateCardList(friendId);
  };

  const updateCardList = friendId => {
    const newList = cardList.filter(card => card.userId !== friendId);
    setCardList(newList);
  };

  return (
    <Body>
      {category === 'invitations' &&
        cardList?.map((card, idx) => {
          const { userId, school } = card;
          return (
            <UserCardWrapper
              key={userId}
              borderTop={idx === 0 ? true : false}
              borderBottom={idx === cardList.length - 1 ? false : true}
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
                <Button text="모른 척 하기"></Button>
                <BtnAccept text="수락" onClick={() => clickBtnAccept(userId)} />
              </ButtonWrapper>
            </UserCardWrapper>
          );
        })}
      {category !== 'invitations' && (
        <Grid isLayerOpened={isLayerOpened}>
          {cardList?.map((card, idx) => {
            return <ProfileCard key={idx} />;
          })}
        </Grid>
      )}
    </Body>
  );
}

const Body = styled.div`
  margin-top: 10px;
`;

const UserCardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: ${({ borderBottom }) => (borderBottom ? '1px' : '0')} solid
    ${({ theme }) => theme.colors.borderGrey};
  padding: 15px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;

  button {
    margin-left: 10px;
  }
`;

const BtnAccept = styled(Button).attrs(({ theme }) => ({
  color: theme.colors.primary,
}))``;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  padding: 0 20px 25px 20px;
`;
