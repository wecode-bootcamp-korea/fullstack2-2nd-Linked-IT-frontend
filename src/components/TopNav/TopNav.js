import { useRef, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faBriefcase,
  faSearch,
  faUser,
  faSignOutAlt,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import SearchDropDown from './SearchDropDown/SearchDropDown';
import useClickOutside from '../../hooks/useClickOutside';
import Button from '../Button/Button';

export default function TopNav() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const inputWrapperRef = useClickOutside(() => {
    setDropdownVisible(false);
  });
  const inputRef = useRef();
  const history = useHistory();

  const clearSearchInput = () => {
    setSearchInput('');
  };

  const addToSearchHistory = (keyword = searchInput) => {
    // if there is nothing saved at start then save an empty array
    if (localStorage.getItem('searchHistory') == null) {
      localStorage.setItem('searchHistory', '[]');
    }
    // create variable
    const searchHistoryArr = JSON.parse(localStorage.getItem('searchHistory'));
    // if new search input is already included in search history array
    if (searchHistoryArr.includes(keyword)) {
      const index = searchHistoryArr.indexOf(keyword);
      searchHistoryArr.splice(index, 1);
    }
    // add new search input to front of search history array
    searchHistoryArr.unshift(keyword);
    // if new search history array has more than four elements, delete the last element
    if (searchHistoryArr.length > 3) searchHistoryArr.pop();
    // search history array에 갱신된 값 할당
    localStorage.setItem('searchHistory', JSON.stringify(searchHistoryArr));
  };

  const clearSearchHistory = () => {
    localStorage.removeItem('searchHistory');
  };

  const handleSubmit = e => {
    e.preventDefault();
    addToSearchHistory();
    setDropdownVisible(false);
    history.push({
      pathname: '/search',
      state: {
        keyword: searchInput,
      },
    });
    inputRef.current.blur();
  };

  return (
    <StyledNav>
      <MainWrapper>
        <LeftWrapper>
          <StyledNavLink className="logo" to="/feed" onClick={clearSearchInput}>
            <Logo alt="logo" src="/images/common_logo_squared.png" />
          </StyledNavLink>
          <InputWrapper ref={inputWrapperRef}>
            <FontAwesomeIcon
              icon={faSearch}
              className="magnifyingGlass"
              size="sm"
            />
            <form action="" onSubmit={handleSubmit}>
              <Input
                ref={inputRef}
                placeholder="검색"
                value={searchInput}
                dropdownVisible={dropdownVisible}
                onFocus={() => {
                  setDropdownVisible(true);
                }}
                onChange={e => setSearchInput(e.target.value)}
              />
            </form>
            {dropdownVisible && (
              <SearchDropDown
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                setDropdownVisible={setDropdownVisible}
                setModalVisible={setModalVisible}
                addToSearchHistory={addToSearchHistory}
              />
            )}
            {modalVisible && (
              <>
                <DarkBackground
                  area="all"
                  onClick={() => {
                    setModalVisible(false);
                    document.body.style.overflow = 'unset';
                  }}
                />
                <DeleteModal>
                  <ModalLine fontSize="20px">
                    <p>Clear Search History?</p>
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="closeButton"
                      onClick={() => {
                        setModalVisible(false);
                        document.body.style.overflow = 'unset';
                      }}
                    />
                  </ModalLine>
                  <ModalLine fontSize="16px">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Nobis exercitationem iure iusto laborum, tempore ex. Debitis
                    expedita quia iste laudantium nobis ratione possimus, dolore
                    deserunt tempora nam harum? Doloremque, quam.
                  </ModalLine>
                  <ModalLine isButtons>
                    <StyledButton
                      text="Cancel"
                      margin="0 8px 0 0"
                      onClick={() => {
                        setModalVisible(false);
                        document.body.style.overflow = 'unset';
                      }}
                    />
                    <StyledButton
                      text="Clear History"
                      onClick={() => {
                        console.log('Clear search history (localstorage)');
                        clearSearchHistory();
                        setModalVisible(false);
                        document.body.style.overflow = 'unset';
                      }}
                    />
                  </ModalLine>
                </DeleteModal>
              </>
            )}
          </InputWrapper>
        </LeftWrapper>
        <RightWrapper>
          <NavList>
            <StyledNavLink
              to="/feed"
              activeClassName="selected"
              onClick={clearSearchInput}
            >
              <FontAwesomeIcon icon={faHome} />
              <span>홈</span>
            </StyledNavLink>
            <StyledNavLink
              to="/jobs"
              activeClassName="selected"
              onClick={clearSearchInput}
            >
              <FontAwesomeIcon icon={faBriefcase} />
              <span>채용공고</span>
            </StyledNavLink>
            <StyledNavLink
              to="/profile"
              activeClassName="selected"
              onClick={clearSearchInput}
            >
              <FontAwesomeIcon icon={faUser} />
              <span>나</span>
            </StyledNavLink>
            <StyledNavLink
              to="/signin"
              onClick={clearSearchInput} // ?
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span>로그아웃</span>
            </StyledNavLink>
          </NavList>
        </RightWrapper>
      </MainWrapper>
      {dropdownVisible && <DarkBackground area="page" />}
    </StyledNav>
  );
}

