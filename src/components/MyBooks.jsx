import React, { useEffect, useState } from "react";
import axios from "axios";
// eslint-disable-next-line no-undef
const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const MyBooks = () => {
  const [myBooks, setMyBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const statuses = ["want to read", "currently reading", "read"];

  // ✅ Fetch user's books
  useEffect(() => {
    const fetchMyBooks = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/mybooks`, {
          withCredentials: true,
        });
        setMyBooks(res.data.books);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching books:", err);
        setLoading(false);
      }
    };

    fetchMyBooks();
  }, []);

  // ✅ Handle status change
  const handleStatusChange = async (bookId, status) => {
    try {
      await axios.patch(
        `${BASE_URL}/api/mybooks/status`,
        { bookId, status },
        { withCredentials: true }
      );

      setMyBooks((prev) =>
        prev.map((book) => (book._id === bookId ? { ...book, status } : book))
      );
    } catch (err) {
      alert("Failed to update status");
      console.error(err);
    }
  };

  // ✅ Handle rating update
  const handleRatingChange = async (bookId, rating) => {
    try {
      await axios.patch(
        `${BASE_URL}/api/mybooks/rating`,
        { bookId, rating },
        { withCredentials: true }
      );

      setMyBooks((prev) =>
        prev.map((book) => (book._id === bookId ? { ...book, rating } : book))
      );
    } catch (err) {
      alert("Failed to update rating");
      console.error(err);
    }
  };

  if (loading) return <p>Loading your books...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>📖 My Books</h1>
      {myBooks.length === 0 ? (
        <p>You haven’t added any books yet.</p>
      ) : (
        myBooks.map((book) => (
          <div
            key={book._id}
            style={{
              border: "1px solid #ccc",
              padding: "16px",
              borderRadius: "10px",
              marginBottom: "20px",
              maxWidth: "400px",
            }}
          >
            <h3>{book.title}</h3>
            <p>
              <strong>Author:</strong> {book.author}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <select
                value={book.status}
                onChange={(e) => handleStatusChange(book._id, e.target.value)}
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </p>
            <p>
              <strong>Rating:</strong>{" "}
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  style={{
                    cursor: "pointer",
                    color: book.rating >= star ? "orange" : "gray",
                  }}
                  onClick={() => handleRatingChange(book._id, star)}
                >
                  ★
                </span>
              ))}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyBooks;
