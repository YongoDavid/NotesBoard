import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
},
    {timestamps: true}
);

const Notes = mongoose.model("Notes",noteSchema);
export default Notes;

// Create a schema and then create a model based of that schema 