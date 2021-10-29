import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faBriefcase,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import SearchDropDown from './SearchDropDown/SearchDropDown';
import useClickOutside from '../../hooks/useClickOutside';

export default function TopNav() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState('feed');
  const inputWrapperRef = useClickOutside(() => {
    setDropdownVisible(false);
  });
  // const topNavRef = useRef();

  const onSubmit = e => {
    e.preventDefault();
    console.log('SUBMIT', searchInput);
  };

  return (
    <StyledNav>
      <MainWrapper>
        <LeftWrapper>
          <Link className="logo" to="/">
            <Logo
              alt="logo"
              src="/images/ItLogo.png"
              onClick={() => setCurrentPage('feed')}
            />
          </Link>
          <InputWrapper ref={inputWrapperRef}>
            <FontAwesomeIcon
              icon={faSearch}
              className="magnifyingGlass"
              size="sm"
            />
            <form action="" onSubmit={onSubmit}>
              <Input
                placeholder="검색"
                dropdownVisible={dropdownVisible}
                onFocus={() => setDropdownVisible(true)}
                onChange={e => setSearchInput(e.target.value)}
              />
            </form>
            {dropdownVisible && <SearchDropDown searchInput={searchInput} />}
          </InputWrapper>
        </LeftWrapper>
        <RightWrapper>
          <NavList>
            <NavLink
              to="/feed"
              isSelected={currentPage === 'feed' ? true : false}
              onClick={() => setCurrentPage('feed')}
            >
              <FontAwesomeIcon icon={faHome} />
              <span>홈</span>
            </NavLink>
            <NavLink
              to="/jobs"
              isSelected={currentPage === 'jobs' ? true : false}
              onClick={() => setCurrentPage('jobs')}
            >
              <FontAwesomeIcon icon={faBriefcase} />
              <span>채용공고</span>
            </NavLink>
            <NavLink
              to="/profile"
              isSelected={currentPage === 'profile' ? true : false}
              onClick={() => setCurrentPage('profile')}
            >
              <FontAwesomeIcon icon={faHome} />
              <span>나</span>
            </NavLink>
          </NavList>
        </RightWrapper>
      </MainWrapper>
      {dropdownVisible && <DarkBackground>Hello</DarkBackground>}
    </StyledNav>
  );
}

const StyledNav = styled.nav`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  /* height: 200px; */
  height: 52px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderGrey};
  background-color: ${({ theme }) => theme.colors.white};
  /* border: 10px solid red; */
  z-index: 1;
`;

const MainWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1128px;
  margin: 0 24px;
  height: 100%;
  z-index: 1;
  /* background-color: red; */
`;

const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 34px;
  /* background-color: green; */

  .logo {
    height: 100%;
    background-color: 'purple';
  }
`;

const Logo = styled.img`
  height: 100%;
  /* padding: 10px 0; */
  border-radius: 10%;
  margin-right: 10px;
`;

const InputWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 280px;
  /* width: ${({ dropdownVisible }) =>
    dropdownVisible ? '385px' : '280px'}; */
  /* padding: 0 8px 0 40px; */
  border-radius: 50px;
  /* border: 1px solid red; */
  /* background-color: red; */

  .magnifyingGlass {
    color: ${({ theme }) => theme.colors.darkGrey};
    position: absolute;
    top: 10px;
    left: 20px;
    user-select: none;
    cursor: text;
  }

  form {
    height: 100%;
    /* background-color: blue; */
  }
`;

const Input = styled.input`
  height: 100%;
  /* width: 100%; */
  width: ${({ dropdownVisible }) => (dropdownVisible ? '385px' : '100%')};
  padding: 0 8px 0 40px;
  border: none;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.bgcBeige};
  transition-duration: ${({ dropdownVisible }) =>
    dropdownVisible ? '1000ms' : '0'};
  outline: none;
`;

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  /* background-color: yellow; */
`;

const NavList = styled.ul`
  display: flex;
  height: 100%;
  /* background-color: orange; */
`;

const NavLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80px;
  border-bottom: ${({ isSelected }) =>
    isSelected ? '2px solid black' : 'none'};
  color: ${({ theme, isSelected }) => {
    // console.log('isSelected:', isSelected);
    return isSelected ? theme.colors.black : theme.colors.darkGrey;
  }};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.black};
  }

  span {
    margin-top: 5px;
    font-size: 12px;
  }
`;

const DarkBackground = styled.div`
  position: fixed;
  /* display: flex; */
  background-color: black;
  opacity: 0.6;
  top: 52px;
  height: 100vh;
  width: 100vw;
  animation: fadein 0.5s;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 0.6;
    }
  }
`;
