import { useState, useEffect } from 'react';
import styled from 'styled-components';
import FriendList from './FriendList';
import TopNav from '../../components/TopNav/TopNav';
import FloatingFooter from '../../components/FloatingFooter/FloatingFooter';

const USER_ID = 1; // API 미구현으로 인한 임시 로직

export default function Connections() {
  const [friendList, setFriendList] = useState([]);
  const [friendReceiveList, setFriendReceiveList] = useState([]);
  const [friendRequestList, setFriendRequestList] = useState([]);
  const [isReloadNeeded, setIsReloadNeeded] = useState(true);

  useEffect(() => {
    getFriendListByStatus(USER_ID, 4); // 친구
    getFriendListByStatus(USER_ID, 2); // 친구요청 보냄
    getFriendListByStatus(USER_ID, 3); // 친구요청 받음
  }, []);

  useEffect(() => {
    getFriendListByStatus(USER_ID, 4); // 친구
    getFriendListByStatus(USER_ID, 2); // 친구요청 보냄
    getFriendListByStatus(USER_ID, 3); // 친구요청 받음
    setIsReloadNeeded(false);
  }, [isReloadNeeded]);

  const getFriendListByStatus = (userId, friendStatusId) => {
    const url = `http://localhost:10000/friend/my?userId=${userId}&friendStatusId=${friendStatusId}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (friendStatusId === 4) {
          setFriendList(data);
        } else if (friendStatusId === 2) {
          setFriendRequestList(data);
        } else {
          setFriendReceiveList(data);
        }
      });
  };

  const handleReload = () => {
    setIsReloadNeeded(true);
  };

  return (
    <>
      <TopNav />
      <Container>
        <Main>
          <FriendList
            category="3"
            cardData={friendReceiveList}
            handleReload={handleReload}
          />
          <FriendList
            category="2"
            cardData={friendRequestList}
            handleReload={handleReload}
          />
          <FriendList
            category="4"
            cardData={friendList}
            handleReload={handleReload}
          />
        </Main>
        <FloatingFooter />
      </Container>
    </>
  );
}

const Container = styled.div`
  position: relative;
  top: 98px;
  display: flex;
  justify-content: space-between;
  width: 1128px;
  margin: 0 auto;
`;

const Main = styled.main`
  width: 782px;
  overflow: auto;
`;
