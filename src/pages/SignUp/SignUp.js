import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Button from '../../components/Button/Button';

export default function SignUp() {
  return (
    <>
      <SignUpHeader>
        <Link to="/">
          <img alt="LinkedIT Logo" src="/images/common_logo_full.png" />
        </Link>
        <h1>LinkedIn을 활용하여 기회의 문을 넓히세요.</h1>
      </SignUpHeader>
      <SignUpMain>
        <SignUpMainForm>
          <div>
            {/* <label for="email">이메일 또는 전화</label> */}
            <input
              required
              id="email"
              type="email"
              placeholder="이메일 또는 전화"
            />
          </div>
          <div>
            {/* <label for="password">비밀번호</label> */}
            <input
              required
              id="password"
              type="password"
              placeholder="비밀번호"
            />
            {/* <span>표시</span> */}
          </div>
          <Link to="#">비밀번호를 잊으셨나요?</Link>
          <Button
            type="submit"
            bgc={props => props.theme.colors.primary}
            color={`white`}
            text={`로그인`}
            width={`304px`}
            height={`52px`}
          />
        </SignUpMainForm>
        <SignUpMainSeperator>
          또<br />는
        </SignUpMainSeperator>
        <Button
          type="submit"
          bgc={`white`}
          color={props => props.theme.colors.fontGrey}
          text={
            <div>
              <i class="fab fa-apple"></i>
              <span>애플 계정으로 로그인</span>
            </div>
          }
          width={`304px`}
          height={`52px`}
        />
      </SignUpMain>
      <GoToSignIn>
        LinkedIT이 처음이세요? <Link to="/signin">회원 가입</Link>
      </GoToSignIn>
      <SignUpFooter>
        <ul>
          <li>
            <img alt="LinkedIT Logo" src="/images/common_logo_full.png" /> ©
            2021
          </li>
          <li>
            <Link to="#">사용자 약관</Link>
          </li>
          <li>
            <Link to="#">개인정보 취급방침</Link>
          </li>
          <li>
            <Link to="#">커뮤니티정책</Link>
          </li>
          <li>
            <Link to="#">쿠키정책</Link>
          </li>
          <li>
            <Link to="#">저작권정책</Link>
          </li>
          <li>
            <Link to="#">피드백 보내기</Link>
          </li>
          <li>
            <Link to="#">
              언어<i className="far fa-chevron-down"></i>
            </Link>
          </li>
        </ul>
      </SignUpFooter>
    </>
  );
}

const SignUpHeader = styled.header`
  margin: 24px auto 0 auto;
  text-align: center;

  a {
    img {
      width: 135px;
    }
  }

  h1 {
    height: 88px;
    padding: 24px 16px;

    font-size: 32px;
    line-height: 1.25;
  }
`;

const SignUpMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 352px;
  height: 410px;
  margin: 0 auto;
  box-shadow: 0 4px 12px 0 #dddddd;
  border-radius: 8px;
  padding: 26px 24px 24px;

  button {
    border: 1px solid black;
    border-radius: 28px;
    font-weight: 600;

    .fab {
      margin-right: 12px;
      color: black;
      font-size: 21px;
    }

    &:hover {
      border: 2px solid dimgrey;
      background-color: ${props => props.theme.colors.btnLightGrey};
    }
  }
`;

const SignUpMainForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: flex-start;

  height: 236px;

  div {
    position: relative;

    label {
      position: absolute;
      top: 26px;
      left: 13px;

      color: ${props => props.theme.colors.fontGrey};
      font-size: 19px;
    }

    input {
      width: 304px;
      height: 52px;
      margin-top: 8px;
      border: 1px solid black;
      border-radius: 4px;
      padding: 2px 0 0 12px;
      font-size: 19px;
    }

    span {
      position: absolute;
      top: 28px;
      right: 12px;

      color: ${props => props.theme.colors.primary};
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
    }
  }

  a {
    width: 150px;
    margin-top: 4px;

    color: ${props => props.theme.colors.primary};
    font-weight: 600;

    &:hover {
      background-color: ${props => props.theme.colors.bgcLightBlue};
      text-decoration: underline;
    }
  }

  button {
    margin-top: 8px;
    border: 0;

    &:hover {
      border: 0;
      background-color: ${props => props.theme.colors.btnNavy};
    }
  }
`;

const SignUpMainSeperator = styled.span`
  display: flex;
  align-items: center;

  color: ${props => props.theme.colors.fontGrey};
  font-size: 15px;
  text-align: center;
  line-height: 1.3;

  &::before,
  &::after {
    content: '';
    flex-grow: 1;

    height: 1px;
    margin: 0 16px;
    background: #c4c4c4;
  }
`;

const GoToSignIn = styled.article`
  margin: 0 auto;
  font-size: 17px;
  text-align: center;

  a {
    display: inline-block;

    margin-left: 2px;
    color: ${props => props.theme.colors.primary};
    font-size: 16px;
    font-weight: 600;

    &:hover {
      background-color: ${props => props.theme.colors.bgcLightBlue};
      text-decoration: underline;
    }
  }
`;

const SignUpFooter = styled.footer`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);

  ul {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;

    width: 920px;
    height: 32px;
    margin: 20px auto;

    li {
      padding: 8px;
      color: ${props => props.theme.colors.fontGrey};
      font-size: 13px;

      img {
        position: relative;
        top: 3px;

        width: 56px;
        margin-right: 2px;
      }

      a {
        color: ${props => props.theme.colors.fontGrey};
        font-weight: 600;

        .far {
          margin-left: 6px;
        }

        &:hover {
          color: ${props => props.theme.colors.primary};
          text-decoration: underline;
        }
      }
    }
  }
`;
