import {
  faHome,
  faUserFriends,
  faBriefcase,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

const NAV_LINK_DATA = [
  {
    id: 1,
    title: '홈',
    url: '/feed',
    icon: faHome,
  },
  {
    id: 2,
    title: '인맥',
    url: '/mynetwork',
    icon: faUserFriends,
  },
  {
    id: 3,
    title: '채용공고',
    url: '/jobs',
    icon: faBriefcase,
  },
  {
    id: 4,
    title: '나',
    url: '/profile',
    icon: faUser,
  },
];

export default NAV_LINK_DATA;
