import mongoose from "mongoose";

const Post = new mongoose.Schema({
    name:{String, required: true},
    prompt:{String, required: true},
    photo:{String, required: true},
});

const PostSchema = mongoose.model("Post", Post);

export default PostSchema;