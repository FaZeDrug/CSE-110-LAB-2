import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";

describe("Create StickyNote", () => {
 test("renders create note form", () => {
   render(<StickyNotes />);

   const createNoteButton = screen.getByText("Create Note");
   expect(createNoteButton).toBeInTheDocument();
 });

 test("creates a new note", () => {
   render(<StickyNotes />);

// Please make sure your sticky note has a title and content input field with the following placeholders.
   const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
   const createNoteContentTextarea =
     screen.getByPlaceholderText("Note Content");
   const createNoteButton = screen.getByText("Create Note");

   fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
   fireEvent.change(createNoteContentTextarea, {
     target: { value: "Note content" },
   });
   fireEvent.click(createNoteButton);

   const newNoteTitle = screen.getByText("New Note");
   const newNoteContent = screen.getByText("Note content");

   expect(newNoteTitle).toBeInTheDocument();
   expect(newNoteContent).toBeInTheDocument();
 });
});


 //OUR TESTS BELOW

describe("Checks Notes", () => {
 test("checks for all notes", () => {
  render(<StickyNotes />);

  const note1 = screen.getByText("test note 1 title");
  const note2 = screen.getByText("test note 2 title");
  const note3 = screen.getByText("test note 3 title");
  const note4 = screen.getByText("test note 4 title");
  const note5 = screen.getByText("test note 5 title");
  const note6 = screen.getByText("test note 6 title");


  expect(note1).toBeInTheDocument();
  expect(note2).toBeInTheDocument();
  expect(note3).toBeInTheDocument();
  expect(note4).toBeInTheDocument();
  expect(note5).toBeInTheDocument();
  expect(note6).toBeInTheDocument();
});
});

describe("Update and Delete Notes", () => {
 test("updates a note", () => {
    render(<StickyNotes />);
 
    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea =
      screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");
 
    fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
    fireEvent.change(createNoteContentTextarea, {
      target: { value: "Note content" },
    });
    fireEvent.click(createNoteButton);
 
    const newNoteTitle = screen.getByText("New Note");
    const newNoteContent = screen.getByText("Note content");

    fireEvent.blur(newNoteTitle, {target: {textContent: "New Note edited"}});
    fireEvent.blur(newNoteContent, {target: {textContent: "Note content edited"}});

    const newNoteTitleEdited = screen.getByText("New Note edited");
    const newNoteContentEdited = screen.getByText("Note content edited");
 
    expect(newNoteTitleEdited).toBeInTheDocument();
    expect(newNoteContentEdited).toBeInTheDocument();
  });

 test("deletes a note", () => {
    render(<StickyNotes />);
 
    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea =
      screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");
 
    fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
    fireEvent.change(createNoteContentTextarea, {
      target: { value: "Note content" },
    });
    fireEvent.click(createNoteButton);
 
    const newNoteTitle = screen.getByText("New Note");
    const newNoteContent = screen.getByText("Note content");

    const deleteNoteButton = screen.getByTestId("remove-button-7")

    fireEvent.click(deleteNoteButton);
 
    expect(newNoteTitle).not.toBeInTheDocument();
    expect(newNoteContent).not.toBeInTheDocument();
  });
});

describe("Favorite Notes", () => {
  test("favorites a note", () => {
    const {container} = render(<StickyNotes />);

    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea =
      screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");
 
    fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
    fireEvent.change(createNoteContentTextarea, {
      target: { value: "Note content" },
    });
    fireEvent.click(createNoteButton);
 
    const newNoteTitle = screen.getByText("New Note");
    const newNoteContent = screen.getByText("Note content");

    const favButton = screen.getByTestId("fav-button-7");

    fireEvent.click(favButton);

    const favorites = container.querySelector('.favorites-list');
    expect(favorites).not.toBeNull();
    expect(favorites).toHaveTextContent("New Note");
  });
});

