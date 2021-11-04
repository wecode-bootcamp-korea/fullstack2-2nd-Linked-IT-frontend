import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/Button/Button';
import UserCard from '../../components/UserCard/UserCard';
import JobPostingCard from '../../components/JobPostingCard/JobPostingCard';
// import JOB_POSTING_DATA from '../../components/JobPostingCard/data/JobPostingData';
import FloatingFooter from '../../components/FloatingFooter/FloatingFooter';
import { SearchByKeywords } from '../../utils/SearchUtil';

export default function MainSearch({ location }) {
  const [peopleList, setPeopleList] = useState([]);
  const [jobList, setJobList] = useState([]);
  const history = useHistory();
  const { keyword } = location.state;

  useEffect(() => {
    // fetch(`${API}/${location.search}`);
    fetch('/data/peopleData.json', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(res => {
        setPeopleList(
          res.SEARCH_DATA.filter(person => SearchByKeywords(person, keyword))
        );
        // setJobList(
        //   JOB_POSTING_DATA.filter(job => SearchByKeywords(job, keyword))
        // );
      });
  }, [keyword]);

  const goToUserProfilePage = id => {
    console.log('goToUserProfilePage');
    history.push({ pathname: `/profile/${id}` });
  };

  const goToPeopleResults = () => {
    console.log('goToPeopleResults');
    history.push({
      pathname: '/search/people/',
      search: `?keywords=${keyword}&limit=SOMETHING&offset=SOMETHING`, // query string
      state: { keyword },
    });
  };

  const goToJobBoard = () => {
    console.log('goToJobBoard');
    history.push({
      pathname: '/jobs/',
      search: `?keywords=${keyword}`, // query string
      // state: {
      //   // location state
      //   // update: true,
      //   keyword: searchInput,
      // },
    });
  };

  return (
    <Page>
      <MainWrapper>
        <SearchResultsWrapper>
          {location.search && <h1>query param: {location.search}</h1>}
          {location.state && <h1>Search input: {keyword}</h1>}
          {peopleList.length > 0 && (
            <SectionWrapper>
              <SectionHeader>People</SectionHeader>
              <CardList>
                {peopleList
                  .filter(
                    (person, index) => index === 0 || index === 1 || index === 2
                  )
                  .map(person => {
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
                        {person !== peopleList[peopleList.length - 1] && (
                          <BottomBorder />
                        )}
                      </div>
                    );
                  })}
              </CardList>
              {peopleList.length > 3 && (
                <SeeAllResultsButton onClick={goToPeopleResults}>
                  See all people results
                </SeeAllResultsButton>
              )}
            </SectionWrapper>
          )}
          {jobList.length > 0 && (
            <SectionWrapper>
              <SectionHeader>Jobs</SectionHeader>
              <CardList>
                {jobList
                  .filter(
                    (job, index) => index === 0 || index === 1 || index === 2
                  )
                  .map(job => {
                    return (
                      <JobPostingCard
                        // onClick={goToJobBoard}
                        key={job.jobPostingId}
                        jobPostingId={job.jobPostingId}
                        profileImgUrl={job.profileImgUrl}
                        jobPostingTitle={job.jobPostingTitle}
                        companyId={job.companyId}
                        companyName={job.companyName}
                        companyLocation={job.companyLocation}
                        workType={job.workType}
                        createdAt={job.createdAt}
                        applicantCount={job.applicantCount}
                        isEasyApply={job.isEasyApply}
                        clicked={false}
                        isMain={true}
                        showBtn={true}
                        showBorder={
                          job === jobList[jobList.length - 1] ? false : true
                        }
                      />
                    );
                  })}
              </CardList>
              {jobList.length > 3 && (
                <SeeAllResultsButton onClick={goToJobBoard}>
                  See all job results in South Korea
                </SeeAllResultsButton>
              )}
            </SectionWrapper>
          )}
          {!peopleList.length && !jobList.length && (
            <NoResultsFound>No results found</NoResultsFound>
          )}
        </SearchResultsWrapper>
        <SubWrapper>
          <FloatingFooterWrapper>
            <FloatingFooter />
          </FloatingFooterWrapper>
        </SubWrapper>
      </MainWrapper>
    </Page>
  );
}

const Page = styled.div`
  position: relative;
  top: 52px;
  padding: 20px 0;
  background-color: ${({ theme }) => theme.colors.bgcBeige};
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

const SeeAllResultsButton = styled.button`
  width: 100%;
  padding: 20px 0;
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.borderGrey};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.fontGrey};
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.btnLightGrey};
  }
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
