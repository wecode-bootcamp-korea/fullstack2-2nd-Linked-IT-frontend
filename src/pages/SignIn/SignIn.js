import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/Button/Button';
import LinearFooter from '../../components/LinearFooter/LinearFooter';

export default function SignIn() {
  return (
    <>
      <SignInHeader>
        <Link to="/">
          <img alt="LinkedIT Logo" src="/images/common_logo_full.png" />
        </Link>
      </SignInHeader>
      <SignInMain>
        <SignInMainHead>
          <h1>로그인하세요</h1>
          <p>업무 관련 소식을 받아보세요</p>
        </SignInMainHead>
        <SignInMainForm>
          <div>
            {/* <label for="email">이메일</label> */}
            <input required id="email" type="email" placeholder="이메일" />
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
          <p>
            <Link to="#">비밀번호를 잊으셨나요?</Link>
          </p>
          <Button
            type="submit"
            bgc={props => props.theme.colors.primary}
            color={`white`}
            text={`로그인`}
            width={`100%`}
            height={`52px`}
          />
        </SignInMainForm>
        <SignInMainSeperator>
          또<br />는
        </SignInMainSeperator>
        <Button
          type="submit"
          bgc={`white`}
          color={props => props.theme.colors.fontGrey}
          text={
            <div>
              <i class="fab fa-google"></i>
              <span>구글 계정으로 로그인</span>
            </div>
          }
          width={`100%`}
          height={`52px`}
        />
      </SignInMain>
      <GoToSignUp>
        LinkedIT이 처음이세요? <Link to="/signup">회원 가입</Link>
      </GoToSignUp>
      <LinearFooter signIn />
    </>
  );
}

const SignInHeader = styled.header`
  margin: 32px 0 0 56px;

  img {
    width: 112px;
  }
`;

const SignInMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 352px;
  height: 485px;
  margin: 42px auto 36px;
  box-shadow: 0 4px 12px 0 #dddddd;
  border-radius: 8px;
  padding: 26px 24px 24px;

  button {
    border: 1px solid black;
    border-radius: 28px;
    font-weight: 600;

    .fab {
      position: relative;
      top: 2px;

      margin-right: 12px;
      color: black;
      font-size: 21px;
    }

    &:hover {
      border: 2px solid ${props => props.theme.colors.darkGrey};
      background-color: ${props => props.theme.colors.btnLightGrey};
    }
  }
`;

const SignInMainHead = styled.div`
  h1 {
    font-size: 32px;
    font-weight: 600;
    line-height: 1.25;
  }

  p {
    margin-top: 4px;
    font-size: 15px;
  }
`;

const SignInMainForm = styled.form`
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
      width: 100%;
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

      &:hover {
        background-color: ${props => props.theme.colors.bgcLightBlue};
      }
    }
  }

  p {
    display: block;

    width: 150px;
    margin-top: 4px;

    a {
      color: ${props => props.theme.colors.primary};
      font-weight: 600;

      &:hover {
        background-color: ${props => props.theme.colors.bgcLightBlue};
        text-decoration: underline;
      }
    }
  }

  button {
    margin-top: 8px;
    border: 0;
    padding-top: 6px;

    &:hover {
      border: 0;
      background-color: ${props => props.theme.colors.btnNavy};
    }
  }
`;

const SignInMainSeperator = styled.span`
  display: flex;
  align-items: center;

  margin-top: 2px;

  color: ${props => props.theme.colors.fontGrey};
  font-size: 15px;
  text-align: center;
  line-height: 1.3;

  &::before,
  &::after {
    content: '';
    flex-grow: 1;

    height: 1px;
    margin: 0 10px;
    background: #c4c4c4;
  }
`;

const GoToSignUp = styled.article`
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
