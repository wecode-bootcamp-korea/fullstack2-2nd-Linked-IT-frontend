import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/Button/Button';
import GlobalFooter from '../../components/GlobalFooter/GlobalFooter';

export default function NotFound(props) {
  return (
    <Page>
      <Container>
        <Logo alt="Logo" src="/images/common_logo_full.png" />
        <Notification>Page Not Found</Notification>
        <StyleButton
          text="Go To Home &#128517;"
          onClick={() => props.history.push('/feed')}
        />
      </Container>
      <GlobalFooter isDefault={true} />
    </Page>
  );
}

const Page = styled.div`
  position: relative;
  top: 52px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1128px;
  margin: 90px 0;
`;

const Logo = styled.img`
  width: 80%;
  margin-bottom: 50px;
`;

const Notification = styled.h1`
  margin-bottom: 40px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 80px;
  font-weight: 700;
`;

const StyleButton = styled(Button).attrs({
  width: '250px',
  height: '50px',
  color: ({ theme }) => theme.colors.primary,
  fontSize: '30px',
})``;
