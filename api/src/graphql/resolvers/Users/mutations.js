import { NotFound, Unauthorized } from '../../../utils/errors';
import config from '../../../config';
import mailgun from '../../../utils/mailer';

export default {
    createSessionToken: async (root, args, { mongo: { Users } }) => {
        const user = await Users.findOne({ email: args.email });

        if (!user) {
            throw new NotFound({
                message: 'User not found',
            });
        }

        if (!await user.checkPassword(args.password)) {
            throw new Unauthorized({
                message: 'Email or password wrong',
            });
        }

        return {
            user,
            sessionToken: await user.createSessionToken(),
        };
    },
    registerUser: async (root, args, { mongo: { Users } }) => {
        const user = await new Users(args);

        user.password = await user.getEncryptedPassword(args.password);

        await mailgun({
            to: args.email,
            subject: 'Confirm email',
            text: 'Test email text',
            html: `http://localhost/confirm-email/${user._id}`
        })

        await user.save();

        return {
            user,
            sessionToken: await user.createSessionToken(),
        };
    },
};
