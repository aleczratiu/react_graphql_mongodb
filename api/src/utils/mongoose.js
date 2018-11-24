import mongoose from 'mongoose';

export const isObjectIdValid = value => mongoose.Types.ObjectId.isValid(value);

export const toObjectId = value => mongoose.Types.ObjectId(value);
