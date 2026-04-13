import Note from "../models/Note.model.js"

// GET ALL
export const getAllNotes = async (req, res) => {
  try {
    const data = await Note.find()
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// GET ONE
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id)
    if (!note){
      res.json({ message: "Note not found" })

    }
    res.status(200).json(note)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// CREATE
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body
    const newNote = new Note({title, content})
    await newNote.save()

    res.status(201).json({ message: "Note Created Successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// UPDATE
export const updateNote = async (req, res) => {
  try {
     const { title, content } = req.body
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
     {title, content},
      { new: true }
    )
    if (!updatedNote){
      res.json({ message: "Note not found" })
    }
    res.status(200).json(updatedNote)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// DELETE
export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id)
    if (!deletedNote){
      res.json({ message: "Note not found" })

    }
    res.status(200).json({ message: "Deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
