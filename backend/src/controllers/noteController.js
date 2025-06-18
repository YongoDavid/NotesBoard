import Note from "../models/Note.js";
// GET 
export async function getNotes (req,res){
    try {
        const notes = await Note.find().sort({createdAt:-1});
        res.status(200).json(notes)
    } catch (error) {
        console.error("Server error:", error)
        res.status(500).json({message:"Internal Server error"})
    }
};
// GET NOTE BY ID
export async function getNotesById (req,res){
    try {
        const note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).json({message: "Note not found!"})
        }
        res.status(200).json(note)
    } catch (error) {
        console.error("Error getting note by Id", error)
        res.status(500).json({message:"Internal Server error"})
    }
};

// POST 
export async function createNote(req,res){
   try {
        const {title,content} = req.body;
        const note = new Note({title,content});

        const savedNote = await note.save();
        res.status(201).json(savedNote)
   } catch (error) {
        console.error("Server error:", error)
        res.status(500).json({message:"Internal Server error"})
   }
};

// PUT/UPDATE 
export async function updateNote(req,res){
    try {
        const {title,content} = req.body;
        const updateNote = await Note.findByIdAndUpdate(req.params.id,{title,content},{
            new : true,
        });
        if(!updateNote){
            return res.status(404).json({message : "ID not found"})
        }
        res.status(200).json(updateNote);
    } catch (error) {
        console.error("Error updateNote controller",error)
        res.status(500).json({message:"Internal server error"})
    }
};

// DELETE 
export async function deleteNote(req,res){
    try {
        const deleteNote = await Note.findByIdAndDelete(req.params.id)
        if(!deleteNote){
            return res.status(404).json({message : "ID not found"})
        }
        res.status(200).json({message: "Note deleted"})
    } catch (error) {
        console.error("Error in deleteNote controller",error)
        res.status(500).json({message: "Internal server error"})
    }
};