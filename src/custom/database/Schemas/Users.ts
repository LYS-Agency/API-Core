import { Model, Schema, model } from 'mongoose';

interface IUser {
  name: String;
}

interface IUserMethods {}

type UserModel = Model<IUser, {}, IUserMethods>;

const schema = new Schema<IUser, UserModel, IUserMethods>({
  name: { type: String, required: true },
});

export const User = model<IUser, UserModel>('User', schema);
