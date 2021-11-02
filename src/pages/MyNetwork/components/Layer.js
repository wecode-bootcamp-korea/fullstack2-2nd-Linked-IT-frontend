import { useState, useEffect } from 'react';
import styled from 'styled-components';
import StyledHeader from './StyledHeader';
import ProfileCard from './ProfileCard';
import Loader from '../../../components/Loader/Loader';

export default function Layer(props) {
  const QUERY_LIMIT = 16;

  const [cardData, setCardData] = useState([]);
  const [infiniteTarget, setTarget] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const options = { rootMargin: '0px', threshold: 1 };

  async function callback([entry], observer) {
    console.log('callback'); // API 연결 때를 위해 남겨두었습니다. 양해 부탁드립니다.

    if (entry.isIntersecting && !isLoading) {
      observer.unobserve(entry.target);
      await getMoreItem(cardData.length, QUERY_LIMIT);
      observer.observe(entry.target);
    }
  }

  async function getMoreItem(offset, limit) {
    console.log('getMoreItem', cardData); // API 연결 때를 위해 남겨두었습니다. 양해 부탁드립니다.

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setCardData(cardData => cardData.concat(new Array(limit).fill(offset)));
    setIsLoading(false);
  }

  useEffect(() => {
    console.log('mount effect'); // API 연결 때를 위해 남겨두었습니다. 양해 부탁드립니다.
    console.log('cardData', cardData); // API 연결 때를 위해 남겨두었습니다. 양해 부탁드립니다.

    setCardData(props.cards);
  }, []);

  useEffect(() => {
    console.log('infiniteTarget effect'); // API 연결 때를 위해 남겨두었습니다. 양해 부탁드립니다.

    let observer;
    if (infiniteTarget) {
      console.log('target');
      observer = new IntersectionObserver(callback, options);
      observer.observe(infiniteTarget);
    }
    return () => observer && observer.disconnect();
  }, [infiniteTarget]);

  useEffect(() => {
    console.log('cardData effect'); // API 연결 때를 위해 남겨두었습니다. 양해 부탁드립니다.
    console.log(cardData); // API 연결 때를 위해 남겨두었습니다. 양해 부탁드립니다.
  }, [cardData]);

  return (
    <>
      <Container>
        <StyledHeader {...props} isSticky={true} />
        <Grid>
          {cardData.map((el, idx) => {
            return <ProfileCard key={idx} />;
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
  top: 3%;
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
