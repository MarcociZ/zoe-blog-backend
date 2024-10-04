import mongoose from "mongoose";

const PostModel = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
            unique: true
        },
        text: {
            type: String,
            require: true,
        },
        tags: {
            type: Array,
            default: []
        },
        viewsCount: {
            type: Number,
            default: 0,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        imageUrl: {
            type: String
        }
    },
    {
        timestamps: true
    },
);

export default mongoose.model('Post', PostModel);