import { useState, useEffect, use } from "react";
import NoteForm from "./component/NoteForm";
import NoteList from "./component/NoteList";

const App = () => {
  const [newNote, setNewNote] = useState(() => {
    const g = JSON.parse(localStorage.getItem("newNote"));
    return g || [];
  });

  useEffect(() => {
    console.log("Mount");
    localStorage.setItem("newNote", JSON.stringify(newNote));
  }, [newNote]);

  const DeleteNote = (id) => {
    const confirmWindow = window.confirm(
      "Are you sure want to delete this Note?",
    );
    if (confirmWindow) {
      setNewNote(newNote.filter((data) => data.id !== id));
    }
  };
  return (
    <div className="max-w-lg max-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Notes App</h2>
      <NoteForm newNote={newNote} setNewNote={setNewNote} />
      <NoteList notes={newNote} deleteNote={DeleteNote} />
    </div>
  );
};

export default App;
