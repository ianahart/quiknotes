const express = require('express');
const protectRoutes = require('../middleware/protectRoutes');

const {
  home,
  about,
  addNote,
  notes,
  addNoteForm,
  editNoteForm,
  deleteNote,
  editNote,
} = require('../controllers/mainControllers');

const router = express.Router();

router.route('/').get(home);
router.route('/about').get(about);
router.route('/notes').get(protectRoutes, notes).post(addNoteForm);
router.route('/notes/add').get(protectRoutes, addNote);
router.route('/notes/:id').put(editNoteForm).delete(deleteNote);
router.route('/notes/edit/:id').get(protectRoutes, editNote);
module.exports = router;
