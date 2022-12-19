import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebase";

function App() {
  // collection ref
  const colRef = collection(db, "books");

  // get collection data
  useEffect(() => {
    getDocs(colRef)
      .then((snapshot) => {
        let books = [] as any[];
        snapshot.docs.forEach((doc) => {
          books.push({ ...doc.data(), id: doc.id });
        });
        console.log(books);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  // add new book to database
  function handleAddBook(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addDoc(colRef, {
      title: title,
      author: author,
    });
    setTitle("");
    setAuthor("");
  }

  const [id, setId] = useState("");

  // delete book from database
  function handleDeleteBook(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const docRef = doc(db, "books", id);

    deleteDoc(docRef).then(() => {
      setId("");
    });
  }

  return (
    <div className="App">
      <form className="add" onSubmit={handleAddBook}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(data) => setTitle(data.target.value)}
          required
        />
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          name="author"
          value={author}
          onChange={(data) => setAuthor(data.target.value)}
          required
        />

        <input type="submit" value="Add new book" />
      </form>

      <form className="delete" onSubmit={handleDeleteBook}>
        <label htmlFor="id">Document id:</label>
        <input
          type="text"
          name="id"
          value={id}
          onChange={(data) => setId(data.target.value)}
          required
        />

        <button type="submit" onSubmit={(e) => e.preventDefault}>
          delete a book
        </button>
      </form>
    </div>
  );
}

export default App;
