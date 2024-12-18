import { Nav, Navbar, NavItem } from 'reactstrap';
import Library from '../Images/Library.jpeg';
import './BookShow.css'; 
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login, logout } from '../Features/UserSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.user);  // Get user info (including role)

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Navbar className="App-header">
      <Nav className="d-flex align-items-center ">
        {/* Logo Section */}
        <NavItem className="mr-3">
          <img 
            src={Library} 
            alt="Library Logo" 
            className="circular_image" 
          />
        </NavItem>
        <NavItem className="ml-3">
          <Link to="/profile" className="nav-link">Profile</Link>
        </NavItem>

        {/* Navigation Links */}
        <NavItem className="ml-3">
          <Link to="/home" className="nav-link">Home</Link>
        </NavItem>

        <NavItem className="ml-3">
          <Link to="/cart" className="nav-link">Cart</Link>
        </NavItem>

        {/* Conditionally show the "AddBooks" page link if the user is an admin */}
        {user && user.role === 'admin' && (
          <NavItem className="ml-3">
            <Link to="/addbooks" className="nav-link">Add Books</Link>
          </NavItem>
        )}

        <NavItem className="ml-3">
          <Link className="nav-link" onClick={handleLogout}>Logout</Link>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Header;