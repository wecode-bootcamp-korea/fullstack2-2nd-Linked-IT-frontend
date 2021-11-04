import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/Button/Button';
import { KAKAO_AUTH_URL, GITHUB_AUTH_URL } from './SignUpOAuth';

const { Kakao } = window;

export default function SignUpButton() {
  const history = useHistory();
  const handleSignUpWithKakao = () => {
    Kakao.Auth.login({
      scope: 'account_email, birthday, profile_image, story_permalink',
      success: function (authObj) {
        console.log('소셜 로그인 성공!?', authObj);
        fetch(`/user/signup/kakao`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            Authorization: authObj.access_token,
          },
        })
          .then(res => res.json())
          .then(res => {
            console.log(res);
            localStorage.setItem('kakaoToken', res.access_token);
            if (res.access_token) {
              // history.push('/feed');
              history.push(KAKAO_AUTH_URL);
            }
          });
      },
      fail: function (err) {
        alert(JSON.stringify(err));
      },
    });
  };

  return (
    <>
      {/* <KakaoSignUp href={KAKAO_AUTH_URL}> */}
      <KakaoSignUp>
        <Button
          onClick={handleSignUpWithKakao}
          type="button"
          bgc={`#fde500`}
          color={`black`}
          text={
            <div>
              <i class="fas fa-comment"></i>
              <span>카카오 계정으로 가입</span>
            </div>
          }
          width={`100%`}
          height={`48px`}
        />
      </KakaoSignUp>
      <GithubSignUp href={GITHUB_AUTH_URL}>
        <Button
          type="button"
          bgc={`white`}
          color={`black`}
          text={
            <div>
              <i class="fab fa-github"></i>
              <span>GitHub 계정으로 가입</span>
            </div>
          }
          width={`100%`}
          height={`48px`}
        />
      </GithubSignUp>
    </>
  );
}

const KakaoSignUp = styled.a`
  button {
    border: 0;
    border-radius: 28px;
    font-weight: 600;

    .fas {
      position: relative;
      top: 2px;

      margin-right: 12px;
      font-size: 21px;
    }

    &:hover {
      border: 1px solid ${props => props.theme.colors.darkGrey};
      background-color: #fce955;
    }
  }
`;

const GithubSignUp = styled.a`
  button {
    border: 1px solid ${props => props.theme.colors.btnHoverBlack};
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
      border: 1px solid ${props => props.theme.colors.darkGrey};
      background-color: ${props => props.theme.colors.btnLightGrey};
    }
  }
`;
