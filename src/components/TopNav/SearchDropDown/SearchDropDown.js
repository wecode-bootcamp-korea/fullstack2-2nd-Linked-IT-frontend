import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';

export default function SearchDropdown({
  searchInput,
  setSearchInput,
  setDropdownVisible,
  setModalVisible,
}) {
  const [recentKeywords, setRecentKeywords] = useState([]);
  const [matchingResults, setMatchingResults] = useState([]);
  console.log('matchingResults:', matchingResults);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('data/searchHistoryData.json')
      .then(res => res.json())
      .then(res => {
        setRecentKeywords(res.SEARCH_HISTORY_DATA);
      });
  }, []);

  useEffect(() => {
    fetch('data/peopleData.json')
      .then(res => res.json())
      .then(res => {
        // setTimeout(() => {
        setMatchingResults(
          res.PEOPLE_DATA.filter(result =>
            result.name.toLowerCase().includes(searchInput.toLowerCase())
          )
        );
        // }, 1000);
      });
  }, [searchInput]);

  if (!recentKeywords.length && !searchInput) return null; //fix this logic
  if (!searchInput || !searchInput.replace(/\s/g, '').length) {
    return (
      <StyledSearchDropdown
      // onClick={e => e.preventDefault()}
      >
        <TopLine>
          <span>최근</span>
          <button
            onClick={() => {
              setDropdownVisible(false);
              setModalVisible(true);
            }}
          >
            지우기
          </button>
        </TopLine>
        {recentKeywords.map(keyword => {
          const { id, value } = keyword;
          return (
            <RecentSearchLine
              key={id}
              to={{
                pathname: '/search',
                // search: "?utm=your+face",
                state: { keyword: value },
              }}
              onClick={() => {
                console.log('SESARCH');
                setSearchInput(value);
                setDropdownVisible(false);
              }}
            >
              <FaIcon icon={faClock} />
              <p>{value}</p>
            </RecentSearchLine>
          );
        })}
      </StyledSearchDropdown>
    );
  }
  return (
    <StyledSearchDropdown
    // onClick={e => e.preventDefault()}
    >
      {matchingResults.map(result => {
        const { id, name, imageUrl } = result;
        return (
          <ResultLine
            key={id}
            to={{
              pathname: '/search',
              // search: "?utm=your+face",
              state: { keyword: name },
            }}
            onClick={() => {
              setDropdownVisible(false);
              setSearchInput(name);
            }}
          >
            <img alt={`${name}'s profile'`} src={imageUrl} />
            <p>{name}</p>
          </ResultLine>
        );
      })}
      <ResultLine
        seeAllResults
        to={{
          pathname: '/search',
          // search: "?utm=your+face",
          state: { keyword: searchInput },
        }}
        onClick={() => setDropdownVisible(false)}
      >
        <p>See all results</p>
      </ResultLine>
    </StyledSearchDropdown>
  );
}

const StyledSearchDropdown = styled.div`
  width: 600px;
  margin-top: 3px;
  /* padding: 10px 0; */
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

const RecentSearchLine = styled(Link)`
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 10px;
  /* background-color: blue; */
  font-size: 17px;
  cursor: pointer;
  /* border: 1px solid black; */

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundGrey};
  }

  p {
    margin-left: 20px;
    color: ${({ theme }) => theme.colors.black};
    font-weight: bold;
    font-family: Arial, Helvetica, sans-serif;
    /* background-color: red; */
  }
`;

const FaIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.colors.fontGrey};
`;

const ResultLine = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: ${({ seeAllResults }) => (seeAllResults ? 'center' : null)};
  height: 44px;
  padding: 0 10px;
  /* background-color: blue; */
  font-size: 17px;
  cursor: pointer;
  /* border: 1px solid black; */

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundGrey};
  }

  img {
    height: 80%;
    border: 1px solid lightgrey;
    border-radius: 50%;
  }

  p {
    margin-left: 10px;
    color: ${({ theme, seeAllResults }) => {
      const { primary, black } = theme.colors;
      return seeAllResults ? primary : black;
    }};
    font-weight: 600;
    font-family: Arial, Helvetica, sans-serif;
    /* background-color: red; */
  }
`;
