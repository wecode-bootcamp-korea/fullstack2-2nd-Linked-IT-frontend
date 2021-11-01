import styled from 'styled-components';
import UserCard from '../../../components/UserCard/UserCard';
import Button from '../../../components/Button/Button';

export default function StyledBody(props) {
  const { category, cards, isLayerOpened } = props;

  return (
    <Body>
      {category === 'invitations' &&
        cards.map((card, idx) => {
          return (
            <UserCardWrapper
              key={card.id}
              borderTop={idx === 0 ? true : false}
              borderBottom={idx === cards.length - 1 ? false : true}
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
                <Button text="모른 척 하기"></Button>
                <BtnAccept text="수락" />
              </ButtonWrapper>
            </UserCardWrapper>
          );
        })}
      {category !== 'invitations' && (
        <Grid isLayerOpened={isLayerOpened}>
          {cards.map((card, idx) => {
            return <ProfileCard key={idx}>{idx + 1}</ProfileCard>;
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

const BtnAccept = styled(Button).attrs({
  color: ({ theme }) => theme.colors.primary,
})``;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  padding: 0 20px 25px 20px;
`;

const ProfileCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 289px;
  border: 1px solid ${({ theme }) => theme.colors.borderGrey};
  border-radius: 5px;
`;
