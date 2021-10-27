import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import footerData from './footerData';

export default function Footer(props) {
  return (
    <>
      <StyledFooter popup={props.popup}>
        <ExitButton popup={props.popup}>
          <i className="fal fa-times"></i>
        </ExitButton>
        <GridContainer>
          <FooterLogo alt="LinkedIT Logo Image" src="/images/logo_full.png" />
          <FooterLinks>
            {footerData.links.map(data => {
              return (
                <Link key={data.id} to={data.pageLink}>
                  {data.pageName}
                  <i
                    className={
                      data.pageName !== '개인정보와 약관'
                        ? 'far fa-chevron-down inactive'
                        : 'far fa-chevron-down'
                    }
                  ></i>
                </Link>
              );
            })}
          </FooterLinks>
          <GoToHelpCenter>
            <i className="fas fa-question-circle"></i>
            <p>
              <Link to="#">궁금한 점이 있으세요?</Link>
              <br />
              LinkedIT 고객센터 바로가기
            </p>
          </GoToHelpCenter>
          <GoToMySettings>
            <i className="fas fa-cog"></i>
            <p>
              <Link to="/profile">개인정보 설정</Link>
              <br />
              설정 페이지로 가세요.
            </p>
          </GoToMySettings>
          <SelectLanguage>
            <label
              for="globalfooter-select_language"
              class="global-footer__label"
            >
              언어 선택
            </label>
            <select
              id="globalfooter-select_language"
              class="global-footer__language-selection-dropdown"
            >
              {footerData.languages.map(data => {
                return (
                  <option
                    key={data.id}
                    selected={data.selected}
                    value={data.langValue}
                    lang={data.langCode}
                  >
                    {data.langName}
                  </option>
                );
              })}
            </select>
          </SelectLanguage>
          <CopyRightNotice>WeCoder's LinkedIT Project © 2021년</CopyRightNotice>
        </GridContainer>
      </StyledFooter>
      <PopupBlocker popup={props.popup} />
    </>
  );
}

const StyledFooter = styled.footer`
  position: fixed;
  bottom: 0;
  z-index: ${props => (props.popup ? 10000 : 'auto')};

  width: 100%;
  height: ${props => (props.popup ? '282px' : '266px')};
  margin: 0 auto;
  border-radius: ${props => (props.popup ? '8px' : 0)};
  padding: 16px 24px;
  padding-bottom: ${props => (props.popup ? '16px' : 0)};

  background-color: ${props =>
    props.popup
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
    props.popup
      ? props => props.theme.colors.white
      : props => props.theme.colors.bgcBeige};
  color: gray;
  font-size: 1.6em;

  display: ${props => (props.popup ? 'block' : 'none')};

  &:hover {
    background-color: lightgray;
    cursor: pointer;
  }
`;

const GridContainer = styled.section`
  width: 1128px;
  max-width: 100%;
  margin: 24px auto;

  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 35px repeat(6, 28px);
`;

const FooterLogo = styled.img`
  width: 84px;
  max-width: 100%;
  height: 21px;

  grid-column: 1/7;
  grid-row: 1/2;
`;

const FooterLinks = styled.nav`
  grid-column: 1/4;
  grid-row: 2/7;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: repeat(5, 28px);

  a {
    color: ${props => props.theme.colors.fontGrey};
    font-size: 0.8125em;
    font-weight: 600;

    &:hover {
      color: ${props => props.theme.colors.primary};
      text-decoration: underline;
    }

    .far {
      margin-left: 6px;

      &.inactive {
        display: none;
      }
    }
  }
`;

const GoToHelpCenter = styled.article`
  position: relative;
  top: -1px;
  left: 2px;

  grid-column: 4/5;
  grid-row: 2/4;

  display: flex;

  .fas {
    position: relative;
    top: 2px;

    width: 24px;
    height: 24px;
    margin-right: 6px;

    font-size: 1.3em;
  }

  p {
    font-size: 0.8125em;
    line-height: 1.35em;

    a {
      color: ${props => props.theme.colors.fontGrey};
      font-size: 1.15em;
      font-weight: 600;

      &:hover {
        color: ${props => props.theme.colors.primary};
        text-decoration: underline;
      }
    }
  }
`;

const GoToMySettings = styled.article`
  position: relative;
  top: -4px;
  left: 2px;

  grid-column: 4/5;
  grid-row: 4/6;

  display: flex;

  .fas {
    width: 24px;
    height: 24px;
    margin-right: 6px;

    font-size: 1.3em;
  }

  p {
    position: relative;
    top: -2px;

    font-size: 0.8125em;
    line-height: 1.35em;

    a {
      color: ${props => props.theme.colors.fontGrey};
      font-size: 1.15em;
      font-weight: 600;

      &:hover {
        color: ${props => props.theme.colors.primary};
        text-decoration: underline;
      }
    }
  }
`;

const SelectLanguage = styled.aside`
  margin-left: auto;

  grid-column: 5/7;
  grid-row: 2/5;

  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 5px;
    font-size: 0.8125em;
  }

  select {
    width: 282px;
    height: 32px;
    border: 1px solid rgba(0, 0, 0, 0.6);
    border-radius: 4px;
    padding: 0 32px 0 8px;

    -webkit-appearance: none;
    background: url('/images/arrow.png') no-repeat 95% 50%;

    background-color: white;
    color: ${props => props.theme.colors.fontGrey};
    font-weight: 600;

    &:hover {
      border: 2px solid rgba(0, 0, 0, 0.6);
    }
  }
`;

const CopyRightNotice = styled.p`
  padding-top: 13px;
  font-size: 0.8125em;

  grid-column: 1/4;
  grid-row: 7/8;
`;

const PopupBlocker = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${props => (props.popup ? 5000 : 'auto')};

  width: 100vw;
  height: 100vh;

  background-color: ${props => (props.popup ? 'black' : 'transparent')};
  display: ${props => (props.popup ? 'block' : 'none')};
  opacity: ${props => (props.popup ? 0.6 : 0)};
`;
