import { USER } from './constants';

export const setUser = user => ({
    type: USER.ADD_USER,
    payload: {
        user
    }
});
