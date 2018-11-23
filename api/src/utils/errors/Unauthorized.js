import { createError } from 'apollo-errors';

const Unauthorized = createError('Unauthorized', {
    message: 'Unauthorized',
    data: {
        status: 401,
    },
});

export default Unauthorized;
