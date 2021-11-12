import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import TopNav from '../../components/TopNav/TopNav';
import Button from '../../components/Button/Button';
import UserCard from '../../components/UserCard/UserCard';
import FloatingFooter from '../../components/FloatingFooter/FloatingFooter';
import CompanyProfileCard from '../../components/CompanyProfileCard/CompanyProfileCard';
import Loader from '../../components/Loader/Loader';
import API_ENDPOINT from '../../api';

export default function MainSearch({ location }) {
  const [peopleList, setPeopleList] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { keyword } = location.state;

  useEffect(() => {
    setLoading(true);
    fetch(`${API_ENDPOINT}/user${location.search}&limit=3`)
      .then(res => res.json())
      .then(res => {
        setPeopleList(res);
      });

    fetch(`${API_ENDPOINT}/company/${location.search}&limit=3`)
      .then(res => res.json())
      .then(res => setCompanyList(res))
      .finally(() => setLoading(false));
  }, [location.search]);

  const goToUserProfilePage = id => {
    history.push({ pathname: `/profile/${id}` });
  };

  const goToPeopleResults = () => {
    history.push({
      pathname: '/search/people/',
      search: `${location.search}`,
      state: { keyword },
    });
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
      <Page>
        <MainWrapper>
          {!peopleList.length && !companyList.length ? (
            <NoResultsFound>No results found</NoResultsFound>
          ) : (
            <SearchResultsWrapper>
              {peopleList.length > 0 && (
                <SectionWrapper>
                  <SectionHeader>People</SectionHeader>
                  {peopleList.map(person => {
                    const { firstName, lastName, companyLocation } = person;
                    return (
                      <div key={`${firstName} ${lastName}`}>
                        <CardItem>
                          <CardWrapper
                            onClick={() =>
                              goToUserProfilePage(`${firstName}-${lastName}`)
                            }
                          >
                            <UserCard
                              profile={person}
                              withoutName="false"
                              relation="true"
                              type="ejob-l"
                              text={companyLocation}
                            />
                          </CardWrapper>
                          <StyledButton text="1촌 신청" />
                        </CardItem>
                        {person !== peopleList[peopleList.length - 1] && (
                          <BottomBorder />
                        )}
                      </div>
                    );
                  })}
                  {peopleList[0].userCount > 3 && (
                    <SeeAllResultsButton onClick={goToPeopleResults}>
                      See all people results
                    </SeeAllResultsButton>
                  )}
                </SectionWrapper>
              )}

              {companyList.length > 0 && (
                <SectionWrapper>
                  <SectionHeader>Companies</SectionHeader>
                  {companyList.map(company => {
                    const {
                      id,
                      companyName,
                      companyLocation,
                      companyProfileImageUrl,
                      companyCategory,
                    } = company;
                    return (
                      <div key={id}>
                        <CardItem>
                          <CardWrapper>
                            <CompanyProfileCard
                              companyId={id}
                              companyProfileImageUrl={
                                companyProfileImageUrl ||
                                'http://robohash.org/company'
                              }
                              companyName={companyName}
                              companyCategory={companyCategory}
                              companyLocation={companyLocation}
                              showBorder={false}
                            />
                          </CardWrapper>
                        </CardItem>
                        {company !== companyList[companyList.length - 1] && (
                          <BottomBorder />
                        )}
                      </div>
                    );
                  })}
                  {companyList[0].companiesCount > 3 && (
                    <SeeAllResultsButton>
                      See all company results
                    </SeeAllResultsButton>
                  )}
                </SectionWrapper>
              )}
            </SearchResultsWrapper>
          )}
          <SubWrapper>
            <FloatingFooterWrapper>
              <FloatingFooter />
            </FloatingFooterWrapper>
          </SubWrapper>
        </MainWrapper>
      </Page>
    </>
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
  justify-content: space-between;
  width: 1128px;
  margin: 0 auto;
`;

const SearchResultsWrapper = styled.div`
  width: 782px;
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

const CardItem = styled.li`
  display: flex;
  padding: 10px 16px;
`;

const CardWrapper = styled.div`
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
