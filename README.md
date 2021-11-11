# LinkedIT Front-end 소개

- 비즈니스 전문 소셜 미디어 '[링크드인(LinkedIn)](https://www.linkedin.com/)'을 클론 코딩한 프로젝트입니다.
- 아래 이미지를 클릭하면, 본 프로젝트의 Demo 영상을 시청할 수 있습니다.
  [![[LinkedIT] Demo 영상](./public/images/readme_demo_thumbnail.png)](https://youtu.be/0SEaP6M2wdg)

### 🗓 기간

---

2021.10.25 ~ 2021.11.05 (12일)

### 🛠 기술

---

### ➡️ Front-end

<p float="left">
  <img src="https://cdn.icon-icons.com/icons2/2415/PNG/128/react_original_logo_icon_146374.png" alt="React" style="display:inline-block; width:30px; margin-right:5px; margin-left:40px">
  <img src="https://cdn.icon-icons.com/icons2/2248/PNG/128/hook_icon_138483.png" alt="React-Hooks" style="display:inline-block; width:30px; margin-right:5px;">
  <img src="https://cdn.icon-icons.com/icons2/649/PNG/128/sign_icon-icons.com_59775.png" alt="React-Router" style="display:inline-block; width:30px; margin-right:5px;">
  <img src="https://cdn.icon-icons.com/icons2/2107/PNG/128/file_type_styled_icon_130142.png" alt="Styled-Components" style="display:inline-block; width:30px; margin-right:5px;">
</p>

React, React-Hooks, React-Router, Styled-Components

</br>

### ➡️ Back-end

<p float="left">
  <img src="https://cdn.icon-icons.com/icons2/2699/PNG/128/nodejs_logo_icon_169910.png" alt="Node.js" style="display: inline-block; width: 30px; margin-right: 5px; margin-left:40px">
  <img src="https://cdn.icon-icons.com/icons2/2415/PNG/128/express_original_logo_icon_146527.png" alt="Express" style="display:inline-block; width:30px; margin-right:5px;">
  <img src="https://cdn.icon-icons.com/icons2/2415/PNG/128/mysql_original_wordmark_logo_icon_146417.png" alt="MySQL" style="display:inline-block; width:30px; margin-right:5px;">
  <img src="https://cdn.icon-icons.com/icons2/2107/PNG/128/file_type_light_prisma_icon_130444.png" alt="Prisma" style="display:inline-block; width:30px; margin-right:5px;">
  <img src="https://cdn.icon-icons.com/icons2/3053/PNG/128/postman_macos_bigsur_icon_189815.png" alt="Postman" style="display:inline-block; width:30px; margin-right:5px;">
  <img src="https://cdn.icon-icons.com/icons2/2107/PNG/128/file_type_jest_snapshot_icon_130513.png" alt="Jest" style="display:inline-block; width:30px; margin-right:5px;">
</p>

Node.js, Express, MySQL, Prisma, Postman, Jest, JWT, Bcrypt

<br/>

### 👨‍👩‍👧‍👦 Team Front-end

---

- [김시원](https://github.com/k-cool) : Profile(이력서) 페이지 및 User Card 컴포넌트 구현
- [김재원](https://github.com/jambottle) : Repo 초기 세팅 및 Home/SignUp/SignIn 페이지 및 Global & Linear Footer 컴포넌트 구현
- [이성재](https://github.com/hanslee1) : 사이트 전체 범위에 대한 검색 기능, 검색 결과 페이지 및 TopNav & Button 컴포넌트 구현
- [한승완](https://github.com/han0gu) : MyNetwork(인맥) & Jobs(채용공고) 페이지 및 Job Posting Card & Company Profile Card 컴포넌트 구현
- [한지훈](https://github.com/JivenHan) : Feed(타임라인) 페이지 및 Floating Footer 컴포넌트 구현

### 👨‍👩‍👧‍👦 Team Back-end

---

- [김민재](https://github.com/minjamie) : Repo 초기 세팅 및 Database Modeling 및 Feed API, Jobs API & Search API 구현
- [김재원](https://github.com/jambottle) : SignUp/SignIn API 및 소셜 로그인 기능 구현
- [김진성](https://github.com/jsung1103) : Prisma Schema 작성 및 Profile API 구현
- [한승완](https://github.com/han0gu) : User 간의 친구 관계를 관리하는 CRUD API 구현

### 🤝 Back-end Repository

---

https://github.com/wecode-bootcamp-korea/fullstack2-2nd-Linked-IT-backend

<br/>

## 📑 구현 기능 상세

### 1. 공통 구현 사항

- TopNav
  - 검색 창 레이아웃 및 검색 결과 표시 기능을 Dropdown 효과로 구현
  - 아이콘을 클릭하면, 각 페이지의 경로로 이동하는 기능을 NavLink 컴포넌트를 활용하여 구현
- Button
  - 주어진 Props에 따라 버튼의 색상, 아이콘 포함 여부 및 아이콘 위치 변경 등을 설정할 수 있도록 가변적으로 설계
- Global & Linear Footer
  - 많은 페이지에 기본적으로 탑재되는 Global Footer 컴포넌트를 구현 (Default Type & Modal Type)
  - SignUp/SignIn 페이지에서만 사용되는 얇은 형태의 Linear Footer를 별도의 컴포넌트로 구현
  - 해당 컴포넌트 모두 주어진 Props에 따라 표현되는 방식(Type)을 바꿀 수 있도록 가변적으로 설계
- Floating Footer
- Job Posting Card
- Company Profile Card
- User Card

### 2. Home/SignUp/SignIn 페이지

- 정규표현식을 활용하여 각 페이지에서 입력받은 이름/이메일/비밀번호의 타당성 검사 기능 구현
- 각 페이지에서 회원가입/로그인 성공 시, 다음 페이지(SignIn 또는 Feed)로 이동하는 기능 구현
- 각 페이지에서 회원가입/로그인 실패 시, 경고창으로 회원가입/로그인 실패에 대한 알림 기능 구현
- 모든 페이지에서 카카오/GitHub 계정으로 소셜 로그인이 가능하도록 해당 API와 연결 구현

### 3. Feed(타임라인) 페이지

- 화면 왼쪽에 로그인한 User의 간단한 프로필 정보를 모달 창으로 표시 (클릭 시 프로필 페이지로 이동)
- 가장 최신에 작성한 글이 최상단에 노출되며, 페이지 내 모든 모달 창은 외부를 클릭하면 닫히도록 구현
- 글(Post) 쓰기 기능과 자신이 쓴 글을 편집하고 삭제하는 기능 구현
- 글(Post)의 길이가 3줄이 넘어갈 경우에는 '더 보기' 버튼 활성화
- 6가지 좋아요(Like, Celebrate, Support, Love, Insightful, Curious) 기능 구현
- 글마다 댓글 쓰기 기능과 댓글을 편집하고 삭제하는 기능, 댓글 추천하기 기능 구현
- 화면 최하단에 도달하면, 새로운 글을 4개씩 추가로 불러오도록 Infinite Scroll 효과 구현

### 4. MyNetwork(인맥) 페이지

- 회사, 학교, 산업군 등의 사용자 정보를 기준으로 '알 수도 있는 사람'을 추천
- 각 섹션의 '모두 보기' 버튼을 클릭하면 더 많은 User 정보를 조회할 수 있도록 구현

### 5. Connections(인맥 관리) 페이지

- 받은 1촌 신청, 보낸 1촌 신청, 친구 목록을 조회 가능
- 각 요청에 대한 수락 / 거절 / 삭제 가능

### 6. Jobs(채용공고) 페이지

- 채용공고 리스트 조회 기능 구현
- 각 채용공고 카드를 클릭하면, 해당 채용공고의 상세내용을 조회 가능

### 7. Profile(이력서) 페이지

- User의 기본 정보 및 경력사항, 학력을 나타내는 레이아웃 구현
- 화면 오른쪽에 '아는 사람' 추천 리스트 구현
- 기본 정보, 경력사항, 학력을 추가하고 수정할 수 있는 모달 창 구현
- 프로필 수정을 독려하는 안내 문구를 Carousel 효과로 구현

### 8. MainSearch(검색 결과) 페이지

- User가 입력한 검색어와 연관된 인맥 및 회사의 결과를 각각 3개씩 보여주는 기능 구현
- 인맥 및 회사의 검색 결과가 각각 3개 이상인 경우에는 '결과 모두 보기' 버튼을 조건부 렌더링으로 구현
- '결과 모두 보기' 버튼 클릭 시, 해당 결과에 대한 Pagination 구현

</br>

### ※ References

---

- 본 프로젝트는 팀원들의 학습을 목적으로 [링크드인(LinkedIn)](https://www.linkedin.com/)을 참고하여 만들었습니다. 이 코드를 활용하여 상업적인 이득을 취하거나 무단으로 배포할 경우에는 법적으로 문제될 수 있습니다.
- 본 프로젝트에서 사용하고 있는 각종 이미지들은 [Unsplash](https://unsplash.com/) 등에서 무료로 배포 중인 이미지들로 대체하였습니다.
