const Note = require('../model/Note');

exports.home = (req, res, next) => {
  res.render('home', {
    pageTitle: 'Home',
  });
};

exports.about = (req, res, next) => {
  res.render('about', {
    pageTitle: 'About',
  });
};

exports.addNote = (req, res, next) => {
  res.render('addNote', {
    pageTitle: 'Add Note',
    errors: '',
  });
};

exports.editNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (note.user != req.user.id) {
      req.flash('error_message', 'Not Authorized');
      res.redirect('/notes');
    } else {
      res.render('editNote', {
        note,
        pageTitle: 'Edit Note',
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.notes = async (req, res, next) => {
  try {
    const notes = await Note.find({ user: req.user.id })
      .lean()
      .sort({ date: 'desc' });
    res.render('notes', {
      notes,
      pageTitle: 'Notes',
    });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    await note.remove();
    req.flash('success_message', 'Note was removed');
    res.redirect('/notes');
  } catch (err) {
    console.log(err);
  }
};

exports.editNoteForm = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    note.title = req.body.title;
    note.body = req.body.body;
    await note.save();
    req.flash('success_message', 'Note successfully updated');
    res.redirect('/notes');
  } catch (err) {
    console.log(err);
  }
};

exports.addNoteForm = async (req, res, next) => {
  try {
    let errors = [];
    if (!req.body.title) {
      errors.push({ text: 'Please add a title.' });
    }
    if (!req.body.body) {
      errors.push({ text: 'Please add a note body' });
    }

    if (errors.length > 0) {
      res.render('addNote', {
        pageTitle: 'Add Note',
        errors,
        title: req.body.title,
        body: req.body.body,
      });
    } else {
      const newUser = {
        title: req.body.title,
        body: req.body.body,
        user: req.user.id,
      };
      const note = await new Note(newUser);
      await note.save();
      req.flash('success_message', 'Note successfully added');
      res.redirect('/notes');
    }
  } catch (err) {
    console.log(err);
  }
};
