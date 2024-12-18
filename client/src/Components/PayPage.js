import { useNavigate } from 'react-router-dom';
import Library from '../Images/Library.jpeg'

import oo from '../Images/6.jpeg';  // Import the background image

function PayPage() {

  const navigate =useNavigate();


  const handleGoBack = () => {

    navigate("/home"); // Redirect to the homepage or desired route

  };


  return (

    <div style={{ backgroundImage: `url(${oo})`, // Apply background image dynamically

          backgroundSize: 'cover',

          backgroundPosition: 'center',

          backgroundAttachment: 'fixed', display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh"}}>

      <div style={{ textAlign: "center", padding: "20px", borderRadius: "10px", background: "#fff", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>

        <h1 style={{ color: "#28a745" }}>Payment Successful!</h1>

        <p style={{ fontSize: "1.2rem", color: "#555" }}>

          Thank you for your payment. Your transaction has been successfully processed.

        </p>

        <div style={{ margin: "20px 0" }}>

          <img

            src={Library} // Replace with your own image URL

            alt="Success Icon"

            style={{ width: "150px", height: "150px" }}

          />

        </div>

        <button

          onClick={handleGoBack}

          style={{

            padding: "10px 20px",

            fontSize: "1rem",

            color: "#fff",

            background: "#007bff",

            border: "none",

            borderRadius: "5px",

            cursor: "pointer",

          }}

        >

          Done

        </button>

      </div>

    </div>

  );

}


export default PayPage;