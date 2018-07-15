import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  });

export const onceGetNotes = (id) =>
  db.ref(`notes/${id}`).once('value');

export const doCreateNote = (userId, noteId, text, title) =>
  db.ref(`notes/${userId}/${noteId}`).set({
    text, date:Date.now(), title
  });

export const doDeleteNote = (userId, noteId) => 
  db.ref(`notes/${userId}/${noteId}`).remove()

// Other db APIs ...
