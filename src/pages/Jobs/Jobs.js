import { useEffect, useState } from 'react';
import styled from 'styled-components';
import JobPostingDetail from './JobPostingDetail';
import JobPostingCard from '../../components/JobPostingCard/JobPostingCard';
import Button from '../../components/Button/Button';

export default function Jobs(props) {
  const { searchLocation = '대한민국', searchKeyword = 'React' } = props;

  const [totalCount, setTotalCount] = useState(0);
  const [listData, setListData] = useState([]);
  const [detailData, setDetailData] = useState({});
  const [clickedPageNumber, setClickedPageNumber] = useState(1);

  useEffect(() => {
    // getTotalCount(); // API 미구현
    getListDataByPageNumber(1);
  }, []);

  useEffect(() => {
    if (detailData.jobPostingId === undefined) {
      if (listData.length > 0) {
        clickCard(listData[0].jobPostingId);
      }
    }
  }, [listData]);

  // API 미구현
  // const getTotalCount = () => {
  //   const url = ``;
  //   fetch(url)
  //     .then(res => res.json())
  //     .then(data => {
  //       setListData(data || []);
  //     });
  // };

  const getListDataByPageNumber = pageNumber => {
    // const offset = (pageNumber - 1) * 10; // API 미구현
    // const limit = 10; // API 미구현
    const url = `http://localhost:10000/jobs`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setTotalCount((data || []).length); // getTotalCount API 미구현으로 인한 임시 로직
        setListData(data || []);
      });
  };

  const clickCard = jobPostingId => {
    const newList = listData?.map(post => {
      if (post.jobPostingId === jobPostingId) {
        getDetailDataByPostingId(jobPostingId);
        post.isClicked = true;
        return post;
      } else {
        post.isClicked = false;
        return post;
      }
    });
    setListData(newList);
  };

  const getDetailDataByPostingId = jobPostingId => {
    const url = `http://localhost:10000/jobs/${jobPostingId}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setDetailData(data || {});
      })
      .catch(console.log);
  };

  const clickPageNumber = pageNumber => {
    setClickedPageNumber(pageNumber);
    getListDataByPageNumber(pageNumber);
  };

  return (
    <Container>
      <ListSection>
        <SearchResultSummary>
          <p className="searchKeyword">
            {searchLocation} {searchKeyword}
          </p>
          <p className="searchResult">결과 {totalCount}</p>
        </SearchResultSummary>
        <CardWrapper>
          {listData?.map((post, idx) => (
            <JobPostingCard
              key={post.jobPostingId}
              {...post}
              isMain={false}
              showBtn={false}
              showBorder={idx === listData.length - 1 ? false : true}
              onClick={clickCard}
            />
          ))}
        </CardWrapper>
        <Pagination>
          {listData.length > 0 &&
            new Array(Math.ceil(totalCount / 20)).fill(0).map((el, idx) => {
              return (
                <ButtonWrapper
                  key={idx}
                  onClick={() => clickPageNumber(idx + 1)}
                >
                  <Button
                    bgc={({ theme }) =>
                      clickedPageNumber === idx + 1
                        ? theme.colors.primary
                        : theme.colors.white
                    }
                    color={({ theme }) =>
                      clickedPageNumber === idx + 1
                        ? theme.colors.white
                        : theme.colors.primary
                    }
                    text={idx + 1}
                  />
                </ButtonWrapper>
              );
            })}
        </Pagination>
      </ListSection>
      <DetailSection>
        {detailData.jobPostingId > 0 && <JobPostingDetail {...detailData} />}
      </DetailSection>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  top: 52px;
  display: flex;
  width: 1128px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.white};
  overflow: hidden;
`;

const StyledSection = styled.section`
  position: relative;
  height: 885px;
  overflow: scroll;
`;

const ListSection = styled(StyledSection)`
  width: 44.5%;
  border-left: 1px solid ${({ theme }) => theme.colors.borderGrey};
`;

const DetailSection = styled(StyledSection)`
  width: 55.5%;
  border: 1px solid ${({ theme }) => theme.colors.borderGrey};
`;

const SearchResultSummary = styled.div`
  position: fixed;
  top: 52px;
  width: 501px;
  height: 56px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.primary};
  // z-index: 5;

  .searchKeyword {
    margin: 11px 0 6px 10px;
    font-size: 17px;
  }

  .searchResult {
    margin-left: 10px;
    font-size: 13px;
  }
`;

const CardWrapper = styled.div`
  margin-top: 56px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  border-top: 1px solid ${({ theme }) => theme.colors.borderGrey}; ;
`;

const ButtonWrapper = styled.span`
  padding: 15px 5px;
`;
