import React from "react";
import { useEffect, useRef, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
type Props = {};

export default function database({}: Props) {
  // collection ref
  const colRef = collection(db, "books");

  // queries
  const q = query(colRef, orderBy("createdAt", "desc"));

  // realtime collection data
  // const [bookData, setBookData] = useState([] as any[]);

  useEffect(() => {
    return onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // setBookData(data);
      console.log(data);
    });
  }, []);

  // onSnapshot(colRef, (snapshot) => {
  //   let books = [] as any[];
  //   snapshot.docs.forEach((doc) => {
  //     books.push({ ...doc.data(), id: doc.id });
  //   });
  //   console.log(books);
  // });

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  // add new book to database
  function handleAddBook(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addDoc(colRef, {
      title: title,
      author: author,
      createdAt: serverTimestamp(),
    });
    setTitle("");
    setAuthor("");
  }

  const [deleteId, setDeleteId] = useState("");

  // delete book from database
  function handleDeleteBook(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const docRef = doc(db, "books", deleteId);

    deleteDoc(docRef).then(() => {
      setDeleteId("");
    });
  }

  const [updateId, setUpdateId] = useState("");
  const [updateTitle, setUpdateTitle] = useState("");
  function handleSubmitBook(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    const docRef = doc(db, "books", updateId);
    updateDoc(docRef, {
      title: updateTitle,
    }).then(() => {
      setUpdateId("");
      setUpdateTitle("");
    });
  }

  //get a single document
  // const docRef = doc(db, "books", "Jx1Afw3ZuzC2sROoUbmp");
  // useEffect(() => {
  //   return onSnapshot(docRef, (doc) => {
  //     console.log(doc.data(), doc.id);
  //   });
  // }, []);

  return (
    <>
      <h1>Database Manipulation</h1>
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
          value={deleteId}
          onChange={(data) => setDeleteId(data.target.value)}
          required
        />
        <button type="submit" onSubmit={(e) => e.preventDefault}>
          delete a book
        </button>
      </form>

      <form className="update" onSubmit={handleSubmitBook}>
        <label htmlFor="id">Document id:</label>
        <input
          type="text"
          name="id"
          value={updateId}
          onChange={(data) => setUpdateId(data.target.value)}
          required
        />
        <label htmlFor="id">Document Title:</label>
        <input
          type="text"
          name="title"
          value={updateTitle}
          onChange={(data) => setUpdateTitle(data.target.value)}
          required
        />

        <button>Update a book</button>
      </form>
    </>
  );
}
