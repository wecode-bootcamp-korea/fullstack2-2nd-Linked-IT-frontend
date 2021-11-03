import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/Button/Button';

export default function SignUpButton() {
  return (
    <>
      <KakaoSignUp>
        <Button
          type="submit"
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
      <GithubSignUp>
        <Button
          type="submit"
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

const KakaoSignUp = styled.div`
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

const GithubSignUp = styled.div`
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
      background-color: ${props => props.theme.colors.bgcGrey};
    }
  }
`;
