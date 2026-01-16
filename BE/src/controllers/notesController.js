
const getAllNotes = (req,res)=>{
    res.status(200).send("you got 15 notes")
}

const createNote = (req,res)=>{
    res.status(201).send({message:"The post was created"})
}

const updateNote = (req,res)=>{
    res.status(200).send({message:"post updated successfully"})
}

const deleteNote = (req,res)=>{
    res.status(200).send({message:"post deleted successfully"})
}

module.exports = {getAllNotes, createNote, updateNote, deleteNote}