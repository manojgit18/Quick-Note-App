const Note = require("../models/Note.js");

const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({createdAt: -1});
    res.status(200).json(notes);
  } catch (error) {
    console.error("error in getAllNotes controller", error);
    res.status(500).json({ message: "internal server error" });
  }
};

const getById = async(req,res)=>{
    try {
        const noteRequired = await Note.findById(req.params.id)
        if(!noteRequired) return res.status(404).json({message:"The data is not found."})
        res.status(200).json({message:"The data found", "data": noteRequired})
    } catch (error) {
    console.error("error in getAllNotes controller", error);
    res.status(500).json({ message: "internal server error" });        
    }
}

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });

    await newNote.save();
    res.status(201).send({ newNote });
  } catch (error) {
    console.error("Server error", error);
    res.status(500).json({ message: "internal server error" });
  }
};

const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const updatedNode = await Note.findByIdAndUpdate(req.params.id, {
      title,
      content,
    });
    if (!updatedNode) return res.status(404).json({ message: "The id is not found at all" })
    res.status(201).json({ Note });
  } catch (error) {
    console.error("Server error", error);
    res.status(500).json({ message: "error in updatenote controller" });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const deletedNode = await Note.findByIdAndDelete(req.params.id, {
      title,
      content,
    });
    if (!deletedNode) {
       return  res.status(404).json({ message: "The id is not found at all" });
    }
    res.status(201).json({ message: "The data got deleted." });
  } catch (error) {
    console.error("Server error", error);
    res.status(500).json({ message: "error in updatenote controller" });
  }
};

module.exports = { getAllNotes, getById, createNote, updateNote, deleteNote };
