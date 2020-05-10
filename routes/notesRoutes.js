const express = require('express');

const {
  home,
  about,
  addNote,
  notes,
  addNoteForm,
  editNoteForm,
  deleteNote,
  editNote
} = require('../controllers/mainControllers');

const router = express.Router();

router.route('/').get(home);
router.route('/about').get(about);
router.route('/notes').get(notes).post(addNoteForm);
router.route('/notes/add').get(addNote);
router.route('/notes/:id').put(editNoteForm).delete(deleteNote);
router.route('/notes/edit/:id').get(editNote);
module.exports = router;
