import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCartQuantity } from '../Features/PostSlice'; // Import the action to update quantity
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const cart = useSelector((state) => state.posts.cart); // Ensure this matches your state structure
  const dispatch = useDispatch(); // Initialize dispatch for Redux actions
  const [totalPrice, setTotalPrice] = useState(0);
  const [bookCount, setBookCount] = useState(0);
  const { isLogin } = useSelector(state => state.users);
  const navigate = useNavigate();

  const handleVisaPayment = () => {
    navigate('/visapayment'); // Navigate to visapayment page
  };

  const handleCalculate = () => {
    if (cart && cart.length > 0) {
      const total = cart.reduce((acc, item) => {
        const price = parseFloat(item.price?.replace(/[^0-9.]/g, '') || 0);
        return acc + (isNaN(price) ? 0 : price * (item.quantity || 1));
      }, 0);
      setTotalPrice(total);
      setBookCount(cart.reduce((acc, item) => acc + (item.quantity || 1), 0));
    }
  };

  useEffect(() => {
    if (!isLogin) {
      navigate('/login');
    }
  }, [isLogin, navigate]);

  const handleDelete = (index) => {
    const item = cart[index];
    if (item.quantity > 1) {
      // Reduce quantity by 1
      dispatch(updateCartQuantity({ index, quantity: item.quantity - 1 }));
    } else {
      // Remove item if quantity is 1
      dispatch(removeFromCart(index));
    }
  };

  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity >= 1) {
      dispatch(updateCartQuantity({ index, quantity: newQuantity })); // Dispatch action to update quantity
    }
  };

  if (!cart || cart.length === 0) {
    return <div className="emptyCart">Cart is empty.</div>;
  }

  return (
    <div className="cartContainer" style={{
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      minHeight: '100vh', // Make sure it covers the full height
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <h1>Your Cart</h1>
      {cart.map((item, index) => (
        <div key={index} className="itemCard">
          <img src={item.pic} alt={item.title} className="itemImage" />
          <div className="itemDetails">
            <h3 className="itemTitle">{item.title}</h3>
            <p><strong>Price:</strong> {item.price || 'N/A'}</p>
            <label>
              <strong>Quantity:</strong>
              <input
                type="number"
                min="1"
                value={item.quantity || 1}
                onChange={(e) => handleQuantityChange(index, parseInt(e.target.value, 10))}
                className="quantityInput"
              />
            </label>
            <button
              onClick={() => handleDelete(index)}
              className="deleteButton"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      <button onClick={handleCalculate} color="primary" className="button">
        Calculate Total
      </button>

      {bookCount > 0 && (
        <div className="totalSection">
          <p><strong>Total Books:</strong> {bookCount}</p>
          <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>
        </div>
      )}

      <br />
      <br />

      <button onClick={handleVisaPayment} color="primary" className="button">
        Payment
      </button>
    </div>
  );
};

export default Cart;
