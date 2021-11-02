import styled from 'styled-components';
import StyledHeader from './StyledHeader';
import CardListContainer from './CardListContainer';

export default function StyledSection(props) {
  return (
    <Section>
      <StyledHeader {...props} />
      <CardListContainer {...props} />
    </Section>
  );
}

const Section = styled.section`
  width: 100%;
  min-height: 200px;
  border: 1px solid ${({ theme }) => theme.colors.borderGrey};
  border-radius: 10px;
  margin-bottom: 20px;
  background-color: ${({ theme }) => theme.colors.white};
`;
