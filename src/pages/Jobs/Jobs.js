import styled from 'styled-components';
import JobPostingCard from '../../components/JobPostingCard/JobPostingCard';
import jobsMockData from './data/JobPostingListData';

export default function Jobs() {
  return (
    <StyledJobs>
      <JobLPostingList>
        {jobsMockData.map((post, idx) => {
          return <JobPostingCard key={idx} {...post} />;
        })}
      </JobLPostingList>
      <JobLPostingDetail></JobLPostingDetail>
    </StyledJobs>
  );
}

const StyledJobs = styled.div`
  display: flex;
  width: 1128px;
  margin: 10 auto;
`;

const JobLPostingList = styled.section`
  width: 40%;
`;

const JobLPostingDetail = styled.section`
  width: 60%;
  border: 1px solid #ebebeb;
`;
