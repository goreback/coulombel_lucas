import {model, Schema, Document} from 'mongoose';

interface IPost extends Document {
    title: string;
    content: string;
    author: Schema.Types.ObjectId;
    createdAt: Date;
}

const postSchema = new Schema<IPost>({
    title: {type: String, required: true, maxlength: 100},
    content: {type: String, required: true, maxlength: 1000},
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    createdAt: {type: Date, default: Date.now}
})

const Post = model<IPost>('Post', postSchema);

export default Post