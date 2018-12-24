import { db } from './firebase';

// Create
export const createNote = (title, content) => {
  const id = db
    .ref()
    .child('notes')
    .push().key;

  return db.ref('notes').push({ id, title, content });
};

// Read
export const getNotes = cb => db.ref('notes').on('value', cb);

// Update
export const updateNote = (id, title = '', content = '', cb) => {
  const newData = {
    title,
    content,
  };

  console.log(id);

  return db.ref(`notes/${id}`).update(newData, cb);
};

// Delete
export const deleteNote = id => {
  return db
    .ref('notes')
    .orderByChild('id')
    .equalTo(id)
    .once('value')
    .then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        db.ref('notes')
          .child(childSnapshot.key)
          .remove();
      });
    });
};
