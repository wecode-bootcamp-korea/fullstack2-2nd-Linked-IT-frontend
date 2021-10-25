import styled from 'styled-components';
import JobPosting from './JobPosting';
import jobsMockData from './data/JobsMockData';

export default function Jobs() {
  return (
    <StyledJobs>
      <JobLPostingList>
        {jobsMockData.map((post, idx) => {
          return <JobPosting key={idx} {...post} />;
        })}
      </JobLPostingList>
      <JobLPostingDetail></JobLPostingDetail>
    </StyledJobs>
  );
}

const StyledJobs = styled.div`
  display: flex;
  width: 1128px;
  margin: 0 auto;
`;

const JobLPostingList = styled.section`
  width: 40%;
`;

const JobLPostingDetail = styled.section`
  width: 60%;
  border: 1px solid #ebebeb;
`;
