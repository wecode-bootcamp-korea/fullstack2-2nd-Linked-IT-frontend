import { createContext, useReducer } from 'react';

export const initialMode = 'dark';
export const initialUser = { name: 'Yoon Jiwoo' };

export const ModeContext = createContext();
export const ModeDispatchContext = createContext();
export const UserContext = createContext();
export const UserDispatchContext = createContext();

function modeReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE':
      // console.log(state, action);
      return state === 'light' ? 'dark' : 'light';
    case 'DARK':
      return 'dark';
    case 'LIGHT':
      return 'light';
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

function userReducer(state, action) {
  switch (action.type) {
    case 'LOGOUT':
      // console.log(state, action);
      return { ...state, name: initialUser.name };
    case 'UPDATE_NAME':
      // console.log(state, action);
      return { ...state, name: action.newUserName };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

export function MyContextProvider(props) {
  const [mode, modeDispatch] = useReducer(modeReducer, initialMode);
  const [user, userDispatch] = useReducer(userReducer, initialUser);

  return (
    <ModeContext.Provider value={mode}>
      <ModeDispatchContext.Provider value={modeDispatch}>
        <UserContext.Provider value={user}>
          <UserDispatchContext.Provider value={userDispatch}>
            {props.children}
          </UserDispatchContext.Provider>
        </UserContext.Provider>
      </ModeDispatchContext.Provider>
    </ModeContext.Provider>
  );
}
