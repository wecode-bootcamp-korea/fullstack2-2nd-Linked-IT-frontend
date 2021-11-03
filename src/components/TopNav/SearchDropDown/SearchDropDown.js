import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';

export default function SearchDropDown({
  searchInput,
  setSearchInput,
  setDropdownVisible,
  setModalVisible,
  addToSearchHistory,
}) {
  const [matchingResults, setMatchingResults] = useState([]);
  const searchHistory = JSON.parse(localStorage.getItem('searchHistory')); //렌더링 too much

  useEffect(() => {
    fetch('data/peopleData.json')
      .then(res => res.json())
      .then(res => {
        setMatchingResults(
          res.PEOPLE_DATA.filter(result =>
            result.name.toLowerCase().includes(searchInput.toLowerCase())
          )
        );
      });
  }, [searchInput]);

  //if nothing in search history and nothing typed in search input
  if (!searchHistory && !searchInput) return null;
  if (!searchInput || !searchInput.replace(/\s/g, '').length) {
    // FIX right side of 'IF STATEMENT LOGIC'
    return (
      <StyledSearchDropdown>
        <TopLine>
          <span>최근</span>
          <button
            onClick={() => {
              setDropdownVisible(false);
              setModalVisible(true);
              document.body.style.overflow = 'hidden';
            }}
          >
            지우기
          </button>
        </TopLine>
        {searchHistory.map(keyword => {
          return (
            <RecentSearchLine
              key={keyword}
              to={{
                pathname: '/search',
                state: { keyword },
              }}
              onClick={() => {
                addToSearchHistory(keyword);
                setSearchInput(keyword);
                setDropdownVisible(false);
              }}
            >
              <FaIcon icon={faClock} />
              <p>{keyword}</p>
            </RecentSearchLine>
          );
        })}
      </StyledSearchDropdown>
    );
  }
  return (
    <StyledSearchDropdown>
      {matchingResults.map(result => {
        const { id, name, imageUrl, relation, company } = result;
        return (
          <ResultLine
            key={id}
            to={{
              pathname: '/search',
              state: { keyword: name },
            }}
            onClick={() => {
              addToSearchHistory(name);
              setDropdownVisible(false);
              setSearchInput(name);
            }}
          >
            <img alt={`${name}'s profile'`} src={imageUrl} />
            <p>{name}</p>
            <span>&#183; {relation} &#183;</span>
            <span>{company.name}</span>
          </ResultLine>
        );
      })}
      <ResultLine
        $seeAllResults
        to={{
          pathname: '/search',
          state: { keyword: searchInput },
        }}
        onClick={() => {
          setDropdownVisible(false);
          addToSearchHistory();
        }}
      >
        <p>See all results</p>
      </ResultLine>
    </StyledSearchDropdown>
  );
}

const StyledSearchDropdown = styled.div`
  width: 600px;
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
      background-color: ${({ theme }) => theme.colors.bgcGrey};
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
`;

const RecentSearchLine = styled(Link)`
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 10px;
  font-size: 17px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.bgcGrey};
  }

  p {
    margin-left: 20px;
    color: ${({ theme }) => theme.colors.black};
    font-weight: bold;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

const FaIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.colors.fontGrey};
`;

const ResultLine = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: ${({ $seeAllResults }) =>
    $seeAllResults ? 'center' : null};
  height: 44px;
  padding: 0 10px;
  font-size: 17px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.bgcGrey};
  }

  img {
    height: 80%;
    border: 1px solid lightgrey;
    border-radius: 50%;
  }

  p {
    margin-left: 10px;
    color: ${({ theme, $seeAllResults }) => {
      const { primary, black } = theme.colors;
      return $seeAllResults ? primary : black;
    }};
    font-weight: 600;
    font-family: Arial, Helvetica, sans-serif;
  }

  span {
    margin-left: 5px;
    color: ${({ theme }) => theme.colors.fontGrey};
    font-size: 12px;
    font-family: Arial, Helvetica, sans-serif;
  }
`;
