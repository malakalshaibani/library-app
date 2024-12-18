import { Container, Row } from 'reactstrap';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Components/Register ";
import BookDetailPage from "./Components/BookDetailPage";
import FeedBack from "./Components/FeedBack";
import Logopage from "./Components/Logopage";
import Cart from './Components/Cart';
import AddBooks from './Components/AddBooks'; // Assuming you have an AddBooks component
import Profile from "./Components/Profile";
import { useSelector } from "react-redux";
import Header from './Components/Header';
import Home from './Components/Home';
import Login from './Components/Login';
import VisaPayment from './Components/VisaPayment';
import PayPage from './Components/PayPage';

const App = () => {
  const user = useSelector((state) => state.users.user); // Get user info from Redux store

  return (
    <Container fluid>
      <Router>
        <Row>
          <Header />
        </Row>

        <Row className="App">
          <Routes>
            {/* Show LogoPage as the first page */}
            <Route path="/" element={<Logopage />} />

            {/* Profile route */}
            <Route path="/profile" element={<Profile />} />

            {/* Home route */}
            <Route path="/home" element={<Home />} />

            {/* Register route */}
            <Route path="/register" element={<Register />} />

            {/* Login route */}
            <Route path="/login" element={<Login />} />

            {/* Book detail page */}
            <Route path="/book/:bookId" element={<BookDetailPage />} />

            {/* Feedback page */}
            <Route path="/FeedBack" element={<FeedBack />} />

            {/* Cart route */}
            <Route path="/cart" element={<Cart />} />

            <Route path="/visapayment" element={<VisaPayment />} />
            <Route path="/paypage" element={<PayPage />} />

            PayPage

            {/* Only show AddBooks route if the user is an admin */}
            {user && user.role === 'admin' && (
              <Route path="/addbooks" element={<AddBooks />} />
            )}
          </Routes>
        </Row>
      </Router>
    </Container>
  );
};

export default App;