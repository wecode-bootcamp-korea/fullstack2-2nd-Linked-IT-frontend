import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Menus(props) {
  const {
    connectionsCount,
    myJobPostingCount,
    addressbookCount,
    followCount,
    eventCount,
    pageCount,
    newsletterCount,
    hashtagCount,
  } = props;

  const [isMenuOpened, setIsMenuOpened] = useState(true);

  const clickisMenuOpened = () => {
    setIsMenuOpened(!isMenuOpened);
  };

  return (
    <>
      <StyledUl isMenuOpened={isMenuOpened}>
        <p>인맥 관리</p>
        <StyledLink path="connections">
          1촌<span>{connectionsCount}</span>
        </StyledLink>
        <StyledLink path="myjobposting">
          나의 채용공고<span>{myJobPostingCount}</span>
        </StyledLink>
        <StyledLink path="addressbook">
          연락처<span>{addressbookCount}</span>
        </StyledLink>
        <StyledLink path="follow">
          내가 팔로우하는 사람<span>{followCount}</span>
        </StyledLink>
        <StyledLink path="event">
          이벤트<span>{eventCount}</span>
        </StyledLink>
        <StyledLink path="page">
          페이지<span>{pageCount}</span>
        </StyledLink>
        <StyledLink path="newsletter">
          뉴스레터<span>{newsletterCount}</span>
        </StyledLink>
        <StyledLink path="hashtag">
          해시태그<span>{hashtagCount}</span>
        </StyledLink>
      </StyledUl>
      <ShowMore isMenuOpened={isMenuOpened} onClick={clickisMenuOpened}>
        <img alt="button" src="/images/footer_arrow_dropdown.png" />
        {isMenuOpened ? '숨기기' : '더 보기'}
      </ShowMore>
    </>
  );
}

const StyledUl = styled.ul`
  height: ${({ isMenuOpened }) => (isMenuOpened ? '' : '90px;')};
  border: 1px solid ${({ theme }) => theme.colors.borderGrey};
  border-radius: 10px;
  padding: 20px 15px 10px 20px;
  font-size: 18px;
  overflow: hidden;
`;

const StyledLink = styled(Link).attrs(({ path }) => {
  return { to: `${path}` };
})`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 5px 3px 40px;
  margin-top: 15px;
  background-size: contain;
  background-repeat: no-repeat;
  color: ${({ theme }) => theme.colors.fontGrey};

  background-image: ${({ path }) => {
    const root = '/images/';
    const svgUrl =
      path === 'connections'
        ? 'ico_people.svg'
        : path === 'myjobposting'
        ? 'ico_ribbon.svg'
        : path === 'addressbook'
        ? 'ico_addressbook.svg'
        : path === 'follow'
        ? 'ico_speech_bubble.svg'
        : path === 'event'
        ? 'ico_calendar.svg'
        : path === 'page'
        ? 'ico_building.svg'
        : path === 'newsletter'
        ? 'ico_newsletter.svg'
        : path === 'hashtag'
        ? 'ico_hashtag.svg'
        : '';
    return `url(${root + svgUrl})`;
  }};
`;

const ShowMore = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 0 0 0 10px;
  margin-bottom: 20px;
  cursor: pointer;

  img {
    transform: ${({ isMenuOpened }) => (isMenuOpened ? 'rotate(180deg)' : '')};
  }
`;
