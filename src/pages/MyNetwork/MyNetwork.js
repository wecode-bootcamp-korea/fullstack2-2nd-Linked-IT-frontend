import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Menus from './components/Menus';
import Layer from './components/Layer';
import StyledSection from './components/StyledSection';
import TopNav from '../../components/TopNav/TopNav';
import FloatingFooter from '../../components/FloatingFooter/FloatingFooter';
import API_ENDPOINT from '../../api';

const TEMP_DATA = new Array(8).fill(0);

const USER_ID = 1; // API 미구현으로 인한 임시 로직

export default function MyNetwork() {
  const [friendCount, setFriendCount] = useState(0);
  const [myProfileData, setMyProfileData] = useState(0);
  const [invitationData, setInvitationData] = useState([]);
  const [isLayerOpened, setIsLayerOpened] = useState(false);
  const [clickedCategoryInfo, setClickedCategoryInfo] = useState({});

  const { companyName, education, industryCategory } = myProfileData;

  useEffect(() => {
    getTotalFriendCount();
    getMyProfileData();
    getFriendListByStatus(USER_ID, 3); // 친구요청 받음
  }, []);

  const getTotalFriendCount = () => {
    const url = `${API_ENDPOINT}/friend/${USER_ID}/totalCount`;
    fetch(url)
      .then(res => res.json())
      .then(data => setFriendCount(data))
      .catch();
  };

  const getMyProfileData = () => {
    const url = `/data/mynetwork/myProfileData.json`;
    fetch(url)
      .then(res => res.json())
      .then(res => {
        setMyProfileData(res);
      })
      .catch(console.log);
  };

  const getFriendListByStatus = (userId, friendStatusId) => {
    const url = `${API_ENDPOINT}/friend/my?userId=${userId}&friendStatusId=${friendStatusId}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setInvitationData(data);
      });
  };

  const showAll = clickedCategoryInfo => {
    setIsLayerOpened(!isLayerOpened);
    setClickedCategoryInfo(clickedCategoryInfo);
  };

  return (
    <>
      <TopNav />
      <Page>
        {isLayerOpened && <Dim onClick={showAll} />}
        <Container>
          <Management>
            <Menus connectionsCount={friendCount} />
            <FloatingFooter />
          </Management>
          <Recommendation>
            <StyledSection
              category="invitations"
              cardData={invitationData}
              onClick={showAll}
            />
            <StyledSection
              category="company"
              title={companyName}
              cardData={TEMP_DATA}
              onClick={showAll}
            />
            <StyledSection
              category="education"
              title={education}
              cardData={TEMP_DATA}
              onClick={showAll}
            />
            <StyledSection
              category="industry"
              title={industryCategory}
              cardData={TEMP_DATA}
              onClick={showAll}
            />
            <StyledSection
              category="page"
              cardData={TEMP_DATA}
              onClick={showAll}
            />
            <StyledSection
              category="more"
              cardData={TEMP_DATA}
              onClick={showAll}
            />
          </Recommendation>
          {isLayerOpened && (
            <Layer
              {...clickedCategoryInfo}
              isLayerOpened={isLayerOpened}
              onClick={showAll}
            />
          )}
        </Container>
      </Page>
    </>
  );
}

const Page = styled.div`
  position: relative;
  top: 52px;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.bgcBeige};
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1128px;
  margin: 0 auto;
`;

const Management = styled.aside`
  position: sticky;
  top: 60px;
  width: 322px;
  height: 100%;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Recommendation = styled.div`
  position: relative;
  top: 8px;
  width: 782px;
`;

const Dim = styled.div`
  position: fixed;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.boxShadowGrey};
  opacity: 0.7;
  z-index: 998;
`;
