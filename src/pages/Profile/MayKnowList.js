import styled from 'styled-components';
import Button from '../../components/Button/Button';
import UserCard from '../../components/UserCard/UserCard';

export default function MayKonwList(props) {
  const { mayKnowList } = props;

  return (
    <StyledMayKnowList>
      <BoxHeader>
        <h2>아는 사람 찾기</h2>
      </BoxHeader>
      <BoxBody>
        <ul>
          {mayKnowList.map(list => {
            return (
              <List key={list.firstName}>
                <StyledLink href={list.github} target="_blank">
                  <UserCard profile={list} type="ejob" />
                </StyledLink>
                <ButtonWrapper>
                  <Button text="1촌 맺기" />
                </ButtonWrapper>
              </List>
            );
          })}
        </ul>
      </BoxBody>
    </StyledMayKnowList>
  );
}

const StyledMayKnowList = styled.div`
  width: 320px;
  margin-bottom: 10px;
  padding: 20px;
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 15px;
`;

const BoxHeader = styled.div`
  h2 {
    font-size: 17px;
    font-weight: 600;
  }
`;
const BoxBody = styled.div`
  margin-top: 10px;
`;

const StyledLink = styled.a`
  cursor: pointer;

  &:visited {
    .name {
      color: black;
    }

    span {
      color: gray;
    }
  }

  &:hover {
    text-decoration: underline;
  }
`;

const List = styled.li`
  padding: 5px 10px;
`;

const ButtonWrapper = styled.div`
  margin: 5px 0 0 70px;
`;
