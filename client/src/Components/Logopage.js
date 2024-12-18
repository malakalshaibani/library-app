import React from 'react';
import { useNavigate } from 'react-router-dom';
import Library from '../Images/Library.jpeg'; 
const LogoPage = () => {
  const navigate = useNavigate();

  const handleCustomerClick = () => {
    navigate('/home'); // Navigate to the customer page
  };

  const handleAdminClick = () => {
    navigate('/home'); // Navigate to the admin page
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <img 
          src={Library} 
          alt="Library Logo" 
        
      />
      <h1>Welcome to Rudhat AL_Qurra</h1>
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={handleCustomerClick}
          style={{
            padding: '10px 20px',
            margin: '10px',
            backgroundColor: 'Red',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Customer
        </button>
        <button
          onClick={handleAdminClick}
          style={{
            padding: '10px 20px',
            margin: '10px',
            backgroundColor: 'Red',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Admin
        </button>
      </div>
    </div>
  );
};

export default LogoPage;
