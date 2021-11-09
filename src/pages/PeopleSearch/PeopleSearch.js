import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import TopNav from '../../components/TopNav/TopNav';
import Button from '../../components/Button/Button';
import UserCard from '../../components/UserCard/UserCard';
import FloatingFooter from '../../components/FloatingFooter/FloatingFooter';
import Loader from '../../components/Loader/Loader';

export default function PeopleSearch({ location }) {
  const [allPeopleList, setAllPeopleList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  const [buttonArray, setButtonArray] = useState([]);
  const [numOfResults, setNumOfResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const { keyword } = location.state;
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:10000/user${location.search}&limit=${1}`)
      .then(res => res.json())
      .then(res => {
        const resultsCount = res[0].userCount;
        const numOfPages = Math.ceil(resultsCount / postsPerPage);
        const numArray = [];
        for (let num = 1; num <= numOfPages; num++) {
          numArray.push(num);
        }
        setButtonArray(numArray);
        setNumOfResults(resultsCount);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetch(
      `http://localhost:10000/user${
        location.search
      }&limit=${postsPerPage}&offset=${(currentPage - 1) * postsPerPage}`
    )
      .then(res => res.json())
      .then(res => setAllPeopleList(res));
  }, [currentPage]);

  const goToUserProfilePage = id => {
    history.push({ pathname: `/profile/${id}` });
  };

  const goToPreviousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage !== buttonArray[buttonArray.length - 1]) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading)
    return (
      <>
        <TopNav />
        <Loader />
      </>
    );

  return (
    <>
      <TopNav />
      <Body>
        <MainWrapper>
          <SearchResultsWrapper>
            {<h1>{numOfResults} results</h1>}
            <SectionWrapper>
              <SectionHeader>People</SectionHeader>
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
                          type="ejob-l"
                          text={person.companyLocation}
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
              <PaginationWrapper>
                <RelativeButton onClick={goToPreviousPage}>
                  Previous
                </RelativeButton>
                <NumberButtonsWrapper>
                  {buttonArray.map(pageNum => {
                    return (
                      <NumberButton
                        key={pageNum}
                        onClick={() => {
                          setCurrentPage(pageNum);
                        }}
                        isSelected={currentPage === pageNum}
                      >
                        {pageNum}
                      </NumberButton>
                    );
                  })}
                </NumberButtonsWrapper>
                <RelativeButton onClick={goToNextPage}>Next</RelativeButton>
              </PaginationWrapper>
            </SectionWrapper>
          </SearchResultsWrapper>
          <SubWrapper>
            <FloatingFooterWrapper>
              <FloatingFooter />
            </FloatingFooterWrapper>
          </SubWrapper>
        </MainWrapper>
      </Body>
    </>
  );
}

const Body = styled.div`
  position: relative;
  top: 52px;
  padding: 20px 0;
  background-color: ${({ theme }) => theme.colors.bgcBeige};
`;

const MainWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1128px;
  margin: 0 auto;
`;

const SearchResultsWrapper = styled.div`
  width: 782px;
`;

const SectionWrapper = styled.div`
  margin-top: 10px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.borderGrey};
  background-color: ${({ theme }) => theme.colors.white};
`;

const SectionHeader = styled.h2`
  padding: 16px 0 4px 16px;
  font-size: 20px;
  font-weight: 800;
`;

const CardItem = styled.li`
  display: flex;
  padding: 10px 16px;
`;

const UserCardWrapper = styled.div`
  cursor: pointer;
  flex: 1;
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
`;

const FloatingFooterWrapper = styled.div`
  position: sticky;
  top: 72px;
`;

const NoResultsFound = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100px;
  padding: 0 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderGrey};
`;

const NumberButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NumberButton = styled.button`
  padding: 8px 12px;
  margin-right: 5px;
  border: none;
  border-radius: 50%;
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.btnHoverBlack : 'transparent'};
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.white : theme.colors.fontGrey};
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme, isSelected }) =>
      isSelected ? 'none' : theme.colors.btnLightGrey};
  }
`;

const RelativeButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.fontGrey};
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.btnLightGrey};
  }

  &:active {
    color: ${({ theme }) => theme.colors.black};
  }
`;
