import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/Button/Button';
import UserCard from '../../components/UserCard/UserCard';
import FloatingFooter from '../../components/FloatingFooter/FloatingFooter';
import { SearchByKeywords } from '../../utils/SearchUtil';

export default function PeopleSearch({ location }) {
  const [allPeopleList, setAllPeopleList] = useState([]);
  const { keyword } = location.state;
  const history = useHistory();

  useEffect(() => {
    // fetch(`${API}/${location.search}`);
    fetch('/data/peopleData.json')
      .then(res => res.json())
      .then(res => {
        setAllPeopleList(
          res.SEARCH_DATA.filter(person => SearchByKeywords(person, keyword))
        );
      });
  }, []);

  const goToUserProfilePage = id => {
    console.log('goToUserProfilePage');
    history.push({ pathname: `/profile/${id}` });
  };

  return (
    <Body>
      <MainWrapper>
        <SearchResultsWrapper>
          {location.search && <h1>query param: {location.search}</h1>}
          {keyword && <h1>Search input: {keyword}</h1>}
          {<h1>{allPeopleList.length} results</h1>}
          <SectionWrapper>
            <SectionHeader>People</SectionHeader>
            <CardList>
              {allPeopleList.map(person => {
                return (
                  <div key={person.id}>
                    <CardItem>
                      <UserCardWrapper
                        onClick={() => goToUserProfilePage(person.id)}
                      >
                        <UserCard
                          profile={person}
                          withoutName="false"
                          relation="true"
                          type="location education ejob-l"
                        />
                      </UserCardWrapper>
                      <StyledButton text="1촌 신청" />
                    </CardItem>
                    {person !== allPeopleList[allPeopleList.length - 1] && (
                      <BottomBorder />
                    )}
                  </div>
                );
              })}
            </CardList>
          </SectionWrapper>
        </SearchResultsWrapper>
        <SubWrapper>
          <FloatingFooterWrapper>
            <FloatingFooter />
          </FloatingFooterWrapper>
        </SubWrapper>
      </MainWrapper>
    </Body>
  );
}

const Body = styled.div`
  position: relative; //TopNav
  top: 52px; //TopNav
  padding: 20px 0;
  background-color: ${({ theme }) => theme.colors.bgcBeige};
  /* border: 1px solid black; */
`;

const MainWrapper = styled.div`
  display: flex;
  justify-content: space-between; //no need?
  width: 1128px;
  margin: 0 auto;
  /* border: 5px solid green; */
`;

const SearchResultsWrapper = styled.div`
  width: 782px;
  /* border: 5px solid red; */
`;

const SectionWrapper = styled.div`
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.borderGrey};
  margin-bottom: 20px;
  background-color: ${({ theme }) => theme.colors.white};

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const SectionHeader = styled.h2`
  padding: 16px 0 4px 16px;
  font-size: 20px;
  font-weight: 800;
`;

const CardList = styled.ul`
  /* border: 5px solid green; */
  /* background-color: blue; */
`;

const CardItem = styled.li`
  display: flex;
  padding: 10px 16px;
`;

const UserCardWrapper = styled.div`
  cursor: pointer;
  flex: 1; // temp -성재
`;

const StyledButton = styled(Button).attrs(({ theme }) => ({
  color: theme.colors.primary,
}))``;

const BottomBorder = styled.div`
  margin-left: 98px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderGrey}; ;
`;

const SubWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 5px solid yellow; */
`;

const FloatingFooterWrapper = styled.div`
  position: sticky;
  top: 72px;
  /* border: 1px solid black; */
`;

const NoResultsFound = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: red; */
  font-size: 50px;
`;
