import { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function Search({ location }) {
  const [peopleList, setPeopleList] = useState([]);
  const [jobList, setJobList] = useState([]);
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    fetch('/data/peopleData.json', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(res => {
        setPeopleList(res.PEOPLE_DATA);
      });
  }, []);

  // console.log('peopleList', peopleList);

  return (
    <Container>
      Search:
      {location.state && <h1>{location.state.keyword}</h1>}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  top: 72px;
  border: 1px solid black;
`;
