import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import BookCard from "./BookCard";
// eslint-disable-next-line no-undef
const BASE_URL = process.env.REACT_APP_BACKEND_URL;
const Home = () => {
  const dispatch = useDispatch();
  const book = useSelector((state) => state.book);

  useEffect(() => {
    async function fetchBooks() {
      try {
        dispatch({ type: "FETCHING_BOOKS" });
        const res = await axios.get(`${BASE_URL}/collection/books`);
        dispatch({ type: "FETCHED_BOOKS", payload: res.data.books });
      } catch (error) {
        dispatch({
          type: "FETCHING_BOOKS_ERROR",
          payload: error?.response?.data?.message,
        });
      }
    }

    fetchBooks();
  }, [dispatch]);

  if (book.loading) {
    return (
      <p style={{ fontSize: "20px", textAlign: "center" }}>Loading books...</p>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>📚 Home Page</h1>

      {book.data?.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {book.data.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      ) : (
        <p>No books found!</p>
      )}
    </div>
  );
};

export default Home;
