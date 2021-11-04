const KAKAO = {
  REST_API_KEY: '4a6ec41905e8e867071f7134baa63579',
  REDIRECT_URI: 'http://localhost:3000/feed/kakao',
};

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO.REST_API_KEY}&redirect_uri=${KAKAO.REDIRECT_URI}&response_type=code`;

const GITHUB = {
  CLIENT_ID: '084ba54e6d8807d052a7',
  REDIRECT_URI: 'http://localhost:3000/feed/github',
};

export const GITHUB_AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${GITHUB.CLIENT_ID}&redirect_uri=${GITHUB.REDIRECT_URI}`;
