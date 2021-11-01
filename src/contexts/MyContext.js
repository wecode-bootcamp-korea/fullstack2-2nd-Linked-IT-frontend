import { createContext } from 'react';

/*  1. 인자로 초깃값을 부여하는 경우 [= 적절한 Provider를 찾지 못했을 때만 쓰이는 값]  */
export const ModeContext = createContext('dark');
export const UserContext = createContext({ name: 'Guest' });

/*  2. 인자로 초깃값을 부여하지 않는 경우  */
// export const ModeContext = createContext();
// export const UserContext = createContext();
