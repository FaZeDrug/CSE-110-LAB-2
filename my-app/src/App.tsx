import React, { useState, useRef } from 'react';
import './App.css';
import { Label, Note } from './types';
import { dummyNotesList } from './constants';
import ToggleTheme from './hooksExercise';

function App() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [notes, setNotes] = useState<Note[]>(dummyNotesList);
  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
    category: 'other',
  };
  const [createNote, setCreateNote] = useState<Note>(initialNote);
  const contentRef = useRef<HTMLDivElement>(null);

  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const newNote = { ...createNote, id: notes.length + 1 };
    setNotes([newNote, ...notes]);
    setCreateNote(initialNote);
  };

  const toggleFavorite = (noteTitle: string) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(noteTitle)) {
        return prevFavorites.filter((title) => title !== noteTitle);
      } else {
        return [...prevFavorites, noteTitle];
      }
    });
  };

  const handleContentChange = (note: Note) => {
    if (contentRef.current) {
      const updatedContent = contentRef.current.textContent || "";
      const updatedNote = { ...note, content: updatedContent };
      setNotes((prevNotes) =>
        prevNotes.map((n) => (n.id === note.id ? updatedNote : n))
      );
    }
  };

  // Function to handle changes to the title
  const handleTitleChange = (event: React.FormEvent<HTMLHeadingElement>, note: Note) => {
    const updatedTitle = event.currentTarget.textContent || "";
    const updatedNote = { ...note, title: updatedTitle };
    setNotes((prevNotes) =>
      prevNotes.map((n) => (n.id === note.id ? updatedNote : n))
    );
  };

  // Function to handle changes to the label
  const handleLabelChange = (event: React.ChangeEvent<HTMLSelectElement>, note: Note) => {
    const updatedLabel = event.target.value as Label;
    const updatedNote = { ...note, label: updatedLabel };
    setNotes((prevNotes) =>
      prevNotes.map((n) => (n.id === note.id ? updatedNote : n))
    );
  };

  // Function to handle note deletion
  const handleDeleteNote = (noteId: number) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
  };

  return (
    <div className='app-container'>
      <ToggleTheme />

      <form className="note-form" onSubmit={createNoteHandler}>
        <div>
          <input
            name="title"
            placeholder="Note Title"
            value={createNote.title}
            onChange={(event) =>
              setCreateNote({ ...createNote, title: event.target.value })
            }
            required
          />
        </div>

        <div>
          <textarea
            name="content"
            placeholder="Note Content"
            value={createNote.content}
            onChange={(event) =>
              setCreateNote({ ...createNote, content: event.target.value })
            }
            required
          ></textarea>
        </div>

        <div>
          <select
            name="label"
            value={createNote.label}
            onChange={(event) =>
              setCreateNote({ ...createNote, label: event.target.value as Label })
            }
            required
          >
            <option value={Label.personal}>Personal</option>
            <option value={Label.study}>Study</option>
            <option value={Label.work}>Work</option>
            <option value={Label.other}>Other</option>
          </select>
        </div>

        <div><button type="submit">Create Note</button></div>
      </form>

      <div className="notes-grid">
        {notes.map((note) => (
          <div key={note.id} className="note-item">
            <div className="notes-header">
              <button
                className="favorite-button"
                onClick={() => toggleFavorite(note.title)}
              >
                {favorites.includes(note.title) ? '❤️' : '🤍'}
              </button>
              <button
                className="remove-button"
                onClick={() => handleDeleteNote(note.id)}
              >
                x
              </button>
            </div>
            <h2
              contentEditable={true}
              suppressContentEditableWarning={true}
              onInput={(event) => handleTitleChange(event, note)}
              className="editable-title"
            >
              {note.title}
            </h2>
            <div
              ref={contentRef}
              contentEditable={true}
              suppressContentEditableWarning={true}
              onInput={() => handleContentChange(note)}
              className="note-content"
            >
              {note.content}
            </div>
            <select
              className="editable-label"
              value={note.label}
              onChange={(event) => handleLabelChange(event, note)}
            >
              <option value={Label.personal}>Personal</option>
              <option value={Label.study}>Study</option>
              <option value={Label.work}>Work</option>
              <option value={Label.other}>Other</option>
            </select>
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
    </div>
  );
}

export default App;
