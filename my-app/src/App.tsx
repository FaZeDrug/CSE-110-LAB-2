import React, { useState } from 'react';
import './App.css';

function App() {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (noteTitle: string) => {
    setFavorites((prevFavorites: string[]) => {
      if (prevFavorites.includes(noteTitle)) {
        return prevFavorites.filter((title: string) => title !== noteTitle);
      } else {
        return [...prevFavorites, noteTitle];
      }
    });
  };

  const notes = [
    { title: 'test note 1', content: 'test note 1 content', category: 'other' },
    { title: 'test note 2', content: 'test note 2 content', category: 'personal' },
    { title: 'test note 3', content: 'test note 3 content', category: 'work' },
    { title: 'test note 4', content: 'test note 4 content', category: 'study' },
    { title: 'test note 5', content: 'test note 5 content', category: 'study' },
    { title: 'test note 6', content: 'test note 6 content', category: 'personal' },
  ];

  return (
    <div className="app-container">
      <div className="notes-grid">
        {notes.map((note) => (
          <div key={note.title} className="note-item">
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <span>{note.category}</span>
            <button
              className="favorite-button"
              onClick={() => toggleFavorite(note.title)}
            >
              {favorites.includes(note.title) ? '❤️' : '🤍'}
            </button>
          </div>
        ))}
      </div>

      {/* List of favorites positioned at the bottom left */}
      <div className="favorites-list">
        <h2>List of favorites:</h2>
        <ul>
          {favorites.map((title: string) => (
            <li key={title}>{title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
