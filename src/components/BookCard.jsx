import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const BookCard = ({ book }) => {
  const auth = useSelector((state) => state.auth);

  const handleWantToRead = async () => {
    if (!auth.isAuth) {
      alert("Please login first to add this book.");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:5000/api/mybooks/${book._id}`,
        { bookId: book._id },
        { withCredentials: true }
      );
      if (res.status !== 200) {
        alert("Book already added into your list!");
      }
      alert("Book added to your reading list!");
      console.log(res);
    } catch (error) {
      alert(error?.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "12px",
        maxWidth: "300px",
      }}
    >
      <img
        src={book.coverImage}
        alt={book.title}
        style={{ width: "100%", borderRadius: "4px" }}
      />
      <h3>{book.title}</h3>
      <p>
        <strong>Author:</strong> {book.author}
      </p>
      <button onClick={handleWantToRead}>Want to Read</button>
    </div>
  );
};

export default BookCard;
