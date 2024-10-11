import React, { useState } from 'react';
import './App.css';
import { Label, Note } from "./types";
import { dummyNotesList } from "./constants";
import { ClickCounter } from './hooksExercise';

function App() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [notes, setNotes] = useState<Note[]>(dummyNotesList);
  const [newNote, setNewNote] = useState<Note>({
    title: '',
    content: '',
    category: 'other',
    id: 0, // Use 0 as a placeholder; will be replaced when adding a new note
    label: 'other',
  });

  const toggleFavorite = (noteTitle: string) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(noteTitle)) {
        return prevFavorites.filter((title) => title !== noteTitle);
      } else {
        return [...prevFavorites, noteTitle];
      }
    });
  };

  const handleNoteChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewNote({ ...newNote, [name]: value });
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.title && newNote.content) {
      setNotes([...notes, { ...newNote, id: Date.now(), label: newNote.category as Label }]);
      setNewNote({
        title: '',
        content: '',
        category: 'other',
        id: 0,
        label: 'other',
      });
    }
  };

  const handleRemoveNote = (noteTitle: string) => {
    setNotes(notes.filter((note) => note.title !== noteTitle));
    setFavorites(favorites.filter((favTitle) => favTitle !== noteTitle));
  };

  return (
    <div className='app-container'>
      <form className="note-form" onSubmit={handleAddNote}>
        <div><input name="title" placeholder="Note Title" value={newNote.title} onChange={handleNoteChange} /></div>
        <div><textarea name="content" placeholder="Note Content" value={newNote.content} onChange={handleNoteChange}></textarea></div>
        <div>
          <select name="category" value={newNote.category} onChange={handleNoteChange}>
            <option value="other">Other</option>
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="study">Study</option>
          </select>
        </div>
        <div><button type="submit">Create Note</button></div>
      </form>

      <div className="notes-grid">
        {notes.map((note) => (
          <div key={note.id} className="note-item">
            <div className="notes-header">
              <button onClick={() => handleRemoveNote(note.title)}>x</button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <p>{note.label}</p>
            <button
              className="favorite-button"
              onClick={() => toggleFavorite(note.title)}
            >
              {favorites.includes(note.title) ? '❤️' : '🤍'}
            </button>
          </div>
        ))}
      </div>

      <div className="favorites-list">
        <h2>List of favorites:</h2>
        <ul>
          {favorites.map((title) => (
            <li key={title}>{title}</li>
          ))}
        </ul>
      </div>

      <ClickCounter />
    </div>
  );
}

export default App;
