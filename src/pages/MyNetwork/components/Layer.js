import { useState, useEffect } from 'react';
import styled from 'styled-components';
import StyledHeader from './StyledHeader';
import ProfileCard from './ProfileCard';
import Loader from '../../../components/Loader/Loader';

export default function Layer(props) {
  const QUERY_LIMIT = 16;

  const [cardList, setCardList] = useState([]);
  const [infiniteTarget, setTarget] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const url = `/data/mynetwork/userCardListData.json`;
    fetch(url)
      .then(res => res.json())
      .then(res => {
        setCardList(res.data);
      });
  }, []);

  useEffect(() => {
    let observer;
    if (infiniteTarget) {
      observer = new IntersectionObserver(callback, options);
      observer.observe(infiniteTarget);
    }
    return () => observer && observer.disconnect();
  }, [infiniteTarget]);

  useEffect(() => {}, [cardList]);

  const options = { rootMargin: '0px', threshold: 1 };

  async function callback([entry], observer) {
    if (entry.isIntersecting && !isLoading) {
      observer.unobserve(entry.target);
      await getMoreItem(cardList.length, QUERY_LIMIT);
      observer.observe(entry.target);
    }
  }

  async function getMoreItem(offset, limit) {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setCardList(cardList => cardList.concat(new Array(limit).fill(offset)));
    setIsLoading(false);
  }

  return (
    <>
      <Container>
        <StyledHeader {...props} isSticky={true} />
        <Grid>
          {cardList?.map((card, idx) => {
            return <ProfileCard key={idx} {...card} />;
          })}
        </Grid>
        <InfiniteDiv ref={setTarget} />
      </Container>
      {isLoading && <Loader />}
    </>
  );
}

const Container = styled.div`
  position: fixed;
  top: 9%;
  left: 50%;
  transform: translate(-50%);
  width: 744px;
  height: 770px;
  border: 1px solid ${({ theme }) => theme.colors.borderGrey};
  border-radius: 10px;
  margin-top: 10px;
  background-color: ${({ theme }) => theme.colors.white};
  z-index: 999;
  overflow: auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  padding: 15px 20px 25px 20px;
`;

const InfiniteDiv = styled.div``;
