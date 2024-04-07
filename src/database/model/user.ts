import mongoose, { Document, Schema, Model } from 'mongoose';

interface IUser extends Document {
    userName: string;
    email: string;
    age: number;
}

const userSchema: Schema<IUser> = new Schema<IUser>(
    {
        userName: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
    },
    {
        timestamps: true,
    }
);

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;
