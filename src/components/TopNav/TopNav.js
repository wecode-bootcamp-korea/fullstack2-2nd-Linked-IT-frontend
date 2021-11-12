import { useRef, useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { NavLink, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faTimes,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import SearchDropDown from './SearchDropDown/SearchDropDown';
import Button from '../Button/Button';
import useClickOutside from '../../hooks/useClickOutside';
import { enableScroll } from '../../utils/ModalFunc';
import NAV_LINK_DATA from './NavLinkData';

export default function TopNav() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const inputWrapperRef = useClickOutside(() => {
    setDropdownVisible(false);
  });
  const inputRef = useRef();
  const history = useHistory();

  const addToSearchHistory = (keyword = searchInput) => {
    // if there is nothing saved at start then save an empty array
    if (localStorage.getItem('searchHistory') == null) {
      localStorage.setItem('searchHistory', '[]');
    }
    const searchHistoryArr = JSON.parse(localStorage.getItem('searchHistory')); // create variable
    // if new search input is already included in search history array
    if (searchHistoryArr.includes(keyword)) {
      const index = searchHistoryArr.indexOf(keyword);
      searchHistoryArr.splice(index, 1);
    }
    searchHistoryArr.unshift(keyword); // add new search input to front of search history array
    if (searchHistoryArr.length > 3) searchHistoryArr.pop(); // if new search history array has more than four elements, delete the last element
    localStorage.setItem('searchHistory', JSON.stringify(searchHistoryArr)); // search history array에 갱신된 값 할당
  };

  const clearSearchHistory = () => {
    localStorage.removeItem('searchHistory');
  };

  const clearSearchInput = () => {
    setSearchInput('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    addToSearchHistory();
    setDropdownVisible(false);
    history.push({
      pathname: '/search/all/',
      search: `?keyword=${searchInput}`,
      state: { keyword: searchInput },
    });
    inputRef.current.blur();
  };

  // Test Code for Checking UserContext
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {}, [user]);

  // Function Code for Signing Out Event
  const setSignOut = () => {
    setUser({
      firstName: 'Guest',
      lastName: '',
      email: '',
      password: '',
    });
    history.push({
      pathname: '/signin',
    });
  };

  return (
    <StyledNav>
      <MainWrapper>
        <LeftWrapper>
          <StyledNavLink
            className="logo"
            to={NAV_LINK_DATA[0].url}
            onClick={clearSearchInput}
          >
            <Logo alt="logo" src="/images/common_logo_squared.png" />
          </StyledNavLink>
          <InputWrapper ref={inputWrapperRef}>
            <form action="" onSubmit={handleSubmit}>
              <FontAwesomeIcon
                icon={faSearch}
                className="magnifyingGlass"
                size="sm"
              />
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
          </InputWrapper>
          {modalVisible && (
            <>
              <DarkBackground
                area="all"
                onClick={() => {
                  setModalVisible(false);
                  enableScroll();
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
                      enableScroll();
                    }}
                  />
                </ModalLine>
                <ModalLine fontSize="16px">
                  Your search history is only visible to you, and it helps us to
                  show you better results. Are you sure you want to clear it?
                </ModalLine>
                <ModalLine isButtons>
                  <StyledButton
                    text="Cancel"
                    margin="0 8px 0 0"
                    onClick={() => {
                      setModalVisible(false);
                      enableScroll();
                    }}
                  />
                  <StyledButton
                    text="Clear History"
                    onClick={() => {
                      clearSearchHistory();
                      setModalVisible(false);
                      enableScroll();
                    }}
                  />
                </ModalLine>
              </DeleteModal>
            </>
          )}
        </LeftWrapper>
        <RightWrapper>
          <NavList>
            {NAV_LINK_DATA.map(navItem => {
              const { id, title, url, icon } = navItem;
              return (
                <StyledNavLink
                  key={id}
                  to={url}
                  activeClassName="selected"
                  onClick={clearSearchInput}
                >
                  <FontAwesomeIcon icon={icon} />
                  <span>{title}</span>
                </StyledNavLink>
              );
            })}
            <StyledNavLink to="/signin" onClick={setSignOut}>
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
  background-color: ${({ theme }) => theme.colors.inputLightBlue};
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
    position: absolute;
    right: 10px;
    width: 40px;
    height: 40px;
    padding: 10px;
    color: ${({ theme }) => theme.colors.fontGrey};
    border-radius: 50%;
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.colors.bgcBeige};
    }
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
  /* z-index: -1; */
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
