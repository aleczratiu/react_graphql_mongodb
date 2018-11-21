import { createError } from 'apollo-errors';

const BadRequest = createError('BadRequest', {
    message: 'Bad Request',
    data: {
        status: 400,
    },
});

export default BadRequest;
