const express = require('express')
const { getAllNotes, createNote, updateNote, deleteNote, getById } = require('../controllers/notesController')

const router = express.Router()

router.get('/', getAllNotes)

router.get('/:id', getById) 

router.post('/', createNote)

router.put('/:id', updateNote)

router.delete('/:id', deleteNote)

module.exports = router;