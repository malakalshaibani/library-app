import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import BooksData from './BooksData';
import { useSelector, useDispatch } from "react-redux";
import { addToCart, getPosts } from '../Features/PostSlice';
import { useState } from "react";

const BookDetailPage = () => {
  const { bookId } = useParams(); // Get the book id from the URL
  const book = BooksData.find(b => b.id === bookId); // Find the book by id
  const navigate = useNavigate(); // Initialize the navigate function
  const dispatch = useDispatch(); // Initialize dispatch
  const { isLogin } = useSelector(state => state.users);

  // Fetch posts on component load or when login status changes
    useEffect(() => {
      if (!isLogin) {
        navigate('/login');
      } else {
        dispatch(getPosts()); // Fetch all posts
      }
    }, [isLogin, navigate, dispatch]);

  if (!book) {
    return <div>Book not found.</div>;
  }

  const handleAddToCart = () => {
    dispatch(addToCart(book)); // Add book to the Redux cart
    navigate('/cart');
  };

  const handleFeedback = () => {
    navigate('/Feedback'); // Navigate to feedback page
  };

  return (
    <div className='login-container' style={{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          minHeight: '100vh', // Make sure it covers the full height
          //display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
      <div className="book-detail-container">
        <div className="book-image-container">
          <img src={book.pic} alt={book.title} className="book-image" />
        </div>
        <div className="book-info">
          <h5 className="book-title">{book.title}</h5>
          <h6 className="book-author">Author: {book.author}</h6>
          <p className="book-details"><strong>Details:</strong> {book.details}</p>
          <h6 className="book-price"><strong>Price:</strong> {book.price}</h6>
          <div className="book-actions">
            <button onClick={handleAddToCart} color="primary" className="button">
              Add to Cart
            </button>
            <button onClick={handleFeedback} className="button">
              Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;