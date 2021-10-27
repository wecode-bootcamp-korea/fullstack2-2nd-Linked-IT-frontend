import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Footer(props) {
  return (
    <>
      <StyledFooter bgc={props.popup}>
        <ExitButton bgc={props.popup}>
          <i class="fal fa-times"></i>
        </ExitButton>
        <GridContainer>
          <FooterLogo alt="LinkedIT Logo" src="/images/logo_full.png" />
          <FooterLinks>
            <Link to="#">회사소개</Link>
            <Link to="#">웹접근성</Link>
            <Link to="#">채용솔루션</Link>
            <Link to="#">커뮤니티정책</Link>
            <Link to="#">채용</Link>
            <Link to="#">마케팅솔루션</Link>
            <Link to="#">개인정보와 약관</Link>
            <Link to="#">Ad Choices</Link>
            <Link to="#">광고</Link>
            <Link to="#">세일즈솔루션</Link>
            <Link to="#">모바일</Link>
            <Link to="#">소규모사업체</Link>
            <Link to="#">보안센터</Link>
          </FooterLinks>
          <GoToHelpCenter>
            <Link to="#">궁금한 점이 있으세요?</Link>
            <span>LinkedIT 고객센터 바로가기</span>
          </GoToHelpCenter>
          <GoToMySettings>
            <Link to="#">개인정보 설정</Link>
            <span>설정 페이지로 가세요.</span>
          </GoToMySettings>
          <SelectLanguage></SelectLanguage>
          <CopyRightNotice>WeCoder's LinkedIT Project © 2021년</CopyRightNotice>
        </GridContainer>
      </StyledFooter>
      <PopupBlocker bgc={props.popup} />
    </>
  );
}

const StyledFooter = styled.footer`
  position: fixed;
  bottom: 0;
  z-index: ${props => (props.bgc ? 10000 : 'auto')};

  width: 100%;
  height: 282px;
  margin: 0 auto;
  border-radius: ${props => (props.bgc ? '8px' : 0)};
  padding: 16px 24px;

  background-color: ${props =>
    props.bgc
      ? props => props.theme.colors.white
      : props => props.theme.colors.bgcBeige};
  color: ${props => props.theme.colors.fontGrey};
  font-size: 1rem;
  font-family: 'Malgun Gothic', 'Apple SD Gothic Neo', system-ui;
`;

const ExitButton = styled.button`
  position: absolute;
  top: 12px;
  right: 8px;

  width: 40px;
  height: 40px;
  border: 0;
  border-radius: 50%;

  background-color: ${props =>
    props.bgc
      ? props => props.theme.colors.white
      : props => props.theme.colors.bgcBeige};
  color: gray;
  font-size: 1.6em;

  &:hover {
    background-color: lightgray;
    cursor: pointer;
  }
`;

const GridContainer = styled.footer`
  width: 1128px;
  max-width: 100%;
  margin: 24px auto;

  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 35px;
`;

const FooterLogo = styled.img`
  width: 84px;
  max-width: 100%;
  height: 21px;

  grid-column: 1/7;
`;

const FooterLinks = styled.nav`
  grid-column: 1/4;
  grid-row: 2/7;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 28px;

  a {
    color: ${props => props.theme.colors.fontGrey};
    font-size: 0.8125em;
    font-weight: 600;

    &:hover {
      color: ${props => props.theme.colors.primary};
      text-decoration: underline;
    }
  }
`;

const GoToHelpCenter = styled.div``;
const GoToMySettings = styled.div``;
const SelectLanguage = styled.div``;

const CopyRightNotice = styled.span`
  padding-top: 13px;
  font-size: 0.8125em;

  grid-column: 1/4;
  grid-row: 7/8;
`;

const PopupBlocker = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${props => (props.bgc ? 5000 : 'auto')};

  width: 100vw;
  height: 100vh;
  background-color: ${props => (props.bgc ? 'black' : 'transparent')};

  display: ${props => (props.bgc ? 'block' : 'none')};
  opacity: ${props => (props.bgc ? 0.6 : 0)};
`;
