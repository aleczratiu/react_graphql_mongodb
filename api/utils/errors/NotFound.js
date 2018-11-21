import { createError } from 'apollo-errors';

const NotFound = createError('NotFound', {
    message: 'Not Found',
    data: {
        status: 404,
    },
});

export default NotFound;
