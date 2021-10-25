import styled from 'styled-components';

export const FooterImg = styled.div`
  img {
    width: 300px;
  }
`;

export const FooterText = styled.div`
  padding: 20px;
  width: 260px;
  text-align: center;

  span {
    display: inline-block;
    padding: 0 10px;
    line-height: 28px;
    color: ${({ theme }) => theme.deepGrey};
    font-size: 14px;
  }
`;

export const FooterFooter = styled.div`
  width: 300px;
  text-align: center;
  img {
    vertical-align: middle;
    width: 70px;
  }

  span {
    line-height: 10px;
    font-size: 14px;
  }
`;
