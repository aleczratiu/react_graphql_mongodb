import { USER } from "../actions/constants";

const user = (state = {}, action) => {
    switch (action.type) {
        case USER.ADD_USER: {
            console.log(action.payload);
        }
        default:
            return state;
    }
}

export default user;
