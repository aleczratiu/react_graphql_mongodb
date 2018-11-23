import express from 'express';
import mongoose from 'mongoose';
import expressGraphql from 'express-graphql';
import cors from 'cors';
import bodyParser from 'body-parser';
import { addSchemaLevelResolveFunction } from 'graphql-tools';
import schema from './graphql/models/schema';
import mongoModels from './database/models';
import { authenticate, checkAuth } from './utils';

const app = express();

mongoose.connect('mongodb://ratiualex:ruffles20106ci1nn12010@ds241012.mlab.com:41012/itech', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

addSchemaLevelResolveFunction(schema, (root, args, context, info) => (
    checkAuth(info.path.key, context.loggedUser)
));

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json({ limit: '50mb' }));
app.use('/', expressGraphql(async req => ({
    context: {
        mongo: mongoModels,
        loggedUser: await authenticate(req.headers.authorization, mongoModels),
    },
    schema,
    graphiql: true
})));

app.listen(4000, () => {
    console.log(`Server is listening`);
});