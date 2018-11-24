import { NotFound, Unauthorized, BadRequest } from '../../../utils/errors';
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
    updateSubscribe: async (root, args, { mongo: { Users } }) => {
        return Users.findByIdAndUpdate(args.id, { subscribe: args.subscribe }, { new: true });
    },
    registerUser: async (root, args, { mongo: { Users } }) => {
        const user = await new Users(args);

        const result = await Users.findOne({ email: user.email });

        if (result) {
            throw new BadRequest({
                message: 'Email already registered',
            });
        }

        // user.password = await user.getEncryptedPassword(args.password);
        await mailgun({
            to: args.email,
            subject: 'Confirm email',
            text: 'Test email text',
            html: 
            `<body style="text-align: center">
            <h2>Welcome to the event !</h2>
            <p>Use the button below to confirm your email adress.</p>
            <a href="http://localhost/confirm-email/${user._id}" 
            style="margin-top: 40px;
            background-color: #3f51b5;
            border: none;
            color: white;
            padding: 16px 32px;
            text-align: center;
            text-decoration: none; 
            display: inline-block;
            font-size: 16px; 
            -webkit-transition-duration: 0.4s;
            transition-duration: 0.4s;
            cursor: pointer;
            margin-bottom: 300px;"
            >Confirm email!</a>
            <a href="http://localhost/unsubscribe/${user._id}" 
            style="display: inline-block;
            height: 30px; 
            width: 100%">
            Unsubscribe here.</a>
            </body>`,   
        })
        await user.save();
        return {
            user,
            sessionToken: await user.createSessionToken(),
        };
    },
};
