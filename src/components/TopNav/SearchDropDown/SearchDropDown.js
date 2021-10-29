import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';

export default function SearchDropDown({ keywordInput }) {
  const [recentKeywords, setRecentKeywords] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('data/searchHistoryData.json')
      .then(res => res.json())
      .then(res => {
        setRecentKeywords(res.SEARCH_HISTORY_DATA);
      });
  }, []);

  if (!recentKeywords.length) return null;
  return (
    <StyledSearchDropDown onClick={e => e.preventDefault()}>
      <TopLine>
        <span>최근</span>
        <button>지우기</button>
      </TopLine>
      {recentKeywords.map(keyword => {
        return (
          <RecentSearchLine
            key={keyword.id}
            onClick={() => {
              console.log('SESARCH');
            }}
          >
            <FontAwesomeIcon icon={faClock} />
            <p>{keyword.value}</p>
          </RecentSearchLine>
        );
      })}
    </StyledSearchDropDown>
  );
}

const StyledSearchDropDown = styled.div`
  width: 450px;
  margin-top: 3px;
  border-radius: 5px;
  box-shadow: 1px 1px 5px ${({ theme }) => theme.colors.boxShadowGrey};
  background-color: ${({ theme }) => theme.colors.white};
  overflow: hidden;
  z-index: 30;

  button {
    padding: 3px 10px;
    border: none;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.white};
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.colors.backgroundGrey};
    }
  }
`;

const TopLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 0 10px;
  /* background-color: red; */
`;

const RecentSearchLine = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 10px;
  /* background-color: blue; */
  font-size: 17px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundGrey};
  }

  p {
    margin-left: 20px;
    /* background-color: red; */
  }
`;
