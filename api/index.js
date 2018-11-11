import express from 'express';
import mongoose from 'mongoose';
import expressGraphql from 'express-graphql';
import schema from './graphql/models/schema';
import mongoModels from './database/models';
const app = express();

mongoose.connect('mongodb://ratiualex:ruffles20106ci1nn12010@ds241012.mlab.com:41012/itech');

app.use('/', expressGraphql({
    context: {
        mongo: mongoModels
    },
    schema: schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log(`Server is listening`);
});