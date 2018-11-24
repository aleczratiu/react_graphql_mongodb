import { USER } from './constants';

export const setUser = loggedUser => ({
    type: USER.ADD_USER,
    payload: loggedUser,
});

export const logOut = () => ({
    type: USER.LOGOUT,
});