const StyledNav = styled.nav`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 52px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderGrey};
  background-color: ${({ theme }) => theme.colors.white};
  z-index: 2;
  user-select: none;
`;

const MainWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1128px;
  margin: 0 24px;
  height: 100%;
  z-index: 1;
`;

const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 34px;
`;

const Logo = styled.img`
  height: 100%;
  border-radius: 10%;
  margin-right: 8px;
`;

const InputWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 280px;

  .magnifyingGlass {
    position: absolute;
    top: 9px;
    left: 20px;
    color: ${({ theme }) => theme.colors.darkGrey};
    pointer-events: none;
  }

  form {
    height: 100%;
  }
`;

const Input = styled.input`
  height: 100%;
  width: ${({ dropdownVisible }) => (dropdownVisible ? '385px' : '280px')};
  padding: 0 8px 0 40px;
  border: 1px solid ${({ theme }) => theme.colors.borderGrey};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.bgcBeige};
  transition-duration: ${({ dropdownVisible }) =>
    dropdownVisible ? '500ms' : '0'};
  outline: none;
`;

const DeleteModal = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 500px;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 10px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.white};
`;

const ModalLine = styled.div`
  display: flex;
  justify-content: ${({ isButtons }) =>
    isButtons ? 'flex-end' : 'space-between'};
  align-items: center;
  padding: ${({ isButtons }) => (isButtons ? '10px 20px' : '20px')};
  font-size: ${({ fontSize }) => fontSize};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderGrey};

  &:last-child {
    border-bottom: none;
  }

  .closeButton {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.fontGrey};
  }
`;

const StyledButton = styled(Button).attrs(({ theme, text }) => ({
  bgc: text === 'Cancel' ? null : theme.colors.primary,
  color: text === 'Cancel' ? null : theme.colors.white,
}))``;

const DarkBackground = styled.div`
  position: fixed;
  background-color: black;
  opacity: 0.6;
  top: ${({ area }) => (area === 'all' ? '0' : '52px')};
  left: 0;
  height: ${({ area }) => (area === 'all' ? '100%' : '100vh')};
  width: 100vw;
  animation: ${({ area }) => (area === 'all' ? null : 'fadein 0.5s')};
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 0.6;
    }
  }
`;

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const NavList = styled.ul`
  display: flex;
  height: 100%;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80px;
  border-bottom: 2px solid transparent;
  color: ${({ theme }) => theme.colors.darkGrey};
  cursor: pointer;

  &.logo {
    height: 100%;
    width: auto;
    border-bottom: none;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.black};
  }

  &.selected {
    border-bottom: 2px solid ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.black};
  }

  span {
    margin-top: 5px;
    font-size: 12px;
  }
`;
