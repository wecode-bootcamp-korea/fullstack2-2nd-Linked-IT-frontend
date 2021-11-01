import styled from 'styled-components';

export default function StyledHeader(props) {
  const { category, title, cards, isLayerOpened, isSticky, onClick } = props;

  return (
    <Header isSticky={isSticky}>
      {category === 'company' && <span>{title}에 아는 사람</span>}
      {category === 'education' && <span>{title} 출신</span>}
      {category === 'industry' && <span>{title}</span>}
      {category === 'page' && <span>페이지 맞춤 추천</span>}
      {category === 'more' && <span>제안 더 보기</span>}
      {category === 'invitations' && <span>1촌 신청</span>}
      {category !== 'invitations' && !isLayerOpened && (
        <span onClick={() => onClick({ category, title, cards })}>
          모두 보기
        </span>
      )}
      {category !== 'invitations' && isLayerOpened && (
        <img alt="close button" src="/images/ico_close.svg" onClick={onClick} />
      )}
    </Header>
  );
}

const Header = styled.header`
  position: ${({ isSticky }) => (isSticky ? 'sticky' : 'flex')};
  top: ${({ isSticky }) => (isSticky ? '0' : null)};
  display: flex;
  justify-content: space-between;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderGrey};
  padding: 15px 20px;
  background-color: ${({ theme }) => theme.colors.white};
  font-size: 18px;
  font-weight: 500;
  z-index: 999;
`;
