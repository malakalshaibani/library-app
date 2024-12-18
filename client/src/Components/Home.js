import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Container, Row } from "reactstrap";
import { useSelector } from 'react-redux';
import BooksData from './BooksData';
import { FaSearch } from 'react-icons/fa'; // Import the search icon from react-icons
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './BookShow.css';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { isLogin } = useSelector(state => state.users);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate('/login');
    }
  }, [isLogin, navigate]);

  // Filter the books based on search term
  const filteredBooks = BooksData.filter((b) =>
    b.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container fluid className="homepage-container">
      <Row className="formrow">
        <div className="search-input-container">
          <h1>Welcome to Rudhat AL_Qurra</h1>
        </div>
      </Row>
      <Row>
        <div className="search-input-container">
          <Input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input mb-3"
          />
          <FaSearch className="search-icon" /> {/* Add search icon */}
        </div>
      </Row>
      <Row className="books-row">
        <div className="books-container">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((b, index) => (
              <div key={index} className="book-card">
                <h6>{b.title}</h6>
                {/* Wrap the image and title in a Link to navigate to the book details */}
                <Link to={`/book/${b.id}`}>
                  <img src={b.pic} alt={b.title} className="book-image" />
                </Link>
              </div>
            ))
          ) : (
            <p>Book not found.</p>  
          )}
        </div>
      </Row>
    </Container>
  );
};

export default Home;
