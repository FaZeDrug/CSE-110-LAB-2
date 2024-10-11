import React, { useState } from 'react';
import './App.css';
import { Label, Note } from "./types";
import { dummyNotesList } from "./constants";
import { ClickCounter } from './hooksExercise';

function App() {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (noteTitle: string) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(noteTitle)) {
        return prevFavorites.filter((title) => title !== noteTitle);
      } else {
        return [...prevFavorites, noteTitle];
      }
    });
  };

  return (
    <div className='app-container'>
      <form className="note-form">
        <div><input placeholder="Note Title" /></div>
        <div><textarea placeholder="Note Content"></textarea></div>
        <div><button type="submit">Create Note</button></div>
      </form>

      <div className="notes-grid">
        {dummyNotesList.map((note) => (
          <div key={note.id} className="note-item">
            <div className="notes-header">
              <button
                className="favorite-button"
                onClick={() => toggleFavorite(note.title)}
              >
                {favorites.includes(note.title) ? '❤️' : '🤍'}
              </button>
              <button className="remove-button">x</button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <p>{note.label}</p>
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
