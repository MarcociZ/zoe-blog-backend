import mongoose from "mongoose";

const UserModel = new mongoose.Schema(
    {
        fullName: {
            type: String,
            require: true

        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        passwordHash: {
            type: String,
            require: true
        },
        avatarUrl: {
            type: String
        }
    },
    {
        timestamps: true
    },
);

export default mongoose.model('User', UserModel);