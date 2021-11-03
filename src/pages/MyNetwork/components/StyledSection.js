import styled from 'styled-components';
import StyledHeader from './StyledHeader';
import CardListContainer from './CardListContainer';

export default function StyledSection(props) {
  const { category } = props;
  return (
    <Section category={category}>
      <StyledHeader {...props} />
      <CardListContainer {...props} />
    </Section>
  );
}

const Section = styled.section`
  width: 100%;
  height: ${({ category }) => (category === 'invitations' ? '350px' : '')};
  min-height: 200px;
  border: 1px solid ${({ theme }) => theme.colors.borderGrey};
  border-radius: 10px;
  margin-bottom: 20px;
  background-color: ${({ theme }) => theme.colors.white};
  overflow: ${({ category }) => (category === 'invitations' ? 'auto' : '')};
`;
