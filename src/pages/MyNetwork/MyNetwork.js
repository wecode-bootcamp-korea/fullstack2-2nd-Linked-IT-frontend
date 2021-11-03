import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Menus from './components/Menus';
import Layer from './components/Layer';
import StyledSection from './components/StyledSection';
import FloatingFooter from '../../components/FloatingFooter/FloatingFooter';
const TEMP_DATA = new Array(8).fill(0);

export default function MyNetwork(props) {
  const [myProfileData, setMyProfileData] = useState(0);
  const [isLayerOpened, setIsLayerOpened] = useState(false);
  const [clickedCategoryInfo, setClickedCategoryInfo] = useState({});

  const { friendsCount, companyName, education, industryCategory } =
    myProfileData;

  useEffect(() => {
    getMyProfileData();
  }, []);

  const getMyProfileData = () => {
    const url = `/data/mynetwork/myProfileData.json`;
    fetch(url)
      .then(res => res.json())
      .then(res => {
        setMyProfileData(res);
      })
      .catch();
  };

  const showAll = clickedCategoryInfo => {
    setIsLayerOpened(!isLayerOpened);
    setClickedCategoryInfo(clickedCategoryInfo);
  };

  return (
    <Page>
      {isLayerOpened && <Dim onClick={showAll} />}
      <Container>
        <Management>
          <Menus connectionsCount={friendsCount} />
          <FloatingFooter />
        </Management>
        <Recommendation>
          <StyledSection category="invitations" onClick={showAll} />
          <StyledSection
            category="company"
            title={companyName}
            cards={TEMP_DATA}
            onClick={showAll}
          />
          <StyledSection
            category="education"
            title={education}
            cards={TEMP_DATA}
            onClick={showAll}
          />
          <StyledSection
            category="industry"
            title={industryCategory}
            cards={TEMP_DATA}
            onClick={showAll}
          />
          <StyledSection category="page" cards={TEMP_DATA} onClick={showAll} />
          <StyledSection category="more" cards={TEMP_DATA} onClick={showAll} />
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
