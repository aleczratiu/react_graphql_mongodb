
import jwt from 'jsonwebtoken';
import { get } from 'lodash';
import { Unauthorized } from './errors';
import config from '../config';
import { PUBLIC_OPERATIONS } from '../constants/auth';

export const authenticate = async (token, { Users }) => {
    try {
        const decoded = jwt.verify(token, config.secret);
        return Users.findById(get(decoded, ['id'], null));
    } catch (error) {
        return null;
    }
};

export const checkAuth = async (operationName, loggedUser) => {
    if (!PUBLIC_OPERATIONS.includes(operationName)) {
        if (!loggedUser) {
            throw new Unauthorized();
        }
    }

    return true;
};
