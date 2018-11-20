import { USER } from "../actions/constants";
import update from 'immutability-helper';

const user = (state = {}, action) => {
    switch (action.type) {
        case USER.ADD_USER: {
            return update(state, { $set: { ...action.payload } })
        }
        default:
            return state;
    }
}

export default user;
