import { USER } from './constants';

export const addUser = user => ({
    type: USER.ADD_USER,
    payload: {
        user
    }
});
