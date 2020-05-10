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
    res.render('editNote', {
      note,
      pageTitle: 'Edit Note'
    })
  } catch (err) {
    console.log(err);
  }
}

exports.notes = async (req, res, next) => {
  try {
  const notes = await Note.find({}).lean().sort({ date: 'desc' });
    res.render('notes', {
      notes,
      pageTitle: 'Notes'
  })
  } catch (err) {
    console.log(err);
  }
};

exports.deleteNote = async (req, res, next) => {
  try {
  const note = await Note.findById(req.params.id);
    await note.remove();
    res.redirect('/notes');
  } catch (err) {
    console.log(err);
  }

}

exports.editNoteForm = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    note.title = req.body.title;
    note.body = req.body.body;
    await note.save();
    res.redirect('/notes');
  } catch (err) {
    console.log(err);
  }
}

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
    };
    const note = await new Note(newUser);
    await note.save();
    res.redirect('/notes');
  }
  } catch (err) {
    console.log(err);
  }

};
